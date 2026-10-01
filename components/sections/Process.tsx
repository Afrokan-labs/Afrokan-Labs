import { processTitle, steps } from "@/content/process";
import shared from "@/styles/shared.module.css";
import styles from "./Process.module.css";

export function Process() {
  return (
    <section className={`${shared.section} ${shared.light}`} aria-labelledby="process-title">
      <div className={shared.container}>
        <h2 id="process-title" className={shared.h2}>
          {processTitle}
        </h2>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step}>
              <span className={styles.num} aria-hidden="true">
                {i + 1}
              </span>
              <h3 className={shared.h3}>{s.title}</h3>
              <p className={shared.muted}>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
