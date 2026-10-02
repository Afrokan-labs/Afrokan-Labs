import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { HeadingText } from "@/components/ui/Highlight";
import { Blob, LinkedInGlyph } from "@/components/ui/icons";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { HomeData } from "@/lib/home";
import styles from "./Team.module.css";

type Props = HomeData["team"];

/**
 * reference §8: the team panel. Only confirmed members render (CLAUDE.md
 * content rules); with fewer than three, the cards are centred.
 */
export function Team({ id, heading, join, linkedinLabel, opensNewTab, members }: Props) {
  return (
    <SectionPanel id={id} labelledBy="team-title" className={styles.panel}>
      <div className={styles.head}>
        <h2 id="team-title" className={styles.h2}>
          <HeadingText {...heading} />
        </h2>
        <a className={styles.join} href={join.href}>
          {join.label}
          <span className={styles.sw} aria-hidden="true" />
        </a>
      </div>
      <ul className={styles.cards} data-few={members.length < 3}>
        {members.map((m) => (
          <li key={m.name} className={styles.card}>
            {m.linkedin && (
              <a
                className={styles.in}
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.name} on ${linkedinLabel} ${opensNewTab}`}
              >
                <LinkedInGlyph />
              </a>
            )}
            <div className={styles.top}>
              <div className={styles.av}>
                <Blob className={styles.blob} />
                <div className={styles.face}>
                  {m.photo && (
                    <ResponsiveImage {...m.photo} alt="" sizes="64px" className={styles.faceImg} />
                  )}
                </div>
              </div>
              <div className={styles.who}>
                <h3>{m.name}</h3>
                <span>{m.role}</span>
              </div>
            </div>
            {m.bio && <p>{m.bio}</p>}
          </li>
        ))}
      </ul>
    </SectionPanel>
  );
}
