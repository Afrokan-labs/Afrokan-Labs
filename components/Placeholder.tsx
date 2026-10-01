import styles from "./Placeholder.module.css";

type PlaceholderProps = {
  /** What will go here, e.g. "Hero visual". */
  label: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  ratio?: string;
  className?: string;
};

/** A labelled box standing in for an image or visual until the final design lands. */
export function Placeholder({ label, ratio = "16 / 9", className }: PlaceholderProps) {
  return (
    <div
      className={`${styles.placeholder} ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.ratio}>{ratio}</span>
    </div>
  );
}
