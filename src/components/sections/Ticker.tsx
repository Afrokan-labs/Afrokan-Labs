import type { HomeData } from "@/lib/home";
import styles from "./Ticker.module.css";

type Props = HomeData["ticker"];

/**
 * reference §10: a tilted white band of keywords. The list is drawn twice so
 * the CSS loop is seamless; the copy is hidden from screen readers. Pauses on
 * hover and stays still under reduced motion.
 */
export function Ticker({ label, items }: Props) {
  const list = (hidden: boolean) => (
    <ul className={styles.list} aria-hidden={hidden || undefined}>
      {items.map((k) => (
        <li key={k}>{k}</li>
      ))}
    </ul>
  );
  return (
    <section className={styles.ticker} aria-label={label}>
      <div className={styles.band}>
        <div className={styles.move}>
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  );
}
