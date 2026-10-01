/** Copy for the home page sections that aren't lists of data. */

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#products", label: "Products" },
  { href: "/#team", label: "Team" },
];

export const navCta = { label: "Start a project", href: "/#contact" };

export const navMenu = {
  openLabel: "Menu",
  closeLabel: "Close",
  contactHeading: "Say hello",
  /** City and IANA time zone for the live clock in the nav. */
  clock: { city: "Accra", timeZone: "Africa/Accra", zoneLabel: "GMT" },
};

export const hero = {
  title: "Software and AI built for the way Ghanaian businesses work.",
  lede: "Afrokan Labs builds websites, AI assistants and backend systems that take repetitive work off your team's hands. We start in Ghana, and we're building for the whole continent.",
  primary: { label: "Start a project", href: "#contact" },
  secondary: { label: "See our work", href: "#work" },
};

export const mission = {
  title: "Ghana first. Then the rest of Africa.",
  body: "Most software is designed somewhere else and adapted for us later. We do it the other way round: we build for how businesses here actually operate, with mobile money, WhatsApp-first customers and patchy connections in mind. What works in Accra becomes the base for products across the continent.",
};

export const contact = {
  title: "Start a project",
  body: "Tell us what's slowing your business down. We'll reply within two working days with questions or a first idea.",
  whatsappLabel: "Chat with us",
  bookingLabel: "Book a 20-minute call",
};

export const contactForm = {
  serviceOptions: [
    "A website",
    "An AI assistant or chatbot",
    "A backend or workflow system",
    "Not sure yet",
  ],
  sentTitle: "Message sent.",
  sentBody: "We reply within two working days. If it's urgent, email",
};

/** Shared copy for /work/[slug] pages. */
export const caseStudyPage = {
  backLabel: "← All work",
  sectionTitles: { problem: "The problem", built: "What we built", result: "The result" },
  ctaTitle: "Start a project",
  ctaLabel: "Get in touch",
  ctaHref: "/#contact",
};

export const notFoundPage = {
  eyebrow: "404",
  title: "We couldn't find that page.",
  body: "The link may be broken, or the page may have moved.",
  linkLabel: "Back to the home page",
};
