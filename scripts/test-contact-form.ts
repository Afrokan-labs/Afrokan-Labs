/**
 * pnpm test:contact-form — the /contact form in the built site (out/), in
 * headless Chrome (scripts/browser.ts). /api/contact is answered by this
 * script, and Turnstile is replaced by a stub that issues a token, so no
 * request leaves the machine. Exits 1 on any failure.
 *
 * Covers the stepped form (contact form update, 2026-11-25): all five
 * questions, Back keeping values, each step's validation, Enter advancing,
 * "Not sure yet", focus on each new question, Send's loading, success and
 * error states, the thank-you screen, and the stacked form without JavaScript.
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contact } from "../src/content/contact";
import { launch, OUT, serve, sleep } from "./browser";

const copy = contact.form;
const [NEED_A, NEED_B] = copy.needs.options;
const NOT_SURE = copy.needs.options.at(-1)!;
const GOAL = copy.goal.options[1];

type Reply = { status: number; body: string; delay?: number };
let reply: Reply = { status: 200, body: JSON.stringify({ ok: true }) };
let posts = 0;
/** The raw body of the last post (multipart or urlencoded form data). */
let posted = "";

/** Stands in for Turnstile: a widget that writes a token, which the test can withhold. */
const TURNSTILE_STUB = `
  window.__token = "test-token";
  window.turnstile = {
    render(el) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "cf-turnstile-response";
      input.value = window.__token;
      el.append(input);
      return "stub";
    },
    reset() {
      document.querySelectorAll("[name=cf-turnstile-response]").forEach((i) => (i.value = window.__token));
    },
    remove() {},
  };`;

/** The posted values of one field, from a multipart body. */
const field = (name: string) =>
  [...posted.matchAll(new RegExp(`name="${name}"\\r\\n\\r\\n([^\\r]*)`, "g"))].map((m) => m[1]);

