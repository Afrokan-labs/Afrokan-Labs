import type { z } from "zod";
import type { Team } from "./schema";

/** Copy source: docs/content/homepage-copy.md §5. */
export const team = {
  section: { title: "Who we are" },
  statement:
    "Afrokan Labs is a small team of engineers in Accra. We build for Ghanaian businesses because we understand how they run: on WhatsApp, on mobile, and often on paper. We think software should fit that, not fight it. The people who scope your project are the people who build it.",
  members: [
    {
      name: "Franklin Wiafe",
      role: "Founder",
      // Interim photo until the Phase 0 photo session (docs/AUDIT.md decision 5).
      photo: {
        src: "assets/images/franklin-wiafe.jpg",
        alt: "Franklin Wiafe, founder of Afrokan Labs",
      },
    },
    // Copy §5 lists a second member. Fill in, or delete this entry.
    { name: "TODO_TEAM_MEMBER_2_NAME", role: "TODO_TEAM_MEMBER_2_ROLE" },
  ],
} satisfies z.input<typeof Team>;
