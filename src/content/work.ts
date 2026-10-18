import type { z } from "zod";
import type { Work } from "./schema";

/**
 * Work page copy. Source: the site handoff's reference/work.html (approved).
 * The case cards link to ESE's live pages and show screenshots of them (2026-10-18,
 * replacing the drawn mocks; ESE approved naming and screenshots in writing).
 */
export const work = {
  meta: { title: "Work" },
  hero: {
    heading: { lead: "Software we've shipped ", for: "for", rest: "Ghanaian businesses" },
    big: "work.",
    photo: {
      src: "work-hero-samuel.webp",
      alt: "Samuel Antwi, CIO of Afrokan Labs, in an Afrokan Labs hoodie",
    },
    intro:
      "Afrokan Labs works with businesses to build tools that feel simple, save time, and fit how customers and staff already work.",
    cases: { label: "See our case studies", href: "#cases" },
  },
  approach: {
    label: "Our approach",
    statement:
      "We build for impact where it matters most: logistics, retail, schools and service businesses that run on WhatsApp. Our work is built to answer customers faster, take paperwork off your team, and keep working long after launch.",
    cols: [
      {
        icon: "strategy",
        title: "Strategy",
        body: "Problem discovery, user research, scoping and pricing",
      },
      {
        icon: "build",
        title: "Build",
        body: "WhatsApp AI assistants, web platforms, workflow tools",
      },
      {
        icon: "support",
        title: "Support",
        body: "Team training, maintenance and ongoing improvements",
      },
    ],
  },
  cases: {
    heading: "Case studies",
    year: "(2026)",
    items: [
      {
        mock: "phone",
        href: "https://eselogisticssolutions.com/assistant",
        screenshot: {
          src: "work-ese-assistant.webp",
          alt: "ESE's assistant page on a phone: a customer asks which documents clear cosmetics, and the assistant answers",
        },
        label: "ESE Logistic WhatsApp AI assistant",
        title: "ESE Logistic: WhatsApp AI assistant",
        tags: "AI · WhatsApp · Logistics",
        background: { src: "work-bg-port.webp", alt: "" },
      },
      {
        mock: "checklist",
        href: "https://eselogisticssolutions.com/tools/document-checklist?entry=acc",
        screenshot: {
          src: "work-ese-checklist.webp",
          alt: "ESE's document checklist with Vehicles & spare parts picked, listing the documents needed at Accra airport",
        },
        label: "ESE Logistic document checklist generator",
        title: "ESE Logistic: Checklist generator",
        tags: "Workflow tool · Internal",
        background: { src: "work-bg-desk.webp", alt: "" },
      },
      {
        mock: "website",
        href: "https://eselogisticssolutions.com/",
        screenshot: {
          src: "work-ese-website.webp",
          alt: 'The ESE Logistics home page: "The world, delivered responsibly" over a cargo plane being loaded',
        },
        label: "ESE Logistic website",
        title: "ESE Logistic: Company website",
        tags: "Web platform · Marketing",
        background: { src: "work-bg-skyline.webp", alt: "" },
      },
    ],
    newTab: "(opens in a new tab)",
    open: {
      href: "/contact",
      title: "Your project could be next",
      cta: "Start a conversation",
      name: "Open slot",
      tags: "Retail · Schools · Healthcare · More",
    },
    mocks: {
      checklist: {
        title: "Document checklist",
        field: "Cargo type: Vehicle",
        button: "Generate",
        count: "3/5",
        countLabel: "documents ready",
      },
      website: ["ESE Logistic", "Solution Ltd"],
    },
  },
} satisfies z.input<typeof Work>;
