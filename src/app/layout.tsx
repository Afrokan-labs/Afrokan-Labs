import type { Metadata } from "next";
import { Instrument_Serif, Lexend } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/tokens.css";
import "@/styles/site.css";
import { Footer } from "@/components/site/Footer";
import { WaSprite } from "@/components/site/LogoMark";
import { LOADER_HEAD, PageLoader } from "@/components/site/PageLoader";
import { SiteScripts } from "@/components/site/SiteScripts";
import { THEME_INIT, ThemeToggle } from "@/components/site/ThemeToggle";
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
// "Listen ✦ Build ✦ Support" and the 01–05 badges: only digits and those
// letters, so an 11 KB subset (src/lib/fonts.ts) instead of the 51 KB latin file.
// Licence: src/app/fonts/Unbounded-OFL.txt.
const unbounded = localFont({
  src: "./fonts/unbounded-subset.woff2",
  weight: "700 800",
  display: "swap",
  preload: false,
  variable: "--nf-unbounded",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});
// Footer "GET IN TOUCH" and "© 2026 AFROKAN LABS" (800, normal width), plus the
// home page's plain h2s (400 and 600 at font-stretch 125%). Each weight is used
// at one width only, so these are static instances cut from Google Fonts'
// variable latin Archivo with fontTools (~14 KB each, against 90 KB for the
// variable file); a page downloads only the weights it uses. 400 and 600 are
// the 125%-wide cuts. Licence: src/app/fonts/Archivo-OFL.txt.
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-400-125.woff2", weight: "400" },
    { path: "./fonts/archivo-600-125.woff2", weight: "600" },
    { path: "./fonts/archivo-800-100.woff2", weight: "800" },
  ],
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
  // favicon.ico is linked by Next's file convention (src/app/). Setting icons
  // here drops the convention's icon.svg link, so the SVG is listed again. The
  // touch icon lives in public/ so iOS also finds it at its default path.
  // Raster icons: pnpm icons (scripts/icons.ts).
  icons: {
    icon: { url: "/icon.svg", type: "image/svg+xml" },
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script may set data-site-theme before React hydrates.
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        {/* "js" before first paint: pages that enhance after hydration (the
            stepped contact form) lay out their enhanced shape from the start,
            so nothing shifts when React takes over. */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }}
        />
        <script dangerouslySetInnerHTML={{ __html: LOADER_HEAD }} />
      </head>
      <body>
        <PageLoader />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <main id="main">{children}</main>
        <Footer />
        <WaSprite />
        <ThemeToggle />
        <SiteScripts />
      </body>
    </html>
  );
}
