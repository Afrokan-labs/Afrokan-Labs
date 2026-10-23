/**
 * pnpm launch:check — lists every TODO_ placeholder and every PLACEHOLDER-*
 * image used in src/content, every "[TO FILL" marker anywhere in src/
 * (content, pages and components), and every indexable page without its OG
 * image in public/og/, and exits 1 while any remain. Must pass on the launch
 * PR (architecture §11). Placeholders in WARN_ONLY are listed as warnings and
 * don't fail the check.
 *
 * Usage: tsx scripts/launch-check.ts [dir]   (default: src/content; [TO FILL is always checked in src/)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import {
  FALLBACK_OG_IMAGE,
  getIndexablePaths,
  getFallbackOgImage,
  getOgImage,
  ogImagePath,
} from "../src/lib/pages";

const root = process.argv[2] ?? join(process.cwd(), "src", "content");
// schema.ts defines the placeholder format; it isn't content.
const SKIP = new Set(["schema.ts"]);
const PLACEHOLDER = /TODO_[A-Z0-9_]+|PLACEHOLDER-[\w.-]+/g;
/** Known gaps that shouldn't block launch: reported, but the check still passes. */
const WARN_ONLY = new Set(["TODO_REPLACE_TEAM_PHOTO", "TODO_LEGAL_REVIEW"]);
/** Text left for a person to fill in, e.g. "[TO FILL: retention period]", anywhere in src/. */
const TO_FILL = /\[TO FILL[^\]]*\]?/g;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return SKIP.has(name) ? [] : [path];
  });
}

const scan = (paths: string[], pattern: RegExp) =>
  paths.flatMap((file) =>
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .flatMap((line, i) =>
        [...line.matchAll(pattern)].map((m) => ({
          where: `${relative(process.cwd(), file).replaceAll("\\", "/")}:${i + 1}`,
          token: m[0],
        })),
      ),
  );

const all = [
  ...scan(files(root), PLACEHOLDER),
  ...scan(files(join(process.cwd(), "src")), TO_FILL),
];
const found = all.filter((f) => !WARN_ONLY.has(f.token));
const warnings = all.filter((f) => WARN_ONLY.has(f.token));

const missingOg = getIndexablePaths()
  .filter((path) => !getOgImage(path))
  .map((path) => ({ where: `public${ogImagePath(path)}`, token: `OG image for ${path}` }));
// The fallback covers any page added later without its own image.
if (!getFallbackOgImage())
  missingOg.push({
    where: `public${FALLBACK_OG_IMAGE}`,
    token: "fallback OG image for every page",
  });

const problems = [...found, ...missingOg];

if (warnings.length) {
  const width = Math.max(...warnings.map((f) => f.where.length));
  console.warn(`launch:check warning: ${warnings.length} known gap(s), not blocking launch.
`);
  for (const f of warnings) console.warn(`  ${f.where.padEnd(width)}  ${f.token}`);
  console.warn("");
}

if (problems.length === 0) {
  console.log(
    "launch:check passed: no TODO_ facts or PLACEHOLDER- images in src/content, no [TO FILL markers in src/, and every OG image exists.",
  );
} else {
  const width = Math.max(...problems.map((f) => f.where.length));
  if (found.length) {
    console.error(
      `launch:check failed: ${found.length} placeholder(s) remain (TODO_ facts, PLACEHOLDER- images, [TO FILL markers).\n`,
    );
    for (const f of found) console.error(`  ${f.where.padEnd(width)}  ${f.token}`);
    console.error(
      "\nConfirm each fact and replace it, or remove the field. Replace each PLACEHOLDER- image with\n" +
        "the real photo (docs/design/handoff/NOTES-AND-ASSETS.md). See docs/BUILD_PLAN.md Phase 0.\n",
    );
  }
  if (missingOg.length) {
    console.error(`launch:check failed: ${missingOg.length} OG image(s) missing (1200×630 PNG).\n`);
    for (const f of missingOg) console.error(`  ${f.where.padEnd(width)}  ${f.token}`);
  }
  process.exit(1);
}
