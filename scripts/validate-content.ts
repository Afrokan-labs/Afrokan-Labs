/**
 * pnpm content:validate — checks every content file against src/content/schema.ts
 * and compiles every MDX body, and checks any OG image already in public/og/.
 * Exits 1 on the first broken rule.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ANALYTICS_ENDPOINT_ORIGIN, ANALYTICS_SCRIPT } from "../src/lib/analytics";
import { ContentError, validateAllContent } from "../src/lib/content";
import { getIndexablePaths, getOgImage } from "../src/lib/pages";

async function main() {
  const s = await validateAllContent();
  checkCspAllowsAnalytics();
  // Throws on a file that isn't a 1200×630 PNG. Missing images are launch:check's job.
  const og = getIndexablePaths().filter((path) => getOgImage(path)).length;
  console.log(
    `Content valid: ${s.projects} project(s), ${s.published} published; ` +
      `${s.services} services, ${s.steps} process steps, ${s.teamMembers} team members; ` +
      `${og} OG image(s).`,
  );
}

/** public/_headers must allow the origins src/lib/analytics.ts loads from and sends to. */
function checkCspAllowsAnalytics() {
  const headers = readFileSync(join(process.cwd(), "public", "_headers"), "utf8");
  const csp = headers.match(/Content-Security-Policy:(.*)/)?.[1] ?? "";
  const directive = (name: string) =>
    csp
      .split(";")
      .map((d) => d.trim().split(/\s+/))
      .find(([n]) => n === name) ?? [];
  const missing = [
    ["script-src", new URL(ANALYTICS_SCRIPT).origin],
    ["connect-src", ANALYTICS_ENDPOINT_ORIGIN],
  ].filter(([name, origin]) => !directive(name).includes(origin));
  if (missing.length)
    throw new Error(
      "public/_headers: the CSP must allow the analytics origins in src/lib/analytics.ts: " +
        missing.map(([name, origin]) => `${name} ${origin}`).join(", "),
    );
}

main().catch((error: unknown) => {
  console.error(error instanceof ContentError ? error.message : error);
  process.exit(1);
});
