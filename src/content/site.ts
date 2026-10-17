import type { z } from "zod";
import type { Site } from "./schema";

/**
 * Business facts, navigation, ticker and footer. Copy source:
 * docs/content/homepage-copy-v2.md (approved 2026-10-02).
 * TODO_ values are unconfirmed (see docs/BUILD_PLAN.md Phase 0).
 */
export const site = {
  name: "Afrokan Labs",
  domain: "afrokanlabs.com",
  email: "hello@afrokanlabs.com",
  location: "Accra, Ghana",
  // The same fact as `location`, structured for JSON-LD (architecture §8: Accra at city level).
  address: { locality: "Accra", country: "GH" },

  // Confirmed 2026-10-17 (059 606 9011), the number for now.
  whatsappNumber: "+233596069011",
  // Contact form success line: "we'll reply within [X hours] on weekdays".
  replyWithin: "TODO_REPLY_HOURS",

  whatsappPrefill: {
    default: "Hi Afrokan Labs, I run a [type of business] and I'd like to talk about…",
    demo: "Hi Afrokan Labs, I'd like a demo. My business is [name] and we [what you do].",
  },

  demoOffer: { enabled: false },

  // Site update 1, Home "Welcome" strip.
  industries: [
    { label: "Logistics", icon: "truck" },
    { label: "Retail", icon: "bag" },
    { label: "Schools", icon: "cap" },
    { label: "Healthcare", icon: "cross" },
    { label: "Real estate", icon: "house" },
    { label: "Hospitality", icon: "dish" },
    { label: "Service businesses", icon: "person" },
  ],

  // Interface text. Skip link and landmark names: standard wording, not in the copy docs.
  ui: {
    skipLink: "Skip to content",
    opensWhatsApp: "(opens WhatsApp)",
    opensNewTab: "(opens in a new tab)",
    // Copy §2: "Live since [Month Year]"; {date} is filled from the project's liveSince.
    status: { live: "Live", liveSince: "Live since {date}", delivered: "Delivered" },
    nav: {
      main: "Main",
      footer: "Footer",
      social: "Social",
      home: "Afrokan Labs home",
      menu: "Menu",
      close: "Close",
    },
    // Drafted with the privacy page (docs/content/privacy.md), approved 2026-10-02.
    notFound: {
      title: "Page not found",
      body: "This page doesn't exist or has moved.",
      link: "Go to the homepage",
    },
  },

  // homepage-copy-v2 Navigation: Work · Services | logo | Process · About.
  nav: {
    items: [
      { label: "Work", href: "/#work" },
      { label: "Services", href: "/#services" },
      { label: "Process", href: "/#process" },
      { label: "About", href: "/#about" },
    ],
    cta: "Chat with us on WhatsApp",
  },

  // homepage-copy-v2 §10.
  ticker: {
    label: "What we build",
    items: [
      "WhatsApp AI",
      "Web Platforms",
      "Workflow Tools",
      "Backend Systems",
      "Chatbots",
      "Dashboards",
      "Websites",
    ],
  },

  // homepage-copy-v2 §12.
  footer: {
    blurb:
      "AI and software for Ghanaian businesses. WhatsApp assistants, workflow tools and web platforms, built in Accra.",
    columns: {
      company: {
        title: "Company",
        links: [
          { label: "About us", href: "/#about" },
          { label: "Our team", href: "/#about" },
          { label: "Our work", href: "/#work" },
          { label: "Contact", href: "/#contact" },
        ],
      },
      services: {
        title: "Services",
        links: [
          { label: "WhatsApp AI", href: "/#services" },
          { label: "Web platforms", href: "/#services" },
          { label: "Workflow tools", href: "/#services" },
          { label: "Backend systems", href: "/#services" },
        ],
      },
      resources: {
        title: "Resources",
        links: [
          { label: "Case study", href: "/work" },
          { label: "How we work", href: "/#process" },
          { label: "Privacy", href: "/privacy" },
        ],
      },
      contact: { title: "Contact", whatsapp: "WhatsApp" },
    },
    copyright: "© {year} Afrokan Labs. All rights reserved.",
    newsletter: {
      enabled: false,
      title: "Subscribe to our newsletter",
      body: "Occasional notes on AI and software for Ghanaian businesses, plus what we're building.",
      label: "Your email",
      placeholder: "Enter your email",
      submit: "Subscribe",
    },
  },

  // Each icon appears once its URL is set. Delete a line to leave that profile out.
  social: {
    linkedin: "TODO_LINKEDIN_URL",
    x: "TODO_X_URL",
    instagram: "TODO_INSTAGRAM_URL",
  },
} satisfies z.input<typeof Site>;
