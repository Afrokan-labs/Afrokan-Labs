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
  // Business hours (Accra time, GMT). Shown as "Mon–Sat, 8am–5pm" under the
  // phone number, and as openingHoursSpecification in the JSON-LD.
  hours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "17:00",
  },
  // "We'll reply within …" on Contact, the form success message, the auto-reply
  // email and the home contact box. Changed from "24 hours" on 2026-10-23 to fit
  // the Mon–Sat hours.
  replyWithin: "1 business day",
  // The home project banner's status pill (update 2 §5). Set to "" to hide it.
  availability: "Taking new projects this month",

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

  // The 404 page (site handoff brief "Routes").
  notFound: {
    title: "Page not found",
    code: "404",
    heading: "This page doesn't exist or has moved.",
    home: "Back home",
  },

  // The closing box on About, Services, Solutions and Work (site handoff reference .x-cta).
  ctaBox: {
    heading: { lead: "Have a problem in your business we could ", mark: "solve?" },
    body: "Tell us what's slowing your team down. The first conversation is free.",
    whatsapp: "Chat with us on WhatsApp",
    email: "or email {email}",
  },

  // Interface text. Skip link and landmark names: standard wording, not in the copy docs.
  ui: {
    skipLink: "Skip to content",
    opensWhatsApp: "(opens WhatsApp)",
    opensNewTab: "(opens in a new tab)",
    // Each social link's accessible name, e.g. "Afrokan Labs on Instagram".
    socialLabel: "{name} on {platform}",
    // The number as text on Contact and in the footer, with a Call and a WhatsApp link.
    phone: {
      label: "Phone",
      call: "Call",
      callLabel: "Call {name} on {number}",
      whatsapp: "WhatsApp",
      whatsappLabel: "Message {name} on WhatsApp",
      hours: "{hours} · WhatsApp anytime",
    },
    // Copy §2: "Live since [Month Year]"; {date} is filled from the project's liveSince.
    status: { live: "Live", liveSince: "Live since {date}", delivered: "Delivered" },
    nav: {
      main: "Main",
      footer: "Footer",
      social: "Social",
      home: "Afrokan Labs home",
      menu: "Menu",
      close: "Close",
      // Update 7 §2: the nav's right pill; the short label under 900px.
      book: "Book a free call",
      bookShort: "Book a call",
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

  // The home page's crossing bands (update 2 §3). Band 2 runs the list in reverse.
  ticker: {
    label: "What we build",
    items: [
      { label: "WhatsApp AI", icon: "chat" },
      { label: "Web platforms", icon: "browser" },
      { label: "Workflow tools", icon: "checklist" },
      { label: "Backend systems", icon: "database" },
      { label: "Dashboards", icon: "chart" },
      { label: "Chatbots", icon: "bot" },
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

  // The one place for the social profiles: site footer, Contact page, JSON-LD
  // sameAs, both contact emails and the email signatures. Each appears once its
  // URL is set; delete a line to leave that profile out.
  social: {
    x: "https://x.com/afrokanlabs",
    instagram: "https://instagram.com/afrokanlabs",
    linkedin: "https://linkedin.com/company/afrokanlabs",
  },
  // Email signature tagline: the homepage meta title (home.meta.title), after the name.
  tagline: "AI and software studio in Accra",
  // The hello@ email signatures (src/lib/email-signature.ts).
  emailSignature: { team: "The {name} Team", whatsapp: "WhatsApp" },
} satisfies z.input<typeof Site>;
