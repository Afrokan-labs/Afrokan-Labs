import styles from "./PullQuote.module.css";

type Props = { quote: string; name: string; role: string; organisation: string };

/** Approved testimonial (full tier only; the schema requires written permission). */
export function PullQuote({ quote, name, role, organisation }: Props) {
  return (
    <figure className={styles.quote}>
      <blockquote className={styles.text}>
        <p>{quote}</p>
      </blockquote>
      <figcaption className={styles.cite}>
        {name}, {role}, {organisation}
      </figcaption>
    </figure>
  );
}
