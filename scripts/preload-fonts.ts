/**
 * Runs after `next build`. Makes sure every exported page preloads the fonts
 * next/font marked for preloading (files named *.p.woff2).
 *
 * Next normally adds these links itself. On Windows it doesn't: its font
 * manifest plugin looks for "/next-font-loader/index.js?" in module paths,
 * which use backslashes there, so the manifest stays empty and no preload is
 * emitted (Next 15.5). On Linux (CI, Cloudflare) the links already exist and
 * this does nothing, so both builds ship the same HTML.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const MEDIA = join(OUT, "_next", "static", "media");

const fonts = readdirSync(MEDIA)
  .filter((f) => /\.p\.woff2$/.test(f))
  .map((f) => `/_next/static/media/${f}`);

function pages(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : pages(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

let added = 0;
for (const file of pages(OUT)) {
  const html = readFileSync(file, "utf8");
  const missing = fonts.filter((href) => !html.includes(`href="${href}"`));
  if (!missing.length) continue;
  const links = missing
    .map((href) => `<link rel="preload" href="${href}" as="font" crossorigin="" type="font/woff2"/>`)
    .join("");
  writeFileSync(file, html.replace(/<head>/, `<head>${links}`));
  added++;
}
if (added) console.log(`preload-fonts: added ${fonts.length} font preload(s) to ${added} page(s).`);
