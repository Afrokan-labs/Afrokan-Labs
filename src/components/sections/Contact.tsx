import { Button } from "@/components/primitives/Button";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import { TextLink } from "@/components/primitives/TextLink";
import type { HomeData } from "@/lib/home";
import styles from "./Contact.module.css";

type Props = HomeData["contact"];

/**
 * design-system §8 Contact: the homepage's one dark band. WhatsApp and email
 * only; the email always sits next to the WhatsApp button (§9). No form until
 * BUILD_PLAN Phase 6.
 */
export function Contact({ title, body, responseNote, cta, email, emailTracking, location }: Props) {
  const { label, ...link } = cta;
  return (
    <section id="contact" className={styles.band} aria-labelledby="contact-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="contact-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.detail}>
          <p className={styles.body}>{body}</p>
          {responseNote && <p className={styles.note}>{responseNote}</p>}
          <div className={styles.actions}>
            <Button variant="onDark" {...link}>
              {label}
            </Button>
            <TextLink standalone tone="onDark" href={`mailto:${email}`} {...emailTracking}>
              {email}
            </TextLink>
          </div>
          <MetaLabel as="p" tone="onDark">
            {location}
          </MetaLabel>
        </div>
      </div>
    </section>
  );
}
