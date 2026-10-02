import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getChromeProps } from "@/lib/chrome";
import { getSite } from "@/lib/content";

/**
 * Inner pages: the pill nav on the dark page, then the page, then the lime
 * footer. Pages here render <main id="main">, the skip link's target.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const chrome = getChromeProps();
  return (
    <>
      <SiteHeader {...chrome.header} siteName={getSite().name} />
      {children}
      <SiteFooter {...chrome.footer} />
    </>
  );
}
