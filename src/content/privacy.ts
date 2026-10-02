import type { z } from "zod";
import type { Privacy } from "./schema";

/**
 * Privacy page. Source: docs/content/privacy.md (Draft v1, drafted from
 * architecture §7, §12 and §13). The contact form wording (Draft v2) was
 * added with BUILD_PLAN 6.1.
 */
export const privacy = {
  // Approved as written in docs/content/privacy.md (Draft v2).
  approvedBy: "Approved in chat, 2026-10-02",
  title: "Privacy",
  // TODO_APPROVE_SEO_DRAFT: drafted in docs/content/seo.md, awaiting approval.
  description:
    "What afrokanlabs.com collects: cookieless analytics with no personal data, and only what you send us on WhatsApp, by email or with the contact form.",
  intro:
    "This site is built to collect as little as possible. Here is everything it collects, and why.",
  sections: [
    {
      heading: "Analytics",
      paragraphs: [
        "We use Umami, a privacy-friendly analytics service, to count how the site is used. It doesn't use cookies and doesn't collect personal data. It can't identify you, and we don't try to.",
        "It records:",
      ],
      list: [
        "which pages are visited, and which site linked to them",
        "the type of browser and device, and the country the visit came from",
        "clicks on our WhatsApp, email and case study links",
        "whether a contact form message was sent, but never what it says",
      ],
      after: ["We use these counts to improve the site."],
    },
    {
      heading: "When you contact us",
      paragraphs: [
        "If you message us on WhatsApp, email us or use the contact form, we receive what you send, including your name, number or email address. We use it only to reply to you and to work with you. We don't sell it or pass it to anyone else.",
        "WhatsApp and email are run by other companies, which handle your messages under their own privacy policies.",
      ],
    },
    {
      heading: "The contact form",
      paragraphs: [
        "The form asks for your name, your WhatsApp number or email address, and your message. The site doesn't store them. They go straight to our inbox, delivered by Resend, an email service.",
        "To keep out spam, Cloudflare Turnstile checks that the form is being used by a person. To do this, it looks at technical information about your browser and device.",
        "We handle what you send in line with Ghana's Data Protection Act, 2012. To ask what we hold about you, to correct it or to have it deleted, email {email}.",
      ],
    },
    {
      heading: "Hosting",
      paragraphs: [
        "The site is hosted on Cloudflare. To deliver the pages and protect the site from attacks, Cloudflare processes basic technical information, such as your IP address.",
      ],
    },
    {
      heading: "Questions",
      paragraphs: ["Email {email} and we'll answer any question about your data."],
    },
  ],
  lastUpdated: { label: "Last updated:", date: "2026-10-02" },
} satisfies z.input<typeof Privacy>;
