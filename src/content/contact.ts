import type { z } from "zod";
import type { ContactCopy } from "./schema";

/**
 * Contact copy. `page` and `form`: the site handoff's reference/contact.html
 * (approved). The result pages and the notification email: docs/content/contact.md
 * (v1, approved 2026-10-02).
 */
export const contact = {
  page: {
    meta: { title: "Contact" },
    leftLabel: "Why talk to us",
    homeLabel: "Afrokan Labs home",
    big: ["Let's", "Build"],
    sub: "Your next tool starts with a message",
    body: "Tell us what's slowing your business down. The first conversation is free, and you'll get a written plan, timeline and price before any work begins.",
    whatsapp: "Chat on WhatsApp",
    closeLabel: "Close and go back home",
    heading: "Contact us",
    intro:
      "Interested in working with us? Fill in the form below and we'll get back to you within 24 hours.",
    direct: { email: "Email", based: "Based in" },
  },
  form: {
    labels: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "WhatsApp number",
      message: "Message",
    },
    optional: "(optional)",
    phonePlaceholder: "e.g. 024 000 0000",
    messagePlaceholder: "What's slowing your business down?",
    needs: {
      legend: "What do you need?",
      options: [
        "WhatsApp AI assistant",
        "Website or web app",
        "Workflow tool",
        "Backend system",
        "Not sure yet",
      ],
    },
    errors: {
      name: "Enter your name.",
      email: "Enter an email address, like name@company.com.",
      message: "Tell us a little about what you need.",
    },
    privacyNote: "We only use your details to reply to you.",
    submit: "Submit",
    sending: "Sending…",
    sent: "Thanks, we’ll be in touch within 24 hours.",
    failed: "Something went wrong. Email {email} instead.",
    messageLines: { company: "Company", phone: "WhatsApp", needs: "Needs" },
  },
  whatsappCta: "Chat with us on WhatsApp",
  success: {
    title: "Message sent",
    body: "Thanks — we'll reply within {replyWithin}.",
    bodyUnconfirmed: "Thanks — we'll reply as soon as we can.",
  },
  notSent: {
    title: "Your message wasn't sent",
    body: "Go back to check your message and try again, or message us on WhatsApp.",
  },
  email: {
    subject: "New message from the website contact form",
    labels: { name: "Name", contact: "WhatsApp or email", message: "Message" },
  },
} satisfies z.input<typeof ContactCopy>;
