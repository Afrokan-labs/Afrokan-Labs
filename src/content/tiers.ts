import type { z } from "zod";
import type { TierCopy } from "./schema";

/**
 * Tier-dependent copy, chosen in src/lib/content.ts from nameApproved and
 * status (architecture §4). Source: docs/content/homepage-copy.md §1 and §2.
 * {client} is the client name at the named tier, else the anonymised label.
 */
export const tierCopy = {
  proofLine: {
    live: "Built and running for {client}.",
    delivered: "Built for {client}.",
  },
  conversationCaption: {
    named: "A real exchange with {short}'s live assistant.",
    anonymised: "A real exchange with a live assistant we built.",
    // The approved captions both say "live". No wording exists yet for a
    // system that is delivered but not confirmed live.
    delivered: "TODO_CAPTION_DELIVERED",
  },
  /**
   * Read before each bubble by screen readers (design-system §8 ChatThread).
   * The anonymised assistant label is not in the docs; it avoids naming the client.
   */
  speakerLabels: {
    customer: "Customer:",
    assistantNamed: "{short} assistant:",
    assistantAnonymised: "Assistant:",
  },
  /** Short client names used in captions at the named tier, by project slug. */
  shortNames: {
    "ese-logistic": "ESE",
  },
} satisfies z.input<typeof TierCopy>;
