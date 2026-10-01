import type { z } from "zod";
import type { Home } from "./schema";

/** Copy source: docs/content/homepage-copy.md §1, §6 and Meta. */
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
  contact: {
    title: "Have a problem in your business we could solve?",
    body: "Send us a WhatsApp message. We reply within {replyWithin} on weekdays.",
  },
} satisfies z.input<typeof Home>;
