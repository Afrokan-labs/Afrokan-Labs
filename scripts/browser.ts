/**
 * Shared by the browser checks (pnpm a11y, pnpm test:contact-form): a static
 * server for out/ and headless Chrome driven over the DevTools protocol (no
 * browser library). Set CHROME_PATH if Chrome isn't in a standard location.
 */
import { type ChildProcess, spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import { extname, join } from "node:path";

export const OUT = join(process.cwd(), "out");
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ----- Static server for out/ (same lookup as Cloudflare Pages: /work -> work.html) -----
// A page requested with ?nojs is sent with a CSP that blocks its scripts, so a
// check sees the server-rendered first frame. DevTools evaluation still works.

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

/** Answers a request the static files can't, such as POST /api/contact. Returns true if it did. */
export type ApiHandler = (req: IncomingMessage, res: ServerResponse) => boolean;

export function serve(api?: ApiHandler): Promise<{ origin: string; close: () => void }> {
  const server = createServer((req, res) => {
    if (api?.(req, res)) return;
    const url = new URL(req.url ?? "/", "http://x");
    const headers = url.searchParams.has("nojs")
      ? { "content-security-policy": "script-src 'none'" }
      : {};
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith("/")) path += "index.html";
    for (const candidate of [path, `${path}.html`]) {
      const file = join(OUT, candidate);
      if (file.startsWith(OUT) && existsSync(file) && extname(file)) {
        res.writeHead(200, {
          ...headers,
          "content-type": TYPES[extname(file)] ?? "application/octet-stream",
        });
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

export type Cdp = {
  send: <T = Record<string, unknown>>(method: string, params?: object) => Promise<T>;
  /** Evaluates an expression in the page and returns its value. */
  ev: <T>(expression: string) => Promise<T>;
  key: (key: "Tab" | "Enter" | "Escape", shift?: boolean) => Promise<void>;
  close: () => void;
};

export async function launch(): Promise<Cdp> {
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
