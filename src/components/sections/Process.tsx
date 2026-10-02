import { Button } from "@/components/primitives/Button";
import { HeadingText } from "@/components/ui/Highlight";
import type { HomeData } from "@/lib/home";
import styles from "./Process.module.css";

type Props = HomeData["process"];

/** reference §7: split header, four step cards with lime numerals, an outline WhatsApp pill. */
export function Process({ id, heading, body, steps, cta }: Props) {
  const { label, ...link } = cta;
  return (
    <section id={id} className={styles.process} aria-labelledby="process-title">
      <div className={styles.head}>
        <h2 id="process-title" className={styles.h2}>
          <HeadingText {...heading} />
        </h2>
        <p>{body}</p>
      </div>
      <ol className={styles.steps}>
        {steps.map((s) => (
          <li key={s.number} className={styles.step}>
            <span className={styles.sn} aria-hidden="true">
              {s.number}
            </span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <div className={styles.btns}>
        <Button variant="line" {...link}>
          {label}
        </Button>
      </div>
    </section>
  );
}
