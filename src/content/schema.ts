/**
 * Content schemas. These are the content rules from docs/architecture.md §4,
 * enforced by the build rather than by memory: content that breaks a rule
 * fails `pnpm content:validate` and `pnpm build`.
 */
import { z } from "zod";

/**
 * An unconfirmed business fact. Dev and preview builds accept these;
 * `pnpm launch:check` fails while any remain (BUILD_PLAN 1.5).
 */
export const Todo = z.string().regex(/^TODO_[A-Z0-9_]+$/, "Placeholders look like TODO_SOME_FACT");
const orTodo = <T extends z.ZodType>(schema: T, expected: string) =>
  z.union([schema, Todo], {
    error: `Expected ${expected}, or a TODO_ placeholder until it is confirmed`,
  });

export const BuiltKind = z.enum(["whatsapp-assistant", "workflow-tool", "website"]);

// ----- Projects: docs/architecture.md §4, copied verbatim -----

// prettier-ignore
const Image = z.object({
  src: z.string(),
  alt: z.string().min(10),
  piiRedacted: z.literal(true),         // customer details blurred
  clientApproved: z.literal(true),      // client OK'd showing this screenshot
  showsClientBranding: z.boolean(),     // client name/logo visible in the image?
});

// prettier-ignore
const Conversation = z.object({
  fromStaffTestNumber: z.literal(true), // never real customer messages
  clientApproved: z.literal(true),
  messages: z.array(z.object({
    speaker: z.enum(["customer", "assistant"]),
    text: z.string().min(1).max(500),
  })).min(2),
});

// prettier-ignore
export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  featured: z.boolean().default(false),
  order: z.number(),

  client: z.object({
    name: z.string(),
    descriptionApproved: z.boolean(),   // tier: anonymised (OK to describe at all)
    nameApproved: z.boolean(),          // tier: named
    anonymisedLabel: z.string(),        // "A Ghanaian clearing and forwarding firm"
  }),
  industry: z.string(),
  status: z.enum(["live", "delivered"]),
  liveSince: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(), // "2026-05"
  formerBrand: z.string().optional(),   // "Deuel's Designs"; rendered at named tier only

  built: z.array(z.enum(["whatsapp-assistant", "workflow-tool", "website"])),
  summary: z.object({
    problem: z.string().max(280),
    solution: z.string().max(280),
  }),

  // Optional on purpose: if unconfirmed, the block is omitted, never filled
  result: z.object({ text: z.string(), confirmed: z.literal(true) }).optional(),
  testimonial: z.object({
    quote: z.string(), name: z.string(), role: z.string(),
    writtenPermission: z.literal(true),
  }).optional(),
  conversation: Conversation.optional(),

  images: z.array(Image),
  seo: z.object({ title: z.string().max(60), description: z.string().max(155) }),
}).superRefine((p, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, message });

  if (p.published && !p.client.descriptionApproved)
    fail("Cannot publish without the client's OK to describe the work (anonymised tier).");
  if (p.status === "live" && !p.liveSince)
    fail('status "live" requires liveSince.');
  if (!p.client.nameApproved) {
    if (p.result || p.testimonial)
      fail("Result and testimonial require the named tier (nameApproved).");
    if (p.images.some((i) => i.showsClientBranding))
      fail("An image shows client branding but the client name is not approved.");
  }
});

// ----- Site facts -----

const NavLink = z.object({
  label: z.string().min(1),
  href: z.string().regex(/^\/(?!\/)/, "Internal links start with a single /"),
});

/** A heading with one highlighted phrase (design-system §1 rule 4), e.g. "Our [Services]". */
export const Heading = z.object({
  lead: z.string(),
  mark: z.string().min(1),
  tail: z.string().optional(),
});
export type Heading = z.infer<typeof Heading>;

/** A source image in assets/images/ (optimised by scripts/optimize-images.ts) and its alt text. */
const Picture = z.object({ src: z.string().startsWith("assets/images/"), alt: z.string().min(10) });

