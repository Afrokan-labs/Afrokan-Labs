import type { z } from "zod";
import type { Home } from "./schema";

/** Copy source: docs/content/homepage-copy.md §1, §2, §2b, §6 and Meta. */
export const home = {
  meta: {
    title: "Afrokan Labs | Software built for how Ghanaian businesses work",
    description:
      "WhatsApp AI assistants, workflow tools and web platforms for growing businesses in Ghana. Based in Accra.",
  },
  hero: {
    headline: "Software built for how Ghanaian businesses actually work.",
    subhead: "WhatsApp AI assistants, workflow tools and web platforms for growing businesses.",
    primaryCta: "Chat with us on WhatsApp",
    secondaryLink: "See the case study",
  },
  featured: {
    eyebrow: "Featured work",
    // Section title per project slug (copy §2).
    // TODO_VERIFY_FASTER: "faster" is a result claim marked [verify]; confirm with ESE or reword.
    titles: {
      "ese-logistic": "Helping a clearing and forwarding firm answer customers faster",
    },
    caseStudyLink: "Read the full case study",
    whatsappCta: "Chat with us on WhatsApp",
    // Dossier field labels. CLIENT, STATUS and BUILT are the field labels in
    // design-system §1; INDUSTRY (a schema field) completes the 2×2 grid.
    fields: { client: "Client", industry: "Industry", status: "Status", built: "Built" },
    // Shown only at the full tier, when a confirmed result exists.
    resultLabel: "Result",
  },
  offer: {
    title: "See it working on your business",
    body: "Send us the 10 questions your customers ask most. We'll show you how an assistant would answer them.",
    cta: "Send your questions on WhatsApp",
  },
  contact: {
    title: "Have a problem in your business we could solve?",
    body: "Send us a WhatsApp message.",
    /** {replyWithin} is filled from site.replyWithin; omitted until that is confirmed. */
    responseNote: "We reply within {replyWithin} on weekdays.",
    cta: "Chat with us on WhatsApp",
  },
} satisfies z.input<typeof Home>;
