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
    linkedin: "https://www.linkedin.com/in/franklin-asare-wiafe",
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
    linkedin: "https://www.linkedin.com/in/kwabena-nyamekye-mawuli-595309276",
    shape: "triangles",
  },
  {
    name: ["Samuel", "Antwi"],
    abbr: "CIO",
    title: "Chief Information Officer",
    cutout: { src: "team-cio-samuel-cutout.webp", alt: "Samuel Antwi, Chief Information Officer" },
    photo: { src: "team-cio-samuel.webp", alt: "Samuel Antwi, CIO of Afrokan Labs" },
    linkedin: "https://www.linkedin.com/in/samuel-kojo-anafi-antwi",
    shape: "diamond",
  },
] satisfies z.input<typeof Members>;
