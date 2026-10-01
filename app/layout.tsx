import type { Metadata, Viewport } from "next";
import "@fontsource-variable/sora";
import "./globals.css";
import { site } from "@/site.config";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Afrokan Labs | Websites, AI assistants and business software in Ghana",
  description:
    "Afrokan Labs builds websites, AI chatbots and backend systems for businesses in Ghana, and next, across Africa.",
  openGraph: {
    title: "Afrokan Labs",
    description: "Websites, AI assistants and business software for Ghanaian businesses.",
    url: site.url,
    siteName: "Afrokan Labs",
    locale: "en_GH",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
