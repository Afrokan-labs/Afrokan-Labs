import type { z } from "zod";
import type { About } from "./schema";

/**
 * About page copy. Source: the site handoff's reference/about.html and site
 * update 1 (approved). The team itself is in team.ts.
 */
export const about = {
  meta: {
    title: "About",
    description:
      "Afrokan Labs is a small AI and software studio in Accra. Meet the founders and see how we work: a clear price before work starts, and we stay after launch.",
  },
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
    lead: "We started Afrokan Labs as students at the University of Ghana, after seeing how much time local businesses spend on work a simple system could handle: answering the same questions, sorting documents, following up on leads. So we started building those systems, designed for how Ghanaian businesses actually work: WhatsApp first, mobile first, and easy for staff to use. We're three founders, and every project starts with one question: what's slowing your team down?",
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
  members: { title: "Members", leadsLabel: "Team leads" },
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
  highlight: {
    heading: ["Team highlight", "of the week"],
    hint: "Drag to explore →",
    drag: "‹ DRAG ›",
    label: "Team highlights. Scroll sideways to see more.",
    tiles: [
      {
        label: "Franklin · CEO",
        src: "team-ceo-franklin-cutout.webp",
        kind: "cut",
        tone: "green",
      },
      // TODO_REPLACE_TEAM_PHOTO: the pack uses home-ideas-team here, but those aren't
      // the founders. Until there's a real team photo, this shows work they shipped.
      { label: "Team at work", src: "work-ese-checklist.webp", kind: "photo", tone: "black" },
      { label: "Kwabena · CTO", src: "team-cto-kwabena-cutout.webp", kind: "cut", tone: "sand" },
      { label: "Problem solving", src: "home-ideas-thinker.webp", kind: "photo", tone: "sage" },
      { label: "Samuel · CIO", src: "team-cio-samuel-cutout.webp", kind: "cut", tone: "deep" },
      { label: "ESE Logistic", src: "work-bg-port.webp", kind: "photo", tone: "green" },
    ],
  },
  values: {
    heading: { lead: "What we ", mark: "believe" },
    body: "Four ideas shape how we take on every project, from a single WhatsApp assistant to a full platform.",
    speak: "Speak to us",
    href: "/contact",
    items: [
      {
        theme: "green",
        shape: "s1",
        tag: "#builtforghana",
        headline: "Software should fit how you already work.",
        sub: "Your customers are on WhatsApp. We build for that.",
        by: "CEO",
      },
      {
        theme: "black",
        shape: "s3",
        tag: "#ourteam",
        headline: "The people who scope it build it.",
        // TODO_REPLACE_TEAM_PHOTO: the pack uses home-ideas-team here. No people until
        // it's the real team: a stranger's face beside Kwabena's name would read as him.
        photo: { src: "work-bg-skyline.webp", tone: "soft" },
        by: "CTO",
      },
      {
        theme: "deep",
        shape: "s4",
        tag: "#afterlaunch",
        headline: "We stay after launch.",
        sub: "We train your team, then stay to fix, adjust and improve.",
        // No people on purpose: a stranger's face beside Samuel's name would read as him.
        photo: { src: "work-bg-desk.webp", tone: "mono" },
        by: "CIO",
      },
      {
        theme: "sand",
        shape: "s2",
        tag: "#clearprice",
        headline: "A clear price before work starts. Always.",
        sub: "Plan, timeline and price, in writing, up front.",
        by: "CEO",
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
