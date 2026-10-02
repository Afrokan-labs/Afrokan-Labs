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
  // The same fact as `location`, structured for JSON-LD (architecture §8: Accra at city level).
  address: { locality: "Accra", country: "GH" },

  // Phase 0: dedicated WhatsApp Business number.
  // TODO_DUMMY: preview-only dummy value (branch preview/dummy-content). Never merge.
  // +1 555-0100 is reserved for fiction, so it can't reach a real person.
  whatsappNumber: "+15555550100",
  // Copy §6: "We reply within [X hours] on weekdays."
  // TODO_DUMMY: preview-only dummy value (branch preview/dummy-content). Never merge.
  replyWithin: "4 hours",

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
    // Copy §2: "Live since [Month Year]"; {date} is filled from the project's liveSince.
    status: { live: "Live", liveSince: "Live since {date}", delivered: "Delivered" },
    // Navigation controls and landmark names: standard wording, not in the copy docs.
    nav: { main: "Main", footer: "Footer", menu: "Menu", close: "Close" },
    // Drafted with the privacy page (docs/content/privacy.md); awaiting approval.
    notFound: {
      title: "Page not found",
      body: "This page doesn't exist or has moved.",
      link: "Go to the homepage",
    },
  },

  // homepage-strategy.md, Navigation. "Work" is left out while no project is published.
  nav: {
    items: [
      { label: "Work", href: "/work" },
      { label: "What we build", href: "/#services" },
      { label: "How we work", href: "/#process" },
      { label: "About", href: "/#about" },
    ],
    cta: "WhatsApp us",
  },

  // homepage-copy.md §7.
  footer: {
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/#about" },
      // Drafted with the privacy page (docs/content/privacy.md); awaiting approval.
      { label: "Privacy", href: "/privacy" },
    ],
    linkedinLabel: "LinkedIn",
  },

  social: {
    // Copy §7: show LinkedIn only if the page exists and is kept active.
    // Set the URL, or delete this line to leave it out.
    // TODO_DUMMY: preview-only dummy value (branch preview/dummy-content). Never merge.
    linkedin: "https://www.linkedin.com/company/afrokan-labs-dummy",
  },
} satisfies z.input<typeof Site>;
