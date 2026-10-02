import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Button } from "@/components/primitives/Button";
import { getChromeProps } from "@/lib/chrome";
import { getSite } from "@/lib/content";
import styles from "./not-found.module.css";

const copy = getSite().ui.notFound;

// Next adds <meta name="robots" content="noindex"> to the 404 itself.
export const metadata: Metadata = { title: copy.title };

/**
 * Exported as 404.html. It sits outside the route groups, so it adds the
 * site header and footer itself.
 */
export default function NotFound() {
  const chrome = getChromeProps();
  return (
    <>
      <SiteHeader {...chrome.header} siteName={getSite().name} />
      <main id="main" className={`container ${styles.page}`}>
        <h1>{copy.title}</h1>
        <p className={styles.body}>{copy.body}</p>
        <Button href="/">{copy.link}</Button>
      </main>
      <SiteFooter {...chrome.footer} />
    </>
  );
}
