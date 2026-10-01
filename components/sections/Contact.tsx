import { contact } from "@/content/home";
import { site, whatsappHref } from "@/content/site";
import shared from "@/styles/shared.module.css";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section id="contact" className={`${shared.section} ${shared.dark} ${styles.contact}`} aria-labelledby="contact-title">
      <div className={`${shared.container} ${shared.split}`}>
        <div className={shared.splitHead}>
          <h2 id="contact-title" className={shared.h2}>
            {contact.title}
          </h2>
          <p className={shared.mutedDark}>{contact.body}</p>
          <ul className={styles.direct}>
            <li>
              <span>Email</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            {whatsappHref && (
              <li>
                <span>WhatsApp</span>
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappLabel}
                </a>
              </li>
            )}
            {site.bookingUrl && (
              <li>
                <span>Call</span>
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  {contact.bookingLabel}
                </a>
              </li>
            )}
            <li>
              <span>Based in</span>
              <p>{site.location}</p>
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
