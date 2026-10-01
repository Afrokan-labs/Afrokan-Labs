import type { NextConfig } from "next";

/**
 * Cloudflare Pages preview builds get their own URL, which can't be set as a
 * fixed dashboard variable. Cloudflare provides it as CF_PAGES_URL during the
 * build, so previews fall back to it. Production (branch main) never falls
 * back: a missing NEXT_PUBLIC_SITE_URL fails the build (src/lib/env.ts).
 */
const isCloudflarePreview = process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH !== "main";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || (isCloudflarePreview ? process.env.CF_PAGES_URL : undefined);

const nextConfig: NextConfig = {
  output: "export",
  // Static export has no image server; images go through scripts/optimize-images.ts instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  // A stray lockfile in the home folder otherwise makes Next guess the wrong workspace root.
  outputFileTracingRoot: __dirname,
  ...(siteUrl ? { env: { NEXT_PUBLIC_SITE_URL: siteUrl } } : {}),
};

export default nextConfig;
