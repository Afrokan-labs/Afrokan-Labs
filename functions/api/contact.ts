/**
 * POST /api/contact: the site's only server code (architecture §5, BUILD_PLAN 6.1).
 *
 *   1. Reject if the honeypot is filled (fake success)
 *   2. Verify the Turnstile token server-side
 *   3. Validate and length-limit with the schema the browser uses
 *   4. Send the notification email through Resend
 *   5. Reply: JSON for the enhanced form, a redirect for a plain form post
 *
 * Stores nothing and sends no auto-reply. Secrets come from context.env and
 * are validated on each request (architecture §12). User input never goes
 * into the From or Subject headers; the body is plain text.
 *
 * Rate limiting is a Cloudflare dashboard rule, not code (docs/DEPLOY.md).
 */
import * as z from "zod/mini";
import { contact as copy } from "../../src/content/contact";
import { site } from "../../src/content/site";
import { FIELD, RESULT_PAGES, type ContactResponse } from "../../src/lib/contact-fields";
import {
  readFields,
  replyToFor,
  validateContact,
  type ContactSubmission,
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
/** Three fields of at most 2,354 characters, URL-encoded, plus the token. */
const MAX_BODY_BYTES = 32 * 1024;

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
  const failed = (status: number) => reply({ ok: false, error: "failed" }, status);

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
  if (typeof token !== "string" || !token) return failed(400);
  const ip = request.headers.get("CF-Connecting-IP") ?? undefined;
  if (!(await verifyTurnstile(secrets.data, token, ip))) return failed(403);

  // 3. Validation.
  const result = validateContact(readFields(form));
  if (!result.ok) return reply({ ok: false, errors: result.errors }, 422);

  // 4. Notification.
  if (!(await sendNotification(secrets.data, result.data))) return failed(502);

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

/** The notification body: plain text, so nothing the visitor types can become markup. */
export function notificationText(data: ContactSubmission): string {
  const { labels } = copy.email;
  return [
    `${labels.name}: ${data.name}`,
    `${labels.contact}: ${data.contact}`,
    "",
    `${labels.message}:`,
    data.message,
  ].join("\n");
}

async function sendNotification(secrets: Secrets, data: ContactSubmission): Promise<boolean> {
  const replyTo = replyToFor(data.contact);
  try {
    const res = await fetch(RESEND_SEND, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secrets.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [secrets.CONTACT_TO_EMAIL],
        subject: copy.email.subject,
        text: notificationText(data),
        // Replying goes straight to the lead when they gave an email (§6).
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) console.error("contact: Resend replied", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("contact: Resend request failed", error);
    return false;
  }
}
