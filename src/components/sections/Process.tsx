import { Button } from "@/components/primitives/Button";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { HomeData } from "@/lib/home";
import styles from "./Process.module.css";

type Props = HomeData["process"];

/** design-system §8 ProcessStep ×4 and PaymentNote. */
export function Process({ title, steps, pricingNote, cta }: Props) {
  const { label, ...link } = cta;
  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className="container">
        <SectionHeader id="process-title" title={title} />
        <ol className={styles.steps}>
          {steps.map((s) => (
            <li key={s.number} className={styles.step}>
              <MetaLabel tone="muted">
                <span aria-hidden="true">{s.number}</span>
              </MetaLabel>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
            </li>
          ))}
        </ol>
        {pricingNote && <p className={styles.note}>{pricingNote}</p>}
        <div className={styles.cta}>
          <Button variant="secondary" {...link}>
            {label}
          </Button>
        </div>
      </div>
    </section>
  );
}
