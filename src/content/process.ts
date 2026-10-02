import type { z } from "zod";
import type { Process } from "./schema";

/** Copy source: docs/content/homepage-copy.md §4. */
export const workProcess = {
  section: {
    title: "How we work",
    cta: "Start the conversation",
  },
  steps: [
    {
      title: "Understand.",
      body: "We start with a free conversation about the problem, not the technology.",
    },
    {
      title: "Scope and quote.",
      body: "You get a clear plan, timeline and price before any work begins.",
    },
    {
      title: "Build.",
      body: "Regular check-ins, so you see progress along the way, not just at the end.",
    },
    {
      title: "Hand over and support.",
      body: "We train your team and stay available after launch.",
    },
  ],
  // Open decision #3. Approved options:
  //   "Projects are scoped and quoted after a free first conversation."
  //   "Projects start from GH₵[X]."
  // TODO_DUMMY: preview-only dummy value (branch preview/dummy-content). Never merge.
  pricingNote: "Projects are scoped and quoted after a free first conversation.",
} satisfies z.input<typeof Process>;
