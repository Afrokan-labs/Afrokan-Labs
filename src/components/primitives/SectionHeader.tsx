import { MetaLabel } from "./MetaLabel";
import styles from "./SectionHeader.module.css";

type Props = {
  /** id of the h2, for the section's aria-labelledby. */
  id: string;
  title: string;
  /** Decorative section number, e.g. "01". Hidden from screen readers (§3). */
  number?: string;
  label?: string;
  className?: string;
};

/** Section label row plus h2. */
export function SectionHeader({ id, title, number, label, className }: Props) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")}>
      {(number || label) && (
        <p className={styles.meta}>
          {number && (
            <MetaLabel tone="muted">
              <span aria-hidden="true">{number}</span>
            </MetaLabel>
          )}
          {label && <MetaLabel>{label}</MetaLabel>}
        </p>
      )}
      <h2 id={id}>{title}</h2>
    </div>
  );
}
