import Link from "next/link";
import { Wordmark } from "@/components/Mark";
import { Button } from "@/components/primitives/Button";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";
import { MenuSheet } from "./MenuSheet";
import styles from "./SiteHeader.module.css";

type Props = {
  siteName: string;
  skipLink: { label: string; target: string };
  links: { label: string; href: string }[];
  /** whatsappLink({ location: "header" }) for the desktop button. */
  headerCta: WhatsAppLinkProps;
  /** whatsappLink({ location: "menu" }) for the button pinned in the mobile menu. */
  menuCta: WhatsAppLinkProps;
  ctaLabel: string;
  labels: { nav: string; menu: string; close: string };
};

/**
 * design-system §8 SiteHeader. Desktop: 64px, sticky, solid --paper with a
 * hairline. Mobile: 56px, not sticky, wordmark and menu toggle only (the hero
 * CTA and the sticky bar keep WhatsApp one tap away).
 */
export function SiteHeader({
  siteName,
  skipLink,
  links,
  headerCta,
  menuCta,
  ctaLabel,
  labels,
}: Props) {
  return (
    <header className={styles.header}>
      <a href={`#${skipLink.target}`} className="skip-link">
        {skipLink.label}
      </a>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label={siteName}>
          <Wordmark />
        </Link>

        <nav className={styles.nav} aria-label={labels.nav}>
          <ul className={styles.list}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          <Button {...headerCta}>{ctaLabel}</Button>
        </div>

        <MenuSheet
          siteName={siteName}
          links={links}
          cta={{ ...menuCta, label: ctaLabel }}
          labels={labels}
        />
      </div>
    </header>
  );
}
