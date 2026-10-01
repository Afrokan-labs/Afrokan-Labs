/**
 * pnpm launch:check — lists every TODO_ placeholder in src/content and exits 1
 * while any remain. Must pass on the launch PR (architecture §11).
 *
 * Usage: tsx scripts/launch-check.ts [dir]   (default: src/content)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? join(process.cwd(), "src", "content");
// schema.ts defines the placeholder format; it isn't content.
const SKIP = new Set(["schema.ts"]);
const PLACEHOLDER = /TODO_[A-Z0-9_]+/g;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return files(path);
    return SKIP.has(name) ? [] : [path];
  });
}

const found = files(root).flatMap((file) =>
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .flatMap((line, i) =>
      [...line.matchAll(PLACEHOLDER)].map((m) => ({
        where: `${relative(process.cwd(), file).replaceAll("\\", "/")}:${i + 1}`,
        token: m[0],
      })),
    ),
);

if (found.length === 0) {
  console.log("launch:check passed: no TODO_ placeholders in src/content.");
} else {
  const width = Math.max(...found.map((f) => f.where.length));
  console.error(`launch:check failed: ${found.length} TODO_ placeholder(s) remain.\n`);
  for (const f of found) console.error(`  ${f.where.padEnd(width)}  ${f.token}`);
  console.error(
    "\nConfirm each fact and replace it, or remove the field. See docs/BUILD_PLAN.md Phase 0.",
  );
  process.exit(1);
}
