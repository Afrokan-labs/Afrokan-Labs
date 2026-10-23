/**
 * pnpm test:contact-form — the /contact form in the built site (out/), in
 * headless Chrome (scripts/browser.ts). /api/contact is answered by this
 * script, and Turnstile is replaced by a stub that issues a token, so no
 * request leaves the machine. Exits 1 on any failure.
 *
 * Covers: client and server validation errors, the sending state, the success
 * message, Turnstile and server failures, focus and live regions.
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { contact } from "../src/content/contact";
import { launch, OUT, serve, sleep } from "./browser";

const copy = contact.form;
/** The text before the first {placeholder}: enough to recognise a message. */
const lead = (template: string) => template.split("{")[0].trim();

type Reply = { status: number; body: string; delay?: number };
let reply: Reply = { status: 200, body: JSON.stringify({ ok: true }) };
let posts = 0;
/** The raw body of the last post (multipart form data). */
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

async function main() {
  if (!existsSync(join(OUT, "contact.html")))
    throw new Error("out/contact.html not found. Run `pnpm build` first.");
  const server = await serve((req, res) => {
    if (req.method !== "POST" || req.url !== "/api/contact") return false;
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

  /** Opens /contact and focuses the form, which renders the (stub) Turnstile widget. */
  const load = async () => {
    posts = 0;
    await cdp.send("Page.navigate", { url: `${server.origin}/contact` });
    await until(`document.readyState === "complete" && !!document.querySelector("#cform")`);
    // Wait for hydration: React attaches its handlers before the focus engages the form.
    await until(
      `!!Object.keys(document.querySelector("#cform")).find((k) => k.startsWith("__react"))`,
    );
    await ev(`document.getElementById("c-name").focus()`);
    await until(`!!document.querySelector("[name=cf-turnstile-response]")`);
  };
  const fill = (values: { name: string; email: string; message: string }) =>
    ev(`(() => {
      const v = ${JSON.stringify(values)};
      document.getElementById("c-name").value = v.name;
      document.getElementById("c-email").value = v.email;
      document.getElementById("c-msg").value = v.message;
    })()`);
  const submit = () => ev(`document.querySelector(".c-submit").click()`);
  const active = () =>
    ev<string>(`(() => { const a = document.activeElement; return a.id || a.className; })()`);
  const invalid = () =>
    ev<string[]>(
      `["c-name", "c-email", "c-msg"].filter((id) => document.getElementById(id).getAttribute("aria-invalid") === "true")`,
    );

  const VALID = { name: "Ama Test", email: "ama@example.com", message: "We need a shop website." };

  const tests: [string, () => Promise<void>][] = [
    [
      "empty submit: every field flagged with its message, focus on Name, nothing posted",
      async () => {
        await load();
        await fill({ name: "", email: "", message: "" });
        await submit();
        await sleep(100);
        assert.deepEqual(await invalid(), ["c-name", "c-email", "c-msg"]);
        assert.equal(await ev(`document.getElementById("e-name").textContent`), copy.errors.name);
        assert.equal(await ev(`document.getElementById("e-email").textContent`), copy.errors.email);
        assert.equal(await ev(`document.getElementById("e-msg").textContent`), copy.errors.message);
        assert.equal(await active(), "c-name");
        assert.equal(posts, 0);
      },
    ],
    [
      "invalid email: only Email flagged and focused",
      async () => {
        await load();
        await fill({ ...VALID, email: "not-an-email" });
        await submit();
        await sleep(100);
        assert.deepEqual(await invalid(), ["c-email"]);
        assert.equal(await active(), "c-email");
        assert.equal(posts, 0);
      },
    ],
    [
      "server validation (422): the field is flagged and focused",
      async () => {
        await load();
        reply = {
          status: 422,
          body: JSON.stringify({ ok: false, errors: { contact: "invalid" } }),
        };
        await fill(VALID);
        await submit();
        await until(`document.getElementById("c-email").getAttribute("aria-invalid") === "true"`);
        assert.equal(await active(), "c-email");
        assert.equal(await ev(`document.getElementById("c-msg").value`), VALID.message);
      },
    ],
    [
      "success: Sending… while it posts, then the form is replaced by a focused confirmation",
      async () => {
        await load();
        reply = { status: 200, body: JSON.stringify({ ok: true }), delay: 600 };
        await fill(VALID);
        await submit();
        await sleep(100);
        assert.equal(await ev(`document.querySelector(".c-submit").disabled`), true);
        assert.equal(await ev(`document.querySelector(".c-submit").textContent`), copy.sending);
        await submit(); // a second click while sending must not post again
        await until(`!!document.querySelector(".c-done")`);
        assert.equal(posts, 1);
        assert.equal(await ev(`!!document.getElementById("cform")`), false);
        const text = await ev<string>(`document.querySelector(".c-done").textContent`);
        assert.match(text, /Thanks, Ama Test\./);
        assert.match(text, /ama@example\.com within 1 business day/);
        assert.equal(
          await ev(`!!document.querySelector('.c-done a[href^="https://wa.me/"]')`),
          true,
        );
        assert.equal(await active(), "c-done");
        assert.equal(await ev(`!!document.activeElement.closest("[aria-live]")`), true);
        assert.equal(
          await ev(`document.querySelector(".c-done h2").textContent`),
          `${copy.sent.title} ✓`,
        );
      },
    ],
    [
      "each detail is posted as its own field, with the page and where the visitor came from",
      async () => {
        await load();
        reply = { status: 200, body: JSON.stringify({ ok: true }) };
        await fill(VALID);
        await ev(`(() => {
          document.getElementById("c-company").value = "Test Shop Ltd";
          document.getElementById("c-phone").value = "024 000 0000";
          document.querySelectorAll(".c-chips input").forEach((c, i) => (c.checked = i < 2));
        })()`);
        await submit();
        await until(`!!document.querySelector(".c-done")`);
        const field = (name: string) =>
          [...posted.matchAll(new RegExp(`name="${name}"\\r\\n\\r\\n([^\\r]*)`, "g"))].map(
            (m) => m[1],
          );
        assert.deepEqual(field("message"), [VALID.message]);
        assert.deepEqual(field("company"), ["Test Shop Ltd"]);
        assert.deepEqual(field("phone"), ["024 000 0000"]);
        assert.deepEqual(field("need"), copy.needs.options.slice(0, 2));
        assert.deepEqual(field("page"), ["/contact"]);
      },
    ],
    [
      "on a phone, the success and error panels scroll into view",
      async () => {
        await cdp.send("Emulation.setDeviceMetricsOverride", {
          width: 390,
          height: 844,
          deviceScaleFactor: 1,
          mobile: true,
        });
        const inView = (sel: string) =>
          ev<boolean>(
            `(() => { const r = document.querySelector("${sel}").getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; })()`,
          );
        try {
          for (const [sel, r] of [
            [".c-alert", { status: 502, body: JSON.stringify({ ok: false, error: "failed" }) }],
            [".c-done", { status: 200, body: JSON.stringify({ ok: true }) }],
          ] as const) {
            await load();
            reply = r;
            await fill(VALID);
            await ev(`scrollTo(0, 0)`);
            await submit();
            await until(`!!document.querySelector("${sel}")`);
            await sleep(900); // smooth scrolling
            assert.ok(await inView(sel), `${sel} not in view`);
            assert.equal(await active(), sel.slice(1));
          }
          assert.equal(
            await ev(`document.querySelector(".c-done h2").textContent`),
            `${copy.sent.title} ✓`,
          );
        } finally {
          await cdp.send("Emulation.setDeviceMetricsOverride", {
            width: 1280,
            height: 900,
            deviceScaleFactor: 1,
            mobile: false,
          });
        }
      },
    ],
    [
      "server failure (502): fallback with WhatsApp and email links, focused, typing kept",
      async () => {
        await load();
        reply = { status: 502, body: JSON.stringify({ ok: false, error: "failed" }) };
        await fill(VALID);
        await submit();
        await until(`!!document.querySelector(".c-alert")`);
        const text = await ev<string>(`document.querySelector(".c-alert p").textContent`);
        assert.ok(text.startsWith(lead(copy.sendErrors.failed)), text);
        assert.equal(
          await ev(`!!document.querySelector('.c-alert a[href^="https://wa.me/"]')`),
          true,
        );
        assert.equal(
          await ev(`!!document.querySelector('.c-alert a[href="mailto:hello@afrokanlabs.com"]')`),
          true,
        );
        assert.equal(await active(), "c-alert");
        assert.equal(await ev(`!!document.activeElement.closest("[role=alert]")`), true);
        assert.equal(
          await ev(`document.querySelector(".c-alert h2").textContent`),
          copy.sendErrors.title,
        );
        assert.equal(await ev(`document.getElementById("c-name").value`), VALID.name);
        assert.equal(await ev(`document.getElementById("c-msg").value`), VALID.message);
        assert.equal(await ev(`document.querySelector(".c-submit").disabled`), false);
        assert.equal(await ev(`document.querySelector(".c-submit").textContent`), copy.submit);
      },
    ],
    [
      "unreadable reply (500, not JSON): the same server fallback",
      async () => {
        await load();
        reply = { status: 500, body: "Internal Server Error" };
        await fill(VALID);
        await submit();
        await until(`!!document.querySelector(".c-alert")`);
        const text = await ev<string>(`document.querySelector(".c-alert p").textContent`);
        assert.ok(text.startsWith(lead(copy.sendErrors.failed)), text);
      },
    ],
    [
      "Turnstile rejected (403): the verification message",
      async () => {
        await load();
        reply = { status: 403, body: JSON.stringify({ ok: false, error: "verification" }) };
        await fill(VALID);
        await submit();
        await until(`!!document.querySelector(".c-alert")`);
        const text = await ev<string>(`document.querySelector(".c-alert p").textContent`);
        assert.ok(text.startsWith(lead(copy.sendErrors.verification)), text);
        assert.equal(await ev(`document.getElementById("c-msg").value`), VALID.message);
      },
    ],
    [
      "Turnstile blocked (no token): the verification message, nothing posted",
      async () => {
        await load();
        await ev(
          `window.__token = ""; document.querySelector("[name=cf-turnstile-response]").value = ""`,
        );
        await fill(VALID);
        await submit();
        await until(`!!document.querySelector(".c-alert")`);
        const text = await ev<string>(`document.querySelector(".c-alert p").textContent`);
        assert.ok(text.startsWith(lead(copy.sendErrors.verification)), text);
        assert.equal(posts, 0);
      },
    ],
    [
      "an error clears when the visitor tries again",
      async () => {
        await load();
        reply = { status: 502, body: JSON.stringify({ ok: false, error: "failed" }) };
        await fill(VALID);
        await submit();
        await until(`!!document.querySelector(".c-alert")`);
        reply = { status: 200, body: JSON.stringify({ ok: true }) };
        await submit();
        await until(`!!document.querySelector(".c-done")`);
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
