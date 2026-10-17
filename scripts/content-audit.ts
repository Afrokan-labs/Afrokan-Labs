/**
 * pnpm content:audit — traces every string in src/content to the document it
 * came from, for the final content audit (BUILD_PLAN 5.1).
 *
 * A string is traced when it appears in an approved doc, ignoring case,
 * punctuation styling and markdown. A "{name}" slot matches the doc's
 * "[Name]" prompt or the filled-in value. Strings found only in a draft that
 * awaits approval are listed as drafts; strings found nowhere are listed as
 * untraced. Paths, slugs and TODO_ placeholders are skipped (launch:check
 * covers placeholders).
 *
 * Informational: always exits 0. Read the lists before approving launch.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { about } from "../src/content/about";
import { caseStudy } from "../src/content/case-study";
import { contact } from "../src/content/contact";
import { home } from "../src/content/home";
import { privacy } from "../src/content/privacy";
import { services } from "../src/content/services";
import { site } from "../src/content/site";
import { solutions } from "../src/content/solutions";
import { members } from "../src/content/team";
import { testimonials } from "../src/content/testimonials";
import { tierCopy } from "../src/content/tiers";

/** Approved sources, then drafts awaiting approval (see each doc's status line). */
const APPROVED = [
  "docs/content/homepage-copy-v2.md",
  "docs/content/homepage-copy.md",
  "docs/content/homepage-strategy.md",
  "docs/content/case-studies/ese-logistics.md",
  "docs/content/README.md",
  "docs/design-system.md",
  "docs/content/privacy.md",
  "docs/content/contact.md",
];
const DRAFTS = ["docs/content/seo.md"];

const norm = (s: string) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** "Built for {client}." -> /built for .{1,80}?\./ */
function matcher(text: string): RegExp {
  const parts = norm(text).split(/\{[a-z]+\}/i);
  return new RegExp(parts.map(escape).join(".{1,80}?"));
}

const load = (files: string[]) =>
  files.map((file) => ({ file, text: norm(readFileSync(file, "utf8")) }));
const approved = load(APPROVED);
const drafts = load(DRAFTS);

const strings: { where: string; text: string }[] = [];
function collect(value: unknown, where: string) {
  if (typeof value === "string") strings.push({ where, text: value });
  else if (Array.isArray(value)) value.forEach((v, i) => collect(v, `${where}[${i}]`));
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) collect(v, where ? `${where}.${k}` : k);
}
collect(
  {
    site,
    home,
    about,
    services,
    solutions,
    members,
    testimonials,
    tiers: tierCopy,
    caseStudy,
    privacy,
    contact,
  },
  "",
);
const PROJECTS = join("src", "content", "projects");
for (const name of readdirSync(PROJECTS)) {
  const { data, content } = matter(readFileSync(join(PROJECTS, name), "utf8"));
  collect(data, `projects/${name}`);
  for (const block of content.split(/\n\s*\n/)) {
    for (const line of block.split("\n")) {
      const text = line.replace(/^\s*(#+|-|\d+\.)\s*/, "").trim();
      if (text) strings.push({ where: `projects/${name} (body)`, text });
    }
  }
}

const skip = (t: string) =>
  t.length < 3 ||
  t.startsWith("TODO_") ||
  /^(\/|#|https?:|mailto:|assets\/|\+)/.test(t) ||
  /^[a-z0-9-]+$/.test(t) || // slugs, kinds, enum values
  /^\d{4}-\d{2}(-\d{2})?$/.test(t); // dates

const traced: string[] = [];
const draft: string[] = [];
const untraced: string[] = [];
for (const s of strings) {
  // approvedBy records who approved the copy; it is never shown.
  if (skip(s.text) || s.where.endsWith(".approvedBy")) continue;
  const re = matcher(s.text);
  const line = `${s.where}: ${s.text.length > 100 ? s.text.slice(0, 100) + "…" : s.text}`;
  const hit = approved.find((d) => re.test(d.text));
  if (hit) traced.push(line);
  else if (drafts.some((d) => re.test(d.text))) draft.push(line);
  else untraced.push(line);
}

console.log(`content:audit — ${traced.length} traced to approved docs.\n`);
console.log(`Drafts awaiting approval (${draft.length}):`);
for (const l of draft) console.log(`  ${l}`);
console.log(
  `\nUntraced: not in any doc; approve the wording or add it to a doc (${untraced.length}):`,
);
for (const l of untraced) console.log(`  ${l}`);
