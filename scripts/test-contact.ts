/**
 * pnpm test:contact — exercises functions/api/contact.ts without the network.
 * fetch() is replaced, so Turnstile and Resend answer from this script and
 * every request the function makes is checked. Exits 1 on any failure.
 */
import assert from "node:assert/strict";
import { autoReplyText, notificationText, onRequest } from "../functions/api/contact";

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
  fields: Record<string, string>,
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
    "valid post sends one email with a fixed subject and Reply-To",
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
      assert.equal(email.subject, "New message from the website contact form");
      assert.deepEqual(email.to, ["hello@afrokanlabs.com"]);
      assert.equal(email.from, "Afrokan Labs website <notify@notify.afrokanlabs.com>");
      assert.equal(email.reply_to, "test@example.com");
      assert.match(String(email.text), /Name: Test Person/);
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
      assert.match(String(reply.text), /within 24 hours/);
    },
  ],
  [
    "a WhatsApp number sets no Reply-To and gets no auto-reply",
    async () => {
      await post({ ...VALID, contact: "+233 00 000 0000" });
      assert.equal((sent[1].body as Record<string, unknown>).reply_to, undefined);
      assert.equal(sent.length, 2);
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
      const r = await post({ ...VALID, name: " ", contact: "123", message: "x".repeat(2001) });
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
    "the email body is plain text, input kept as typed",
    async () => {
      const text = notificationText({
        name: "<b>Ama</b>",
        contact: "a@b.co",
        message: "Line 1\nLine 2",
      });
      assert.match(text, /^Name: <b>Ama<\/b>\n/);
      assert.match(text, /Message:\nLine 1\nLine 2$/);
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
