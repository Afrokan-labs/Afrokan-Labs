/**
 * pnpm a11y — accessibility checks against the built site in out/ (BUILD_PLAN 4.3).
 *
 * For every exported page, at 375px and 1280px:
 * - axe-core (all default rules) once the chat threads have settled, and again
 *   with the mobile menu open;
 * - a keyboard pass: the first Tab reaches the skip link, every Tab stop shows a
 *   visible focus indicator, every visible control is reachable, and the menu
 *   opens with Enter and closes with Escape, returning focus to its toggle.
 *
 * Drives headless Chrome over the DevTools protocol (no browser library).
 * Set CHROME_PATH if Chrome isn't in a standard location. Exits 1 on any failure.
 */
import { type ChildProcess, spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { extname, join, relative } from "node:path";

const OUT = join(process.cwd(), "out");
const WIDTHS = [375, 1280];
const AXE_SOURCE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ----- Static server for out/ (same lookup as Cloudflare Pages: /work -> work.html) -----

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".txt": "text/plain",
};

function serve(): Promise<{ origin: string; close: () => void }> {
  const server = createServer((req, res) => {
    let path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    for (const candidate of [path, `${path}.html`]) {
      const file = join(OUT, candidate);
      if (file.startsWith(OUT) && existsSync(file) && extname(file)) {
        res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
        return res.end(readFileSync(file));
      }
    }
    res.writeHead(404, { "content-type": TYPES[".html"] });
    res.end(readFileSync(join(OUT, "404.html")));
  });
  return new Promise((resolve) =>
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as AddressInfo;
      resolve({ origin: `http://127.0.0.1:${port}`, close: () => server.close() });
    }),
  );
}

/** Every exported page, as a URL path. */
function pagePaths(dir = OUT): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "_next" ? [] : pagePaths(full);
    if (!entry.name.endsWith(".html")) return [];
    const path =
      "/" +
      relative(OUT, full)
        .replaceAll("\\", "/")
        .replace(/\.html$/, "");
    return [path === "/index" ? "/" : path];
  });
}

// ----- Chrome over the DevTools protocol -----

function findChrome(): string {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  const found = candidates.find((c) => c && existsSync(c));
  if (!found) throw new Error("Chrome not found. Set CHROME_PATH to the Chrome executable.");
  return found;
}

type Cdp = {
  send: <T = Record<string, unknown>>(method: string, params?: object) => Promise<T>;
  /** Evaluates an expression in the page and returns its value. */
  ev: <T>(expression: string) => Promise<T>;
  key: (key: "Tab" | "Enter" | "Escape", shift?: boolean) => Promise<void>;
  close: () => void;
};

async function launch(): Promise<Cdp> {
  const profile = mkdtempSync(join(tmpdir(), "a11y-chrome-"));
  const chrome: ChildProcess = spawn(findChrome(), [
    "--headless=new",
    "--remote-debugging-port=0",
    "--no-first-run",
    "--disable-gpu",
    `--user-data-dir=${profile}`,
    ...(process.env.CI ? ["--no-sandbox"] : []),
    "about:blank",
  ]);
  // Chrome prints "DevTools listening on ws://..." on stderr once it's ready.
  const browserWs = await new Promise<string>((resolve, reject) => {
    let buffer = "";
    chrome.stderr?.on("data", (d: Buffer) => {
      buffer += d.toString();
      const m = buffer.match(/DevTools listening on (ws:\/\/\S+)/);
      if (m) resolve(m[1]);
    });
    chrome.on("exit", (code) => reject(new Error(`Chrome exited (${code}): ${buffer}`)));
  });
  const { port } = new URL(browserWs);
  const targets = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()) as {
    type: string;
    webSocketDebuggerUrl: string;
  }[];
  const ws = new WebSocket(targets.find((t) => t.type === "page")!.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  let nextId = 0;
  const pending = new Map<number, { resolve: (v: never) => void; reject: (e: Error) => void }>();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(String(e.data));
    const p = m.id && pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    if (m.error) p.reject(new Error(m.error.message));
    else p.resolve(m.result);
  });
  const send: Cdp["send"] = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve: resolve as (v: never) => void, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  const ev: Cdp["ev"] = async (expression) => {
    const r = await send<{
      result: { value: never };
      exceptionDetails?: { exception?: { description?: string }; text: string };
    }>("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails)
      throw new Error(r.exceptionDetails.exception?.description ?? r.exceptionDetails.text);
    return r.result.value;
  };
  const CODES = { Tab: 9, Enter: 13, Escape: 27 } as const;
  const key: Cdp["key"] = async (k, shift = false) => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key: k,
        code: k,
        windowsVirtualKeyCode: CODES[k],
        modifiers: shift ? 8 : 0,
        ...(k === "Enter" && type === "keyDown" ? { text: "\r" } : {}),
      });
    await sleep(60);
  };

  await send("Page.enable");
  await send("Runtime.enable");
  return {
    send,
    ev,
    key,
    close: () => {
      ws.close();
      chrome.kill();
      // Chrome can hold the profile briefly after exit; a leftover temp dir is harmless.
      setTimeout(() => {
        try {
          rmSync(profile, { recursive: true, force: true });
        } catch {
          // Still locked (EBUSY on Windows): leave it for the OS to clean.
        }
      }, 500).unref();
    },
  };
}

