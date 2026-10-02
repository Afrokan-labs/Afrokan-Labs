import type { Metadata } from "next";
import { Lexend, Unbounded } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/grid.css";
import { ANALYTICS_SCRIPT } from "@/lib/analytics";
import { getSite } from "@/lib/content";
import { env } from "@/lib/env";

const site = getSite();

// Self-hosted at build time as variable fonts (one file each). The classes on
// <body> redefine --font-sans and --font-wide as the font, its metric-matched
// fallback face, then the design doc's fallback stack.
const sans = Lexend({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-sans",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});

// Display words and step numerals only (design-system §3).
const wide = Unbounded({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-wide",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});

// Indexable pages set their own tags through pageMetadata() in src/lib/seo.ts.
// The template names the site on the rest (404, internal previews).
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: site.name, template: `%s | ${site.name}` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className={`${sans.variable} ${wide.variable}`}>
        {children}
        {/* Umami (architecture §7): cookieless, about 2 KB, deferred. Without an ID nothing loads. */}
        {env.NEXT_PUBLIC_ANALYTICS_ID && (
          <script defer src={ANALYTICS_SCRIPT} data-website-id={env.NEXT_PUBLIC_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}
