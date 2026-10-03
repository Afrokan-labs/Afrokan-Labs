import type { z } from "zod";
import type { Home } from "./schema";

/** Copy source: docs/content/homepage-copy-v2.md (approved 2026-10-02, claims included). */
export const home = {
  meta: {
    title: "Afrokan Labs | AI & software for Ghanaian businesses",
    description:
      "WhatsApp AI assistants, workflow tools and web platforms for growing businesses. Tell us what slows your team down and we'll build around it.",
  },
  hero: {
    headline: "Software built for how Ghanaian businesses actually work",
    lede: "WhatsApp AI assistants, workflow tools and web platforms for growing businesses. Tell us what slows your team down and we'll build around it.",
    primaryCta: "Chat with us on WhatsApp",
    workLink: "See our work",
    startProject: "Start your project",
    whatsapp: "Chat on WhatsApp",
    badge: { title: "Ghana-first", line: "AI & software studio, Accra" },
    // Interim photo until a cut-out portrait arrives (NOTES-AND-ASSETS §1).
    photo: {
      src: "assets/images/franklin-wiafe.jpg",
      alt: "Franklin Wiafe, founder of Afrokan Labs",
    },
  },
  stats: {
    label: "Quick facts",
    items: [
      { value: "3", suffix: "+", label: "Systems delivered" },
      { value: "24/7", label: "WhatsApp replies" },
      { value: "100", suffix: "%", label: "Mobile-first builds" },
      { value: "4", suffix: "-step", label: "Clear delivery process" },
    ],
  },
  ideas: {
    title: "Turning ideas into working software",
    body: "We may be a small team, but we scope, build and support every project ourselves. Working hand-in-hand with you, we turn the problems that slow your business down into tools your staff and customers actually use.",
    banner: ["An AI & software", "studio in Accra"],
    // PLACEHOLDER images until the real photos arrive (NOTES-AND-ASSETS §3).
    wide: {
      src: "assets/images/PLACEHOLDER-ideas-team-wide.jpg",
      alt: "Placeholder for a photo of the team at work",
    },
    tall: {
      src: "assets/images/PLACEHOLDER-ideas-portrait-tall.jpg",
      alt: "Placeholder for a portrait of a teammate",
    },
  },
  featured: {
    tab: "CASE STUDY",
    heading: { lead: "Featured", mark: "Work" },
    // Section title per project slug (homepage-copy.md §2).
    // TODO_VERIFY_FASTER: "faster" is a result claim marked [verify]; confirm with ESE or reword.
    titles: {
      "ese-logistic": "Helping a clearing and forwarding firm answer customers faster",
    },
    caseStudyLink: "Read the full case study",
    whatsappCta: "Chat with us on WhatsApp",
    fields: { client: "Client", industry: "Industry", status: "Status", built: "Built" },
    // Shown only at the full tier, when a confirmed result exists.
    resultLabel: "Result",
  },
  words: { label: "Innovate. Inspire. Create.", items: ["Innovate", "Inspire", "Create"] },
  offer: {
    title: "See it working on your business",
    body: "Send us the 10 questions your customers ask most. We'll show you how an assistant would answer them.",
    cta: "Send your questions on WhatsApp",
  },
  contact: {
    title: "Get in Touch Today!",
    body: "Have a problem in your business we could solve? Whether it's a WhatsApp assistant, a simple internal tool or a full web platform, leave your email and we'll reach out within one working day.",
    emailLabel: "Your email",
    emailPlaceholder: "Enter your email",
    submit: "Contact Us",
    invalid: "Enter a valid email address, like name@company.com.",
    whatsapp: "Prefer WhatsApp? Chat with us",
    // PLACEHOLDER until a cut-out photo arrives (NOTES-AND-ASSETS §11).
    image: {
      src: "assets/images/PLACEHOLDER-contact-cutout.png",
      alt: "Placeholder for a cut-out photo of a person",
    },
  },
} satisfies z.input<typeof Home>;
