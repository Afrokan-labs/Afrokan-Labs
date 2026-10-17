import type { z } from "zod";
import type { Services } from "./schema";

/** Services page copy. Source: the site handoff's reference/services.html (approved). */
export const services = {
  meta: { title: "Services" },
  hero: {
    badge: { bold: "Now taking projects", rest: " — Accra, Ghana" },
    heading: { first: "Tools that work", script: "the", rest: " way you work" },
    lede: "WhatsApp assistants, web platforms and workflow tools for Ghanaian businesses. Pick what you need, or tell us the problem and we'll recommend the right fit.",
    whatsapp: "Talk to us on WhatsApp",
    details: { label: "See every service", href: "#details" },
    tags: ["Your customer", "Your team"],
    start: "Get started",
  },
  details: {
    heading: { lead: "Every ", mark: "service", tail: ", in detail" },
    body: "Each project starts with a free conversation and a written plan, timeline and price before any work begins.",
  },
  // TODO_CONFIRM_SEPARATE_SERVICES: "Backend Systems" and "AI Chatbots" as separate services (TODO.md).
  items: [
    {
      name: "WhatsApp AI Assistants",
      card: { title: "WhatsApp AI", sub: "Assistants that answer 24/7" },
      sub: "An assistant on your WhatsApp Business number that answers customer questions from your own documents, prices and policies, any time of day.",
      goodFor: ["Logistics", "Retail", "Service businesses"],
      points: [
        "Answers from your real documents, not guesses",
        "Hands the chat to a staff member when it should",
        "Works in the app your customers already use",
        "Trained on your business, updated as things change",
      ],
    },
    {
      name: "Web Platforms",
      card: { title: "Web Platforms", sub: "Websites & web apps" },
      sub: "Fast, mobile-first websites and web apps that explain what you do and turn visitors into WhatsApp conversations.",
      goodFor: ["New businesses", "Growing companies"],
      points: [
        "Designed for phones first",
        "Clear WhatsApp and contact buttons on every page",
        "Pages you can update without calling us",
        "Hosting and domain set-up handled",
      ],
    },
    {
      name: "Workflow Tools",
      card: { title: "Workflow Tools", sub: "Checklists, trackers, forms" },
      sub: "Simple internal tools, such as checklists, trackers and forms, built around the way your team already runs.",
      goodFor: ["Operations teams", "Offices on paper"],
      points: [
        "Replace paper files and scattered spreadsheets",
        "Generate documents and checklists in seconds",
        "Everyone sees the same, up-to-date information",
        "Works on the phones your staff already carry",
      ],
    },
    {
      name: "Backend Systems",
      card: { title: "Backend Systems", sub: "Databases & integrations" },
      sub: "The databases, dashboards and integrations that keep your tools connected behind the scenes.",
      goodFor: ["Multi-tool businesses", "Reporting"],
      points: [
        "One place for your business data",
        "Dashboards that show what's happening today",
        "Connects your website, WhatsApp and internal tools",
        "Secure access for the right people",
      ],
    },
    {
      name: "AI Chatbots",
      card: { title: "AI Chatbots", sub: "On your website" },
      sub: "A chat assistant on your website that answers visitors' questions and passes serious enquiries to your team.",
      goodFor: ["Websites with traffic", "Customer support"],
      points: [
        "Answers common questions instantly",
        "Collects the details your team needs",
        "Sends warm leads straight to WhatsApp",
        "Matches your brand's tone",
      ],
    },
  ],
} satisfies z.input<typeof Services>;
