import type { z } from "zod";
import type { About } from "./schema";

/**
 * About page copy. Source: the site handoff's reference/about.html and site
 * update 1 (approved). The team itself is in team.ts.
 */
export const about = {
  meta: { title: "About" },
  hero: {
    eyebrow: "About us",
    heading: { first: "we're a", second: "small AI", third: { lead: "studio in ", mark: "Accra" } },
    workLink: { label: "See our work", href: "/#work" },
    intro:
      "We build software that fits how Ghanaian businesses run: on WhatsApp, on mobile, and often on paper.",
    collageLabel: "The team",
  },
  pile: {
    label: "What we do",
    items: [
      "WhatsApp AI",
      "Web Platforms",
      "Chatbots",
      "Workflow Tools",
      "Dashboards",
      "Backend Systems",
      "Websites",
      "Automation",
    ],
  },
  proof: {
    caption: "Our first client project, delivered",
    value: "3",
    lines: ["systems built for", "ESE Logistic"],
  },
  story: {
    label: "Our story",
    from: "Started at the University of Ghana, Legon",
    // TODO_CONFIRM_ORIGIN_STORY: "started as a group of students at the University of Ghana" (TODO.md).
    lead: "Afrokan Labs started as a group of students at the University of Ghana who kept seeing the same thing.",
    old: {
      label: "How businesses were running",
      items: [
        { label: "WhatsApp chats", icon: "chat" },
        { label: "Phone calls", icon: "phone" },
        { label: "Paper files", icon: "paper" },
      ],
      tail: "…with software that wasn't built for them.",
    },
    new: { label: "So we started building", big: ["for how", "Ghana works."] },
    facts: [
      { label: "Based in", value: "Accra, Ghana", icon: "pin" },
      {
        label: "We build",
        value: "AI, web & workflow tools",
        icon: "code",
        chips: [
          { label: "AI", icon: "chat" },
          { label: "Web", icon: "browser" },
          { label: "Workflow", icon: "checklist" },
        ],
      },
    ],
  },
  members: { title: "Members" },
  philosophy: {
    eyebrow: "Our philosophy",
    heading: ["Engineer-led", "Built on your workflow"],
    body: "We don't just make things look good. We build systems around how your business really works, so they keep paying off after launch.",
    cards: [
      {
        title: "Problem audits",
        icon: "audit",
        body: "We look at how enquiries, paperwork and data move through your business today and find where time is being lost.",
      },
      {
        title: "Workflow systems",
        icon: "systems",
        body: "We build WhatsApp assistants, tools and platforms that connect, so customers and staff get answers without chasing anyone.",
      },
      {
        title: "Measurable results",
        icon: "results",
        body: "We agree up front what success looks like, from faster replies to less paperwork, and check it after launch.",
      },
    ],
  },
  values: {
    heading: { lead: "What we ", mark: "believe" },
    body: "Four ideas shape how we take on every project, from a single WhatsApp assistant to a full platform.",
    items: [
      {
        icon: "whatsapp",
        title: "Software should fit how you already work",
        body: "Your customers are on WhatsApp and your staff are on their phones. We build for that, instead of asking everyone to change their habits.",
      },
      {
        icon: "people",
        title: "The people who scope it build it",
        body: "No hand-offs to a team you've never met. You talk to the engineers writing your code from the first call to launch.",
      },
      {
        icon: "document",
        title: "A clear price before any work starts",
        body: "You get a written plan, timeline and price up front, so there are no surprises halfway through.",
      },
      {
        icon: "shield",
        title: "We stay after launch",
        body: "We train your team on what we built and stay available to fix, adjust and improve it as your business grows.",
      },
    ],
  },
  road: {
    heading: { lead: "Where we're ", mark: "headed" },
    body: "We're starting at home and growing step by step: from one city, to one country, to a continent.",
    here: "You are here",
    stops: [
      {
        tag: "Now",
        place: "Accra",
        kicker: "Today",
        title: "Web solutions for Ghanaian companies",
        body: "Websites, AI chatbots and workflow systems for businesses that want to serve customers faster.",
      },
      {
        tag: "Next",
        place: "Ghana",
        kicker: "Building towards",
        title: "AI products for the Ghanaian market",
        body: "Turning what we learn from client work into AI tools built for local businesses.",
      },
      {
        tag: "Later",
        place: "Africa",
        kicker: "The bigger picture",
        title: "Across Africa",
        body: "Taking what works in Ghana to businesses in other African markets.",
      },
    ],
  },
} satisfies z.input<typeof About>;
