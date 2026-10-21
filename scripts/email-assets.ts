/**
 * pnpm email:assets — renders the PNGs the emails and signatures load from
 * https://afrokanlabs.com/email/ (Gmail and Outlook block SVG):
 *
 *   logo-mark.png        the green "A" mark for the letterhead bar, 80 × 72 (2x)
 *   logo.png             the mark on a dark rounded tile for signatures, 176 × 176 (2x)
 *   icons/<platform>.png X, Instagram, LinkedIn: white logo on a dark rounded tile, 40 × 40 (2x)
 *
 * The dark tiles keep each image visible on light and dark mail backgrounds.
 * Sources: the LogoMark path and src/lib/social.ts. Run after changing either.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { SOCIAL_PLATFORMS } from "../src/lib/social";

const DIR = join(process.cwd(), "public", "email");
// tokens.css --c-0d0d0d, --c-94de57, --c-ffffff
const INK = "#0d0d0d";
const ACCENT = "#94de57";
const WHITE = "#ffffff";
const MARK =
  '<path d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922" fill="none" stroke="{colour}" stroke-width="165" stroke-linejoin="round"/>';

async function png(svg: string, file: string, width: number, height: number) {
  await sharp(Buffer.from(svg), { density: 384 })
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(join(DIR, file));
  console.log(`email:assets: ${file} (${width} × ${height})`);
}

async function main() {
  mkdirSync(join(DIR, "icons"), { recursive: true });

  await png(
    `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="72" viewBox="105 115 1100 990">${MARK.replace("{colour}", ACCENT)}</svg>`,
    "logo-mark.png",
    80,
    72,
  );

  // The mark at 60% of the tile, centred (its viewBox is 1100 × 990).
  await png(
    `<svg xmlns="http://www.w3.org/2000/svg" width="176" height="176" viewBox="0 0 176 176">
      <rect width="176" height="176" rx="28" fill="${INK}"/>
      <svg x="35.2" y="40.4" width="105.6" height="95.2" viewBox="105 115 1100 990">${MARK.replace("{colour}", ACCENT)}</svg>
    </svg>`,
    "logo.png",
    176,
    176,
  );

  // Every logo at the same size: its 24 × 24 box scaled to 24px, centred on a 40px tile.
  for (const p of SOCIAL_PLATFORMS)
    await png(
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
        <rect width="40" height="40" rx="9" fill="${INK}"/>
        <svg x="8" y="8" width="24" height="24" viewBox="0 0 24 24"><path d="${p.path}" fill="${WHITE}"/></svg>
      </svg>`,
      `icons/${p.key}.png`,
      40,
      40,
    );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
