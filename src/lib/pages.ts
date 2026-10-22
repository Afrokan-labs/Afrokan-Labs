/**
 * The pages search engines should index, and their Open Graph images
 * (architecture §8). One list feeds the sitemap, content:validate and
 * launch:check. Server-side, build time only.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Every OG image is one static, designed PNG at this size. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Paths of the indexable pages: the site handoff's routes (afrokan-site-handoff/CLAUDE.md "Routes"). */
export function getIndexablePaths(): string[] {
  return [
    "/",
    "/about",
    "/services",
    "/solutions",
    "/work",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ];
}

/**
 * The files each indexable page's content comes from: its route and the
 * content it renders. Shared chrome (layout, nav, footer, site.ts, styles) is
 * left out, so a footer tweak doesn't re-date every page in the sitemap.
 */
const PAGE_SOURCES: Record<string, string[]> = {
  "/": ["src/app/(home)", "src/content/home.ts", "src/content/team.ts", "src/content/projects"],
  "/about": ["src/app/(site)/about", "src/content/about.ts", "src/content/team.ts"],
  "/services": ["src/app/(site)/services", "src/content/services.ts", "src/content/packages.ts"],
  "/solutions": [
    "src/app/(site)/solutions",
    "src/content/solutions.ts",
    "src/content/industries.ts",
  ],
  "/work": ["src/app/(site)/work", "src/content/work.ts"],
  "/insights": ["src/app/(site)/insights", "src/content/articles.ts"],
  "/contact": ["src/app/(site)/contact", "src/content/contact.ts"],
  "/privacy": ["src/app/(site)/privacy", "src/content/legal.ts"],
  "/terms": ["src/app/(site)/terms", "src/content/legal.ts"],
};

/**
 * When the page's content last changed: the newest commit touching its
 * sources, as an ISO date. Undefined in a shallow clone (every page would get
 * the latest commit's date) or without git, so the sitemap omits it rather
 * than state a wrong date.
 */
export function getLastModified(pagePath: string): string | undefined {
  const sources = PAGE_SOURCES[pagePath];
  if (!sources) throw new Error(`No PAGE_SOURCES entry for ${pagePath} (src/lib/pages.ts).`);
  try {
    const git = (...args: string[]) =>
      execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (git("rev-parse", "--is-shallow-repository") !== "false") return undefined;
    return git("log", "-1", "--format=%cI", "--", ...sources) || undefined;
  } catch {
    return undefined;
  }
}

/** "/" -> "/og/home.png", "/privacy" -> "/og/privacy.png". */
export function ogImagePath(pagePath: string): string {
  const name = pagePath === "/" ? "home" : pagePath.slice(1).replaceAll("/", "-");
  return `/og/${name}.png`;
}

/**
 * The page's OG image, or undefined until its PNG is added to public/og/.
 * A file that isn't a 1200×630 PNG stops the build with a message naming it.
 */
export function getOgImage(pagePath: string) {
  const url = ogImagePath(pagePath);
  const file = join(process.cwd(), "public", url);
  if (!existsSync(file)) return undefined;

  const size = pngSize(readFileSync(file));
  if (!size || size.width !== OG_SIZE.width || size.height !== OG_SIZE.height) {
    const found = size ? `${size.width}×${size.height}` : "not a PNG";
    throw new Error(
      `public${url}: OG images must be ${OG_SIZE.width}×${OG_SIZE.height} PNGs (found ${found}).`,
    );
  }
  return { url, ...OG_SIZE, type: "image/png" };
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Width and height from a PNG's IHDR chunk, which always comes first. */
function pngSize(buf: Buffer) {
  if (buf.length < 24 || !buf.subarray(0, 8).equals(PNG_SIGNATURE)) return undefined;
  if (buf.toString("ascii", 12, 16) !== "IHDR") return undefined;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
