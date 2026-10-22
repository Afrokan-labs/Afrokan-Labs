/**
 * pnpm icons — renders the raster icons from src/app/icon.svg. Run it after
 * changing the logo and commit the outputs:
 *
 * - src/app/favicon.ico: 32 × 32 and 16 × 16 PNG entries, for browsers and
 *   tools that ask for /favicon.ico. Next links it in <head> (file convention).
 * - public/apple-touch-icon.png: 180 × 180, the logo on the icon's own solid
 *   background, square, since iOS draws its own rounded corners and shows
 *   transparency as black. Linked from metadata.icons.apple in the root layout.
 */
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const SVG = readFileSync("src/app/icon.svg", "utf8");
// The icon's background colour, read from its rounded rect.
const BACKGROUND = SVG.match(/<rect[^>]*fill="(#[0-9A-Fa-f]{6})"/)?.[1];
if (!BACKGROUND) throw new Error("icon.svg: no background fill on its <rect>");

const png = (svg: string, size: number) =>
  sharp(Buffer.from(svg), { density: (72 * size) / 64 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

/** An ICO file whose entries are PNGs (supported by every current browser and Windows). */
function ico(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  // 32 first: Next reads the first entry for the link's sizes attribute.
  const sizes = [32, 16];
  const favicon = ico(
    await Promise.all(sizes.map(async (size) => ({ size, data: await png(SVG, size) }))),
  );
  writeFileSync("src/app/favicon.ico", favicon);

  // Square corners and a full-bleed background; the logo keeps its proportions.
  const square = SVG.replace(/<rect([^>]*) rx="[^"]*"/, "<rect$1");
  writeFileSync(
    "public/apple-touch-icon.png",
    await sharp(await png(square, 180))
      .flatten({ background: BACKGROUND })
      .png({ compressionLevel: 9 })
      .toBuffer(),
  );

  console.log(
    `icons: src/app/favicon.ico (${sizes.join(", ")} px, ${favicon.length} B), public/apple-touch-icon.png (180 px)`,
  );
}

void main();
