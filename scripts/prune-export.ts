/**
 * Runs after `next build`. With no published project, architecture §4 says
 * /work and /work/* are not generated. Static export can't skip a dynamic
 * route, so the route renders a placeholder (see src/app/(site)/work/[slug])
 * and this removes it, along with the /work index, from out/.
 */
import { existsSync, rmSync } from "node:fs";
import { getProjects } from "../src/lib/content";

if (getProjects().length === 0) {
  // /work itself is a page of the handoff site now; only case-study pages go.
  for (const path of ["out/work"]) {
    if (existsSync(path)) rmSync(path, { recursive: true });
  }
  console.log("prune-export: no published project, so the case-study pages are not shipped.");
}
