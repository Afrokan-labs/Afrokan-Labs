import { TextLink } from "@/components/primitives/TextLink";
import type { TrackingAttrs } from "@/lib/analytics";
import styles from "./SiteFooter.module.css";

type Props = {
  siteName: string;
  email: string;
  /** trackingAttrs("email_click", { location: "footer" }). */
  emailTracking: TrackingAttrs;
  /** Omitted until the page exists and is kept active (copy §7). */
  linkedin?: { href: string; label: string; externalNote: string };
  links: { label: string; href: string }[];
  navLabel: string;
  year: number;
};

/** Footer, homepage-copy.md §7. */
export function SiteFooter({
  siteName,
  email,
  emailTracking,
  linkedin,
  links,
  navLabel,
  year,
}: Props) {
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.row}>
          <span className={styles.name}>{siteName}</span>
          <TextLink standalone href={`mailto:${email}`} {...emailTracking}>
            {email}
          </TextLink>
          {linkedin && (
            <TextLink standalone href={linkedin.href} external externalNote={linkedin.externalNote}>
              {linkedin.label}
            </TextLink>
          )}
        </p>

        <nav aria-label={navLabel}>
          <ul className={styles.row}>
            {links.map((l) => (
              <li key={l.href}>
                <TextLink standalone href={l.href}>
                  {l.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copyright}>
          © {year} {siteName}
        </p>
      </div>
    </footer>
  );
}
