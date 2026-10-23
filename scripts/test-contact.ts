/**
 * pnpm test:contact — exercises functions/api/contact.ts without the network.
 * fetch() is replaced, so Turnstile and Resend answer from this script and
 * every request the function makes is checked. Exits 1 on any failure.
 */
import assert from "node:assert/strict";
import { onRequest } from "../functions/api/contact";
import { autoReplyText, ghanaTime, notificationText } from "../src/lib/contact-email";
import { signatureHtml } from "../src/lib/email-signature";

const ICONS = [
  ["x", "X", "https://x.com/afrokanlabs"],
  ["instagram", "Instagram", "https://instagram.com/afrokanlabs"],
  ["linkedin", "LinkedIn", "https://linkedin.com/company/afrokanlabs"],
] as const;

/** Every social icon: a linked 20 × 20 PNG from the live site, with its platform as alt text. */
function assertSocialIcons(html: string) {
  for (const [key, alt, href] of ICONS)
    assert.match(
      html,
      new RegExp(
        `<a href="${href}"[^>]*><img src="https://afrokanlabs\\.com/email/icons/${key}\\.png" width="20" height="20" alt="${alt}"`,
      ),
      key,
    );
}

const ORIGIN = "https://afrokanlabs.com";
const ENV = {
  TURNSTILE_SECRET_KEY: "test-secret",
  RESEND_API_KEY: "re_test",
  CONTACT_TO_EMAIL: "hello@afrokanlabs.com",
};
const VALID = {
  name: "Test Person",
  contact: "test@example.com",
  message: "We run a test shop.",
  "cf-turnstile-response": "token",
};

type Sent = { url: string; body: unknown };
let sent: Sent[] = [];
let turnstileOk = true;
/** Which Resend calls fail, by order within one post: 0 is the notification, 1 the auto-reply. */
let resendFails: number[] = [];
let resendCalls = 0;

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  if (url.includes("turnstile")) {
    const form = init?.body as FormData;
    sent.push({ url, body: Object.fromEntries(form) });
    return Response.json({ success: turnstileOk });
  }
  if (url.includes("resend")) {
    sent.push({ url, body: JSON.parse(String(init?.body)) });
    return new Response("{}", { status: resendFails.includes(resendCalls++) ? 500 : 200 });
  }
  throw new Error(`unexpected fetch ${url}`);
}) as typeof fetch;
// The function logs failures on purpose; keep the output readable.
console.error = console.warn = () => {};

async function post(
  fields: Record<string, string> | [string, string][],
  opts: { json?: boolean; origin?: string } = {},
) {
  sent = [];
  resendCalls = 0;
  const request = new Request(`${ORIGIN}/api/contact`, {
    method: "POST",
    body: new URLSearchParams(fields),
    headers: {
      ...(opts.json === false ? {} : { Accept: "application/json" }),
      Origin: opts.origin ?? ORIGIN,
      "CF-Connecting-IP": "203.0.113.7",
    },
  });
  const res = await onRequest({ request, env: ENV });
  const body = res.headers.get("Content-Type")?.includes("json") ? await res.json() : undefined;
  return { status: res.status, body, location: res.headers.get("Location") };
}

