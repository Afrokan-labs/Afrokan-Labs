import type { CSSProperties } from "react";
import styles from "./TypingIndicator.module.css";

type Props = { className?: string; style?: CSSProperties };

/**
 * Three pulsing dots on the assistant side. A list item, so it sits in the
 * ChatThread <ol> next to the bubbles. Decorative: hidden from screen readers.
 */
export function TypingIndicator({ className, style }: Props) {
  return (
    <li
      className={[styles.indicator, className].filter(Boolean).join(" ")}
      style={style}
      aria-hidden="true"
    >
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </li>
  );
}
