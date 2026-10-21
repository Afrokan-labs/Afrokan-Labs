/**
 * The contact form's two emails, as HTML with a plain-text fallback:
 *
 * - the notification to hello@ (every field on its own row), and
 * - the auto-reply to the visitor (fixed copy, nothing they typed).
 *
 * Both share one letterhead. Email clients ignore stylesheets and CSS
 * variables, so styles are inline and the colours below repeat the values of
 * src/styles/tokens.css. The logo is a hosted PNG: Gmail and Outlook block SVG.
 * Everything the visitor typed goes through esc() before it reaches the HTML.
 *
 * No path aliases, because wrangler bundles this file into the function.
 */
import { contact as copy } from "../content/contact";
import { site } from "../content/site";
import { replyToFor, type ContactExtras, type ContactSubmission } from "./contact-form";
import { waMeUrl } from "./wa-me";

/** tokens.css: --c-0d0d0d, --c-94de57, --c-1d3a0c, --c-f3f3ef, --c-444444, --c-dadad3, --c-ffffff. */
const C = {
  ink: "#0d0d0d",
  accent: "#94de57",
  accentDeep: "#1d3a0c",
  paper: "#f3f3ef",
  muted: "#444444",
  rule: "#dadad3",
  white: "#ffffff",
} as const;
const FONT = "Arial, Helvetica, sans-serif";

/** The 2x logo mark (public/email/logo-mark.png, 80 × 72), shown at 40 × 36. */
export const LOGO_PATH = "/email/logo-mark.png";

export type Enquiry = ContactSubmission & ContactExtras;

const isEmail = (contact: string) => replyToFor(contact) !== undefined;

/** Escapes text for HTML element content and quoted attributes. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const fill = (template: string, values: Record<string, string>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");

/** One line, no control characters: safe for a header such as Subject. */
const oneLine = (value: string, max: number) =>
  [...value]
    .map((ch) => (ch.charCodeAt(0) < 32 || ch.charCodeAt(0) === 127 ? " " : ch))
    .join("")
    // \s also covers the Unicode line and paragraph separators.
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

/** "Tuesday 21 October 2026, 21:04 GMT": Ghana keeps GMT all year. */
export function ghanaTime(date: Date): string {
  const text = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Accra",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
  return `${text.replace(" at ", ", ")} GMT`;
}

