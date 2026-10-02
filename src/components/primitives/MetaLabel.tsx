import type { ReactNode } from "react";
import styles from "./MetaLabel.module.css";

type Props = {
  children: ReactNode;
  /** accent: lime labels on dark. muted: field labels on dark (reference .x-fact dt). ink: on white or lime. */
  tone?: "accent" | "muted" | "ink";
  as?: "span" | "p" | "dt";
  className?: string;
};

/** Small uppercase label (reference .x-fact dt, .x-foot-cols h3). */
export function MetaLabel({ children, tone = "accent", as: Tag = "span", className }: Props) {
  return (
    <Tag className={[styles.label, styles[tone], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
