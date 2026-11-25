/**
 * POST /api/contact: the site's only server code (architecture §5, BUILD_PLAN 6.1).
 *
 *   1. Reject if the honeypot is filled (fake success)
 *   2. Verify the Turnstile token server-side
 *   3. Validate and length-limit with the schema the browser uses
 *   4. Send the notification email through Resend
 *   5. Send the visitor a fixed auto-reply, when they gave an email address
 *   6. Reply: JSON for the enhanced form, a redirect for a plain form post
 *
 * Stores nothing. Secrets come from context.env and are validated on each
 * request (architecture §12). Both emails are HTML with a plain-text part
 * (src/lib/contact-email.ts). User input is escaped in the HTML, never goes
 * into From, and reaches the notification's Subject only as one cleaned line.
 * The auto-reply carries none of it.
 *
 * Rate limiting is a Cloudflare dashboard rule, not code (docs/DEPLOY.md).
 */
import * as z from "zod/mini";
import { contact as copy } from "../../src/content/contact";
import { site } from "../../src/content/site";
import {
  autoReplyHtml,
  autoReplyText,
  type Enquiry,
  notificationHtml,
  notificationSubject,
  notificationText,
} from "../../src/lib/contact-email";
import {
  FIELD,
  RESULT_PAGES,
  type ContactResponse,
  type SendError,
} from "../../src/lib/contact-fields";
import {
  readExtras,
  readFields,
  replyToFor,
  resolveSubmission,
  validateContact,
} from "../../src/lib/contact-form";

/** The parts of Cloudflare's EventContext this function uses. */
type Context = { request: Request; env: Record<string, unknown> };

const Secrets = z.object({
  TURNSTILE_SECRET_KEY: z.string().check(z.minLength(1)),
  RESEND_API_KEY: z.string().check(z.minLength(1)),
  CONTACT_TO_EMAIL: z.email(),
});
type Secrets = z.infer<typeof Secrets>;

/** Sent from the notify subdomain so a deliverability problem can't touch the main mailbox (§6). */
const FROM = `${site.name} website <notify@notify.${site.domain}>`;
const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_SEND = "https://api.resend.com/emails";
/** Where the emails load the logo from: the live site, so the image works in any inbox. */
const ASSET_ORIGIN = `https://${site.domain}`;
/**
 * Multipart form data: the fields' limits (about 5,700 characters, at most
 * three bytes each in UTF-8), the token and the part headers, with room to spare.
 */
const MAX_BODY_BYTES = 64 * 1024;

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== "POST")
    return new Response(null, { status: 405, headers: { Allow: "POST" } });

  const wantsJson = (request.headers.get("Accept") ?? "").includes("application/json");
  const reply = (body: ContactResponse, status: number) =>
    wantsJson
      ? Response.json(body, { status, headers: { "Cache-Control": "no-store" } })
      : Response.redirect(
          new URL(body.ok ? RESULT_PAGES.sent : RESULT_PAGES.failed, request.url).href,
          303,
        );
  const failed = (status: number, error: SendError = "failed") =>
    reply({ ok: false, error }, status);

  // Browsers send Origin on every POST; refuse posts from other sites.
  const origin = request.headers.get("Origin");
  if (origin && origin !== new URL(request.url).origin) return failed(403);

  const length = Number(request.headers.get("Content-Length") ?? 0);
  if (length > MAX_BODY_BYTES) return failed(413);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return failed(400);
  }

  // 1. Honeypot: pretend it worked, so bots learn nothing.
  if (String(form.get(FIELD.honeypot) ?? "").trim()) return reply({ ok: true }, 200);

  const secrets = z.safeParse(Secrets, env);
  if (!secrets.success) {
    console.error("contact: missing or invalid secrets", z.prettifyError(secrets.error));
    return failed(500);
  }

  // 2. Turnstile.
  const token = form.get(FIELD.turnstile);
  if (typeof token !== "string" || !token) return failed(400, "verification");
  const ip = request.headers.get("CF-Connecting-IP") ?? undefined;
  if (!(await verifyTurnstile(secrets.data, token, ip))) return failed(403, "verification");

  // 3. Validation. A WhatsApp number can stand in for the email, and the
  // message is optional (contact-form.ts resolveSubmission).
  resolveSubmission(form, copy.form.noMessage);
  const result = validateContact(readFields(form));
  if (!result.ok) return reply({ ok: false, errors: result.errors }, 422);

  const extras = readExtras(form);
  const enquiry: Enquiry = {
    ...result.data,
    ...extras,
    // Only the form's own options: anything else in "needs" or "goal" is dropped.
    needs: extras.needs.filter((n) => copy.form.needs.options.includes(n)),
    goal: extras.goal && copy.form.goal.options.includes(extras.goal) ? extras.goal : undefined,
  };

  // 4. Notification.
  if (!(await sendNotification(secrets.data, enquiry, new Date()))) return failed(502);

  // 5. Auto-reply. The message already reached us, so a failure here still counts as sent.
  const visitor = replyToFor(enquiry.contact);
  if (visitor) await sendAutoReply(secrets.data, visitor);

  return reply({ ok: true }, 200);
}

async function verifyTurnstile(secrets: Secrets, token: string, ip?: string): Promise<boolean> {
  const body = new FormData();
  body.append("secret", secrets.TURNSTILE_SECRET_KEY);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: "POST", body });
    const data = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("contact: Turnstile rejected", data["error-codes"]);
    return data.success === true;
  } catch (error) {
    console.error("contact: Turnstile verify failed", error);
    return false;
  }
}

async function sendNotification(
  secrets: Secrets,
  enquiry: Enquiry,
  sentAt: Date,
): Promise<boolean> {
  const replyTo = replyToFor(enquiry.contact);
  return sendEmail(secrets, "notification", {
    to: [secrets.CONTACT_TO_EMAIL],
    subject: notificationSubject(enquiry),
    html: notificationHtml(enquiry, sentAt, ASSET_ORIGIN),
    text: notificationText(enquiry, sentAt),
    // Replying goes straight to the lead when they gave an email (§6).
    ...(replyTo ? { reply_to: replyTo } : {}),
  });
}

/** Sent only after Turnstile and validation pass, and only to the address the visitor gave. */
function sendAutoReply(secrets: Secrets, to: string): Promise<boolean> {
  return sendEmail(secrets, "auto-reply", {
    to: [to],
    subject: copy.autoReply.subject,
    html: autoReplyHtml(ASSET_ORIGIN),
    text: autoReplyText(),
    reply_to: site.email,
  });
}

async function sendEmail(
  secrets: Secrets,
  kind: string,
  email: { to: string[]; subject: string; html: string; text: string; reply_to?: string },
): Promise<boolean> {
  try {
    const res = await fetch(RESEND_SEND, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secrets.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, ...email }),
    });
    if (!res.ok) console.error(`contact: Resend replied (${kind})`, res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error(`contact: Resend request failed (${kind})`, error);
    return false;
  }
}
