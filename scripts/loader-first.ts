/**
 * Runs after `next build`. Moves each exported page's stylesheets from <head> to
 * just after the page loader, at the top of <body>.
 *
 * A stylesheet in <head> blocks every paint until it arrives. On a slow
 * connection that means nothing can show before the DOM is ready, so the loader
 * would hide without ever being seen (Slow 3G: first paint 5.6s, DOM ready 5.57s).
 * In <body>, a stylesheet only holds back what comes after it: the loader paints
 * at once, and the page still waits for its CSS, so there's no unstyled flash.
 * The page's inline scripts wait for it too, so DOM ready still means styled.
 * Run on a fresh export: it expects Next's links to still be in <head>.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const STYLESHEET = /<link rel="stylesheet" href="[^"]+\.css"[^>]*\/>/g;

function pages(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return e.name === "_next" ? [] : pages(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

let moved = 0;
for (const file of pages(OUT)) {
  const html = readFileSync(file, "utf8");
  const headEnd = html.indexOf("</head>");
  const loader = html.indexOf('id="afk-loader"');
  const hideEnd = loader === -1 ? -1 : html.indexOf("</script>", loader);
  // Every page has the loader (root layout); fail rather than ship it unseen.
  if (headEnd === -1 || hideEnd === -1) throw new Error(`No page loader in ${file}`);
  const head = html.slice(0, headEnd);
  const links = head.match(STYLESHEET);
  if (!links) continue;
  const at = hideEnd + "</script>".length;
  // Found in <body>, a stylesheet is fetched after the scripts. A preload in <head>
  // keeps its top priority without blocking paint (Slow 3G: 3s sooner to DOM ready).
  const preloads = links.map((link) =>
    link.replace(/<link rel="stylesheet" (href="[^"]+").*/, '<link rel="preload" as="style" $1/>'),
  );
  const start = preloads.join("");
  writeFileSync(
    file,
    head.replace(STYLESHEET, "").replace("<head>", `<head>${start}`) +
      html.slice(headEnd, at) +
      links.join("") +
      html.slice(at),
  );
  moved++;
}
console.log(`loader-first: moved the stylesheets below the loader on ${moved} page(s).`);
