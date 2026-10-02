import type { z } from "zod";
import type { Process } from "./schema";

/** Copy source: docs/content/homepage-copy-v2.md §7 (approved 2026-10-02). */
export const workProcess = {
  heading: { lead: "How we", mark: "work" },
  body: "Four steps from first conversation to launch. You always know what's happening, what it costs and what comes next.",
  steps: [
    {
      title: "Understand",
      body: "We start with a free conversation about the problem, not the technology.",
    },
    {
      title: "Scope and quote",
      body: "You get a clear plan, timeline and price before any work begins.",
    },
    {
      title: "Build",
      body: "Regular check-ins, so you see progress along the way, not just at the end.",
    },
    {
      title: "Hand over and support",
      body: "We train your team and stay available after launch.",
    },
  ],
  cta: "Start the conversation",
} satisfies z.input<typeof Process>;
