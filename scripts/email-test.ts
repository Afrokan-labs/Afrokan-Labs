/**
 * pnpm email:test — sends one test copy of each contact email (the notification
 * and the auto-reply) to an address of your choice, through Resend, using the
 * same templates as functions/api/contact.ts. The enquiry is made up.
 *
 *   pnpm email:test you@example.com
 *   pnpm email:test you@example.com --assets https://<preview>.afrokan-labs.pages.dev
 *   pnpm email:test --preview <dir>     writes both as .html files, sends nothing
 *
 * RESEND_API_KEY comes from the environment or from .dev.vars (gitignored).
 * --assets sets where the logo loads from (default: the live site), for
 * testing before the logo is deployed there.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "../src/content/site";
import {
  autoReplyHtml,
  autoReplyText,
  type Enquiry,
  notificationHtml,
  notificationSubject,
  notificationText,
} from "../src/lib/contact-email";
import { contact as copy } from "../src/content/contact";

const args = process.argv.slice(2);
const option = (name: string) => {
  const i = args.indexOf(name);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};
const preview = option("--preview");
const assets = (option("--assets") ?? `https://${site.domain}`).replace(/\/+$/, "");
const to = args[0];

const SAMPLE: Enquiry = {
  name: "Test Person",
  contact: to ?? "test@example.com",
  phone: "024 000 0000",
  company: "Test Shop Ltd",
  needs: [copy.form.needs.options[0], copy.form.needs.options[1]],
  message:
    'This is a test enquiry from pnpm email:test.\n\nIt checks that line breaks survive, that <b>tags</b> & "quotes" are escaped, and that a very long word wraps: https://example.com/a-very-long-link-that-should-wrap-instead-of-stretching-the-table-on-a-phone-screen',
  page: "/contact",
  from: "/services",
};

function apiKey(): string | undefined {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  if (!existsSync(".dev.vars")) return undefined;
  const line = readFileSync(".dev.vars", "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("RESEND_API_KEY="));
  return line?.slice("RESEND_API_KEY=".length).trim().replace(/^"|"$/g, "");
}

async function send(key: string, email: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: `${site.name} website <notify@notify.${site.domain}>`, ...email }),
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`Resend replied ${res.status}: ${body}`);
  return (JSON.parse(body) as { id: string }).id;
}

async function main() {
  const now = new Date();
  if (preview) {
    mkdirSync(preview, { recursive: true });
    writeFileSync(join(preview, "notification.html"), notificationHtml(SAMPLE, now, assets));
    writeFileSync(join(preview, "notification.txt"), notificationText(SAMPLE, now));
    writeFileSync(join(preview, "auto-reply.html"), autoReplyHtml(assets));
    writeFileSync(join(preview, "auto-reply.txt"), autoReplyText());
    console.log(`Wrote previews to ${preview}`);
    return;
  }
  if (!to || !to.includes("@")) throw new Error("Usage: pnpm email:test you@example.com");
  const key = apiKey();
  if (!key) throw new Error("Set RESEND_API_KEY, or put RESEND_API_KEY=... in .dev.vars.");

  const notification = await send(key, {
    to: [to],
    subject: `[TEST] ${notificationSubject(SAMPLE)}`,
    html: notificationHtml(SAMPLE, now, assets),
    text: notificationText(SAMPLE, now),
    reply_to: to,
  });
  const reply = await send(key, {
    to: [to],
    subject: `[TEST] ${copy.autoReply.subject}`,
    html: autoReplyHtml(assets),
    text: autoReplyText(),
    reply_to: site.email,
  });
  console.log(`Sent to ${to}: notification ${notification}, auto-reply ${reply}.`);
}

main().catch((error: unknown) => {
  console.error((error as Error).message);
  process.exit(1);
});
