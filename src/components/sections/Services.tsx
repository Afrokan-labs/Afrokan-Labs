import { Button } from "@/components/primitives/Button";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import type { HomeData } from "@/lib/home";
import styles from "./Services.module.css";

type Props = HomeData["services"];

/** design-system §8 ServiceRow ×3: outcome first, technology second. No icons. */
export function Services({ title, items, cta }: Props) {
  const { label, ...link } = cta;
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <SectionHeader id="services-title" title={title} />
        <ol className={styles.rows}>
          {items.map((s) => (
            <li key={s.number} className={styles.row}>
              <MetaLabel tone="muted" className={styles.number}>
                <span aria-hidden="true">{s.number}</span>
              </MetaLabel>
              <h3 className={styles.headline}>{s.title}</h3>
              <div className={styles.detail}>
                <p>{s.body}</p>
                <MetaLabel as="p">{s.tag}</MetaLabel>
              </div>
            </li>
          ))}
        </ol>
        <div className={styles.cta}>
          <Button variant="secondary" {...link}>
            {label}
          </Button>
        </div>
      </div>
    </section>
  );
}
