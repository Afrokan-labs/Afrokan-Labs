import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { getChromeProps } from "@/lib/chrome";

/**
 * Shared header and footer for the site's pages. Pages here render
 * <main id="main">, the skip link's target.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const chrome = getChromeProps();
  return (
    <>
      <SiteHeader {...chrome.header} />
      {children}
      <SiteFooter {...chrome.footer} />
    </>
  );
}
