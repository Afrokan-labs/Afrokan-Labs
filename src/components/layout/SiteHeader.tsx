import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import type { ChromeProps } from "@/lib/chrome";
import { MenuSheet } from "./MenuSheet";
import styles from "./SiteHeader.module.css";

type Props = ChromeProps["header"] & {
  siteName: string;
  /** Inside the homepage hero card (reference .x-hero) rather than on the dark page. */
  inCard?: boolean;
};

/**
 * The black pill nav (reference .x-nav): two links, the logo, two links.
 * At 900px and below only the logo and a lime "Menu" pill show; the menu
 * holds the links and the WhatsApp CTA.
 */
export function SiteHeader({ siteName, skipLink, links, menuCta, labels, inCard }: Props) {
  const left = links.slice(0, Math.ceil(links.length / 2));
  const right = links.slice(left.length);
  const side = (items: typeof links) => (
    <ul className={styles.side}>
      {items.map((l) => (
        <li key={l.href}>
          <a href={l.href} className={styles.link}>
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={inCard ? styles.inCard : styles.onPage}>
      <a href={`#${skipLink.target}`} className="skip-link">
        {skipLink.label}
      </a>
      <nav className={styles.nav} aria-label={labels.nav}>
        {side(left)}
        <Link href="/" className={styles.logo} aria-label={labels.home}>
          <Logo name={siteName} />
        </Link>
        {side(right)}
        <MenuSheet siteName={siteName} links={links} cta={menuCta} labels={labels} />
      </nav>
    </header>
  );
}