// ----- Checks -----

type AxeViolation = { id: string; impact: string; help: string; nodes: { target: string[] }[] };

/** Waits for every displayed chat thread to finish (ChatThread's data-state). */
const SETTLE = `new Promise((resolve) => {
  const start = Date.now();
  const tick = () => {
    const busy = [...document.querySelectorAll("[data-state]")]
      .some((el) => el.offsetParent && el.getAttribute("data-state") !== "complete");
    if (!busy || Date.now() - start > 8000) resolve(!busy); else setTimeout(tick, 100);
  };
  tick();
})`;

/**
 * Waits for finite animations to end (the body's fx-enter fade). Mid-fade, axe
 * measures blended colours and reports contrast failures the page doesn't have.
 * Infinite loops (hero burst, ticker) are left running.
 */
const ANIMATIONS_DONE = `Promise.race([
  Promise.all(document.getAnimations()
    .filter((a) => a.effect && a.effect.getComputedTiming().endTime !== Infinity)
    .map((a) => a.finished.catch(() => 0))),
  new Promise((r) => setTimeout(r, 3000)),
]).then(() => 0)`;

async function axe(cdp: Cdp): Promise<AxeViolation[]> {
  await cdp.ev(ANIMATIONS_DONE);
  if (!(await cdp.ev<boolean>("typeof window.axe === 'object'"))) await cdp.ev(AXE_SOURCE + ";0");
  return cdp.ev<AxeViolation[]>(
    `axe.run(document, { resultTypes: ["violations"] }).then((r) => r.violations.map((v) => ({
      id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.map((n) => ({ target: n.target })) })))`,
  );
}

/** Describes document.activeElement and whether its focus indicator is visible. */
const ACTIVE = `(() => {
  const a = document.activeElement;
  if (!a || a === document.body) return null;
  const c = getComputedStyle(a);
  const r = a.getBoundingClientRect();
  const label = (a.getAttribute("aria-label") || a.textContent || a.getAttribute("href") || a.tagName)
    .trim().replace(/\\s+/g, " ").slice(0, 40);
  if (!a.dataset.a11yId) a.dataset.a11yId = String(Math.random());
  // Focus is inside something we can't see into: an iframe, or a closed shadow
  // root (the host is then active although it isn't focusable itself), as with
  // Turnstile's widget on /contact. Its focus styles are the third party's.
  const opaque = a.tagName === "IFRAME" ||
    (a.tabIndex < 0 && !a.matches("a[href], button, input, select, textarea, [tabindex]"));
  return {
    id: a.dataset.a11yId,
    opaque,
    label: a.tagName.toLowerCase() + ' "' + label + '"',
    skipLink: a.classList.contains("skip-link"),
    // A field inside a pill-shaped box may draw its focus ring on the box (:focus-within).
    visibleRing: [a, a.parentElement].some((el) => {
      if (!el) return false;
      const s = getComputedStyle(el);
      return (s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2) || s.boxShadow !== "none";
    }),
    hasSize: r.width > 0 && r.height > 0,
  };
})()`;

type Active = {
  id: string;
  opaque: boolean;
  label: string;
  skipLink: boolean;
  visibleRing: boolean;
  hasSize: boolean;
};

/**
 * Visible, non-inert controls a keyboard user should be able to reach.
 * tabindex="-1" takes a control out of the Tab order on purpose (the contact
 * form's honeypot), so those don't count.
 */
const REACHABLE = `[...document.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]')]
  .filter((el) => el.tabIndex >= 0 && el.getClientRects().length && !el.closest("[inert], dialog:not([open])") && getComputedStyle(el).visibility !== "hidden")
  .map((el) => { if (!el.dataset.a11yId) el.dataset.a11yId = String(Math.random()); return el.dataset.a11yId; })`;

