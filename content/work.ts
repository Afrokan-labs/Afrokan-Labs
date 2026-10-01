export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  /** Short summary shown on the home page and as the page description. */
  summary: string;
  facts: { label: string; value: string }[];
  /** Label for the main visual placeholder. */
  visualLabel: string;
  /** Long-form sections for /work/[slug]. Each string is one paragraph. */
  problem: string[];
  built: string[];
  result: string[];
  /**
   * Illustrative chat transcript from the original site's WhatsApp mock-up.
   * Not rendered in the skeleton; kept for the final design.
   */
  illustration?: {
    caption: string;
    assistantName: string;
    messages: { from: "customer" | "assistant"; text: string }[];
  };
};

export const workTitle = "Recent work";

export const work: CaseStudy[] = [
  {
    slug: "ese-logistic-solution-limited",
    client: "ESE Logistic Solution Limited",
    title: "A website, a document tool and a WhatsApp assistant for a logistics company",
    summary:
      "ESE's customers kept asking the same questions about shipments and paperwork. We built them a marketing website, a generator that tells each customer exactly which documents to prepare, and an AI assistant on WhatsApp that answers questions from ESE's own information, day or night.",
    facts: [
      { label: "Delivered", value: "Website, document checklist generator, WhatsApp AI assistant" },
      { label: "Built under", value: "Deuel's Designs, an Afrokan Labs product" },
    ],
    visualLabel: "ESE case study screenshot",
    problem: [
      "ESE's customers kept asking the same questions about shipments and paperwork.",
      "TODO: Describe how ESE handled these questions before, and what it cost them in staff time.",
    ],
    built: [
      "We built them a marketing website, a generator that tells each customer exactly which documents to prepare, and an AI assistant on WhatsApp that answers questions from ESE's own information, day or night.",
      "TODO: Add detail on each piece: the website, the document checklist generator and the WhatsApp assistant.",
    ],
    result: ["TODO: Add the outcome for ESE. Only use results the client has confirmed."],
    illustration: {
      caption: "Illustration of the assistant's flow",
      assistantName: "ESE Assistant",
      messages: [
        { from: "customer", text: "Hi, which documents do I need for my import shipment?" },
        {
          from: "assistant",
          text: "For most imports you'll need the bill of lading, commercial invoice and packing list. Tell me what you're shipping and I'll send your full checklist.",
        },
        { from: "customer", text: "Used vehicle from the UK" },
        { from: "assistant", text: "Got it. Here's your checklist 📄" },
      ],
    },
  },
];

export function getCaseStudy(slug: string) {
  return work.find((c) => c.slug === slug);
}
