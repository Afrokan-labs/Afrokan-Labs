/**
 * TEST FIXTURES for the homepage tier rules (BUILD_PLAN 2.4 acceptance).
 * Not content: every string is marked as test data, and these projects only
 * render on /_fixtures/*, which is deleted before launch (BUILD_PLAN 5.1).
 * Parsed with the real Project schema, so the tier rules still apply.
 */
import { Project } from "../content/schema";

const base = {
  slug: "ese-logistic",
  published: true,
  featured: true,
  order: 1,
  industry: "Clearing and forwarding",
  status: "live",
  liveSince: "2026-05",
  built: ["whatsapp-assistant", "workflow-tool", "website"],
  summary: {
    problem: "Sample problem sentence (test data).",
    solution: "Sample solution sentence (test data).",
  },
  conversation: {
    fromStaffTestNumber: true,
    clientApproved: true,
    messages: [
      { speaker: "customer", text: "Sample customer question (test data)" },
      { speaker: "assistant", text: "Sample assistant answer (test data)" },
    ],
  },
  images: [],
  seo: { title: "Fixture", description: "Fixture (test data)" },
} as const;

export const fixtures = {
  /** No published project: no Featured work, proof line or case-study link. */
  none: [],
  /** Anonymised tier: described, not named; no result or testimonial. */
  anonymised: [
    Project.parse({
      ...base,
      client: {
        name: "Fixture Client Ltd (test data)",
        descriptionApproved: true,
        nameApproved: false,
        anonymisedLabel: "A Ghanaian clearing and forwarding firm",
      },
    }),
  ],
  /** Named (full) tier: real name, result and testimonial. */
  named: [
    Project.parse({
      ...base,
      client: {
        name: "Fixture Client Ltd (test data)",
        descriptionApproved: true,
        nameApproved: true,
        anonymisedLabel: "A Ghanaian clearing and forwarding firm",
      },
      result: { text: "Sample confirmed result (test data).", confirmed: true },
      testimonial: {
        quote: "Sample approved testimonial (test data).",
        name: "Sample Name",
        role: "Sample Role",
        writtenPermission: true,
      },
    }),
  ],
};

export type FixtureName = keyof typeof fixtures;

// Stand-in image for the case-study fixtures: a real file, so it is in the image manifest.
const fixtureImage = (showsClientBranding: boolean) => ({
  src: "assets/images/franklin-wiafe.jpg",
  alt: "Stand-in image for the fixture (test data)",
  piiRedacted: true as const,
  clientApproved: true as const,
  showsClientBranding,
});

/** Case study fixtures (BUILD_PLAN 3.1 acceptance), rendered on /_fixtures/case-study/*. */
export const caseStudyFixtures = {
  /** Anonymised: formerBrand is set on purpose, to prove the page does not show it. */
  anonymised: Project.parse({
    ...base,
    formerBrand: "Deuel's Designs",
    client: { ...fixtures.anonymised[0].client },
    images: [fixtureImage(false)],
  }),
  /** Named (full tier): name, attribution, branded image, result and testimonial. */
  named: Project.parse({
    ...fixtures.named[0],
    formerBrand: "Deuel's Designs",
    images: [fixtureImage(true)],
  }),
};

export type CaseStudyFixtureName = keyof typeof caseStudyFixtures;
