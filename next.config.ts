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

/**
 * Previews also fall back to Turnstile's published test site key (always
 * passes), so they need no dashboard variable. Production never falls back:
 * a missing or test key fails the build (src/lib/env.ts).
 */
const TURNSTILE_TEST_SITE_KEY = "1x00000000000000000000AA";
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (isCloudflarePreview ? TURNSTILE_TEST_SITE_KEY : undefined);

const env = {
  ...(siteUrl ? { NEXT_PUBLIC_SITE_URL: siteUrl } : {}),
  ...(turnstileSiteKey ? { NEXT_PUBLIC_TURNSTILE_SITE_KEY: turnstileSiteKey } : {}),
};

const nextConfig: NextConfig = {
  output: "export",
  // Static export has no image server; images go through scripts/optimize-images.ts instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  // A stray lockfile in the home folder otherwise makes Next guess the wrong workspace root.
  outputFileTracingRoot: __dirname,
  env,
};

export default nextConfig;
