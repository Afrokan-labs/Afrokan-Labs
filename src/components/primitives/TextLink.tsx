import type { ReactNode } from "react";
import type { TrackingAttrs } from "@/lib/analytics";
import styles from "./TextLink.module.css";

type Props = Partial<TrackingAttrs> & {
  href: string;
  children: ReactNode;
  /** "onDark" inside the contact band. */
  tone?: "default" | "onDark";
  /**
   * A link on its own line (not inside a sentence) gets a 44px tap target (§10).
   * Links inside running text keep the line height.
   */
  standalone?: boolean;
  className?: string;
} & (
    | { external?: false; externalNote?: never }
    /** Opens in a new tab; externalNote is the "(opens in a new tab)" text. */
    | { external: true; externalNote: string }
  );

/** design-system §8 TextLink. */
export function TextLink({
  href,
  children,
  tone = "default",
  standalone,
  className,
  external,
  externalNote,
  ...attrs
}: Props) {
  const classes = [
    styles.link,
    tone === "onDark" && styles.onDark,
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
      {external && <span className="sr-only"> {externalNote}</span>}
    </a>
  );
}
