import type { z } from "zod";
import type { CaseStudyCopy } from "./schema";

/**
 * Case study page copy. Source: docs/content/case-studies/ese-logistics.md
 * (page structure, attribution wording and the closing CTA).
 */
export const caseStudy = {
  // Named tier only, once the client confirms the attribution.
  attribution: "Delivered by Afrokan Labs (formerly {formerBrand})",
  headings: { howItWorks: "How it works", result: "Result" },
  // Work index heading: the approved nav label (homepage-strategy.md, Navigation).
  workIndex: {
    title: "Work",
    // TODO_APPROVE_SEO_DRAFT: drafted in docs/content/seo.md, awaiting approval.
    description:
      "Projects Afrokan Labs has built for Ghanaian businesses: WhatsApp AI assistants, workflow tools and web platforms.",
  },
  // "Have a similar problem? Chat with us on WhatsApp."
  cta: { title: "Have a similar problem?", button: "Chat with us on WhatsApp" },
} satisfies z.input<typeof CaseStudyCopy>;
