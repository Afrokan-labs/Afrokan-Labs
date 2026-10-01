import styles from "./StatusChip.module.css";

type Status = "live" | "delivered";

type Props = {
  status: Status;
  /** Label per status, e.g. { live: "Live since May 2026", delivered: "Delivered" }. */
  labels: Record<Status, string>;
  className?: string;
};

/**
 * design-system §8 StatusChip. The label is picked by status, so "Live" can
 * only show when status is "live" (CLAUDE.md content rules).
 */
export function StatusChip({ status, labels, className }: Props) {
  return (
    <span className={[styles.chip, styles[status], className].filter(Boolean).join(" ")}>
      <span className={styles.dot} aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
