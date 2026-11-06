/**
 * pnpm a11y — accessibility checks against the built site in out/ (BUILD_PLAN 4.3).
 *
 * For every exported page, at 375px and 1280px:
 * - axe-core (all default rules) once the chat threads have settled, and again
 *   with the mobile menu open;
 * - a keyboard pass: the first Tab reaches the skip link, every Tab stop shows a
 *   visible focus indicator, every visible control is reachable, and the menu
 *   opens with Enter and closes with Escape, returning focus to its toggle;
 * - a first-frame pass with the page's scripts blocked: no text or image above
 *   the fold (the h1 and the LCP element included) may start at opacity 0, by
 *   a static opacity or an animation's first keyframe. A hero that fades in
 *   hides its first paint and delays LCP (CLAUDE.md component rule 5).
 *
 * Drives headless Chrome over the DevTools protocol (scripts/browser.ts).
 * Exits 1 on any failure.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { type Cdp, launch, OUT, serve, sleep } from "./browser";

const WIDTHS = [375, 1280];
const AXE_SOURCE = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

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
 * Waits for finite animations to end (the reveals' fades). Mid-fade, axe
 * measures blended colours and reports contrast failures the page doesn't have.
 * Infinite loops (hero burst, ticker) are left running.
 */
const ANIMATIONS_DONE = `Promise.race([
  Promise.all(document.getAnimations()
    .filter((a) => a.effect && a.effect.getComputedTiming().endTime !== Infinity)
    .map((a) => a.finished.catch(() => 0))),
  new Promise((r) => setTimeout(r, 3000)),
]).then(() => 0)`;

/**
 * Renders every block before axe runs. Below-the-fold sections use
 * content-visibility: auto, and axe treats skipped (unrendered) content as
 * hidden, so without this it would check only what is near the viewport.
 */
const RENDER_ALL = `(() => {
  if (document.getElementById("a11y-render-all")) return 0;
  const s = document.createElement("style");
  s.id = "a11y-render-all";
  s.textContent = "*{content-visibility:visible!important}";
  document.head.append(s);
  return 0;
})()`;

async function axe(cdp: Cdp): Promise<AxeViolation[]> {
  await cdp.ev(RENDER_ALL);
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

/**
 * Lists every text or image above the fold that starts invisible: it, or an
 * ancestor, has opacity 0 or an animation whose first keyframe has opacity 0.
 * Animations keep their keyframes after they finish, so timing doesn't matter.
 */
const HIDDEN_AT_START = `(() => {
  const label = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") +
    [...el.classList].map((c) => "." + c).join("");
  const hides = (el) => {
    const fading = el.getAnimations().find((a) => a.effect?.getKeyframes()
      .some((k) => k.offset === 0 && "opacity" in k && Number(k.opacity) === 0));
    if (fading) return "animation " + (fading.animationName ?? "") + " starts at opacity 0";
    return getComputedStyle(el).opacity === "0" ? "opacity: 0" : "";
  };
  const found = new Map();
  for (const el of document.body.querySelectorAll("*")) {
    // The page loader's logo starts hidden on purpose: it's decorative, not page content.
    if (el.closest("#afk-loader")) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1 || r.top >= innerHeight || r.bottom <= 0) continue;
    const content = /^(img|svg|video|canvas)$/i.test(el.tagName) ||
      [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!content) continue;
    for (let a = el; a && a !== document.documentElement; a = a.parentElement) {
      const why = hides(a);
      if (why) {
        const key = label(a) + " (" + why + ")";
        if (!found.has(key)) found.set(key, label(el));
        break;
      }
    }
  }
  return [...found].map(([el, child]) => el + " hides " + child);
})()`;

async function firstFrame(cdp: Cdp, url: string): Promise<string[]> {
  await cdp.send("Page.navigate", { url: url + "?nojs" });
  await cdp.ev(
    `new Promise((r) => document.readyState === "complete" ? r(0) : addEventListener("load", () => r(0)))`,
  );
  await cdp.ev("document.fonts.ready.then(() => 0)");
  return cdp.ev<string[]>(HIDDEN_AT_START);
}

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

        for (const p of await firstFrame(cdp, server.origin + path))
          failures.push(`${where}: above the fold, ${p}`);
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
    `a11y passed: ${paths.length} pages × ${WIDTHS.length} widths, axe clean, keyboard pass clean, nothing above the fold starts at opacity 0.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
