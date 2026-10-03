/**
 * pnpm content:validate — checks every content file against src/content/schema.ts
 * and compiles every MDX body, and checks any OG image already in public/og/.
 * Exits 1 on the first broken rule.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ANALYTICS_ENDPOINT_ORIGIN, ANALYTICS_SCRIPT } from "../src/lib/analytics";
import { TURNSTILE_ORIGIN } from "../src/lib/contact-fields";
import { ContentError, getHome, validateAllContent } from "../src/lib/content";
import { UNBOUNDED_GLYPHS } from "../src/lib/fonts";
import { getIndexablePaths, getOgImage } from "../src/lib/pages";

async function main() {
  const s = await validateAllContent();
  checkCsp();
  checkWideFontCoversWords();
  // Throws on a file that isn't a 1200×630 PNG. Missing images are launch:check's job.
  const og = getIndexablePaths().filter((path) => getOgImage(path)).length;
  console.log(
    `Content valid: ${s.projects} project(s), ${s.published} published; ` +
      `${s.services} services, ${s.steps} process steps, ${s.teamMembers} team members; ` +
      `${og} OG image(s).`,
  );
}

/**
 * public/_headers: every CSP must allow the origins src/lib/analytics.ts loads
 * from and sends to, and only /contact may allow Turnstile (architecture §13).
 */
function checkCsp() {
  const headers = readFileSync(join(process.cwd(), "public", "_headers"), "utf8");
  // path -> CSP, e.g. "/*" -> "default-src 'self'; ..."
  const csps = new Map<string, string>();
  let path = "";
  for (const line of headers.split(/\r?\n/)) {
    if (/^\S/.test(line) && !line.startsWith("#")) path = line.trim();
    const csp = line.match(/^\s+Content-Security-Policy:(.*)/)?.[1];
    if (csp) csps.set(path, csp);
  }
  const allows = (csp: string, name: string, origin: string) =>
    csp
      .split(";")
      .map((d) => d.trim().split(/\s+/))
      .some(([n, ...values]) => n === name && values.includes(origin));

  const problems: string[] = [];
  const need = (path: string, name: string, origin: string, wanted: boolean) => {
    const csp = csps.get(path);
    if (csp === undefined) problems.push(`no CSP for ${path}`);
    else if (allows(csp, name, origin) !== wanted)
      problems.push(`${path}: ${name} must ${wanted ? "" : "not "}allow ${origin}`);
  };
  for (const path of ["/*", "/contact"]) {
    need(path, "script-src", new URL(ANALYTICS_SCRIPT).origin, true);
    need(path, "connect-src", ANALYTICS_ENDPOINT_ORIGIN, true);
  }
  need("/contact", "script-src", TURNSTILE_ORIGIN, true);
  need("/contact", "frame-src", TURNSTILE_ORIGIN, true);
  need("/*", "script-src", TURNSTILE_ORIGIN, false);
  if (problems.length) throw new Error(`public/_headers CSP:\n  ${problems.join("\n  ")}`);
}

/** The words line is drawn in the Unbounded subset; every character must be in it. */
function checkWideFontCoversWords() {
  const missing = [...new Set(getHome().words.items.join("").replace(/\s/g, ""))].filter(
    (ch) => !UNBOUNDED_GLYPHS.includes(ch),
  );
  if (missing.length)
    throw new Error(
      `src/content/home.ts words: "${missing.join("")}" not in the Unbounded subset. ` +
        "Regenerate src/app/fonts/unbounded-subset.woff2 (see src/lib/fonts.ts).",
    );
}

main().catch((error: unknown) => {
  console.error(error instanceof ContentError ? error.message : error);
  process.exit(1);
});
