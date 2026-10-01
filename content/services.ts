export type Service = {
  title: string;
  body: string;
  examples: string;
};

export const servicesIntro = {
  title: "What we build",
  body: "Three kinds of work, often combined. Most clients start with one and add the others as the first one pays off.",
};

export const services: Service[] = [
  {
    title: "Websites",
    body: "Fast, mobile-first sites that explain what you do and turn visitors into enquiries. Built to load well on Ghanaian mobile data, and easy for your team to update.",
    examples: "Company sites, landing pages, online catalogues",
  },
  {
    title: "AI assistants and chatbots",
    body: "Assistants that answer customer questions on WhatsApp or your website, using your own documents, prices and policies, so your staff stop answering the same question fifty times a day.",
    examples: "WhatsApp assistants, website chat, internal knowledge bots",
  },
  {
    title: "Backend and workflow systems",
    body: "The tools behind the counter: dashboards, document generators, booking and records systems that replace spreadsheets, paper forms and copy-paste work.",
    examples: "Admin dashboards, document generators, automations",
  },
];
