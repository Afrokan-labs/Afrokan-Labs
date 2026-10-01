import Image from "next/image";
import { Placeholder } from "@/components/Placeholder";
import { site } from "@/content/site";
import { joinCard, team, teamTitle } from "@/content/team";
import shared from "@/styles/shared.module.css";
import styles from "./Team.module.css";

export function Team() {
  return (
    <section id="team" className={`${shared.section} ${shared.light}`} aria-labelledby="team-title">
      <div className={shared.container}>
        <h2 id="team-title" className={shared.h2}>
          {teamTitle}
        </h2>
        <div className={styles.grid}>
          {team.map((m) => (
            <article key={m.name} className={styles.person}>
              {m.photo ? (
                <div className={styles.photo}>
                  <Image src={m.photo} alt={`Portrait of ${m.name}`} fill sizes="(max-width: 720px) 100vw, 360px" />
                </div>
              ) : (
                <Placeholder label={`Photo of ${m.name}`} ratio="4 / 5" />
              )}
              <div className={styles.text}>
                <h3 className={shared.h3}>{m.name}</h3>
                <p className={styles.role}>{m.role}</p>
                <p className={shared.muted}>{m.bio}</p>
              </div>
            </article>
          ))}
          <article className={styles.join}>
            <h3 className={shared.h3}>{joinCard.title}</h3>
            <p className={shared.muted}>{joinCard.body}</p>
            <a className={shared.link} href={`mailto:${site.email}?subject=${encodeURIComponent(joinCard.emailSubject)}`}>
              {joinCard.linkLabel}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
