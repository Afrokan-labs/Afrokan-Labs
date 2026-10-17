import type { z } from "zod";
import type { Members, Team } from "./schema";

/**
 * Copy source: docs/content/homepage-copy-v2.md §8 (approved 2026-10-02).
 * Only real people. Members with unconfirmed names or roles are left out.
 */
export const team = {
  heading: { lead: "Meet", mark: "the Team" },
  join: "Join our team",
  members: [
    {
      name: "Franklin Wiafe",
      role: "Founder",
      bio: "Leads product and engineering at Afrokan Labs. Information Technology student at the University of Ghana and researcher in its HCI lab.",
      linkedin: "TODO_FRANKLIN_LINKEDIN_URL",
      // Interim photo until the Phase 0 photo session (docs/AUDIT.md decision 5).
      photo: {
        src: "assets/images/franklin-wiafe.jpg",
        alt: "Franklin Wiafe, founder of Afrokan Labs",
      },
    },
    // Fill in each real member (NOTES-AND-ASSETS §8), or delete this entry.
    { name: "TODO_TEAM_MEMBER_2_NAME", role: "TODO_TEAM_MEMBER_2_ROLE" },
  ],
} satisfies z.input<typeof Team>;

/** About "Members" (site update 1). Cut-outs: assets/images/team-*-cutout.webp. */
export const members = [
  {
    name: ["Franklin", "Asare Wiafe"],
    abbr: "CEO",
    title: "Chief Executive Officer",
    cutout: {
      src: "team-ceo-franklin-cutout.webp",
      alt: "Franklin Asare Wiafe, Chief Executive Officer",
    },
    shape: "circles",
  },
  {
    name: ["Kwabena", "Mawuli"],
    abbr: "CTO",
    title: "Chief Technology Officer",
    cutout: {
      src: "team-cto-kwabena-cutout.webp",
      alt: "Kwabena Mawuli, Chief Technology Officer",
    },
    shape: "triangles",
  },
  {
    name: ["Samuel", "Antwi"],
    abbr: "CIO",
    title: "Chief Information Officer",
    cutout: { src: "team-cio-samuel-cutout.webp", alt: "Samuel Antwi, Chief Information Officer" },
    shape: "diamond",
  },
] satisfies z.input<typeof Members>;
