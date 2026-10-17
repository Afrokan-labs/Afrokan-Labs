import type { z } from "zod";
import type { Reviews, Testimonials } from "./schema";

/**
 * Client quotes for the homepage carousel (homepage-copy-v2.md §9). Real,
 * approved quotes only, each with the client's written permission. While the
 * list is empty, the section is not rendered.
 */
export const testimonials = {
  label: "What clients say",
  labels: { previous: "Previous testimonial", next: "Next testimonial" },
  items: [],
} satisfies z.input<typeof Testimonials>;

const openSlot = { label: "Start a conversation", href: "/contact" };

/**
 * Home "What our clients really say" (site update 1), in display order.
 * When ESE approves a quote: set `quote` on the first item, and its person's
 * name, role and photo or logo. Items 2–5 are open slots, not reviews.
 */
export const reviews = [
  {
    id: "ese",
    real: true,
    placeholder: "A review from ESE Logistic will appear here once they approve it.",
    fact: "We built them a WhatsApp AI assistant, a document checklist generator and a company website.",
    name: "ESE Logistic Solution Ltd",
    role: "Clearing & forwarding · Delivered",
    sector: "Clearing & forwarding",
    image: "home-customers-port.webp",
    cta: { label: "See the case study", href: "/work#cases" },
  },
  {
    id: "retail",
    real: false,
    placeholder: "Your review could be here.",
    fact: "We help shops answer price and stock questions on WhatsApp and track orders without a notebook.",
    name: "Your shop",
    role: "Retail · Open slot",
    sector: "Retail",
    image: "solutions-evening.webp",
    cta: openSlot,
  },
  {
    id: "office",
    real: false,
    placeholder: "Your review could be here.",
    fact: "We replace paper files and scattered spreadsheets with tools your team actually uses.",
    name: "Your office",
    role: "Professional services · Open slot",
    sector: "Professional services",
    image: "solutions-office.webp",
    cta: openSlot,
  },
  {
    id: "home",
    real: false,
    placeholder: "Your review could be here.",
    fact: "We answer your customers on WhatsApp at any hour, from your own documents and prices.",
    name: "Your customers",
    role: "Customer service · Open slot",
    sector: "Customer service",
    image: "solutions-morning.webp",
    cta: openSlot,
  },
  {
    id: "yard",
    real: false,
    placeholder: "Your review could be here.",
    fact: "We give every job a status your team updates once, so customers stop calling to ask.",
    name: "Your operation",
    role: "Warehousing & transport · Open slot",
    sector: "Warehousing & transport",
    image: "solutions-yard.webp",
    cta: openSlot,
  },
] satisfies z.input<typeof Reviews>;
