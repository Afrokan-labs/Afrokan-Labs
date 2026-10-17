import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 15 ships in the legacy format; FlatCompat adapts it.
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  { ignores: [".next/**", "out/**", ".wrangler/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // The site handoff's pages link with plain <a>: every page is its own
    // document with its own stylesheet and scripts, and SiteScripts fades the
    // page out before the browser navigates (reference "page transition").
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
];

export default config;