/** The letterhead: logo bar, accent rule, content, footer. `body` is trusted HTML. */
function letterhead({
  title,
  preheader,
  body,
  assetOrigin,
}: {
  title: string;
  preheader: string;
  body: string;
  assetOrigin: string;
}): string {
  const siteUrl = `https://${site.domain}`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:${C.white};border-collapse:collapse;">
<tr><td style="background:${C.ink};padding:20px 24px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="vertical-align:middle;"><img src="${esc(assetOrigin + LOGO_PATH)}" width="40" height="36" alt="" style="display:block;border:0;"></td>
<td style="vertical-align:middle;padding-left:12px;font:600 18px/1 ${FONT};color:${C.white};letter-spacing:-0.01em;">${esc(site.name)}</td>
</tr></table>
</td></tr>
<tr><td style="height:4px;line-height:4px;font-size:0;background:${C.accent};">&nbsp;</td></tr>
<tr><td style="padding:28px 24px;font:15px/1.55 ${FONT};color:${C.ink};">
${body}
</td></tr>
<tr><td style="background:${C.white};padding:16px 24px;font:12px/1.6 ${FONT};color:${C.muted};border-top:1px solid ${C.rule};">
<a href="mailto:${esc(site.email)}" style="color:${C.ink};">${esc(site.email)}</a> &nbsp;·&nbsp; <a href="${esc(siteUrl)}" style="color:${C.ink};">${esc(site.domain)}</a> &nbsp;·&nbsp; ${esc(site.location)}
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

const h1 = (text: string) =>
  `<h1 style="margin:0 0 16px;font:700 22px/1.25 ${FONT};color:${C.ink};">${esc(text)}</h1>`;

// ----- Notification (to hello@) -----

const notificationLabels = copy.email.labels;

/** The notification's subject: the visitor's name and needs, on one line. */
export function notificationSubject(e: Enquiry): string {
  const name = oneLine(e.name, 60);
  if (!e.needs.length) return fill(copy.email.subject, { name });
  return fill(copy.email.subjectWithNeeds, { name, needs: oneLine(e.needs.join(", "), 120) });
}

/** The rows of the notification table, in order. Empty optional rows are left out. */
function notificationRows(e: Enquiry, sentAt: Date): [label: string, value: string][] {
  const page = e.page
    ? e.from && e.from !== e.page
      ? `${e.page} (${fill(copy.email.cameFrom, { path: e.from })})`
      : e.page
    : undefined;
  const rows: [string, string | undefined][] = [
    [notificationLabels.name, e.name],
    [isEmail(e.contact) ? notificationLabels.email : notificationLabels.contact, e.contact],
    [notificationLabels.phone, e.phone],
    [notificationLabels.company, e.company],
    [notificationLabels.needs, e.needs.length ? e.needs.join(", ") : undefined],
    [notificationLabels.message, e.message],
    [notificationLabels.sent, ghanaTime(sentAt)],
    [notificationLabels.page, page],
  ];
  return rows.filter((r): r is [string, string] => Boolean(r[1]));
}

export function notificationHtml(e: Enquiry, sentAt: Date, assetOrigin: string): string {
  const cell = `padding:12px 0;border-bottom:1px solid ${C.rule};vertical-align:top;`;
  const rows = notificationRows(e, sentAt)
    .map(([label, value]) => {
      // Line breaks kept, long words wrapped.
      const html = esc(value).replace(/\r?\n/g, "<br>");
      const link = label === notificationLabels.email;
      return `<tr>
<td width="120" style="${cell}width:120px;padding-right:16px;font:600 13px/1.5 ${FONT};color:${C.muted};">${esc(label)}</td>
<td style="${cell}font:15px/1.55 ${FONT};color:${C.ink};word-break:break-word;overflow-wrap:anywhere;">${
        link ? `<a href="mailto:${esc(e.contact)}" style="color:${C.ink};">${html}</a>` : html
      }</td>
</tr>`;
    })
    .join("\n");
  const replyHint = isEmail(e.contact)
    ? `<p style="margin:20px 0 0;font:13px/1.5 ${FONT};color:${C.muted};">${esc(
        fill(copy.email.replyHint, { name: oneLine(e.name, 60) }),
      )}</p>`
    : "";
  return letterhead({
    title: notificationSubject(e),
    preheader: oneLine(e.message, 120),
    assetOrigin,
    body: `${h1(copy.email.heading)}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-top:1px solid ${C.rule};table-layout:fixed;">
${rows}
</table>
${replyHint}`,
  });
}

/** The plain-text part: every row as "Label: value", the message on its own lines. */
export function notificationText(e: Enquiry, sentAt: Date): string {
  const lines = notificationRows(e, sentAt).map(([label, value]) =>
    value.includes("\n") ? `${label}:\n${value}\n` : `${label}: ${value}`,
  );
  return [copy.email.heading, "", ...lines].join("\n").trimEnd();
}

// ----- Auto-reply (to the visitor) -----

const reply = copy.autoReply;

export function autoReplyHtml(assetOrigin: string): string {
  const p = (text: string) => `<p style="margin:0 0 14px;">${esc(text)}</p>`;
  return letterhead({
    title: reply.subject,
    preheader: reply.intro,
    assetOrigin,
    body: `${h1(reply.heading)}
${p(reply.intro)}
<h2 style="margin:24px 0 8px;font:700 16px/1.3 ${FONT};color:${C.ink};">${esc(reply.nextTitle)}</h2>
${p(fill(reply.next, { replyWithin: site.replyWithin }))}
${p(reply.urgent)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;"><tr>
<td style="background:${C.accent};border-radius:4px;">
<a href="${esc(waMeUrl(site.whatsappNumber))}" style="display:inline-block;padding:12px 22px;font:700 15px/1 ${FONT};color:${C.accentDeep};text-decoration:none;">${esc(reply.whatsappCta)}</a>
</td></tr></table>`,
  });
}

export function autoReplyText(): string {
  return [
    reply.heading,
    "",
    reply.intro,
    "",
    `${reply.nextTitle}:`,
    fill(reply.next, { replyWithin: site.replyWithin }),
    "",
    `${reply.urgent} ${waMeUrl(site.whatsappNumber)}`,
    "",
    "--",
    site.name,
    `${site.email} · ${site.domain} · ${site.location}`,
  ].join("\n");
}
