import type { HomeData } from "@/lib/home";
import styles from "./Stats.module.css";

type Props = HomeData["stats"];

/** reference §2: the quick-facts strip. The suffix is lime. */
export function Stats({ label, items }: Props) {
  return (
    <ul className={styles.stats} aria-label={label}>
      {items.map((s) => (
        <li key={s.label} className={styles.stat}>
          <b>
            {s.value}
            {s.suffix && <i>{s.suffix}</i>}
          </b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