const tests: [string, () => Promise<void>][] = [
  [
    "valid post: one notification (HTML + text) with the name in the subject and Reply-To",
    async () => {
      const r = await post(VALID);
      assert.deepEqual([r.status, r.body], [200, { ok: true }]);
      assert.equal(sent.length, 3);
      assert.deepEqual(sent[0].body, {
        secret: "test-secret",
        response: "token",
        remoteip: "203.0.113.7",
      });
      const email = sent[1].body as Record<string, unknown>;
      assert.equal(email.subject, "New enquiry: Test Person");
      assert.deepEqual(email.to, ["hello@afrokanlabs.com"]);
      assert.equal(email.from, "Afrokan Labs website <notify@notify.afrokanlabs.com>");
      assert.equal(email.reply_to, "test@example.com");
      assert.match(String(email.text), /Name: Test Person/);
      assert.match(String(email.html), /<td[^>]*>Test Person<\/td>/);
    },
  ],
  [
    "the visitor gets a fixed auto-reply from notify@, replying to hello@",
    async () => {
      await post({
        ...VALID,
        name: "Visit http://spam.example",
        message: "Buy http://spam.example",
      });
      const reply = sent[2].body as Record<string, unknown>;
      assert.deepEqual(reply.to, ["test@example.com"]);
      assert.equal(reply.from, "Afrokan Labs website <notify@notify.afrokanlabs.com>");
      assert.equal(reply.reply_to, "hello@afrokanlabs.com");
      assert.equal(reply.subject, "We’ve received your message");
      assert.equal(reply.text, autoReplyText());
      // Nothing the visitor typed is echoed back.
      assert.doesNotMatch(String(reply.text), /spam|Visit|Buy/);
      assert.match(String(reply.text), /https:\/\/wa\.me\/\d+/);
      assert.match(String(reply.text), /within 1 business day/);
    },
  ],
  [
    "a phone number instead of an email: 422, nothing sent",
    async () => {
      const r = await post({ ...VALID, contact: "+233 00 000 0000" });
      assert.deepEqual([r.status, r.body], [422, { ok: false, errors: { contact: "invalid" } }]);
      assert.equal(sent.length, 1);
    },
  ],
  [
    "auto-reply fails: still a success, since the message reached us",
    async () => {
      resendFails = [1];
      const r = await post(VALID);
      resendFails = [];
      assert.deepEqual([r.status, r.body, sent.length], [200, { ok: true }, 3]);
    },
  ],
  [
    "filled honeypot: fake success, nothing sent",
    async () => {
      const r = await post({ ...VALID, website: "http://spam" });
      assert.deepEqual([r.status, r.body, sent.length], [200, { ok: true }, 0]);
    },
  ],
  [
    "Turnstile rejects: 403, no email",
    async () => {
      turnstileOk = false;
      const r = await post(VALID);
      turnstileOk = true;
      assert.deepEqual([r.status, r.body], [403, { ok: false, error: "verification" }]);
      assert.equal(sent.length, 1);
    },
  ],
  [
    "missing token: 400, Turnstile not called",
    async () => {
      const r = await post({ ...VALID, "cf-turnstile-response": "" });
      assert.deepEqual(
        [r.status, r.body, sent.length],
        [400, { ok: false, error: "verification" }, 0],
      );
    },
  ],
  [
    "invalid fields: 422 with error keys, no email",
    async () => {
      const r = await post({ ...VALID, name: " ", contact: "123", message: "x".repeat(5001) });
      assert.equal(r.status, 422);
      assert.deepEqual(r.body, {
        ok: false,
        errors: { name: "required", contact: "invalid", message: "tooLong" },
      });
      assert.equal(sent.length, 1);
    },
  ],
  [
    'Resend fails: 502 "failed", and no auto-reply is sent',
    async () => {
      resendFails = [0];
      const r = await post(VALID);
      resendFails = [];
      assert.deepEqual([r.status, r.body, sent.length], [502, { ok: false, error: "failed" }, 2]);
    },
  ],
  [
    "missing secrets: 500, nothing sent",
    async () => {
      const request = new Request(`${ORIGIN}/api/contact`, {
        method: "POST",
        body: new URLSearchParams(VALID),
        headers: { Accept: "application/json" },
      });
      sent = [];
      const res = await onRequest({ request, env: { RESEND_API_KEY: "x" } });
      assert.deepEqual([res.status, sent.length], [500, 0]);
    },
  ],
  [
    "cross-site post: 403",
    async () => {
      const r = await post(VALID, { origin: "https://example.com" });
      assert.deepEqual([r.status, sent.length], [403, 0]);
    },
  ],
  [
    "plain form post: 303 to the result pages",
    async () => {
      const ok = await post(VALID, { json: false });
      assert.deepEqual([ok.status, ok.location], [303, `${ORIGIN}/contact/sent`]);
      const bad = await post({ ...VALID, name: "" }, { json: false });
      assert.deepEqual([bad.status, bad.location], [303, `${ORIGIN}/contact/not-sent`]);
    },
  ],
  [
    "GET: 405",
    async () => {
      const res = await onRequest({ request: new Request(`${ORIGIN}/api/contact`), env: ENV });
      assert.equal(res.status, 405);
    },
  ],
  [
    "optional details: own rows, needs in the subject, unknown needs and odd paths dropped",
    async () => {
      await post([
        ...Object.entries(VALID),
        ["company", "Test Shop Ltd"],
        ["phone", "024 000 0000"],
        ["need", "Website or web app"],
        ["need", "Free money"],
        ["page", "/contact"],
        ["from", "javascript:alert(1)"],
      ]);
      const email = sent[1].body as Record<string, string>;
      assert.equal(email.subject, "New enquiry: Test Person (Website or web app)");
      for (const row of ["Company: Test Shop Ltd", "WhatsApp: 024 000 0000", "Page: /contact"])
        assert.ok(email.text.includes(row), row);
      assert.doesNotMatch(email.text + email.html, /Free money|javascript/);
      assert.match(email.text, /^Sent: \w+day, \d+ \w+ \d{4}, \d\d:\d\d GMT$/m);
    },
  ],
  [
    "the page the visitor came from is shown beside the form's page",
    async () => {
      await post([...Object.entries(VALID), ["page", "/contact"], ["from", "/services"]]);
      assert.match(
        (sent[1].body as Record<string, string>).text,
        /Page: \/contact \(came from \/services\)/,
      );
    },
  ],
  [
    "HTML escapes everything the visitor typed; the subject stays on one line",
    async () => {
      await post([
        ...Object.entries({
          ...VALID,
          name: 'Ama\r\nBcc: x@example.com <img src=x onerror="alert(1)">',
          message: "<script>alert('x')</script>\nLine 2 & more",
        }),
        ["company", '"><b>Co</b>'],
      ]);
      const email = sent[1].body as Record<string, string>;
      assert.doesNotMatch(email.html, /<img src=x|<script>|<b>Co<\/b>/);
      assert.ok(
        email.html.includes("&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;<br>Line 2 &amp; more"),
      );
      assert.ok(email.html.includes("&quot;&gt;&lt;b&gt;Co&lt;/b&gt;"));
      assert.doesNotMatch(email.subject, /[\r\n]/);
      assert.ok(email.subject.startsWith("New enquiry: Ama Bcc: x@example.com"));
    },
  ],
  [
    "both emails load the logo as a PNG from the live site, never SVG",
    async () => {
      await post(VALID);
      for (const i of [1, 2]) {
        const html = (sent[i].body as Record<string, string>).html;
        assert.match(html, /<img src="https:\/\/afrokanlabs\.com\/email\/logo-mark\.png"/);
        assert.doesNotMatch(html, /<svg|\.svg/);
      }
    },
  ],
  [
    "the auto-reply HTML repeats nothing the visitor typed",
    async () => {
      await post({ ...VALID, name: "Visit spam.example", message: "Buy at spam.example" });
      const html = (sent[2].body as Record<string, string>).html;
      assert.doesNotMatch(html, /spam|Visit|Buy/);
      assert.match(html, /href="https:\/\/wa\.me\/\d+"/);
      assert.match(html, /hello@afrokanlabs\.com/);
    },
  ],
  [
    "Ghana time is GMT all year",
    async () => {
      assert.equal(
        ghanaTime(new Date("2026-07-01T09:30:00Z")),
        "Wednesday, 1 July 2026, 09:30 GMT",
      );
      assert.equal(
        ghanaTime(new Date("2026-12-31T23:05:00Z")),
        "Thursday, 31 December 2026, 23:05 GMT",
      );
    },
  ],
  [
    "both email footers link X, Instagram and LinkedIn with PNG icons",
    async () => {
      await post(VALID);
      for (const i of [1, 2]) assertSocialIcons((sent[i].body as Record<string, string>).html);
      assert.match(autoReplyText(), /^Instagram: https:\/\/instagram\.com\/afrokanlabs$/m);
    },
  ],
  [
    "signatures: compact team markup, PNGs only",
    async () => {
      for (const named of [false, true]) {
        const html = signatureHtml({ named });
        assert.doesNotMatch(html, /class=|<svg|\.svg|<link|@import|<style|font-face/);
        assert.match(html, /max-width:400px/);
        assert.match(
          html,
          /<img src="https:\/\/afrokanlabs\.com\/email\/logo\.png" width="88" height="88" alt="Afrokan Labs"/,
        );
        assert.match(html, /border-left:2px solid #94de57/);
        assert.match(html, />The Afrokan Labs Team</);
        assert.match(html, />AI and software studio in Accra</);
        assert.match(html, /href="https:\/\/wa\.me\/233596069011"[^>]*>\+233 59 606 9011</);
        assert.match(html, /href="mailto:hello@afrokanlabs\.com"/);
        assert.match(html, /href="https:\/\/afrokanlabs\.com"[^>]*>afrokanlabs\.com</);
        assert.equal(/\[First name\] &middot; Afrokan Labs/.test(html), named);
        assertSocialIcons(html);
      }
    },
  ],
  [
    "the plain-text part keeps input as typed",
    async () => {
      const text = notificationText(
        { name: "<b>Ama</b>", contact: "a@b.co", message: "Line 1\nLine 2", needs: [] },
        new Date("2026-07-01T09:30:00Z"),
      );
      assert.match(text, /^Name: <b>Ama<\/b>$/m);
      assert.match(text, /^Email: a@b\.co$/m);
      assert.match(text, /Message:\nLine 1\nLine 2\n/);
    },
  ],
];

async function main() {
  let failures = 0;
  for (const [name, run] of tests) {
    try {
      await run();
      process.stdout.write(`  ok    ${name}\n`);
    } catch (error) {
      failures++;
      process.stdout.write(`  FAIL  ${name}\n${(error as Error).message}\n`);
    }
  }
  process.stdout.write(
    failures ? `test:contact: ${failures} failed\n` : `test:contact: ${tests.length} passed\n`,
  );
  process.exit(failures ? 1 : 0);
}

void main();