async function keyboard(cdp: Cdp, width: number): Promise<string[]> {
  const problems: string[] = [];
  const expected = await cdp.ev<string[]>(REACHABLE);
  const seen = new Map<string, Active>();
  const hidDuringPass = new Set<string>();

  // Extra presses leave room for Tab stops inside third-party frames.
  for (let i = 0; i < expected.length + 15; i++) {
    await cdp.key("Tab");
    const a = await cdp.ev<Active | null>(ACTIVE);
    const shown = new Set(await cdp.ev<string[]>(REACHABLE));
    for (const id of expected) if (!shown.has(id)) hidDuringPass.add(id);
    if (i === 0 && !a?.skipLink)
      problems.push(`first Tab reached ${a?.label ?? "nothing"}, not the skip link`);
    if (!a || a.opaque) continue;
    if (seen.has(a.id)) break; // wrapped around to the start
    seen.set(a.id, a);
    if (!a.visibleRing) problems.push(`no visible focus indicator on ${a.label}`);
    if (!a.hasSize) problems.push(`focus landed on an invisible element: ${a.label}`);
  }
  // A control that hid itself during the pass doesn't count: the sticky bar hides by
  // design once the footer scrolls into view, and the menu keeps the same CTA.
  const missed = expected.filter((id) => !seen.has(id) && !hidDuringPass.has(id));
  if (missed.length)
    problems.push(
      `${missed.length} visible control(s) not reachable with Tab: ` +
        (
          await cdp.ev<string[]>(
            `${JSON.stringify(missed)}.map((id) => document.querySelector('[data-a11y-id="' + id + '"]').outerHTML.slice(0, 80))`,
          )
        ).join(" | "),
    );

  // Mobile menu: Enter on the toggle opens it, Escape closes it and returns focus.
  if (
    width < 1024 &&
    (await cdp.ev<boolean>(`!!document.querySelector("[aria-controls=menu-sheet]")?.offsetParent`))
  ) {
    await cdp.ev(`document.querySelector("[aria-controls=menu-sheet]").focus()`);
    await cdp.key("Enter");
    await sleep(300);
    if (!(await cdp.ev<boolean>(`document.getElementById("menu-sheet").open`)))
      problems.push("Enter on the menu toggle didn't open the menu");
    await cdp.key("Escape");
    await sleep(300);
    const back = await cdp.ev<boolean>(
      `!document.getElementById("menu-sheet").open && document.activeElement?.getAttribute("aria-controls") === "menu-sheet"`,
    );
    if (!back) problems.push("Escape didn't close the menu and return focus to its toggle");
  }
  return problems;
}

async function main() {
  if (!existsSync(join(OUT, "index.html")))
    throw new Error("out/ not found. Run `pnpm build` first.");
  const server = await serve();
  const cdp = await launch();
  const failures: string[] = [];
  const paths = pagePaths().sort();

  try {
    for (const width of WIDTHS) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width,
        height: 800,
        deviceScaleFactor: 1,
        mobile: width < 1024,
      });
      for (const path of paths) {
        const where = `${path} @${width}px`;
        const load = async () => {
          await cdp.send("Page.navigate", { url: server.origin + path });
          await cdp.ev(
            `new Promise((r) => document.readyState === "complete" ? r(0) : addEventListener("load", () => r(0)))`,
          );
          await cdp.ev("document.fonts.ready.then(() => 0)");
          if (!(await cdp.ev<boolean>(SETTLE)))
            failures.push(`${where}: chat thread never finished`);
        };

        await load();
        for (const v of await axe(cdp))
          failures.push(
            `${where}: axe ${v.impact} ${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`,
          );

        const menuToggle = `document.querySelector("[aria-controls=menu-sheet]")`;
        if (await cdp.ev<boolean>(`!!${menuToggle}?.offsetParent`)) {
          await cdp.ev(`${menuToggle}.click()`);
          await sleep(300);
          for (const v of await axe(cdp))
            failures.push(`${where} (menu open): axe ${v.impact} ${v.id}: ${v.help}`);
        }

        await load();
        for (const p of await keyboard(cdp, width)) failures.push(`${where}: keyboard: ${p}`);
      }
    }
  } finally {
    cdp.close();
    server.close();
  }

  const checks = paths.length * WIDTHS.length;
  if (failures.length) {
    console.error(`a11y failed: ${failures.length} problem(s) across ${checks} page views.\n`);
    for (const f of failures) console.error(`  ${f}`);
    process.exit(1);
  }
  console.log(
    `a11y passed: ${paths.length} pages × ${WIDTHS.length} widths, axe clean, keyboard pass clean.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
