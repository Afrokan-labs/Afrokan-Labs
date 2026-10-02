import type { z } from "zod";
import type { Privacy } from "./schema";

/**
 * Privacy page. Source: docs/content/privacy.md (Draft v1, drafted from
 * architecture §7, §12 and §13). Update before the Phase 6 contact form.
 */
export const privacy = {
  // Set to who approved it and when, e.g. "Franklin Wiafe, 2026-10-03".
  approvedBy: "TODO_PRIVACY_COPY_APPROVAL",
  title: "Privacy",
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
      ],
      after: ["We use these counts to improve the site."],
    },
    {
      heading: "When you contact us",
      paragraphs: [
        "The site has no forms. If you message us on WhatsApp or email us, we receive what you send, including your name, number or email address. We use it only to reply to you and to work with you. We don't sell it or pass it to anyone else.",
        "WhatsApp and email are run by other companies, which handle your messages under their own privacy policies.",
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
