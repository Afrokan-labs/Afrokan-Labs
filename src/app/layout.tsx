import type { Metadata } from "next";
import "@fontsource-variable/sora";
import "@/styles/tokens.css";
import "./globals.css";
import { site } from "@/content/site";

// Per-page titles, descriptions and Open Graph tags come in BUILD_PLAN 3.3.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