export const Site = z.object({
  name: z.literal("Afrokan Labs"),
  domain: z.string(),
  email: z.email(),
  location: z.string(),
  /** schema.org PostalAddress for JSON-LD: city level only (architecture §8). */
  address: z.object({ locality: z.string().min(1), country: z.string().regex(/^[A-Z]{2}$/) }),
  /** E.164, e.g. +233201234567. The only place the number exists. */
  whatsappNumber: orTodo(
    z.string().regex(/^\+[1-9]\d{7,14}$/),
    "an E.164 number such as +233201234567",
  ),
  /**
   * The home project banner's status pill (update 2 §5), e.g. "Taking new
   * projects this month". Empty hides the pill.
   */
  availability: z.string(),
  /** Fills the contact form's "we'll reply within ___". */
  replyWithin: orTodo(z.string().min(1), 'a reply time such as "4 hours"'),
  /**
   * Prefilled WhatsApp messages. Brackets are prompts for the visitor and ship as written.
   * Both open with "Hi Afrokan Labs," so site-origin chats can be counted (architecture §7).
   */
  whatsappPrefill: z.object({
    default: z.string().startsWith("Hi Afrokan Labs,"),
    demo: z.string().startsWith("Hi Afrokan Labs,"),
  }),
  /** Open decision #2 (docs/content/README.md). Off until decided. */
  demoOffer: z.object({ enabled: z.boolean() }),
  /** Home "Welcome" strip (site update 1): sectors we build for, each with a line icon. */
  industries: z
    .array(
      z.object({
        label: z.string().min(1),
        icon: z.enum(["truck", "bag", "cap", "cross", "house", "dish", "person"]),
      }),
    )
    .min(1),
  /** The 404 page (exported as 404.html). */
  notFound: z.object({
    title: z.string().min(1),
    code: z.string().min(1),
    heading: z.string().min(1),
    home: z.string().min(1),
  }),
  /** The closing box on About, Services, Solutions and Work (reference .x-cta). */
  ctaBox: z.object({
    heading: z.object({ lead: z.string(), mark: z.string().min(1) }),
    body: z.string().min(1),
    whatsapp: z.string().min(1),
    /** "or email {email}". */
    email: z.string().includes("{email}"),
  }),
  ui: z.object({
    skipLink: z.string().min(1),
    opensWhatsApp: z.string().min(1),
    opensNewTab: z.string().min(1),
    socialLabel: z.string().includes("{name}").includes("{platform}"),
    status: z.object({
      live: z.string().min(1),
      liveSince: z.string().includes("{date}"),
      delivered: z.string().min(1),
    }),
    nav: z.object({
      main: z.string().min(1),
      footer: z.string().min(1),
      social: z.string().min(1),
      home: z.string().min(1),
      menu: z.string().min(1),
      close: z.string().min(1),
    }),
    notFound: z.object({
      title: z.string().min(1),
      body: z.string().min(1),
      link: z.string().min(1),
    }),
  }),
  /** Header pill: two links each side of the logo. */
  nav: z.object({ items: z.array(NavLink).length(4), cta: z.string().min(1) }),
  /** The home page's crossing bands (update 2 §3): each item with its line icon. */
  ticker: z.object({
    label: z.string().min(1),
    items: z
      .array(
        z.object({
          label: z.string().min(1),
          icon: z.enum(["chat", "browser", "checklist", "database", "chart", "bot"]),
        }),
      )
      .min(3),
  }),
  footer: z.object({
    blurb: z.string().min(1),
    columns: z.object({
      company: z.object({ title: z.string().min(1), links: z.array(NavLink).min(1) }),
      services: z.object({ title: z.string().min(1), links: z.array(NavLink).min(1) }),
      resources: z.object({ title: z.string().min(1), links: z.array(NavLink).min(1) }),
      contact: z.object({ title: z.string().min(1), whatsapp: z.string().min(1) }),
    }),
    copyright: z.string().includes("{year}"),
    /** Switched off until a provider is chosen (homepage-copy-v2 §12). */
    newsletter: z.object({
      enabled: z.boolean(),
      title: z.string().min(1),
      body: z.string().min(1),
      label: z.string().min(1),
      placeholder: z.string().min(1),
      submit: z.string().min(1),
    }),
  }),
  /** Profiles; each icon shows only once its URL is confirmed. */
  social: z.object({
    x: orTodo(z.url(), "the X profile URL").optional(),
    instagram: orTodo(z.url(), "the Instagram profile URL").optional(),
    linkedin: orTodo(z.url(), "the LinkedIn page URL").optional(),
  }),
  tagline: z.string().min(1),
  emailSignature: z.object({ team: z.string().includes("{name}"), whatsapp: z.string().min(1) }),
});

