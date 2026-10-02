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
  /** Fills "We reply within ___ on weekdays." */
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
      menu: z.string().min(1),
      close: z.string().min(1),
    }),
    notFound: z.object({
      title: z.string().min(1),
      body: z.string().min(1),
      link: z.string().min(1),
    }),
  }),
  nav: z.object({ items: z.array(NavLink).min(1), cta: z.string().min(1) }),
  footer: z.object({ links: z.array(NavLink).min(1), linkedinLabel: z.string().min(1) }),
  social: z.object({
    linkedin: orTodo(z.url(), "the LinkedIn page URL").optional(),
  }),
});

// ----- Homepage sections -----

const SectionCopy = z.object({
  title: z.string().min(1),
  cta: z.string().min(1).optional(),
});

export const Services = z.object({
  section: SectionCopy,
  items: z
    .array(
      z.object({
        kind: BuiltKind,
        /** Technology label (Tag), shown after the outcome headline. */
        tag: z.string().min(1),
        title: z.string().min(1),
        body: z.string().min(1),
      }),
    )
    .length(3, "The strategy specifies exactly three services."),
});

export const Process = z.object({
  section: SectionCopy,
  steps: z
    .array(z.object({ title: z.string().min(1), body: z.string().min(1) }))
    .length(4, "The strategy specifies four steps."),
  /** Open decision #3: one honest pricing signal. */
  pricingNote: orTodo(z.string().min(1), "one of the approved pricing lines"),
});

export const Team = z.object({
  section: SectionCopy,
  statement: z.string().min(1),
  members: z
    .array(
      z.object({
        name: orTodo(z.string().min(1), "a name"),
        role: orTodo(z.string().min(1), "a role"),
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

export type Project = z.infer<typeof Project>;
export type Site = z.infer<typeof Site>;
export type Services = z.infer<typeof Services>;
export type Process = z.infer<typeof Process>;
export type Team = z.infer<typeof Team>;
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
    subhead: z.string().min(1),
    primaryCta: z.string().min(1),
    secondaryLink: z.string().min(1),
  }),
  featured: z.object({
    eyebrow: z.string().min(1),
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
  offer: z.object({ title: z.string().min(1), body: z.string().min(1), cta: z.string().min(1) }),
  contact: z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    responseNote: z.string().includes("{replyWithin}"),
    cta: z.string().min(1),
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
