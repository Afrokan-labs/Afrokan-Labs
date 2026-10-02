import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode, Ref } from "react";
import type { TrackingAttrs } from "@/lib/analytics";
import { WhatsAppGlyph } from "@/components/ui/icons";
import styles from "./Button.module.css";

/**
 * design-system §7 pills (reference .x-pill, .x-ghost):
 * - lime: the main action, ink text on lime
 * - line: outlined, white text, for dark surfaces
 * - ghost: outlined ink, for white cards (hero)
 * - white: white fill, ink text, for lime surfaces (footer)
 */
type Variant = "lime" | "line" | "ghost" | "white";

type CommonProps = Partial<TrackingAttrs> & {
  variant?: Variant;
  /** Full width, as in the mobile StickyActionBar. */
  fullWidth?: boolean;
  /** Adds the WhatsApp glyph (set by whatsappLink()). */
  whatsapp?: boolean;
  /** Visually hidden note after the label, e.g. "(opens WhatsApp)". */
  srNote?: string;
  /**
   * Native buttons only: a spinner replaces the label, the button keeps its
   * width, and screen readers hear `loadingLabel` (design-system §8).
   */
  loading?: boolean;
  loadingLabel?: string;
  className?: string;
  children: ReactNode;
};

type LinkProps = CommonProps & {
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  ref?: Ref<HTMLAnchorElement>;
};
type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
    ref?: Ref<HTMLButtonElement>;
  };

/**
 * Pill button. Renders a link when given href, otherwise a button.
 * Focus-visible, the 44px minimum target and screen-reader notes live here,
 * so sections don't have to remember them.
 */
export function Button(props: LinkProps | NativeButtonProps) {
  const {
    variant = "lime",
    fullWidth,
    whatsapp,
    srNote,
    loading,
    loadingLabel,
    className,
    children,
    ...rest
  } = props;
  const classes = [
    styles.button,
    styles[variant],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {whatsapp && <WhatsAppGlyph className={styles.icon} />}
      <span className={styles.label}>{children}</span>
      {srNote && <span className="sr-only"> {srNote}</span>}
      {loading && (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          {loadingLabel && <span className="sr-only">{loadingLabel}</span>}
        </>
      )}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...attrs } = rest as Omit<LinkProps, keyof CommonProps> & Partial<TrackingAttrs>;
    return (
      <a href={href} className={classes} {...attrs}>
        {content}
      </a>
    );
  }

  const {
    type = "button",
    disabled,
    ...attrs
  } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      {...attrs}
    >
      {content}
    </button>
  );
}
