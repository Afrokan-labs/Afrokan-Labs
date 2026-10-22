/**
 * pnpm lhci prints only the assertions that fail. This prints every page's
 * median-run performance score and LCP (the values `lhci assert` checks), the
 * LCP range across runs, the LCP element and its phases, so a passing page's
 * numbers show in the CI log too. In CI it also writes the table to the job
 * summary. Thresholds come from lighthouserc.json.
 *
 * Usage: tsx scripts/lhci-summary.ts   (after lhci collect and lhci upload)
 */
import { appendFileSync, existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

type Entry = { url: string; isRepresentativeRun: boolean; jsonPath: string };
type Item = Record<string, unknown>;
type Audit = { numericValue?: number; details?: { items?: Item[] } };
type Lhr = {
  requestedUrl: string;
  categories: { performance: { score: number } };
  audits: Record<string, Audit>;
};

const dir = join(process.cwd(), ".lighthouseci");
const manifestPath = join(dir, "manifest.json");
if (!existsSync(manifestPath)) {
  console.error("No .lighthouseci/manifest.json: run lhci collect and lhci upload first.");
  process.exit(1);
}

const rc = JSON.parse(readFileSync("lighthouserc.json", "utf8"));
const minScore: number = rc.ci.assert.assertions["categories:performance"][1].minScore;
const maxLcp: number = rc.ci.assert.assertions["largest-contentful-paint"][1].maxNumericValue;

const manifest: Entry[] = JSON.parse(readFileSync(manifestPath, "utf8"));
const read = (path: string): Lhr => JSON.parse(readFileSync(path, "utf8"));
const lcpOf = (lhr: Lhr) => lhr.audits["largest-contentful-paint"]?.numericValue ?? NaN;
const ms = (value: number) => `${Math.round(value)}`;

/** The LCP element audit holds two tables: the element, then its phases. */
function lcpDetails(lhr: Lhr) {
  const tables = (lhr.audits["largest-contentful-paint-element"]?.details?.items ?? []) as {
    items?: Item[];
  }[];
  const node = tables[0]?.items?.[0]?.node as { selector?: string } | undefined;
  const phases = Object.fromEntries(
    (tables[1]?.items ?? []).map((row) => [row.phase as string, row.timing as number]),
  );
  return { selector: node?.selector ?? "?", phases };
}

// Every run's LCP, from collect's raw results (upload's report names can
// collide within a second), for the range column.
const allRuns = new Map<string, number[]>();
for (const name of readdirSync(dir).filter((file) => /^lhr-\d+\.json$/.test(file))) {
  const lhr = read(join(dir, name));
  allRuns.set(lhr.requestedUrl, [...(allRuns.get(lhr.requestedUrl) ?? []), lcpOf(lhr)]);
}

const rows = manifest
  .filter((entry) => entry.isRepresentativeRun)
  .map((entry) => {
    const lhr = read(entry.jsonPath);
    const score = lhr.categories.performance.score;
    const lcp = lcpOf(lhr);
    const runs = allRuns.get(lhr.requestedUrl) ?? [];
    const metrics = lhr.audits.metrics?.details?.items?.[0] ?? {};
    const { selector, phases } = lcpDetails(lhr);
    return {
      page: new URL(lhr.requestedUrl).pathname,
      score: Math.round(score * 100),
      lcp,
      range: `${ms(Math.min(...runs))}–${ms(Math.max(...runs))}`,
      observedLcp: metrics.observedLargestContentfulPaint as number,
      phases,
      selector,
      pass: score >= minScore && lcp <= maxLcp,
    };
  })
  .sort((a, b) => a.page.localeCompare(b.page));

const header = [
  "Page",
  "Perf",
  "LCP (ms)",
  "LCP runs",
  "Observed LCP",
  "TTFB",
  "Load delay",
  "Load time",
  "Render delay",
  "LCP element",
  "Result",
];
const table = [
  header,
  ...rows.map((row) => [
    row.page,
    `${row.score}`,
    ms(row.lcp),
    row.range,
    ms(row.observedLcp),
    ms(row.phases["TTFB"] ?? NaN),
    ms(row.phases["Load Delay"] ?? NaN),
    ms(row.phases["Load Time"] ?? NaN),
    ms(row.phases["Render Delay"] ?? NaN),
    row.selector,
    row.pass ? "pass" : "FAIL",
  ]),
];

const widths = header.map((_, i) => Math.max(...table.map((cells) => cells[i].length)));
console.log(`\nLighthouse median runs (performance >= ${minScore * 100}, LCP <= ${maxLcp} ms):\n`);
for (const cells of table) console.log(cells.map((cell, i) => cell.padEnd(widths[i])).join("  "));

if (process.env.GITHUB_STEP_SUMMARY) {
  const md = [
    "### Lighthouse median runs",
    "",
    `| ${header.join(" | ")} |`,
    `|${header.map(() => " --- ").join("|")}|`,
    ...table.slice(1).map((cells) => `| ${cells.join(" | ")} |`),
    "",
  ];
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, md.join("\n"));
}
