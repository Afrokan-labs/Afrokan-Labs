import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "@/styles/tokens.css";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Afrokan Labs | Websites, AI assistants and business software in Ghana",
    template: "%s | Afrokan Labs",
  },
  description: site.description,
  openGraph: {
    title: "Afrokan Labs",
    description: "Websites, AI assistants and business software for Ghanaian businesses.",
    url: site.url,
    siteName: site.name,
    locale: "en_GH",
    type: "website",
  },
};

export const viewport: Viewport = {
  // Keep in sync with --color-black in styles/tokens.css.
  themeColor: "#0B0B0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#top" className="skip-link">
          Skip to content
        </a>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
