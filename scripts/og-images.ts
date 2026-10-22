/**
 * pnpm og [page ...] — renders the share images src/lib/pages.ts links:
 *
 *   public/og/<page>.png  one per indexable page: the logo, "Afrokan Labs" and the page's title
 *   public/og-image.png   the site-wide fallback: the homepage's line
 *
 * 1200 × 630, one layout, text inside a 60px safe area. With page paths
 * ("/", "/about") it renders only those, plus nothing else; with none, all of
 * them and the fallback. Run after changing a page title or the logo and
 * commit the PNGs.
 *
 * Why not Next's ImageResponse: it renders with Satori, which can't read the
 * woff2 fonts in src/app/fonts, and it would add a second og:image source per
 * route beside public/og/, which pages.ts checks at build time. This draws
 * the card as HTML in headless Chrome (scripts/browser.ts) with the site's
 * own Archivo files instead.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";
import {
  getAbout,
  getContactCopy,
  getHome,
  getInsights,
  getLegal,
  getServices,
  getSite,
  getSolutions,
  getWork,
} from "../src/lib/content";
import { FALLBACK_OG_IMAGE, getIndexablePaths, OG_SIZE, ogImagePath } from "../src/lib/pages";
import { launch } from "./browser";

// tokens.css --c-0d0d0d, --c-94de57, --c-ffffff, --c-a3a3a3, --c-1c1c1c (as in email-assets.ts)
const INK = "#0d0d0d";
const ACCENT = "#94de57";
const WHITE = "#ffffff";
const MUTE = "#a3a3a3";
const TRACE = "#1c1c1c";
// The LogoMark path (src/app/icon.svg).
const MARK_PATH = "M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922";
const mark = (colour: string, width: number) =>
  `<svg viewBox="105 115 1100 990" width="${width}" height="${(width * 990) / 1100}" aria-hidden="true"><path d="${MARK_PATH}" fill="none" stroke="${colour}" stroke-width="165" stroke-linejoin="round"/></svg>`;

const site = getSite();

/** Each page's metadata title, as pageMetadata receives it. */
const TITLES: Record<string, string> = {
  "/": getHome().meta.title,
  "/about": getAbout().meta.title,
  "/services": getServices().meta.title,
  "/solutions": getSolutions().meta.title,
  "/work": getWork().meta.title,
  "/insights": getInsights().meta.title,
  "/contact": getContactCopy().page.meta.title,
  "/privacy": getLegal().privacy.meta.title,
  "/terms": getLegal().terms.meta.title,
};

/** "Afrokan Labs: AI and software studio in Accra" -> "AI and software studio in Accra"; the card already names the site. */
const cardTitle = (title: string) => title.replace(new RegExp(`^${site.name}\\s*[:|–-]\\s*`), "");

const font = (file: string, weight: number, stretch: string) =>
  `@font-face{font-family:Archivo;font-weight:${weight};font-stretch:${stretch};src:url(data:font/woff2;base64,${readFileSync(
    join("src/app/fonts", file),
  ).toString("base64")}) format("woff2")}`;
const FONTS = [
  font("archivo-400-125.woff2", 400, "125%"),
  font("archivo-600-125.woff2", 600, "125%"),
  font("archivo-800-100.woff2", 800, "100%"),
].join("");

function card(title: string): string {
  // Long titles (the homepage line) step down so they stay on two lines inside the safe area.
  const size = title.length > 22 ? 76 : 108;
  return `<!doctype html><meta charset="utf-8"><style>${FONTS}
*{margin:0;box-sizing:border-box}
html,body{width:${OG_SIZE.width}px;height:${OG_SIZE.height}px;background:${INK};overflow:hidden}
body{position:relative;font-family:Archivo,sans-serif;color:${WHITE}}
.trace{position:absolute;right:-110px;bottom:-150px}
.safe{position:absolute;inset:60px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:22px;font-weight:600;font-stretch:125%;font-size:34px;letter-spacing:-0.01em}
.foot{display:flex;align-items:flex-end;justify-content:space-between;gap:40px}
.rule{width:72px;height:8px;background:${ACCENT};border-radius:4px;margin-bottom:30px}
h1{font-weight:800;font-size:${size}px;line-height:1.02;letter-spacing:-0.035em;max-width:880px}
.url{font-weight:400;font-stretch:125%;font-size:24px;color:${MUTE};white-space:nowrap;padding-bottom:6px}
</style>
<div class="trace">${mark(TRACE, 620)}</div>
<div class="safe">
  <div class="brand">${mark(WHITE, 64)}<span>${site.name}</span></div>
  <div class="foot">
    <div><div class="rule"></div><h1>${title}</h1></div>
    <div class="url">${site.domain}</div>
  </div>
</div>`;
}

async function main() {
  const all = getIndexablePaths();
  const asked = process.argv.slice(2);
  const unknown = asked.filter((p) => !all.includes(p));
  if (unknown.length) throw new Error(`Not an indexable page: ${unknown.join(", ")}`);

  const jobs = (asked.length ? asked : all).map((path) => {
    const title = TITLES[path];
    if (!title) throw new Error(`No title for ${path} in scripts/og-images.ts TITLES.`);
    return { file: `public${ogImagePath(path)}`, title: cardTitle(title) };
  });
  if (!asked.length)
    jobs.push({ file: `public${FALLBACK_OG_IMAGE}`, title: cardTitle(TITLES["/"]) });

  const cdp = await launch();
  try {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      ...OG_SIZE,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const { frameTree } = await cdp.send<{ frameTree: { frame: { id: string } } }>(
      "Page.getFrameTree",
    );
    for (const { file, title } of jobs) {
      await cdp.send("Page.setDocumentContent", { frameId: frameTree.frame.id, html: card(title) });
      await cdp.ev("document.fonts.ready.then(() => document.fonts.size)");
      const overflow = await cdp.ev<boolean>(
        "(() => { const s = document.querySelector('.safe').getBoundingClientRect(); return [...document.querySelectorAll('.safe *')].some(e => { const r = e.getBoundingClientRect(); return r.right > s.right + 0.5 || r.left < s.left - 0.5 || r.top < s.top - 0.5 || r.bottom > s.bottom + 0.5; }); })()",
      );
      if (overflow) throw new Error(`${file}: "${title}" doesn't fit inside the 60px safe area.`);
      const { data } = await cdp.send<{ data: string }>("Page.captureScreenshot", {
        format: "png",
        clip: { x: 0, y: 0, ...OG_SIZE, scale: 1 },
      });
      const png = await sharp(Buffer.from(data, "base64"))
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toBuffer();
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, png);
      console.log(`og: ${file} "${title}" (${(png.length / 1024).toFixed(0)} KB)`);
    }
  } finally {
    cdp.close();
  }
}

void main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
