/**
 * The contact form's field names, limits and endpoints (architecture §5).
 * Dependency-free, so ContactForm can import it up front; the validation
 * rules in ./contact-form (zod) load only when the form is used. No path
 * aliases, because wrangler bundles this file into the function.
 */

export const LIMITS = { name: 100, contact: 254, message: 2000 } as const;

/** Form field names, as posted. */
export const FIELD = {
  name: "name",
  contact: "contact",
  message: "message",
  /** Honeypot: hidden from people, filled by bots. A filled one gets a fake success. */
  honeypot: "website",
  /** Added to the form by the Turnstile widget. */
  turnstile: "cf-turnstile-response",
} as const;

export type ErrorKey = "required" | "tooLong" | "invalid";
export type Field = "name" | "contact" | "message";
export type FieldErrors = Partial<Record<Field, ErrorKey>>;

/** The function's JSON reply to a fetch() submission. */
export type ContactResponse =
  { ok: true } | { ok: false; errors: FieldErrors } | { ok: false; error: "failed" };

/** Pages the function redirects to when the form was posted without JavaScript. */
export const RESULT_PAGES = { sent: "/contact/sent", failed: "/contact/not-sent" } as const;

export const CONTACT_ENDPOINT = "/api/contact";

/**
 * Turnstile's script, in explicit mode. ContactForm adds it, and renders the
 * widget, once the visitor first focuses or taps the form: it stays out of the
 * page load (Lighthouse budgets) and runs only for people using the form. In
 * implicit mode it could render before hydration, which would then wipe it.
 * The CSP allows its origin on /contact only (public/_headers).
 */
export const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
export const TURNSTILE_ORIGIN = "https://challenges.cloudflare.com";
