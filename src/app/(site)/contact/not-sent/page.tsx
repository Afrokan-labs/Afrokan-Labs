import type { Metadata } from "next";
import { ContactResult } from "@/components/site/ContactResult";
import { getContactData } from "@/lib/contact";

const { notSent, whatsapp } = getContactData();

// A result page, reached only by posting the form without JavaScript.
export const metadata: Metadata = {
  title: notSent.title,
  robots: { index: false, follow: false },
};

export default function ContactNotSentPage() {
  return <ContactResult {...notSent} whatsapp={whatsapp} />;
}
