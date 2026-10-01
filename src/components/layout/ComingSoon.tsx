import { Wordmark } from "@/components/Mark";
import styles from "./ComingSoon.module.css";

type Props = {
  siteName: string;
  skipLinkLabel: string;
  headline: string;
  subhead: string;
  contactTitle: string;
  email: string;
  location: string;
  year: number;
};

/**
 * Temporary holding page (BUILD_PLAN 1.6), replaced at launch (5.1).
 * Uses approved copy only; WhatsApp joins once the number is confirmed.
 */
export function ComingSoon({
  siteName,
  skipLinkLabel,
  headline,
  subhead,
  contactTitle,
  email,
  location,
  year,
}: Props) {
  return (
    <>
      <a href="#top" className="skip-link">
        {skipLinkLabel}
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <span className={styles.brand}>
            <Wordmark />
          </span>
        </div>
      </header>

      <main id="top" className={`container ${styles.main}`}>
        <section className={styles.hero} aria-labelledby="headline">
          <h1 id="headline">{headline}</h1>
          <p className={styles.subhead}>{subhead}</p>
        </section>

        <section className={styles.contact} aria-labelledby="contact-title">
          <h2 id="contact-title">{contactTitle}</h2>
          <p>
            <a className={styles.email} href={`mailto:${email}`}>
              {email}
            </a>
          </p>
          <p className={styles.location}>{location}</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <p>
            © {year} {siteName}
          </p>
        </div>
      </footer>
    </>
  );
}
