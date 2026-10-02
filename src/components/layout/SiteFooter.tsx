import Link from "next/link";
import { InstagramGlyph, LinkedInGlyph, WhatsAppGlyph, XGlyph } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import type { ChromeProps } from "@/lib/chrome";
import styles from "./SiteFooter.module.css";

type Props = ChromeProps["footer"];

const GLYPHS = {
  LinkedIn: LinkedInGlyph,
  X: XGlyph,
  Instagram: InstagramGlyph,
  WhatsApp: WhatsAppGlyph,
};

/**
 * The lime footer card (reference .x-foot-card). The newsletter renders only
 * when site.footer.newsletter.enabled is true, which also needs a provider
 * to post to (homepage-copy-v2 §12). Social icons appear only for confirmed URLs.
 */
export function SiteFooter({
  siteName,
  blurb,
  columns,
  email,
  emailTracking,
  whatsapp,
  location,
  newsletter,
  social,
  opensNewTab,
  labels,
  copyright,
}: Props) {
  const { label: whatsappLabel, srNote, ...whatsappLink } = whatsapp;
  const linkColumn = (col: { title: string; links: { label: string; href: string }[] }) => (
    <div>
      <h2 className={styles.colTitle}>{col.title}</h2>
      <ul className={styles.list}>
        {col.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className={styles.link}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer id="site-footer" className={styles.wrap}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.top}>
            <Link href="/" className={styles.logo} aria-label={labels.home}>
              <Logo name={siteName} />
            </Link>
            <p className={styles.blurb}>{blurb}</p>
          </div>

          <nav className={styles.cols} aria-label={labels.nav}>
            {linkColumn(columns.company)}
            {linkColumn(columns.services)}
            {linkColumn(columns.resources)}
            <div>
              <h2 className={styles.colTitle}>{columns.contact.title}</h2>
              <ul className={styles.list}>
                <li>
                  <a href={`mailto:${email}`} className={styles.link} {...emailTracking}>
                    {email}
                  </a>
                </li>
                <li>
                  <a className={styles.link} {...whatsappLink}>
                    {whatsappLabel}
                    <span className="sr-only"> {srNote}</span>
                  </a>
                </li>
                <li>{location}</li>
              </ul>
            </div>
            {newsletter && (
              <div className={styles.news}>
                <h2 className={styles.colTitle}>{newsletter.title}</h2>
                <p>{newsletter.body}</p>
                <form className={styles.newsForm}>
                  <label htmlFor="newsletter-email" className="sr-only">
                    {newsletter.label}
                  </label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={newsletter.placeholder}
                    required
                  />
                  <button type="submit">{newsletter.submit}</button>
                </form>
              </div>
            )}
          </nav>

          <div className={styles.bottom}>
            <span>{copyright}</span>
            {social.length > 0 && (
              <ul className={styles.social} aria-label={labels.social}>
                {social.map(({ name, ...link }) => {
                  const Glyph = GLYPHS[name];
                  const external = name !== "WhatsApp";
                  return (
                    <li key={name}>
                      <a
                        href={link.href}
                        aria-label={external ? `${name} ${opensNewTab}` : name}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        <Glyph />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
