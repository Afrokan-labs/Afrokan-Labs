import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { HomeData } from "@/lib/home";
import styles from "./About.module.css";

type Props = HomeData["about"];

/**
 * design-system §8 About: statement and TeamMember ×n. Real photos in a
 * consistent 4:5 crop, name and role only.
 */
export function About({ title, statement, members }: Props) {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className="container">
        <SectionHeader id="about-title" title={title} />
        <div className={styles.inner}>
          <p className={styles.statement}>{statement}</p>
          {members.length > 0 && (
            <ul className={styles.team}>
              {members.map((m) => (
                <li key={m.name} className={styles.member}>
                  {m.photo && (
                    <ResponsiveImage
                      {...m.photo}
                      sizes="(min-width: 1024px) 190px, 50vw"
                      className={styles.photo}
                    />
                  )}
                  <p className={styles.name}>{m.name}</p>
                  <p className={styles.role}>{m.role}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
