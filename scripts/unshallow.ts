/**
 * First step of pnpm build. Cloudflare Pages builds from a shallow clone, where
 * getLastModified (src/lib/pages.ts) can't date pages and the sitemap drops
 * <lastmod>. This fetches the full history first. Any failure (no remote, no
 * credentials, no git) is ignored: the build goes on and lastmod is omitted.
 */
import { execFileSync } from "node:child_process";

const git = (...args: string[]) =>
  execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();

try {
  if (git("rev-parse", "--is-shallow-repository") === "true") {
    git("fetch", "--unshallow", "--quiet");
    // A fetch with nothing to fetch from can exit 0 and leave the clone shallow.
    if (git("rev-parse", "--is-shallow-repository") === "true") throw new Error("still shallow");
    console.log("unshallow: fetched full git history for sitemap <lastmod>");
  }
} catch (e) {
  const reason = (e as { stderr?: string }).stderr?.trim() || (e as Error).message;
  console.warn(`unshallow: skipped (${reason.split("\n")[0]}); sitemap <lastmod> will be omitted`);
}
