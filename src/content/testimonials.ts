import type { z } from "zod";
import type { Testimonials } from "./schema";

/**
 * Client quotes for the homepage (homepage-copy-v2.md §9). Real, approved
 * quotes only, word for word, each with the client's written permission.
 * While the list is empty, the section is not rendered.
 */
export const testimonials = {
  label: "What clients say",
  labels: { previous: "Previous testimonial", next: "Next testimonial" },
  items: [
    {
      // Approved by ESE in writing (2026-10-22). The person's name and role
      // aren't confirmed yet, so the company is credited.
      quote:
        "We needed a better way to handle client enquiries and paperwork. Afrokan Labs gave us a website, a document checklist tool and a WhatsApp assistant that works around the clock. We're now getting new customers through the website, and our clients get answers faster.",
      company: "ESE Logistic Solution Limited",
      writtenPermission: true,
    },
  ],
} satisfies z.input<typeof Testimonials>;
