import type { ReactNode } from "react";
import type { TrackingAttrs } from "@/lib/analytics";
import styles from "./TextLink.module.css";

type Props = Partial<TrackingAttrs> & {
  href: string;
  children: ReactNode;
  /** "default" is lime, for dark surfaces; "ink" is for white and lime cards. */
  tone?: "default" | "ink";
  /**
   * A link on its own line (not inside a sentence) gets a 44px tap target (§10).
   * Links inside running text keep the line height.
   */
  standalone?: boolean;
  /** Adds a trailing arrow (decorative, drawn in CSS), as in "See the case study →". */
  arrow?: boolean;
  className?: string;
} & (
    | { external?: false; externalNote?: never }
    /** Opens in a new tab; externalNote is the "(opens in a new tab)" text. */
    | { external: true; externalNote: string }
  );

/** Text link: lime on dark surfaces, ink on white (design-system §2 rule 1). */
export function TextLink({
  href,
  children,
  tone = "default",
  standalone,
  arrow,
  className,
  external,
  externalNote,
  ...attrs
}: Props) {
  const classes = [
    styles.link,
    tone === "ink" && styles.ink,
    standalone && styles.standalone,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...attrs}
    >
      {/* The underline sits on this span so it hugs the text, whatever the tap area. */}
      <span className={styles.text}>{children}</span>
      {arrow && <span className={styles.arrow} aria-hidden="true" />}
      {external && <span className="sr-only"> {externalNote}</span>}
    </a>
  );
}
