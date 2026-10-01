import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/grid.css";
import { getSite } from "@/lib/content";
import { env } from "@/lib/env";

const site = getSite();

// Self-hosted at build time. The class on <body> redefines --font-sans as the font,
// its metric-matched fallback face, then the design doc's fallback stack.
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-sans",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

// Per-page titles, descriptions and Open Graph tags come in BUILD_PLAN 3.3.
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: site.name,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className={sans.variable}>{children}</body>
    </html>
  );
}
