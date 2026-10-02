import type { z } from "zod";
import type { ContactCopy } from "./schema";

/**
 * Contact form copy. Field labels: homepage-copy.md §6. Success line and the
 * "Send us a message" link: architecture §5. Everything else is drafted in
 * docs/content/contact.md (Draft v1), awaiting approval.
 */
export const contact = {
  // Set to who approved it and when, e.g. "Franklin Wiafe, 2026-10-03".
  approvedBy: "TODO_CONTACT_COPY_APPROVAL",
  title: "Send us a message",
  description:
    "Tell Afrokan Labs what your business does and what you need help with. We reply by WhatsApp or email.",
  intro:
    "Tell us what your business does and what you need help with. We'll reply on WhatsApp or by email, whichever you give us. If you'd rather chat now, message us on WhatsApp.",
  whatsappCta: "Chat with us on WhatsApp",
  fields: {
    name: {
      label: "Name",
      errors: {
        required: "Add your name.",
        tooLong: "Shorten your name to {max} characters or fewer.",
      },
    },
    contact: {
      label: "WhatsApp number or email",
      hint: "We'll reply here.",
      errors: {
        required: "Add a WhatsApp number or an email address, so we can reply.",
        tooLong: "Shorten this to {max} characters or fewer.",
        invalid: "Check this: enter a WhatsApp number with its full digits, or an email address.",
      },
    },
    message: {
      label: "What does your business do, and what do you need help with?",
      errors: {
        required: "Tell us what your business does and what you need help with.",
        tooLong: "Shorten your message to {max} characters or fewer.",
      },
    },
  },
  honeypotLabel: "Leave this field empty",
  submit: "Send message",
  sending: "Sending your message",
  failed:
    "We couldn't send your message. Please try again, or message us on WhatsApp. Your text is still here.",
  noScript:
    "This form needs JavaScript to check you're not a bot. Please message us on WhatsApp, or email {email}.",
  success: {
    title: "Message sent",
    body: "Thanks — we'll reply within {replyWithin} on weekdays.",
    bodyUnconfirmed: "Thanks — we'll reply as soon as we can.",
  },
  notSent: {
    title: "Your message wasn't sent",
    body: "Go back to check your message and try again, or message us on WhatsApp.",
  },
  homeLink: "Send us a message",
  email: {
    subject: "New message from the website contact form",
    labels: { name: "Name", contact: "WhatsApp or email", message: "Message" },
  },
} satisfies z.input<typeof ContactCopy>;
