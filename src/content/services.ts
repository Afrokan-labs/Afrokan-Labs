import type { z } from "zod";
import type { Services } from "./schema";

/** Copy source: docs/content/homepage-copy.md §3. */
export const services = {
  section: {
    title: "What we build",
    cta: "Tell us what's slowing your business down",
  },
  // Order is open decision #1 (docs/content/README.md); default is WhatsApp assistant first.
  items: [
    {
      kind: "whatsapp-assistant",
      title: "Answer customers on WhatsApp without tying up your staff",
      body: "WhatsApp AI assistants that draw on your own documents and policies, so customers get accurate answers at any time of day.",
    },
    {
      kind: "workflow-tool",
      title: "Replace paperwork and spreadsheets with tools your team actually uses",
      body: "Simple internal tools, such as checklists, trackers and forms, built around the way your business already runs.",
    },
    {
      kind: "website",
      title: "A website that brings in enquiries, not just a brochure",
      body: "Fast, mobile-first websites that turn visitors into WhatsApp conversations.",
    },
  ],
} satisfies z.input<typeof Services>;
