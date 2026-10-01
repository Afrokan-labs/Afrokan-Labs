import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Static export has no image server; images go through scripts/optimize-images.ts instead.
  images: { unoptimized: true },
  reactStrictMode: true,
  // A stray lockfile in the home folder otherwise makes Next guess the wrong workspace root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
