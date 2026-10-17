import type { z } from "zod";
import type { Members } from "./schema";

/**
 * The team: About "Members" (site update 1, the cut-outs) and the home page's
 * arches (the photos). Only real people.
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
    linkedin: "TODO_FRANKLIN_LINKEDIN_URL",
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
    photo: { src: "team-cto-kwabena.webp", alt: "Kwabena Mawuli, CTO of Afrokan Labs" },
    linkedin: "TODO_KWABENA_LINKEDIN_URL",
    shape: "triangles",
  },
  {
    name: ["Samuel", "Antwi"],
    abbr: "CIO",
    title: "Chief Information Officer",
    cutout: { src: "team-cio-samuel-cutout.webp", alt: "Samuel Antwi, Chief Information Officer" },
    photo: { src: "team-cio-samuel.webp", alt: "Samuel Antwi, CIO of Afrokan Labs" },
    linkedin: "TODO_SAMUEL_LINKEDIN_URL",
    shape: "diamond",
  },
] satisfies z.input<typeof Members>;
