/**
 * Insights articles (reference insights.html "All articles"). None is
 * written yet, so each is "Coming soon"; a published one gets a body (MDX)
 * and a slug later. TODO-CONTENT.md "Later": first Insights articles.
 */
export type ArticleCategory = "Guides" | "AI" | "Workflows" | "Case study";

export type Article = {
  category: ArticleCategory;
  title: string;
  summary: string;
  status: "soon";
};

/** The newsletter box under the list stays off until there is a provider (TODO-CONTENT.md). */
export const SHOW_NEWSLETTER = false;

export const articles: Article[] = [
  {
    category: "Guides",
    title: "Why your customers would rather WhatsApp you than visit your website",
    summary: "What that means for how you answer enquiries, and where a website still matters.",
    status: "soon",
  },
  {
    category: "AI",
    title: "What a WhatsApp AI assistant can and can't do for your business",
    summary: "A plain-language look at what to expect before you invest in one.",
    status: "soon",
  },
  {
    category: "Case study",
    title: "How we built a document checklist generator for a clearing firm",
    summary: "The problem at ESE Logistic, what we built, and what we'd do differently.",
    status: "soon",
  },
  {
    category: "Workflows",
    title: "From paper files to a simple tracker: a starter guide",
    summary: "How to move one process off paper without disrupting your team.",
    status: "soon",
  },
  {
    category: "Guides",
    title: "What goes into the cost of a business website in Ghana",
    summary: "The parts that make up a quote, so you can compare offers fairly.",
    status: "soon",
  },
  {
    category: "AI",
    title: "Website chatbot or WhatsApp assistant: which one do you need?",
    summary: "How to choose based on where your customers already talk to you.",
    status: "soon",
  },
  {
    category: "Workflows",
    title: "Getting your team to actually use a new tool",
    summary:
      "Small habits that make the difference between a tool that sticks and one that's ignored.",
    status: "soon",
  },
  {
    category: "Guides",
    title: "Keeping customer data safe under Ghana's Data Protection Act",
    summary: "The basics every business collecting phone numbers and emails should know.",
    status: "soon",
  },
];
