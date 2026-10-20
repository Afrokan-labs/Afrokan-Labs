import type { z } from "zod";
import type { Packages } from "./schema";

/** Services "Our packages" and the CEO line. Source: site update 2 §6 (reference/services.html). */
export const packages = {
  heading: "Our packages",
  note: "Here are the ways we usually work with businesses. Every project is scoped and priced for you before work begins.",
  suffix: "package",
  href: "/contact",
  items: [
    {
      name: "Starter",
      featured: false,
      for: "For businesses that need a proper website that brings in enquiries.",
      includes: ["Website or web app", "WhatsApp button", "Hosting set up"],
      art: "site",
    },
    {
      name: "Growth",
      featured: true,
      for: "For businesses ready to answer customers on WhatsApp, day and night.",
      includes: ["Everything in Starter", "WhatsApp AI assistant", "Staff hand-off"],
      art: "whatsapp",
    },
    {
      name: "Complete",
      featured: false,
      for: "For businesses that want their whole workflow off paper.",
      includes: ["Everything in Growth", "Workflow tools", "Dashboards & backend"],
      art: "dashboard",
    },
  ],
  quote: {
    label: "A note from our CEO",
    before: "Keep ",
    pill: "building",
    after: " until your",
    line2: "business ",
    highlight: "runs itself.",
    name: "Franklin Asare Wiafe",
    role: "CEO, Afrokan Labs",
  },
} satisfies z.input<typeof Packages>;
