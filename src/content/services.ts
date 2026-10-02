import type { z } from "zod";
import type { Services } from "./schema";

/** Copy source: docs/content/homepage-copy-v2.md §4 (approved 2026-10-02). */
export const services = {
  tab: "WHAT WE DO",
  heading: { lead: "Our", mark: "Services" },
  body: "We build AI and software tools that help Ghanaian businesses serve customers faster and run smoother.",
  // `kind` links a row to a project's `built` list; `tag` labels it on case studies.
  items: [
    {
      kind: "whatsapp-assistant",
      tag: "WhatsApp AI assistant",
      name: "WhatsApp AI Assistants",
      body: "Assistants that answer customers on WhatsApp from your own documents and policies, any time of day.",
    },
    {
      kind: "website",
      tag: "Website",
      name: "Web Platforms",
      body: "Fast, mobile-first websites and web apps that turn visitors into WhatsApp conversations.",
    },
    {
      kind: "workflow-tool",
      tag: "Internal tool",
      name: "Workflow Tools",
      body: "Checklists, trackers and forms that replace paperwork and spreadsheets, built around how your team already works.",
    },
    {
      name: "Backend Systems",
      body: "The databases, dashboards and integrations that keep everything connected behind the scenes.",
    },
  ],
  // PLACEHOLDER until the real photo arrives (NOTES-AND-ASSETS §4).
  image: {
    src: "assets/images/PLACEHOLDER-services-at-work.jpg",
    alt: "Placeholder for a photo of someone at work",
  },
  ring: "Afrokan Labs · Afrokan Labs · Afrokan Labs · Afrokan Labs ·",
  cards: {
    process: {
      text: "Ever wondered how a project goes from idea to launch?",
      label: "See how we work",
    },
    contact: {
      text: "Looking for a team who can turn your idea into a working product?",
      label: "Talk to our team",
    },
  },
} satisfies z.input<typeof Services>;
