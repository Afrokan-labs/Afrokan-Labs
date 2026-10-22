import type { z } from "zod";
import type { Articles, Insights } from "./schema";

/** Insights page copy. Source: the site handoff's reference/insights.html (approved). */
export const insights = {
  meta: {
    title: "Insights",
    description:
      "Practical articles on automation, WhatsApp AI and software for Ghanaian businesses, from website costs to data protection. New articles go live one by one.",
  },
  heading:
    "Afrokan Labs Insights: articles on automation, WhatsApp AI, building and growing businesses in Ghana",
  board: {
    automate: ["Aut", "mate"],
    connect: ["C", "nnect"],
    build: "Build",
    grow: "Grow",
    shine: ["Sh", "ne"],
    deploy: ["Depl", "y"],
    small: ["Workflows", "WhatsApp AI", "Ghana first", "Case studies", "Guides"],
  },
  search: { label: "Search articles", placeholder: "Search", submit: "Search" },
  recommended: {
    heading: "Recommended articles",
    seeAll: { label: "See all", href: "#all" },
    soon: "Soon",
  },
  comingSoon: "Coming soon",
  all: {
    heading: { lead: "All ", mark: "articles" },
    body: "Practical notes on AI, WhatsApp and software for Ghanaian businesses. We're writing these now; they'll go live one by one.",
    filterLabel: "Filter by topic",
    allLabel: "All",
    categories: {
      Guides: "Guides",
      AI: "AI",
      Workflows: "Workflows",
      "Case study": "Case studies",
    },
  },
  empty: {
    lead: "No articles match that search yet. Try another word, or ",
    link: { label: "ask us directly", href: "/contact" },
    tail: ".",
  },
  // Off until there is a provider (TODO.md "Newsletter: yes or no, and which provider").
  newsletter: {
    enabled: false,
    heading: "Get new articles when they're published",
    body: "One short email when something new goes live. No spam, and you can unsubscribe any time.",
    label: "Your email",
    placeholder: "Enter your email",
    submit: "Notify me",
    preview: "Preview only: email signup isn’t connected yet.",
    invalid: "Enter a valid email address, like name@company.com.",
  },
} satisfies z.input<typeof Insights>;

/**
 * The articles ("All articles"; the first four are also "Recommended").
 * None is written yet, so each is "Coming soon". TODO.md "Later": the first articles.
 */
export const articles = [
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
] satisfies z.input<typeof Articles>;
