/**
 * The pages search engines should index, and their Open Graph images
 * (architecture §8). One list feeds the sitemap, content:validate and
 * launch:check. Server-side, build time only.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getProjects } from "./content";

/** Every OG image is one static, designed PNG at this size. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** Paths of the indexable pages. /work and case studies only exist with a visible project. */
export function getIndexablePaths(): string[] {
  const projects = getProjects();
  return [
    "/",
    ...(projects.length ? ["/work", ...projects.map((p) => `/work/${p.slug}`)] : []),
    "/privacy",
  ];
}

/** "/" -> "/og/home.png", "/work/ese-logistic" -> "/og/work-ese-logistic.png". */
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