/** About "Members" (site update 1): real people only, each with a transparent cut-out. */
export const Members = z
  .array(
    z.object({
      /** Two lines, drawn uppercase: first name, then the rest. */
      name: z.tuple([z.string().min(1), z.string().min(1)]),
      abbr: z.string().min(2),
      title: z.string().min(1),
      cutout: z.object({ src: z.string().endsWith(".webp"), alt: z.string().min(10) }),
      /** The home page's arch portrait. */
      photo: z.object({ src: z.string().endsWith(".webp"), alt: z.string().min(10) }),
      linkedin: orTodo(z.url(), "their LinkedIn URL"),
      shape: z.enum(["circles", "triangles", "diamond"]),
    }),
  )
  .min(1);

/**
 * Home "What our clients really say" (site update 1). Open slots are
 * invitations, not reviews. A quote shows only when the client is real and
 * the quote is approved (`quote`); until then `placeholder` fills the slot.
 * Never add star ratings, and never pair a person's photo with words they
 * didn't give.
 */
export const Reviews = z
  .array(
    z
      .object({
        id: z.string().min(1),
        real: z.boolean(),
        /** The client's approved words. Only allowed when `real` is true. */
        quote: z.string().min(1).max(400).optional(),
        placeholder: z.string().min(1),
        fact: z.string().min(1),
        name: z.string().min(1),
        /** "Sector · Delivered" or "Sector · Open slot". */
        role: z.string().min(1),
        /** The thumbnail's caption. */
        sector: z.string().min(1),
        image: z.string().endsWith(".webp"),
        cta: z.object({ label: z.string().min(1), href: z.string().startsWith("/") }),
      })
      .refine((r) => r.real || !r.quote, "Only a real client can have a quote"),
  )
  .min(1);

/** Real, approved quotes only. An empty list hides the section (design-system §7). */
export const Testimonials = z.object({
  label: z.string().min(1),
  labels: z.object({ previous: z.string().min(1), next: z.string().min(1) }),
  items: z.array(
    z.object({
      quote: z.string().min(1).max(400),
      name: z.string().min(1),
      role: z.string().min(1),
      company: z.string().min(1),
      photo: Picture.optional(),
      writtenPermission: z.literal(true),
    }),
  ),
});

export type Project = z.infer<typeof Project>;
export type Site = z.infer<typeof Site>;
export type Testimonials = z.infer<typeof Testimonials>;
export type Members = z.infer<typeof Members>;
export type Reviews = z.infer<typeof Reviews>;
export type BuiltKind = z.infer<typeof BuiltKind>;

export const TierCopy = z.object({
  proofLine: z.object({
    live: z.string().includes("{client}"),
    delivered: z.string().includes("{client}"),
  }),
  conversationCaption: z.object({
    named: z.string().includes("{short}"),
    anonymised: z.string().min(1),
    delivered: orTodo(z.string().min(1), "a caption for a delivered (not live) system"),
  }),
  speakerLabels: z.object({
    customer: z.string().min(1),
    assistantNamed: z.string().includes("{short}"),
    assistantAnonymised: z.string().min(1),
  }),
  shortNames: z.record(z.string(), z.string()),
});
export type TierCopy = z.infer<typeof TierCopy>;

