import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode, Ref } from "react";
import type { TrackingAttrs } from "@/lib/analytics";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "onDark" | "ghost";

type CommonProps = Partial<TrackingAttrs> & {
  variant?: Variant;
  /** Full width, as in the mobile StickyActionBar. */
  fullWidth?: boolean;
  /** Adds the WhatsApp glyph (set by whatsappLink()). */
  whatsapp?: boolean;
  /** Visually hidden note after the label, e.g. "(opens WhatsApp)". */
  srNote?: string;
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
 * design-system §8 Button. Renders a link when given href, otherwise a button.
 * Focus-visible, the 44px minimum target and screen-reader notes live here,
 * so sections don't have to remember them.
 */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", fullWidth, whatsapp, srNote, className, children, ...rest } = props;
  const classes = [styles.button, styles[variant], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {whatsapp && <WhatsAppGlyph />}
      <span>{children}</span>
      {srNote && <span className="sr-only"> {srNote}</span>}
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
      {...attrs}
    >
      {content}
    </button>
  );
}

function WhatsAppGlyph() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c0 .2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"
      />
    </svg>
  );
}
