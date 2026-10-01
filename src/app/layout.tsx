import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/grid.css";
import { site } from "@/content/site";

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
  metadataBase: new URL(site.url),
  title: site.name,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className={sans.variable}>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