async function main() {
  if (!existsSync(join(OUT, "contact.html")))
    throw new Error("out/contact.html not found. Run `pnpm build` first.");
  const server = await serve((req, res) => {
    if (req.method !== "POST" || !req.url?.startsWith("/api/contact")) return false;
    posts++;
    posted = "";
    req.on("data", (chunk: Buffer) => (posted += chunk.toString()));
    req.on("end", () =>
      setTimeout(() => {
        const json = reply.body.startsWith("{");
        res.writeHead(reply.status, {
          "content-type": json ? "application/json" : "text/plain",
        });
        res.end(reply.body);
      }, reply.delay ?? 0),
    );
    return true;
  });
  const cdp = await launch();
  // Without window focus, headless Chrome fires no focus events, and the form engages on focus.
  await cdp.send("Emulation.setFocusEmulationEnabled", { enabled: true });
  await cdp.send("Network.enable");
  await cdp.send("Network.setBlockedURLs", { urls: ["*challenges.cloudflare.com*"] });
  await cdp.send("Page.addScriptToEvaluateOnNewDocument", { source: TURNSTILE_STUB });

  const ev = cdp.ev;
  const until = async (expression: string, ms = 3000) => {
    const start = Date.now();
    while (!(await ev<boolean>(expression))) {
      if (Date.now() - start > ms) throw new Error(`timed out waiting for ${expression}`);
      await sleep(50);
    }
  };

  // ----- Helpers -----
  const visible = `document.querySelector(".c-step:not([hidden])")`;
  /** Which question shows (0–4), or -1 when none does (the thank-you screen). */
  const step = () =>
    ev<number>(`[...document.querySelectorAll(".c-step")].findIndex((s) => !s.hidden)`);
  const load = async () => {
    posts = 0;
    reply = { status: 200, body: JSON.stringify({ ok: true }) };
    await cdp.send("Page.navigate", { url: `${server.origin}/contact` });
    await until(`document.readyState === "complete" && !!document.querySelector("#cform")`);
    // Hydrated and enhanced. Not the band's "Question 1 of 5": the server renders
    // that too (so nothing shifts), so it doesn't mean React has taken over yet.
    await until(`document.getElementById("cform").classList.contains("is-enhanced")`);
  };
  const pick = (label: string) =>
    ev(
      `[...document.querySelectorAll(".c-step:not([hidden]) .c-opt")].find((b) => b.textContent.trim() === ${JSON.stringify(label)}).click()`,
    );
  const pressed = () =>
    ev<string[]>(
      `[...document.querySelectorAll(".c-step:not([hidden]) .c-opt[aria-pressed=true]")].map((b) => b.textContent.trim())`,
    );
  const next = () => ev(`${visible}.querySelector(".c-cta").click()`);
  /** Types into a field the way a person does: the value, then an input event. */
  const type = (id: string, value: string) =>
    ev(`(() => {
      const el = document.getElementById(${JSON.stringify(id)});
      el.value = ${JSON.stringify(value)};
      el.dispatchEvent(new Event("input", { bubbles: true }));
    })()`);
  const error = () => ev<string>(`${visible}.querySelector(".c-err")?.textContent ?? ""`);
  const invalid = () =>
    ev<string[]>(`[...document.querySelectorAll("[aria-invalid=true]")].map((el) => el.id)`);
  const active = () => ev<string>(`document.activeElement.id || document.activeElement.className`);
  const sendButton = () =>
    ev<{ cls: string; text: string; disabled: string | null }>(
      `(() => { const b = document.querySelectorAll(".c-step")[4].querySelector(".c-cta"); return { cls: b.className, text: b.textContent.trim(), disabled: b.getAttribute("aria-disabled") }; })()`,
    );
  /** Answers questions 1 to 4 and lands on question 5 with the Turnstile token in place. */
  const toReach = async (name = "Ama Test") => {
    await pick(NEED_A);
    await next();
    await pick(GOAL);
    await next();
    await type("c-msg", "We lose orders in our chats.");
    await next();
    await type("c-name", name);
    await type("c-company", "Test Shop Ltd");
    await next();
    await until(`!!document.querySelector("[name=cf-turnstile-response]")`);
  };

  const tests: [string, () => Promise<void>][] = [
    [
      "all five questions, then Sending… (locked), Sent, and the thank-you screen",
      async () => {
        await load();
        assert.equal(await ev(`document.querySelector(".c-count").textContent`), "Question 1 of 5");
        // The honeypot has a name autofill doesn't recognise ("website" got filled in for real visitors).
        assert.equal(await ev(`!!document.querySelector("#cform [name=website]")`), false);
        assert.equal(
          await ev(
            `document.querySelector("#cform [name=afk_hp_check]").getAttribute("autocomplete")`,
          ),
          "off",
        );
        // ...and it isn't rendered at all (inside a `hidden` element), so nothing autofills it.
        assert.equal(
          await ev(`(() => {
            const hp = document.querySelector("#cform [name=afk_hp_check]");
            return !!hp.closest("[hidden]") && hp.offsetParent === null && hp.getClientRects().length === 0;
          })()`),
          true,
        );
        // The <head> script's "js" class survives hydration, so Continue really shows.
        assert.equal(await ev(`document.documentElement.classList.contains("js")`), true);
        assert.equal(await ev(`!!${visible}.querySelector(".c-next").offsetParent`), true);
        await toReach();
        assert.equal(await step(), 4);
        assert.equal(await ev(`document.querySelector(".c-count").textContent`), "Question 5 of 5");
        assert.equal(
          await ev(`document.querySelector(".c-hint").textContent`),
          copy.timeHints.late,
        );
        await type("c-phone", "024 000 0000");
        await type("c-email", "ama@example.com");
        reply = { status: 200, body: JSON.stringify({ ok: true }), delay: 600 };
        await next();
        await sleep(150);
        let b = await sendButton();
        assert.match(b.cls, /is-loading/);
        assert.equal(b.text, copy.send.loading);
        assert.equal(b.disabled, "true");
        assert.equal(await ev(`document.getElementById("c-email").disabled`), true);
        assert.equal(
          await ev(`document.querySelector(".c-back").getAttribute("aria-disabled")`),
          "true",
        );
        await next(); // a second click while sending must not post again
        await until(
          `document.querySelectorAll(".c-step")[4].querySelector(".c-cta").classList.contains("is-success")`,
        );
        b = await sendButton();
        assert.equal(b.text, copy.send.success);
        await until(`!!document.querySelector(".c-thanks")`, 3000);
        assert.equal(posts, 1);
        assert.equal(await step(), -1);
        assert.equal(
          await ev(`document.querySelector(".c-thanks h2").textContent`),
          "Thanks, Ama!",
        );
        assert.equal(await active(), "c-h-done");
        assert.match(
          await ev<string>(`document.querySelector(".c-thanks p").textContent`),
          /reply on WhatsApp or by email within 1 business day\./,
        );
        assert.equal(await ev(`document.querySelector(".c-count").textContent`), copy.done);
        // Each detail is posted as its own field.
        assert.deepEqual(field("name"), ["Ama Test"]);
        assert.deepEqual(field("contact"), ["ama@example.com"]);
        assert.deepEqual(field("phone"), ["024 000 0000"]);
        assert.deepEqual(field("need"), [NEED_A]);
        assert.deepEqual(field("goal"), [GOAL]);
        assert.deepEqual(field("company"), ["Test Shop Ltd"]);
        assert.deepEqual(field("page"), ["/contact"]);
        // The unrendered honeypot is still posted, empty.
        assert.deepEqual(field("afk_hp_check"), [""]);
        // The WhatsApp button carries the summary.
        const href = await ev<string>(`document.querySelector(".c-thanks a.c-cta").href`);
        const text = decodeURIComponent(new URL(href).searchParams.get("text") ?? "");
        assert.ok(href.startsWith("https://wa.me/233596069011?text="), href);
        assert.equal(
          text,
          `Hi Afrokan Labs, I’m Ama Test from Test Shop Ltd. I just sent a request on your website.\nI need: ${NEED_A}\nMain goal: ${GOAL}`,
        );
      },
    ],
    [
      "Send another request: back to question 1, empty",
      async () => {
        await ev(`document.querySelector(".c-thanks .c-link").click()`);
        await until(`!document.querySelector(".c-thanks")`);
        assert.equal(await step(), 0);
        assert.deepEqual(await pressed(), []);
        assert.equal(await ev(`document.getElementById("c-name").value`), "");
        assert.equal(await active(), "c-h-0");
      },
    ],
    [
      "each question's validation message, on Continue only",
      async () => {
        await load();
        await next();
        assert.equal(await error(), copy.errors.needs);
        assert.equal(await step(), 0);
        await pick(NEED_A); // choosing clears it
        assert.equal(await error(), "");
        await next();
        await next();
        assert.equal(await error(), copy.errors.goal);
        await pick(GOAL);
        await next();
        // Question 3 is optional: "Skip this question" until there's text.
        assert.equal(await ev(`${visible}.querySelector(".c-cta").textContent`), copy.skip);
        await type("c-msg", "Hi");
        assert.equal(await ev(`${visible}.querySelector(".c-cta").textContent`), copy.next);
        await type("c-msg", "");
        await next();
        assert.equal(await step(), 3);
        await type("c-name", "   ");
        await next();
        assert.equal(await error(), copy.errors.name);
        assert.deepEqual(await invalid(), ["c-name"]);
        await type("c-name", "Ama");
        assert.equal(await error(), "");
        await next();
        await next();
        assert.equal(await error(), copy.errors.reach);
        assert.deepEqual(await invalid(), ["c-phone", "c-email"]);
        await type("c-phone", "123");
        await next();
        assert.equal(await error(), copy.errors.phone);
        assert.deepEqual(await invalid(), ["c-phone"]);
        await type("c-phone", "");
        await type("c-email", "not-an-email");
        await next();
        await until(`!!${visible}.querySelector(".c-err")`);
        assert.equal(await error(), copy.errors.email);
        assert.deepEqual(await invalid(), ["c-email"]);
        assert.equal(posts, 0);
      },
    ],
    [
      "Back keeps every answer",
      async () => {
        await load();
        await toReach();
        await ev(`document.querySelector(".c-back").click()`);
        assert.equal(await step(), 3);
        assert.equal(await ev(`document.getElementById("c-name").value`), "Ama Test");
        await ev(`document.querySelector(".c-back").click()`);
        assert.equal(
          await ev(`document.getElementById("c-msg").value`),
          "We lose orders in our chats.",
        );
        await ev(`document.querySelector(".c-back").click()`);
        assert.deepEqual(await pressed(), [GOAL]);
        await ev(`document.querySelector(".c-back").click()`);
        assert.deepEqual(await pressed(), [NEED_A]);
        // No Back on question 1: the logo is in its place.
        assert.equal(await ev(`!!document.querySelector(".c-back")`), false);
        assert.equal(await ev(`!!document.querySelector(".c-mark")`), true);
      },
    ],
    [
      '"Not sure yet" clears the others, and choosing another clears it',
      async () => {
        await load();
        await pick(NEED_A);
        await pick(NEED_B);
        assert.deepEqual(await pressed(), [NEED_A, NEED_B]);
        await pick(NOT_SURE);
        assert.deepEqual(await pressed(), [NOT_SURE]);
        await pick(NEED_B);
        assert.deepEqual(await pressed(), [NEED_B]);
      },
    ],
    [
      "Enter in a field goes to the next question, and focus moves to its heading",
      async () => {
        await load();
        await pick(NEED_A);
        await next();
        assert.equal(await active(), "c-h-1");
        await pick(GOAL);
        await next();
        await next();
        assert.equal(await step(), 3);
        await type("c-name", "Ama");
        await ev(`document.getElementById("c-name").focus()`);
        await cdp.key("Enter");
        await sleep(100);
        assert.equal(await step(), 4);
        assert.equal(await active(), "c-h-4");
        assert.equal(posts, 0);
      },
    ],
    [
      "server failure (502): the error state and status, everything kept; editing resets it",
      async () => {
        await load();
        await toReach();
        await type("c-email", "ama@example.com");
        reply = { status: 502, body: JSON.stringify({ ok: false, error: "failed" }) };
        await next();
        await until(
          `document.querySelectorAll(".c-step")[4].querySelector(".c-cta").classList.contains("is-error")`,
        );
        const b = await sendButton();
        assert.equal(b.text, copy.send.error);
        assert.equal(b.disabled, null);
        assert.equal(
          await ev(`document.querySelector(".c-status").textContent`),
          copy.send.errorStatus,
        );
        assert.equal(
          await ev(`document.querySelector(".c-status").getAttribute("role")`),
          "status",
        );
        assert.equal(await ev(`document.getElementById("c-email").value`), "ama@example.com");
        assert.equal(await ev(`document.getElementById("c-name").value`), "Ama Test");
        await type("c-email", "ama@example.org");
        assert.equal((await sendButton()).cls, "c-cta");
        // And a retry goes through.
        reply = { status: 200, body: JSON.stringify({ ok: true }) };
        await next();
        await until(`!!document.querySelector(".c-thanks")`);
      },
    ],
    [
      "unreadable reply (500, not JSON): the same error state",
      async () => {
        await load();
        await toReach();
        await type("c-phone", "024 000 0000");
        reply = { status: 500, body: "Internal Server Error" };
        await next();
        await until(
          `document.querySelectorAll(".c-step")[4].querySelector(".c-cta").classList.contains("is-error")`,
        );
      },
    ],
    [
      "server validation (422 on contact): question 5's message",
      async () => {
        await load();
        await toReach();
        await type("c-phone", "024 000 0000");
        reply = {
          status: 422,
          body: JSON.stringify({ ok: false, errors: { contact: "invalid" } }),
        };
        await next();
        await until(`!!${visible}.querySelector(".c-err")`);
        assert.equal(await step(), 4);
        assert.equal(await error(), copy.errors.reach);
        assert.equal((await sendButton()).cls, "c-cta");
      },
    ],
    [
      "Turnstile blocked (no token): the verification message, nothing posted",
      async () => {
        await load();
        await toReach();
        await ev(
          `window.__token = ""; document.querySelector("[name=cf-turnstile-response]").value = ""`,
        );
        await type("c-email", "ama@example.com");
        await next();
        await until(`document.querySelector(".c-status").textContent.length > 0`);
        const text = await ev<string>(`document.querySelector(".c-status").textContent`);
        assert.ok(text.startsWith(copy.verification.split("{")[0].trim()), text);
        assert.equal(
          await ev(`!!document.querySelector('.c-status a[href="mailto:hello@afrokanlabs.com"]')`),
          true,
        );
        assert.equal(posts, 0);
      },
    ],
    [
      "phone only: the thank-you screen says WhatsApp",
      async () => {
        await load();
        await toReach("Kofi");
        await type("c-phone", "024 000 0000");
        await next();
        await until(`!!document.querySelector(".c-thanks")`);
        assert.match(
          await ev<string>(`document.querySelector(".c-thanks p").textContent`),
          /reply on WhatsApp within/,
        );
        assert.deepEqual(field("contact"), [""]);
      },
    ],
    [
      "without JavaScript: every question stacked in one form with one submit, posting natively",
      async () => {
        posts = 0;
        await cdp.send("Page.navigate", { url: `${server.origin}/contact?nojs` });
        await until(`document.readyState === "complete" && !!document.querySelector("#cform")`);
        const shape = await ev<{
          hidden: number;
          steps: number;
          submits: number;
          method: string;
          action: string;
        }>(`(() => {
          const f = document.getElementById("cform");
          return {
            hidden: f.querySelectorAll(".c-step[hidden]").length,
            steps: f.querySelectorAll(".c-step").length,
            // Continue buttons exist but are hidden without JavaScript: only Send shows.
            submits: [...f.querySelectorAll("button[type=submit]")].filter((b) => b.offsetParent).length,
            method: f.method,
            action: new URL(f.action).pathname,
          };
        })()`);
        assert.deepEqual(shape, {
          hidden: 0,
          steps: 5,
          submits: 1,
          method: "post",
          action: "/api/contact",
        });
        await ev(`(() => {
          document.querySelector('input[name=need][value="${NEED_B}"]').checked = true;
          document.querySelector('input[name=goal][value="${GOAL}"]').checked = true;
          document.getElementById("c-name").value = "Ama";
          document.getElementById("c-phone").value = "024 000 0000";
          document.querySelector("#cform .c-cta:not(.c-next)").click();
        })()`);
        // The post comes from the browser's own form submission, not fetch().
        const start = Date.now();
        while (!posts && Date.now() - start < 3000) await sleep(50);
        assert.equal(posts, 1);
        const params = new URLSearchParams(posted);
        assert.equal(params.get("need"), NEED_B);
        assert.equal(params.get("goal"), GOAL);
        assert.equal(params.get("name"), "Ama");
        assert.equal(params.get("phone"), "024 000 0000");
        assert.equal(params.get("page"), "/contact");
      },
    ],
  ];

  let failures = 0;
  try {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 1280,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    for (const [name, run] of tests) {
      try {
        await run();
        process.stdout.write(`  ok    ${name}\n`);
      } catch (error) {
        failures++;
        process.stdout.write(`  FAIL  ${name}\n${(error as Error).message}\n`);
      }
    }
  } finally {
    cdp.close();
    server.close();
  }
  process.stdout.write(
    failures
      ? `test:contact-form: ${failures} failed\n`
      : `test:contact-form: ${tests.length} passed\n`,
  );
  process.exit(failures ? 1 : 0);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
