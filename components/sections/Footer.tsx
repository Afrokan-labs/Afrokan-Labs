import { Wordmark } from "@/components/Mark";
import { site } from "@/content/site";
import shared from "@/styles/shared.module.css";
import styles from "./Footer.module.css";

const socialLabels: Record<keyof typeof site.social, string> = {
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
};

export function Footer() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[]).filter((k) => site.social[k]);

  return (
    <footer className={`${shared.dark} ${styles.footer}`}>
      <div className={`${shared.container} ${styles.inner}`}>
        <div className={styles.brand}>
          <Wordmark />
        </div>
        <p className={styles.tag}>{site.tagline.join("  ·  ")}</p>
        {socials.length > 0 && (
          <ul className={styles.social} aria-label="Social media">
            {socials.map((k) => (
              <li key={k}>
                <a href={site.social[k]} target="_blank" rel="noopener noreferrer">
                  {socialLabels[k]}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className={styles.legal}>
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
      </div>
    </footer>
  );
}
