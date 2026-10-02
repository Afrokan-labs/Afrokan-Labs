import { Button } from "@/components/primitives/Button";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";
import styles from "./ContactResult.module.css";

type Props = {
  title: string;
  body: string;
  whatsapp: WhatsAppLinkProps & { label: string };
};

/**
 * Where the contact form lands when posted without JavaScript: the same
 * confirmation the enhanced form shows (design-system §9), or the failure.
 * The failure page has no link back to the form on purpose: a link would load
 * an empty form, while the browser's Back button keeps what was typed.
 */
export function ContactResult({ title, body, whatsapp }: Props) {
  const { label, ...link } = whatsapp;
  return (
    <main id="main" className={`container ${styles.page}`}>
      <h1>{title}</h1>
      <p className={styles.body}>{body}</p>
      <Button variant="secondary" {...link}>
        {label}
      </Button>
    </main>
  );
}
