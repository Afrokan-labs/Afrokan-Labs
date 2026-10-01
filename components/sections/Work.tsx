import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { work, workTitle } from "@/content/work";
import shared from "@/styles/shared.module.css";
import styles from "./Work.module.css";

export function Work() {
  return (
    <section id="work" className={`${shared.section} ${shared.dark}`} aria-labelledby="work-title">
      <div className={shared.container}>
        <h2 id="work-title" className={shared.h2}>
          {workTitle}
        </h2>

        {work.map((c) => (
          <article key={c.slug} className={styles.case}>
            <div className={styles.text}>
              <p className={styles.client}>{c.client}</p>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={shared.mutedDark}>{c.summary}</p>
              <dl className={styles.facts}>
                {c.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/work/${c.slug}`} className={shared.link}>
                Read the case study<span className="sr-only">: {c.client}</span>
              </Link>
            </div>

            {/* DESIGN: illustrative WhatsApp chat mock-up of the assistant (originally .chat). Transcript is kept in content/work.ts under `illustration`. */}
            <Placeholder label={c.visualLabel} ratio="3 / 4" className={styles.visual} />
          </article>
        ))}
      </div>
    </section>
  );
}
