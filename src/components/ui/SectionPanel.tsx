import styles from "./SectionPanel.module.css";

type Props = {
  id?: string;
  labelledBy?: string;
  /** Vertical lime tab on the left edge, e.g. "WHAT WE DO" (decorative). */
  tab?: string;
  className?: string;
  children: React.ReactNode;
};

/** reference .x-svc / .x-team: a dark rounded panel, optionally with a side tab. */
export function SectionPanel({ id, labelledBy, tab, className, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.panel, tab && styles.tabbed, className].filter(Boolean).join(" ")}
    >
      {tab && (
        <div className={styles.tab} aria-hidden="true">
          <span>{tab}</span>
        </div>
      )}
      {children}
    </section>
  );
}
