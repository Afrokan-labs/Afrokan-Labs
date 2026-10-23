import type { z } from "zod";
import type { Home } from "./schema";

/**
 * Home page copy. Source: the site handoff's reference/index.html and site
 * update 1 (approved). meta.description is from docs/content/homepage-copy-v2.md
 * (approved 2026-10-02); the handoff has none.
 */
export const home = {
  meta: {
    title: "Afrokan Labs: AI and software studio in Accra",
    description:
      "WhatsApp AI assistants, workflow tools and web platforms for growing businesses. Tell us what slows your team down and we'll build around it.",
  },
  hero: {
    headline: "Software built for how Ghanaian businesses actually work",
    bigWord: "AFROKAN",
    lede: "WhatsApp AI assistants, workflow tools and web platforms for growing businesses. Tell us what slows your team down and we'll build around it.",
    workLink: { label: "See our work", href: "#work" },
    startProject: { label: "Start your project", href: "#contact" },
    whatsapp: "Chat on WhatsApp",
    badge: { big: "Ghana-first", small: "AI & software studio, Accra" },
    phone: {
      label: "Example: an AI assistant answering a customer on WhatsApp",
      name: "Your Business",
      online: "online",
      typing: "typing…",
      chat: [
        ["out", "Hi, are you open this Saturday?"],
        ["in", "Yes! We’re open 9am to 2pm on Saturdays. Would you like me to book you a slot?"],
        ["out", "Yes please, 10am"],
        ["in", "Done ✅ You’re booked for Saturday at 10am. We’ll send a reminder on Friday."],
      ],
    },
  },
  stats: {
    label: "Quick facts",
    items: [
      // Exactly three: ESE Logistic's assistant, checklist tool and website.
      { value: "3", label: "Systems delivered" },
      { value: "24/7", label: "AI assistant replies" },
      { value: "100", unit: "%", label: "Mobile-first builds" },
      { value: "4", unit: "-step", label: "Clear delivery process" },
    ],
  },
  welcome: {
    eyebrow: "Welcome to Afrokan Labs",
    headline: { lead: "Your next best business", tail: "decision starts here" },
    intro:
      "We're a small engineering team in Accra building WhatsApp assistants, web platforms and workflow tools. Look at what we've shipped, and let the work do the talking.",
    team: {
      eyebrow: "About the team",
      heading: ["Engineering first.", "Always."],
      body: "We start with how your business actually runs, then design and build the tools around it. The people who scope your project are the people who write the code.",
      buttons: [
        { label: "More about us", href: "/about" },
        { label: "See services", href: "/services" },
      ],
    },
    mini: {
      title: "WhatsApp assistant, checklist tool and website for ESE Logistic",
      cta: { label: "See details", href: "/work#cases" },
      image: { src: "work-bg-port.webp", alt: "" },
    },
    photo: { src: "team-ceo-franklin.webp", alt: "Franklin Asare Wiafe, CEO of Afrokan Labs" },
    stats: [
      {
        value: "3",
        unit: "×",
        label: "Tools delivered for ESE Logistic",
        note: "↑ One client, three systems",
      },
      {
        value: "24/7",
        unit: ".",
        label: "WhatsApp answers, day or night",
        note: "↑ Answers after hours",
      },
    ],
    stripLabel: "Industries we build for",
  },
  ideas: {
    badge: "AI · SOFTWARE · ACCRA · GHANA · BUILT FOR GHANA ·",
    eyebrow: "Who we are",
    heading: ["Turning ideas into", "working software"],
    body: "We may be a small team, but we scope, build and support every project ourselves. Working hand-in-hand with you, we turn the problems that slow your business down into tools your staff and customers actually use.",
    banner: ["An AI & software", "studio in Accra"],
    // TODO_REPLACE_TEAM_PHOTO: not the founders. Swap in a real photo of Franklin,
    // Kwabena and Samuel, then name them in the alt text (launch:check warns until then).
    wide: {
      src: "home-ideas-team.webp",
      alt: "Three people working together at laptops around a table in a bright office",
    },
    tall: { src: "home-ideas-thinker.webp", alt: "" },
  },
  orbit: {
    eyebrow: "One studio, every piece",
    heading: { lead: "Everything your business runs on, ", mark: "working together" },
    body: "WhatsApp assistants, websites, workflow tools and the systems behind them. We design each piece to fit the others, so moving from manual to automated feels like one smooth change.",
    cta: { label: "Explore our services", href: "/services" },
    sliders: [
      ["Manual", "Automated"],
      ["Slow", "Instant"],
      ["Paper", "Digital"],
    ],
    tiles: {
      ai: "AI",
      hello: "Akwaaba.",
      always: "24/7",
      ghana: "GH",
      card: [
        "Afrokan Labs",
        "An AI and software studio in Accra, building tools that fit how Ghanaian businesses already work.",
      ],
    },
  },
  services: {
    side: ["Our services:", "what we build"],
    heading: ["Four ways we help", "your business run"],
    guide: ["A short guide", "for new clients"],
    tag: "Service",
    items: [
      {
        href: "/services#svc-1",
        title: ["WhatsApp", "AI", "assistants"],
        body: "Answers customer questions on your WhatsApp Business number from your own documents and prices, any time of day.",
      },
      {
        href: "/services#svc-2",
        title: ["Web", "platforms", "that sell"],
        body: "Fast, mobile-first websites and web apps that explain what you do and turn visitors into WhatsApp conversations.",
      },
      {
        href: "/services#svc-3",
        title: ["Workflow", "tools", "for your team"],
        body: "Checklists, trackers and forms that replace paper files and scattered spreadsheets, built around how your team already works.",
      },
      {
        href: "/services#svc-4",
        title: ["Backend", "systems", "that connect"],
        body: "The databases, dashboards and integrations that keep your website, WhatsApp and internal tools working together.",
      },
    ],
    cta: { label: "See every service in detail", href: "/services" },
  },
  work: {
    watermark: "Delivered",
    notch: "Three tools, one delivery",
    tab: "CASE STUDY",
    heading: { lead: "Featured ", mark: "Work" },
    titles: {
      "ese-logistic": "A WhatsApp assistant that answers ESE Logistic's clients day and night",
    },
    caseStudy: { label: "Read the full case study", href: "/work#cases" },
    whatsapp: "Chat with us on WhatsApp",
    fields: { client: "Client", industry: "Industry", status: "Status", built: "Built" },
    builtLabels: {
      "whatsapp-assistant": "WhatsApp AI assistant",
      "workflow-tool": "Internal tool",
      website: "Website",
    },
  },
  words: {
    sectionLabel: "Listen, build, support",
    label: "Listen. Build. Support.",
    items: ["Listen", "Build", "Support"],
  },
  process: {
    eyebrow: "Process",
    heading: { lead: "How we ", mark: "work" },
    body: "Four steps from first conversation to launch. You always know what's happening, what it costs and what comes next.",
    steps: [
      {
        chip: "Free first conversation",
        title: "Understand the problem",
        body: "We start with a conversation about what's slowing your business down, not about technology. We listen to how your team and customers actually work today, on WhatsApp, on the phone and on paper.",
        link: { label: "Start the conversation", href: "#contact" },
      },
      {
        chip: "Clear plan before work starts",
        title: "Scope and quote",
        body: "You get a written plan with what we'll build, how long it takes and exactly what it costs. Nothing starts until you're happy with it, so there are no surprises halfway through.",
        link: { label: "See our services", href: "/services" },
      },
      {
        chip: "Check-ins every week",
        title: "Build, with you watching",
        body: "We build in short steps and show you progress along the way, not just at the end. You test early versions with your own team and tell us what to change while it's still easy to change.",
        link: { label: "See a project we built", href: "#work" },
      },
      {
        chip: "We stay after launch",
        title: "Hand over and support",
        body: "We train your team on what we built, hand over everything you need, and stay available to fix, adjust and improve it as your business grows.",
        link: { label: "Meet the team", href: "/about" },
      },
    ],
    visuals: {
      gauge: { value: "GH₵0", label: "First call", note: "Free" },
      quote: { total: "Total price", fixed: "Fixed" },
      checklist: {
        items: ["Problem defined", "Timeline agreed", "Price fixed"],
        ready: "Ready to start",
      },
      checkIn: { title: "Week 3 check-in", sub: "WhatsApp assistant", progress: "Progress 60%" },
      handover: {
        items: ["Team trained", "Guides handed over", "Ongoing support"],
        live: "Live",
        launched: "Launched & supported",
      },
    },
  },
  team: {
    heading: { first: "The people", middle: "building", brand: "Afrokan", last: "Labs" },
    body: "We're a small team in Accra. The people who scope your project are the people who build it, so you always know who you're talking to.",
    join: { label: "Join our team", href: "#contact" },
    linkedinLabel: "{name} on LinkedIn",
  },
  project: {
    heading: { lead: "Start your project", mark: "journey" },
    // "Free first call" restates the GH₵0 first call (TODO.md "Copy to confirm").
    steps: ["Free first call", "Written plan & price", "We build, you watch"],
    start: { label: "Start your project", href: "/contact" },
    whatsapp: "Chat on WhatsApp",
    word: "BUILD",
    chip: ["The team who", "scopes it builds it"],
    badge: "LET'S BUILD · LET'S BUILD · LET'S BUILD ·",
  },
  contact: {
    heading: "Get in Touch Today!",
    body: "Have a problem in your business we could solve? Whether it's a WhatsApp assistant, a simple internal tool or a full web platform, leave your email and we'll reach out within {replyWithin}.",
    emailLabel: "Your email",
    emailPlaceholder: "Enter your email",
    submit: "Contact Us",
    invalid: "Enter a valid email address, like name@company.com.",
    whatsapp: "Prefer WhatsApp? Chat with us",
    callout: ["Based in Accra,", "building for", "all of Ghana"],
    map: { label: "Map of Ghana with Accra marked", pin: "Accra" },
  },
} satisfies z.input<typeof Home>;
