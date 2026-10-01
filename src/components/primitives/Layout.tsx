import type { ReactNode } from "react";
import styles from "./Layout.module.css";

type BoxProps = {
  as?: "div" | "section" | "header" | "footer" | "article" | "ul" | "ol";
  className?: string;
  children: ReactNode;
};

const join = (...c: (string | undefined | false)[]) => c.filter(Boolean).join(" ");

/** design-system §5 container: page margins from --page-margin, max width from --container. */
export function Container({ as: Tag = "div", className, children }: BoxProps) {
  return <Tag className={join("container", className)}>{children}</Tag>;
}

/** design-system §5 grid: 4 columns, 8 from 640px, 12 from 1024px. Children set grid-column. */
export function Grid({ as: Tag = "div", className, children }: BoxProps) {
  return <Tag className={join("grid", className)}>{children}</Tag>;
}

type RuleProps = { variant?: "hair" | "strong" | "onDark"; className?: string };

/** Divider. hair: rows and dividers. strong: process step tops, emphasis. onDark: contact band. */
export function Rule({ variant = "hair", className }: RuleProps) {
  return <hr className={join(styles.rule, styles[variant], className)} />;
}
