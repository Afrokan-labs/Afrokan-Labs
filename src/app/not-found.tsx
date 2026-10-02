import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TextLink } from "@/components/primitives/TextLink";
import { getChromeProps } from "@/lib/chrome";
import { getSite } from "@/lib/content";
import styles from "./not-found.module.css";

const copy = getSite().ui.notFound;

export const metadata: Metadata = {
  title: copy.title,
  robots: { index: false, follow: false },
};

/**
 * Exported as 404.html. It sits outside the (site) route group, so it adds the
 * site header and footer itself.
 */
export default function NotFound() {
  const chrome = getChromeProps();
  return (
    <>
      <SiteHeader {...chrome.header} />
      <main id="main" className={`container ${styles.page}`}>
        <h1>{copy.title}</h1>
        <p className={styles.body}>{copy.body}</p>
        <TextLink standalone arrow href="/">
          {copy.link}
        </TextLink>
      </main>
      <SiteFooter {...chrome.footer} />
    </>
  );
}
