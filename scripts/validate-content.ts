/**
 * pnpm content:validate — checks every content file against src/content/schema.ts
 * and compiles every MDX body, and checks any OG image already in public/og/.
 * Exits 1 on the first broken rule.
 */
import { ContentError, validateAllContent } from "../src/lib/content";
import { getIndexablePaths, getOgImage } from "../src/lib/pages";

async function main() {
  const s = await validateAllContent();
  // Throws on a file that isn't a 1200×630 PNG. Missing images are launch:check's job.
  const og = getIndexablePaths().filter((path) => getOgImage(path)).length;
  console.log(
    `Content valid: ${s.projects} project(s), ${s.published} published; ` +
      `${s.services} services, ${s.steps} process steps, ${s.teamMembers} team members; ` +
      `${og} OG image(s).`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof ContentError ? error.message : error);
  process.exit(1);
});
