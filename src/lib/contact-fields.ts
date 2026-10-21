/**
 * The contact form's field names, limits and endpoints (architecture §5).
 * Dependency-free, so ContactForm can import it up front; the validation
 * rules in ./contact-form (zod) load only when the form is used. No path
 * aliases, because wrangler bundles this file into the function.
 */

export const LIMITS = {
  name: 100,
  contact: 254,
  message: 5000,
  company: 100,
  phone: 40,
  /** A site path: the form's page, or the page the visitor came from. */
  path: 200,
} as const;

/** Form field names, as posted. */
export const FIELD = {
  name: "name",
  contact: "contact",
  message: "message",
  /** Optional details, each shown on its own row of the notification email. */
  company: "company",
  phone: "phone",
  /** One value per ticked "What do you need?" option. */
  needs: "need",
  /** The page the form was sent from, and the site page the visitor arrived from. */
  page: "page",
  from: "from",
  /** Honeypot: hidden from people, filled by bots. A filled one gets a fake success. */
  honeypot: "website",
  /** Added to the form by the Turnstile widget. */
  turnstile: "cf-turnstile-response",
} as const;

export type ErrorKey = "required" | "tooLong" | "invalid";
export type Field = "name" | "contact" | "message";
export type FieldErrors = Partial<Record<Field, ErrorKey>>;

/**
 * Why a submission wasn't sent: Turnstile was missing or rejected
 * ("verification"), or something on the server side failed ("failed").
 */
export type SendError = "verification" | "failed";

/** The function's JSON reply to a fetch() submission. */
export type ContactResponse =
  { ok: true } | { ok: false; errors: FieldErrors } | { ok: false; error: SendError };

/** Pages the function redirects to when the form was posted without JavaScript. */
export const RESULT_PAGES = { sent: "/contact/sent", failed: "/contact/not-sent" } as const;

export const CONTACT_ENDPOINT = "/api/contact";

/** sessionStorage key: the homepage email box hands its address to the /contact form. */
export const CONTACT_PREFILL_KEY = "afrokan:contact-email";

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
