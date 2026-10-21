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
    sent: {
      title: "Message sent",
      body: "Thanks, {name}. Your message has reached us, and we’ll reply to {email} within {replyWithin}.",
      urgent: "Anything urgent? Message us on {whatsapp}.",
    },
    sendErrors: {
      title: "Message not sent",
      verification:
        "We couldn’t verify you’re human. Please try again, or message us on {whatsapp} or email {email}.",
      failed:
        "Something went wrong on our side, so your message wasn’t sent. Please try again, or message us on {whatsapp} or email {email}.",
    },
    whatsappLabel: "WhatsApp",
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
  /** The notification email to hello@ (site update: branded enquiry email). */
  email: {
    /** {name} is the visitor's name, cleaned to one line; {needs} the ticked options. */
    subject: "New enquiry: {name}",
    subjectWithNeeds: "New enquiry: {name} ({needs})",
    heading: "New enquiry from the website",
    labels: {
      name: "Name",
      /** The contact row: "email" when it's an address, else "contact". */
      email: "Email",
      contact: "WhatsApp or email",
      phone: "WhatsApp",
      company: "Company",
      needs: "Needs",
      message: "Message",
      sent: "Sent",
      page: "Page",
    },
    /** After the page path, when the visitor arrived from another page of the site. */
    cameFrom: "came from {path}",
    replyHint: "Reply to this email to answer {name} directly.",
  },
  /**
   * The auto-reply to a visitor who gave an email address. Fixed text only:
   * it never repeats their name or message, so the form can't be used to
   * send someone else's words to a stranger.
   */
  autoReply: {
    subject: "We’ve received your message",
    heading: "Thanks for getting in touch",
    intro: "Your message has reached Afrokan Labs.",
    nextTitle: "What happens next",
    next: "We’ll reply within {replyWithin}. The first conversation is free, and you’ll get a written plan, timeline and price before any work begins.",
    urgent: "If it’s urgent, message us on WhatsApp.",
    whatsappCta: "Chat on WhatsApp",
  },
} satisfies z.input<typeof ContactCopy>;
