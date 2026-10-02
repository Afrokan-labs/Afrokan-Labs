import { Mark } from "@/components/Mark";
import styles from "./Logo.module.css";

/** The mark and name (reference .x-logo). The mark takes the text colour unless styled. */
export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={[styles.logo, className].filter(Boolean).join(" ")}>
      <Mark className={styles.mark} />
      {name}
    </span>
  );
}
