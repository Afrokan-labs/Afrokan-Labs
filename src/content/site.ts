import type { z } from "zod";
import type { Site } from "./schema";

/**
 * Business facts. Copy source: docs/content/homepage-copy.md.
 * TODO_ values are unconfirmed (see docs/BUILD_PLAN.md Phase 0).
 */
export const site = {
  name: "Afrokan Labs",
  domain: "afrokanlabs.com",
  email: "hello@afrokanlabs.com",
  location: "Accra, Ghana",

  // Phase 0: dedicated WhatsApp Business number.
  whatsappNumber: "TODO_WHATSAPP_E164",
  // Copy §6: "We reply within [X hours] on weekdays."
  replyWithin: "TODO_REPLY_HOURS",

  whatsappPrefill: {
    default: "Hi Afrokan Labs, I run a [type of business] and I'd like to talk about…",
    demo: "Hi Afrokan Labs, I'd like a demo. My business is [name] and we [what you do].",
  },

  demoOffer: { enabled: false },

  // Interface text. Skip link: standard wording, not in homepage-copy.md.
  // The rest is from design-system.md §8 (Button, TextLink, StatusChip).
  ui: {
    skipLink: "Skip to content",
    opensWhatsApp: "(opens WhatsApp)",
    opensNewTab: "(opens in a new tab)",
    status: { live: "Live", delivered: "Delivered" },
  },

  social: {
    // Copy §7: show LinkedIn only if the page exists and is kept active.
    // Set the URL, or delete this line to leave it out.
    linkedin: "TODO_LINKEDIN_URL",
  },
} satisfies z.input<typeof Site>;
