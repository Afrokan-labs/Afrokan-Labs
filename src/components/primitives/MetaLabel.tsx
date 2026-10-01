import type { ReactNode } from "react";
import styles from "./MetaLabel.module.css";

type Props = {
  children: ReactNode;
  /** accent: section labels. muted: dossier field labels. onDark: inside the contact band. */
  tone?: "accent" | "muted" | "onDark";
  as?: "span" | "p" | "dt";
  className?: string;
};

/** design-system §8 MetaLabel: small mono uppercase label. */
export function MetaLabel({ children, tone = "accent", as: Tag = "span", className }: Props) {
  return (
    <Tag className={[styles.label, styles[tone], className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
