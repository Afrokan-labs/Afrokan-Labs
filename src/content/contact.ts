import type { z } from "zod";
import type { ContactCopy } from "./schema";

/**
 * Contact copy. `page` and `form`: the contact form update (CONTACT_FORM_UPDATE.md
 * and its prototype, approved 2026-11-25): five short questions, then a
 * thank-you screen. The result pages and the notification email:
 * docs/content/contact.md (v1, approved 2026-10-02).
 */
export const contact = {
  page: {
    meta: {
      title: "Contact",
      description:
        "Tell Afrokan Labs what's slowing your business down. The first conversation is free, and you get a written plan, timeline and price before work begins.",
    },
    /** "Let's build together", with the last word on a green highlight. */
    headline: "Let's build",
    headlineHighlight: "together",
    subline: "5 quick questions. Free first conversation.",
    /** {whatsapp} is a link labelled `chatLink`. */
    chatLine: "Prefer to chat? {whatsapp}",
    chatLink: "Message us on WhatsApp",
  },
  form: {
    /** Header band: "Question 2 of 5", then "All done" on the thank-you screen. */
    progress: "Question {n} of {total}",
    done: "All done",
    timeHints: { early: "About 1 min", late: "Almost done", sent: "Sent" },
    back: "Back to the previous question",
    next: "Continue",
    skip: "Skip this question",
    steps: {
      needs: { title: "What do you need help with?", hint: "Choose one or more." },
      goal: { title: "What's your main goal?", hint: "Choose one." },
      message: {
        title: "Tell us a bit more",
        hint: "Optional. What's slowing your business down?",
      },
      name: { title: "What's your name?" },
      reach: { title: "How can we reach you?", hint: "Fill in at least one." },
    },
    labels: {
      name: "Your name",
      company: "Business name",
      email: "Email",
      phone: "WhatsApp number",
    },
    optional: "(optional)",
    phonePlaceholder: "024 000 0000",
    emailPlaceholder: "name@company.com",
    messagePlaceholder: "e.g. We lose customer orders in our WhatsApp chats",
    /** "Not sure yet" (the last option) clears the others, and the others clear it. */
    needs: {
      options: [
        "WhatsApp AI assistant",
        "Website or web app",
        "Workflow tool",
        "Backend system",
        "Not sure yet",
      ],
    },
    goal: {
      options: [
        "Get more customers or sales",
        "Save time on repetitive work",
        "Look more professional online",
        "Launch a new business or product",
        "Not sure yet",
      ],
    },
    errors: {
      needs: "Choose at least one option.",
      goal: "Choose one option.",
      name: "Enter your name.",
      reach: "Enter a WhatsApp number or an email.",
      phone: "Check your WhatsApp number, like 024 000 0000.",
      email: "Check your email, like name@company.com.",
    },
    /** Sent as the message when question 3 is skipped. */
    noMessage: "(No extra details given.)",
    /** {privacy} renders as a link to the privacy policy. */
    privacyNote: "We only use your details to reply. {privacy}",
    privacyLink: { label: "Privacy Policy", href: "/privacy" },
    send: {
      idle: "Send request",
      loading: "Sending…",
      success: "Sent",
      error: "Not sent. Try again",
      errorStatus:
        "We couldn’t send that. Check your connection and try again, or message us on WhatsApp.",
    },
    /** Turnstile missing or rejected. {whatsapp} and {email} render as links. */
    verification:
      "We couldn’t verify you’re human. Please try again, or message us on {whatsapp} or email {email}.",
    whatsappLabel: "WhatsApp",
    sent: {
      /** {firstName}: the first word of their name, or `fallbackName`. */
      title: "Thanks, {firstName}!",
      fallbackName: "there",
      body: "We got your request and will reply {via} within {replyWithin}.",
      via: { whatsapp: "on WhatsApp", email: "by email", both: "on WhatsApp or by email" },
      waCta: "Chat with us on WhatsApp",
      again: "Send another request",
    },
    /** The thank-you screen's WhatsApp message. The company line is left out when blank. */
    waPrefill: {
      intro: "Hi Afrokan Labs, I’m {name}{company}. I just sent a request on your website.",
      company: " from {company}",
      needs: "I need: {needs}",
      goal: "Main goal: {goal}",
    },
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
      /** The reply channel's row: "email" for an address, "phone" (a wa.me link) for a number. */
      email: "Email",
      phone: "WhatsApp",
      company: "Company",
      needs: "Needs",
      goal: "Main goal",
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
