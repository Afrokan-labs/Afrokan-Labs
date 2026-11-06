import type { z } from "zod";
import type { Leads, Members } from "./schema";

/**
 * The team: About "Members" (site update 1, the cut-outs) and the home page's
 * arches (the photos). Only real people. The `highlight` pills are the update
 * pack's placeholders until Franklin confirms them (TODO.md).
 */
export const members = [
  {
    name: ["Franklin", "Asare Wiafe"],
    abbr: "CEO",
    title: "Chief Executive Officer",
    cutout: {
      src: "team-ceo-franklin-cutout.webp",
      alt: "Franklin Asare Wiafe, Chief Executive Officer",
    },
    photo: { src: "team-ceo-franklin.webp", alt: "Franklin Asare Wiafe, CEO of Afrokan Labs" },
    linkedin: "https://www.linkedin.com/in/franklin-asare-wiafe",
    shape: "circles",
    highlight: { label: "Leads", value: "Product & clients" },
  },
  {
    name: ["Kwabena", "Mawuli"],
    abbr: "CTO",
    title: "Chief Technology Officer",
    cutout: {
      src: "team-cto-kwabena-cutout.webp",
      alt: "Kwabena Mawuli, Chief Technology Officer",
    },
    photo: { src: "team-cto-kwabena.webp", alt: "Kwabena Mawuli, CTO of Afrokan Labs" },
    linkedin: "https://www.linkedin.com/in/kwabena-nyamekye-mawuli-595309276",
    shape: "triangles",
    highlight: { label: "Builds", value: "WhatsApp AI" },
  },
  {
    name: ["Samuel", "Antwi"],
    abbr: "CIO",
    title: "Chief Information Officer",
    cutout: { src: "team-cio-samuel-cutout.webp", alt: "Samuel Antwi, Chief Information Officer" },
    photo: { src: "team-cio-samuel.webp", alt: "Samuel Antwi, CIO of Afrokan Labs" },
    linkedin: "https://www.linkedin.com/in/samuel-kojo-anafi-antwi",
    shape: "diamond",
    highlight: { label: "Runs", value: "Systems & data" },
  },
] satisfies z.input<typeof Members>;

/** The team leads (update 5 §3), kept apart from the three founders. */
export const leads = [
  {
    name: ["Emmanuel", "Otoo"],
    role: "Head of Product Management",
    cutout: {
      src: "team-lead-emmanuel-cutout.webp",
      alt: "Emmanuel Otoo, Head of Product Management",
    },
    shape: "ring",
    pill: "p1",
    highlight: { label: "Focus", value: "Product management" },
  },
  {
    name: ["Ohenewaa", "Owusu"],
    role: "Head of Marketing & Outreach",
    cutout: {
      src: "team-lead-ohenewaa-cutout.webp",
      alt: "Ohenewaa Owusu, Head of Marketing and Outreach",
    },
    shape: "plus",
    pill: "p2",
    highlight: { label: "Focus", value: "Marketing & outreach" },
  },
] satisfies z.input<typeof Leads>;
