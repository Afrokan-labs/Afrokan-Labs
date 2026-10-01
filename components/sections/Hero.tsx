import { Placeholder } from "@/components/Placeholder";
import { hero } from "@/content/home";
import { site } from "@/content/site";
import shared from "@/styles/shared.module.css";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`${shared.dark} ${styles.hero}`} aria-labelledby="hero-title">
      {/* DESIGN: green gradient streaks behind the hero (originally .hero-streak). */}
      {/* DESIGN: the logo mark drawn as an animated single green stroke across the hero (originally .hero-mark, using MARK_PATH from components/Mark.tsx). */}
      <div className={`${shared.container} ${styles.inner}`}>
        <div className={styles.text}>
          <p className={styles.tagline}>{site.tagline.join("  ·  ")}</p>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.lede}>{hero.lede}</p>
          <div className={styles.actions}>
            <a href={hero.primary.href} className={`${shared.btn} ${shared.btnPrimary}`}>
              {hero.primary.label}
            </a>
            <a href={hero.secondary.href} className={`${shared.btn} ${shared.btnGhost}`}>
              {hero.secondary.label}
            </a>
          </div>
        </div>
        <Placeholder label="Hero visual" ratio="4 / 3" />
      </div>
    </section>
  );
}
