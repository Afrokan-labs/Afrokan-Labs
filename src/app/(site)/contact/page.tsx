import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { Button } from "@/components/primitives/Button";
import { getContactData } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";
import styles from "./page.module.css";

const data = getContactData();

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: data.title,
  description: data.description,
});

/**
 * The contact form (architecture §5). ContactForm loads Turnstile on this page
 * only, and public/_headers allows it on /contact only.
 */
export default function ContactPage() {
  const { label, ...whatsapp } = data.whatsapp;
  return (
    <main id="main" className={`container ${styles.page}`}>
      <header className={styles.header}>
        <h1>{data.title}</h1>
        <p className={styles.intro}>{data.intro}</p>
        <Button variant="line" {...whatsapp}>
          {label}
        </Button>
      </header>
      <ContactForm {...data.form} />
    </main>
  );
}
