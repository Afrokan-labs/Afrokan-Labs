/**
 * pnpm content:validate — checks every content file against src/content/schema.ts
 * and compiles every MDX body. Exits 1 on the first broken rule.
 */
import { ContentError, validateAllContent } from "../src/lib/content";

async function main() {
  const s = await validateAllContent();
  console.log(
    `Content valid: ${s.projects} project(s), ${s.published} published; ` +
      `${s.services} services, ${s.steps} process steps, ${s.teamMembers} team members.`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof ContentError ? error.message : error);
  process.exit(1);
});
