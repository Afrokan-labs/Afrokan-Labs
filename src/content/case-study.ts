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
  // "Have a similar problem? Chat with us on WhatsApp."
  cta: { title: "Have a similar problem?", button: "Chat with us on WhatsApp" },
} satisfies z.input<typeof CaseStudyCopy>;
