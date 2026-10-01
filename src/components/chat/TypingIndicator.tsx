import styles from "./TypingIndicator.module.css";

/**
 * Three pulsing dots on the assistant side. A list item, so it sits in the
 * ChatThread <ol> next to the bubbles. Decorative: hidden from screen readers.
 */
export function TypingIndicator() {
  return (
    <li className={styles.indicator} aria-hidden="true">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </li>
  );
}