const text = z.string().min(1);
/** A heading drawn over several lines (the reference breaks with <br>). */
const Lines = z.array(text).min(1);
/** A site-relative link or an in-page anchor, e.g. "/services" or "#contact". */
const Href = z.string().regex(/^(\/(?!\/)|#)/, "Links start with a single / or #");
const Link = z.object({ label: text, href: Href });
/** An image in assets/images/ (by file name, as Img takes it) and its alt text. */
const Photo = z.object({ src: z.string().endsWith(".webp"), alt: z.string().min(10) });
/** A decorative image: alt is empty on purpose. */
const Decorative = z.object({ src: z.string().endsWith(".webp"), alt: z.literal("") });
/** A stat with its unit drawn small, e.g. "3" + "+". */
const Stat = z.object({ value: text, unit: z.string().optional(), label: text });

/** The home page (site handoff reference/index.html plus site update 1). */
export const Home = z.object({
  meta: z.object({ title: text, description: z.string().max(155) }),
  hero: z.object({
    headline: text,
    /** Update 2 §2: the giant outlined word behind the hero card (decorative). */
    bigWord: text,
    lede: text,
    workLink: Link,
    startProject: Link,
    whatsapp: text,
    badge: z.object({ big: text, small: text }),
    /** The phone demo: a made-up conversation for "Your Business", clearly an example. */
    phone: z.object({
      label: z.string().min(10),
      name: text,
      online: text,
      typing: text,
      chat: z.array(z.tuple([z.enum(["in", "out"]), text])).min(2),
    }),
  }),
  stats: z.object({ label: text, items: z.array(Stat).min(1) }),
  welcome: z.object({
    eyebrow: text,
    headline: z.object({ lead: text, tail: text }),
    intro: text,
    team: z.object({
      eyebrow: text,
      heading: z.tuple([text, text]),
      body: text,
      buttons: z.tuple([Link, Link]),
    }),
    mini: z.object({ title: text, cta: Link, image: Decorative }),
    photo: Photo,
    stats: z.array(Stat.extend({ note: text })).length(2),
    stripLabel: text,
  }),
  ideas: z.object({
    /** Update 2 §4: the words round the rotating badge at the section's top right. */
    badge: text,
    eyebrow: text,
    heading: Lines,
    body: text,
    banner: Lines,
    wide: Photo,
    tall: Decorative,
  }),
  orbit: z.object({
    eyebrow: text,
    heading: Heading,
    body: text,
    cta: Link,
    sliders: z.array(z.tuple([text, text])).length(3),
    /** The text tiles in the orbit animation (decorative, aria-hidden). */
    tiles: z.object({
      ai: text,
      hello: text,
      always: text,
      ghana: text,
      card: z.tuple([text, text]),
    }),
  }),
  services: z.object({
    side: Lines,
    heading: Lines,
    guide: Lines,
    tag: text,
    items: z
      .array(
        z.object({
          href: Href,
          /** Three parts: the middle one carries the "00 - n Service" tag. */
          title: z.tuple([text, text, text]),
          body: text,
        }),
      )
      .length(4),
    cta: Link,
  }),
  work: z.object({
    watermark: text,
    notch: text,
    tab: text,
    heading: Heading,
    /** Section title per project slug. */
    titles: z.record(z.string(), text),
    caseStudy: Link,
    whatsapp: text,
    fields: z.object({ client: text, industry: text, status: text, built: text }),
    builtLabels: z.record(BuiltKind, text),
  }),
  words: z.object({ label: text, items: z.array(text).length(3) }),
  process: z.object({
    eyebrow: text,
    heading: Heading,
    body: text,
    steps: z.array(z.object({ chip: text, title: text, body: text, link: Link })).length(4),
    /** Text inside the drawn step visuals (decorative, aria-hidden). */
    visuals: z.object({
      gauge: z.object({ value: text, label: text, note: text }),
      quote: z.object({ total: text, fixed: text }),
      checklist: z.object({ items: z.tuple([text, text, text]), ready: text }),
      checkIn: z.object({ title: text, sub: text, progress: text }),
      handover: z.object({ items: z.tuple([text, text, text]), live: text, launched: text }),
    }),
  }),
  team: z.object({
    heading: z.object({ first: text, middle: text, brand: text, last: text }),
    body: text,
    join: Link,
    linkedinLabel: text,
  }),
  reviews: z.object({
    eyebrow: text,
    heading: z.object({ first: text, lead: text, mark: text }),
    delivered: text,
    openSlot: text,
    choose: text,
    show: text,
  }),
  /** Update 2 §5: "Start your project journey", just before Get in Touch. */
  project: z.object({
    /** "Start your project" then the tilted green word. */
    heading: z.object({ lead: text, mark: text }),
    /** The three numbered step pills. */
    steps: z.array(text).length(3),
    start: Link,
    whatsapp: text,
    /** The giant outlined word behind the team (decorative). */
    word: text,
    /** The white chip over the photo, in two lines. */
    chip: Lines,
    /** The words round the black rotating badge. */
    badge: text,
  }),
  contact: z.object({
    heading: text,
    body: text,
    emailLabel: text,
    emailPlaceholder: text,
    submit: text,
    invalid: text,
    whatsapp: text,
    callout: Lines,
    map: z.object({ label: z.string().min(10), pin: text }),
  }),
});
export type Home = z.infer<typeof Home>;

/** The about page (site handoff reference/about.html plus site update 1). */
export const About = z.object({
  meta: z.object({ title: text, description: z.string().max(155).optional() }),
  hero: z.object({
    eyebrow: text,
    /** Three lines; the drawn shapes sit between them. The last ends on the marked word. */
    heading: z.object({ first: text, second: text, third: Heading }),
    workLink: Link,
    intro: text,
    collageLabel: text,
  }),
  pile: z.object({ label: text, items: z.array(text).min(3) }),
  proof: z.object({ caption: text, value: text, lines: Lines }),
  /** Update 4 §2: "Our story", before → after (reference "OUR STORY (revamp)"). */
  story: z.object({
    label: text,
    /** The outlined pill by the label, with a graduation-cap icon. */
    from: text,
    lead: text,
    old: z.object({
      label: text,
      /** Struck through, one by one, when the row scrolls into view. */
      items: z.array(z.object({ label: text, icon: z.enum(["chat", "phone", "paper"]) })).min(1),
      tail: text,
    }),
    new: z.object({ label: text, big: Lines }),
    facts: z
      .array(
        z.object({
          label: text,
          value: text,
          icon: z.enum(["pin", "code"]),
          chips: z
            .array(z.object({ label: text, icon: z.enum(["chat", "browser", "checklist"]) }))
            .optional(),
        }),
      )
      .min(1),
  }),
  members: z.object({ title: text }),
  philosophy: z.object({
    eyebrow: text,
    heading: z.tuple([text, text]),
    body: text,
    cards: z
      .array(z.object({ title: text, icon: z.enum(["audit", "systems", "results"]), body: text }))
      .length(3),
  }),
  values: z.object({
    heading: Heading,
    body: text,
    items: z
      .array(
        z.object({
          icon: z.enum(["whatsapp", "people", "document", "shield"]),
          title: text,
          body: text,
        }),
      )
      .min(1),
  }),
  /** Update 4 §3: the reach timeline. The first stop is "now"; each stop adds a ring. */
  road: z.object({
    heading: Heading,
    body: text,
    /** The pill after the first stop's word. */
    here: text,
    stops: z
      .array(z.object({ tag: text, place: text, kicker: text, title: text, body: text }))
      .length(3),
  }),
});
export type About = z.infer<typeof About>;

/** The services page (site handoff reference/services.html). */
export const Services = z.object({
  meta: z.object({ title: text, description: z.string().max(155).optional() }),
  hero: z.object({
    badge: z.object({ bold: text, rest: text }),
    /** "Tools that work" / "the" (script) "way you work". */
    heading: z.object({ first: text, script: text, rest: text }),
    lede: text,
    whatsapp: text,
    details: Link,
    /** The two pointer tags around the card fan (decorative). */
    tags: z.tuple([text, text]),
    /** On the front card of the fan. */
    start: text,
  }),
  details: z.object({
    heading: Heading,
    body: text,
    /** Update 3: the tab panel's labels. "{n}" and "{total}" fill "Service 01 / 05". */
    tabs: z.object({
      label: text,
      counter: z.string().includes("{n}").includes("{total}"),
      features: text,
      goodFor: text,
      ask: Link,
    }),
  }),
  /** In page order: the n-th item is tab and panel #svc-n. */
  items: z
    .array(
      z.object({
        name: text,
        card: z.object({ title: text, sub: text }),
        sub: text,
        goodFor: z.array(text).min(1),
        points: z.array(text).min(1),
      }),
    )
    .length(5),
});
export type Services = z.infer<typeof Services>;

/** Update 2 §6: "Our packages" and the CEO line on Services, before the closing box. No prices. */
export const Packages = z.object({
  heading: text,
  note: text,
  /** The second line of every card title: "Starter" / "package". */
  suffix: text,
  href: Href,
  items: z
    .array(
      z.object({
        name: text,
        /** The filled green card. */
        featured: z.boolean(),
        for: text,
        /** Joined with " · " on the card. */
        includes: z.array(text).min(1),
        /** The drawing on the card's bottom tab. */
        art: z.enum(["site", "whatsapp", "dashboard"]),
      }),
    )
    .length(3)
    .refine((items) => items.filter((i) => i.featured).length <= 1, "At most one featured package"),
  /** "Keep [building] until your / business [runs itself.]" */
  quote: z.object({
    label: text,
    before: text,
    pill: text,
    after: text,
    line2: text,
    highlight: text,
    name: text,
    role: text,
  }),
});
export type Packages = z.infer<typeof Packages>;

/** The solutions page (site handoff reference/solutions.html). */
export const Solutions = z.object({
  meta: z.object({ title: text, description: z.string().max(155).optional() }),
  poster: z.object({
    label: z.string().min(10),
    /** Each moment's pill: "@ {time}" under its title. */
    pillTime: z.string().includes("{time}"),
    kicker: Lines,
    heading: z.object({ lead: text, bold: text }),
    tagline: z.object({ tag: text, rest: text }),
  }),
  day: z.object({
    heading: Heading,
    body: text,
    labels: z.object({ before: text, with: text }),
    moments: z
      .array(z.object({ time: text, title: text, before: text, with: text, tool: text }))
      .length(4),
  }),
  /** "Built for businesses like yours": the rows are in src/content/industries.ts. */
  industries: z.object({ heading: Heading, body: text }),
});
export type Solutions = z.infer<typeof Solutions>;

/** Update 4 §1: the Solutions industry index (an accordion; the first row starts open). */
export const Industries = z.object({
  status: z.object({ delivered: text, fit: text }),
  labels: z.object({
    /** Screen-reader name of the chat box: the chats are illustrative. */
    chat: text,
    question: text,
    assistant: text,
    /** "What we built" on a delivered row, "What we'd build" on the rest. */
    built: text,
    wouldBuild: text,
    changes: text,
  }),
  items: z
    .array(
      z.object({
        name: text,
        /** "delivered" only for an industry we've actually delivered for. */
        status: z.enum(["delivered", "fit"]),
        question: text,
        reply: text,
        tools: z
          .array(
            z.object({
              label: text,
              icon: z.enum([
                "chat",
                "checklist",
                "browser",
                "box",
                "bell",
                "form",
                "calendar",
                "chart",
              ]),
            }),
          )
          .min(1),
        changes: text,
        note: text.optional(),
        cta: Link,
      }),
    )
    .min(1),
});
export type Industries = z.infer<typeof Industries>;

/** The work page (site handoff reference/work.html). */
export const Work = z.object({
  meta: z.object({ title: text, description: z.string().max(155).optional() }),
  hero: z.object({
    /** "Software we've shipped" "for" / "Ghanaian businesses". */
    heading: z.object({ lead: text, for: text, rest: text }),
    big: text,
    photo: Photo,
    intro: text,
    cases: Link,
  }),
  approach: z.object({
    label: text,
    statement: text,
    cols: z
      .array(z.object({ icon: z.enum(["strategy", "build", "support"]), title: text, body: text }))
      .length(3),
  }),
  cases: z.object({
    heading: text,
    year: text,
    items: z
      .array(
        z.object({
          mock: z.enum(["phone", "checklist", "website"]),
          /** A page on this site, or the live product (opens in a new tab). */
          href: Href.or(z.string().url().startsWith("https://")),
          /** A screenshot of the live product, shown in place of the drawn mock. */
          screenshot: Photo.optional(),
          label: z.string().min(10),
          title: text,
          tags: text,
          background: Decorative,
        }),
      )
      .min(1),
    /** Added to the label of a card that opens the live product. */
    newTab: text,
    open: z.object({ href: Href, title: text, cta: text, name: text, tags: text }),
    /** Text drawn inside the mock screens (decorative, aria-hidden). */
    mocks: z.object({
      checklist: z.object({
        title: text,
        field: text,
        button: text,
        count: text,
        countLabel: text,
      }),
      website: z.tuple([text, text]),
    }),
  }),
});
export type Work = z.infer<typeof Work>;

export const ArticleCategory = z.enum(["Guides", "AI", "Workflows", "Case study"]);

/** The insights page (site handoff reference/insights.html). The articles are in articles.ts. */
export const Insights = z.object({
  meta: z.object({ title: text, description: z.string().max(155).optional() }),
  heading: text,
  /** The word board (decorative, aria-hidden). Split words wrap a drawn glyph. */
  board: z.object({
    automate: z.tuple([text, text]),
    connect: z.tuple([text, text]),
    build: text,
    grow: text,
    shine: z.tuple([text, text]),
    deploy: z.tuple([text, text]),
    small: z.tuple([text, text, text, text, text]),
  }),
  search: z.object({ label: text, placeholder: text, submit: text }),
  recommended: z.object({ heading: text, seeAll: Link, soon: text }),
  comingSoon: text,
  all: z.object({
    heading: Heading,
    body: text,
    filterLabel: text,
    allLabel: text,
    /** The filter buttons, in this order. */
    categories: z.record(ArticleCategory, text),
  }),
  empty: z.object({ lead: text, link: Link, tail: text }),
  newsletter: z.object({
    enabled: z.boolean(),
    heading: text,
    body: text,
    label: text,
    placeholder: text,
    submit: text,
    preview: text,
    invalid: text,
  }),
});
export type Insights = z.infer<typeof Insights>;

/** Insights articles. None is written yet, so each is "soon"; a published one gets a body later. */
export const Articles = z
  .array(
    z.object({ category: ArticleCategory, title: text, summary: text, status: z.literal("soon") }),
  )
  .min(1);
export type Articles = z.infer<typeof Articles>;

/** A legal page. Paragraphs and list items take **bold** and [label](/path); {email} and {domain} are filled in. */
const LegalDoc = z.object({
  meta: z.object({ title: text, description: z.string().max(155).optional() }),
  kicker: text,
  heading: Heading,
  intro: text,
  updated: text,
  place: text,
  /** The "Draft" tag; remove it once a Ghanaian lawyer has reviewed the page (TODO.md). */
  draft: z.string().optional(),
  tocLabel: text,
  sections: z
    .array(
      z.object({
        title: text,
        blocks: z
          .array(z.union([z.object({ p: text }), z.object({ ul: z.array(text).min(1) })]))
          .min(1),
      }),
    )
    .min(1),
  note: text,
  other: Link,
});
export const Legal = z.object({ privacy: LegalDoc, terms: LegalDoc });
export type LegalDoc = z.infer<typeof LegalDoc>;

export const CaseStudyCopy = z.object({
  attribution: z.string().includes("{formerBrand}"),
  headings: z.object({ howItWorks: z.string().min(1), result: z.string().min(1) }),
  workIndex: z.object({
    title: z.string().min(1),
    /** Meta description. Omitted from the page while TODO_. */
    description: orTodo(z.string().min(1).max(155), "a meta description of up to 155 characters"),
  }),
  cta: z.object({ title: z.string().min(1), button: z.string().min(1) }),
});
export type CaseStudyCopy = z.infer<typeof CaseStudyCopy>;

export const Privacy = z.object({
  /** Who approved the copy and when. TODO_ until approved (launch:check fails). */
  approvedBy: orTodo(z.string().min(1), "who approved the privacy copy and when"),
  title: z.string().min(1),
  /** Meta description. Omitted from the page while TODO_. */
  description: orTodo(z.string().min(1).max(155), "a meta description of up to 155 characters"),
  intro: z.string().min(1),
  sections: z
    .array(
      z.object({
        heading: z.string().min(1),
        /** "{email}" is replaced with the site email and linked. */
        paragraphs: z.array(z.string().min(1)).min(1),
        list: z.array(z.string().min(1)).optional(),
        after: z.array(z.string().min(1)).optional(),
      }),
    )
    .min(1),
  lastUpdated: z.object({
    label: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),
  }),
});
export type Privacy = z.infer<typeof Privacy>;

const ResultPage = z.object({ title: z.string().min(1), body: z.string().min(1) });

/** /contact (BUILD_PLAN 6.1, architecture §5). Field rules: src/lib/contact-form.ts. */
export const ContactCopy = z.object({
  /** /contact (site handoff reference/contact.html). */
  page: z.object({
    meta: z.object({ title: text, description: z.string().max(155).optional() }),
    leftLabel: text,
    homeLabel: text,
    big: z.tuple([text, text]),
    sub: text,
    body: text,
    whatsapp: text,
    closeLabel: text,
    heading: text,
    intro: text,
    direct: z.object({ email: text, based: text, follow: text }),
  }),
  /** The handoff form. Its post goes to functions/api/contact.ts. */
  form: z.object({
    labels: z.object({ name: text, company: text, email: text, phone: text, message: text }),
    optional: text,
    phonePlaceholder: text,
    messagePlaceholder: text,
    needs: z.object({ legend: text, options: z.array(text).min(1) }),
    errors: z.object({ name: text, email: text, message: text }),
    privacyNote: text,
    submit: text,
    sending: text,
    /** Replaces the form once sent. {name} and {email} are what the visitor typed. */
    sent: z.object({
      title: text,
      body: z.string().includes("{name}").includes("{email}").includes("{replyWithin}"),
      urgent: z.string().includes("{whatsapp}"),
    }),
    /** {whatsapp} and {email} render as links (the label is `whatsappLabel`, then the site email). */
    sendErrors: z.object({
      title: text,
      verification: z.string().includes("{whatsapp}").includes("{email}"),
      failed: z.string().includes("{whatsapp}").includes("{email}"),
    }),
    whatsappLabel: text,
  }),
  whatsappCta: text,
  success: z.object({
    title: text,
    /** {replyWithin} is filled from site.replyWithin; `bodyUnconfirmed` is used until it is set. */
    body: z.string().includes("{replyWithin}"),
    bodyUnconfirmed: text,
  }),
  /** Static pages the form lands on when posted without JavaScript. */
  notSent: ResultPage,
  /**
   * The notification email. The subject carries the visitor's name and needs
   * (cleaned to one line); everything they typed is escaped in the HTML.
   */
  email: z.object({
    subject: z.string().includes("{name}"),
    subjectWithNeeds: z.string().includes("{name}").includes("{needs}"),
    heading: text,
    labels: z.object({
      name: text,
      email: text,
      contact: text,
      phone: text,
      company: text,
      needs: text,
      message: text,
      sent: text,
      page: text,
    }),
    cameFrom: z.string().includes("{path}"),
    replyHint: z.string().includes("{name}"),
  }),
  /** The auto-reply: fixed copy, never the visitor's input. */
  autoReply: z.object({
    subject: text,
    heading: text,
    intro: text,
    nextTitle: text,
    next: z.string().includes("{replyWithin}"),
    urgent: text,
    whatsappCta: text,
  }),
});
export type ContactCopy = z.infer<typeof ContactCopy>;
