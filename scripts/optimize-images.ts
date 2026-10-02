/**
 * pnpm images — converts every source image in assets/images/ into AVIF and
 * WebP at up to three widths (architecture §9) and writes a manifest with
 * dimensions for ResponsiveImage. Runs before `pnpm dev` and `pnpm build`.
 *
 * - Outputs go to public/images/ and the manifest to src/generated/; both
 *   are generated, not committed. Unchanged images are skipped.
 * - Metadata (EXIF, GPS) is stripped from every output.
 * - Exits 1 if any output is over 120 KB (CLAUDE.md performance budget).
 *
 * Source images must already be redacted before they enter the repo (§9).
 */
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const SRC_DIR = "assets/images";
const OUT_DIR = "public/images";
const MANIFEST = "src/generated/images.json";
const WIDTHS = [400, 800, 1200];
const MAX_BYTES = 120 * 1024;
const FORMATS = [
  { ext: "avif", type: "image/avif", encode: (s: sharp.Sharp) => s.avif({ quality: 50 }) },
  { ext: "webp", type: "image/webp", encode: (s: sharp.Sharp) => s.webp({ quality: 72 }) },
] as const;

export type ManifestEntry = {
  /** Intrinsic size of the source, for width/height attributes (no layout shift). */
  width: number;
  height: number;
  /** Fallback <img src>: the middle-width WebP. */
  fallback: string;
  sources: { type: "image/avif" | "image/webp"; srcSet: string }[];
};

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync("src/generated", { recursive: true });

  const sources = existsSync(SRC_DIR)
    ? readdirSync(SRC_DIR).filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
    : [];
  const manifest: Record<string, ManifestEntry> = {};
  const written = new Set<string>();
  const tooLarge: string[] = [];

  for (const file of sources) {
    const srcPath = join(SRC_DIR, file);
    const name = basename(file, extname(file));
    const meta = await sharp(srcPath).rotate().metadata();
    const srcWidth = meta.autoOrient?.width ?? meta.width!;
    const srcHeight = meta.autoOrient?.height ?? meta.height!;
    const widths = [...new Set([...WIDTHS.filter((w) => w < srcWidth), Math.min(srcWidth, 1200)])];
    const srcMtime = statSync(srcPath).mtimeMs;

    const entry: ManifestEntry = { width: srcWidth, height: srcHeight, fallback: "", sources: [] };
    for (const format of FORMATS) {
      const set: string[] = [];
      for (const w of widths) {
        const outName = `${name}-${w}.${format.ext}`;
        const outPath = join(OUT_DIR, outName);
        if (!existsSync(outPath) || statSync(outPath).mtimeMs < srcMtime) {
          await format.encode(sharp(srcPath).rotate().resize({ width: w })).toFile(outPath);
        }
        const bytes = statSync(outPath).size;
        if (bytes > MAX_BYTES) tooLarge.push(`${outPath} (${Math.round(bytes / 1024)} KB)`);
        written.add(outName);
        set.push(`/images/${outName} ${w}w`);
      }
      entry.sources.push({ type: format.type, srcSet: set.join(", ") });
    }
    const mid = widths[Math.floor((widths.length - 1) / 2)];
    entry.fallback = `/images/${name}-${mid}.webp`;
    manifest[`${SRC_DIR}/${file}`] = entry;
  }

  // Remove outputs whose source has gone.
  for (const f of readdirSync(OUT_DIR)) if (!written.has(f)) rmSync(join(OUT_DIR, f));

  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`images: ${sources.length} source(s), ${written.size} file(s) in ${OUT_DIR}/`);

  if (tooLarge.length) {
    console.error(
      `images: over the ${MAX_BYTES / 1024} KB per-image budget:\n  ${tooLarge.join("\n  ")}`,
    );
    console.error("Crop or resize the source, or lower the quality in scripts/optimize-images.ts.");
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
