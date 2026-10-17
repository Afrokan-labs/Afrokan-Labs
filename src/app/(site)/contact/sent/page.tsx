import type { Metadata } from "next";
import { ContactResult } from "@/components/site/ContactResult";
import { getContactData } from "@/lib/contact";

const { success } = getContactData();

// A result page, reached only by posting the form without JavaScript.
export const metadata: Metadata = {
  title: success.title,
  robots: { index: false, follow: false },
};

export default function ContactSentPage() {
  return <ContactResult {...success} />;
}
