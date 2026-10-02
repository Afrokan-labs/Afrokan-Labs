import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { WhatsAppGlyph } from "@/components/ui/icons";
import type { HomeData } from "@/lib/home";
import { ContactTeaser } from "./ContactTeaser";
import styles from "./Contact.module.css";

type Props = HomeData["contact"];

/** reference §11 "Get in Touch Today!": the email box, a WhatsApp link and the cut-out image. */
export function Contact({ id, title, body, form, whatsapp, image }: Props) {
  const { label, srNote, ...whatsappAttrs } = whatsapp;
  return (
    <section id={id} className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.text}>
        <h2 id="contact-title" className={styles.h2}>
          {title}
        </h2>
        <p>{body}</p>
        <ContactTeaser {...form} />
        <a className={styles.wa} {...whatsappAttrs}>
          <WhatsAppGlyph />
          {label}
          <span className="sr-only"> {srNote}</span>
        </a>
      </div>
      <div className={styles.cutout}>
        <ResponsiveImage {...image} sizes="(max-width: 760px) 80vw, 360px" />
      </div>
    </section>
  );
}
