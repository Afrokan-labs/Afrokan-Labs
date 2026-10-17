import type { Metadata } from "next";
import { Archivo, Instrument_Serif, Lexend, Unbounded } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/site.css";
import { Footer } from "@/components/site/Footer";
import { WaSprite } from "@/components/site/LogoMark";
import { SiteScripts } from "@/components/site/SiteScripts";
import { THEME_INIT, ThemeToggle } from "@/components/site/ThemeToggle";
import { ANALYTICS_SCRIPT } from "@/lib/analytics";
import { getSite } from "@/lib/content";
import { env } from "@/lib/env";

const site = getSite();

// The handoff's five families (brief "Fonts"), self-hosted at build time. Each
// sets a --nf-* variable on <html> that the page stylesheets use.
const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--nf-lexend",
  fallback: ["Segoe UI", "system-ui", "sans-serif"],
});
// "Innovate ✦ Inspire ✦ Create" and the 01–04 badges.
const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  preload: false,
  variable: "--nf-unbounded",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});
// Footer "GET IN TOUCH" and "© 2026 AFROKAN LABS", plus the home page's plain
// h2s (reference: Archivo at font-stretch 125%), so variable with its width axis.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
  variable: "--nf-archivo",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});
// The green italic "the" in the Services hero.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
  variable: "--nf-serif",
  fallback: ["Georgia", "serif"],
});

const fontVars = [lexend, unbounded, archivo, serif].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: site.name, template: `%s | ${site.name}` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script may set data-site-theme before React hydrates.
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
        <WaSprite />
        <ThemeToggle />
        <SiteScripts />
        {/* Umami (architecture §7): cookieless, about 2 KB, deferred. Without an ID nothing loads. */}
        {env.NEXT_PUBLIC_ANALYTICS_ID && (
          <script defer src={ANALYTICS_SCRIPT} data-website-id={env.NEXT_PUBLIC_ANALYTICS_ID} />
        )}
      </body>
    </html>
  );
}
