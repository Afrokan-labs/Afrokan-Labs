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
  /** Fills the contact form's "we'll reply within ___ on weekdays". */
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
  ui: z.object({
    skipLink: z.string().min(1),
    opensWhatsApp: z.string().min(1),
    opensNewTab: z.string().min(1),
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
  /** Tilted ticker keywords (homepage-copy-v2 §10). */
  ticker: z.object({ label: z.string().min(1), items: z.array(z.string().min(1)).min(3) }),
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
    linkedin: orTodo(z.url(), "the LinkedIn page URL").optional(),
    x: orTodo(z.url(), "the X profile URL").optional(),
    instagram: orTodo(z.url(), "the Instagram profile URL").optional(),
  }),
});

// ----- Homepage sections (homepage-copy-v2.md) -----

export const Services = z.object({
  tab: z.string().min(1),
  heading: Heading,
  body: z.string().min(1),
  items: z
    .array(
      z.object({
        /** Links the service to a project's `built` list; its tag labels the case study. */
        kind: BuiltKind.optional(),
        tag: z.string().min(1).optional(),
        name: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .min(1),
  image: Picture,
  /** Text around the rotating ring. */
  ring: z.string().min(1),
  cards: z.object({
    process: z.object({ text: z.string().min(1), label: z.string().min(1) }),
    contact: z.object({ text: z.string().min(1), label: z.string().min(1) }),
  }),
});

export const Process = z.object({
  heading: Heading,
  body: z.string().min(1),
  steps: z
    .array(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .length(4, "The strategy specifies four steps."),
  cta: z.string().min(1),
});

export const Team = z.object({
  heading: Heading,
  join: z.string().min(1),
  members: z
    .array(
      z.object({
        name: orTodo(z.string().min(1), "a name"),
        role: orTodo(z.string().min(1), "a role"),
        bio: orTodo(z.string().min(1).max(220), "a one or two line bio").optional(),
        linkedin: orTodo(z.url(), "their LinkedIn URL").optional(),
        photo: z
          .object({
            /** Source image in assets/images/; optimised in BUILD_PLAN 2.6. */
            src: z.string(),
            alt: z.string().min(10),
          })
          .optional(),
      }),
    )
    .min(1),
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
export type Services = z.infer<typeof Services>;
export type Process = z.infer<typeof Process>;
export type Team = z.infer<typeof Team>;
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

export const Home = z.object({
  meta: z.object({ title: z.string().min(1), description: z.string().max(155) }),
  hero: z.object({
    headline: z.string().min(1),
    lede: z.string().min(1),
    /** "Chat with us on WhatsApp": the sticky bar and other full-length CTAs. */
    primaryCta: z.string().min(1),
    workLink: z.string().min(1),
    startProject: z.string().min(1),
    whatsapp: z.string().min(1),
    badge: z.object({ title: z.string().min(1), line: z.string().min(1) }),
    photo: Picture,
  }),
  stats: z.object({
    label: z.string().min(1),
    items: z
      .array(
        z.object({
          value: z.string().min(1),
          suffix: z.string().optional(),
          label: z.string().min(1),
        }),
      )
      .min(1),
  }),
  ideas: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    // One entry per line (reference .x-banner breaks after "software").
    banner: z.array(z.string().min(1)).min(1),
    wide: Picture,
    tall: Picture,
  }),
  featured: z.object({
    tab: z.string().min(1),
    heading: Heading,
    titles: z.record(z.string(), z.string().min(1)),
    caseStudyLink: z.string().min(1),
    whatsappCta: z.string().min(1),
    fields: z.object({
      client: z.string().min(1),
      industry: z.string().min(1),
      status: z.string().min(1),
      built: z.string().min(1),
    }),
    resultLabel: z.string().min(1),
  }),
  words: z.object({ label: z.string().min(1), items: z.array(z.string().min(1)).length(3) }),
  offer: z.object({ title: z.string().min(1), body: z.string().min(1), cta: z.string().min(1) }),
  contact: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    emailLabel: z.string().min(1),
    emailPlaceholder: z.string().min(1),
    submit: z.string().min(1),
    invalid: z.string().min(1),
    whatsapp: z.string().min(1),
    image: Picture,
  }),
});
export type Home = z.infer<typeof Home>;

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

const FieldErrors = z.object({
  required: z.string().min(1),
  tooLong: z.string().includes("{max}"),
});
const ResultPage = z.object({ title: z.string().min(1), body: z.string().min(1) });

/** /contact (BUILD_PLAN 6.1, architecture §5). Field rules: src/lib/contact-form.ts. */
export const ContactCopy = z.object({
  /** Who approved the copy and when. TODO_ until approved (launch:check fails). */
  approvedBy: orTodo(z.string().min(1), "who approved the contact form copy and when"),
  title: z.string().min(1),
  /** Meta description. Omitted from the page while TODO_. */
  description: orTodo(z.string().min(1).max(155), "a meta description of up to 155 characters"),
  intro: z.string().min(1),
  whatsappCta: z.string().min(1),
  fields: z.object({
    name: z.object({ label: z.string().min(1), errors: FieldErrors }),
    contact: z.object({
      label: z.string().min(1),
      hint: z.string().min(1),
      errors: FieldErrors.extend({ invalid: z.string().min(1) }),
    }),
    message: z.object({ label: z.string().min(1), errors: FieldErrors }),
  }),
  /** Label of the hidden honeypot field; only bots and some screen readers ever meet it. */
  honeypotLabel: z.string().min(1),
  submit: z.string().min(1),
  /** Screen-reader text while sending (the button shows a spinner). */
  sending: z.string().min(1),
  /** Shown above the button when sending fails for any reason other than a field error. */
  failed: z.string().min(1),
  /** Shown only without JavaScript, which Turnstile needs. "{email}" is the site email. */
  noScript: z.string().includes("{email}"),
  success: z.object({
    title: z.string().min(1),
    /** {replyWithin} is filled from site.replyWithin; `bodyUnconfirmed` is used until it is set. */
    body: z.string().includes("{replyWithin}"),
    bodyUnconfirmed: z.string().min(1),
  }),
  /** Static pages the form lands on when posted without JavaScript. */
  notSent: ResultPage,
  /** The homepage contact band's link to /contact (architecture §5). */
  homeLink: z.string().min(1),
  /** The notification email. User input never goes into the subject (architecture §6). */
  email: z.object({
    subject: z.string().min(1),
    labels: z.object({ name: z.string(), contact: z.string(), message: z.string() }),
  }),
});
export type ContactCopy = z.infer<typeof ContactCopy>;
