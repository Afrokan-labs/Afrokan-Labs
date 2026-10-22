import type { z } from "zod";
import type { Testimonials } from "./schema";

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
