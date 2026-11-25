/**
 * The contact form's fields and rules (architecture §5). One schema, used by
 * the browser (ContactForm) and the Pages Function (functions/api/contact.ts),
 * so both apply the same validation and length limits.
 *
 * zod/mini keeps the browser bundle small, and ContactForm loads this module
 * only once the visitor starts on the form. Field names and other constants
 * live in ./contact-fields, which has no dependencies. Issues carry an error
 * key, not copy: the wording lives in src/content/contact.ts. No path aliases
 * here, because wrangler bundles this file into the function.
 */
import * as z from "zod/mini";
import { FIELD, LIMITS, isPhone, type Field, type FieldErrors } from "./contact-fields";

export { isPhone };

const email = z.email();

/** A well-formed email address. */
export const isEmail = (value: string): boolean => z.safeParse(email, value).success;

const text = (max: number) =>
  z.string().check(z.trim(), z.minLength(1, "required"), z.maxLength(max, "tooLong"));

export const ContactSubmission = z.object({
  name: text(LIMITS.name),
  /** How to reply: an email address or a WhatsApp number. */
  contact: text(LIMITS.contact).check(z.refine((v) => isEmail(v) || isPhone(v), "invalid")),
  message: text(LIMITS.message),
});
export type ContactSubmission = z.infer<typeof ContactSubmission>;

/** The submitted contact, when it is an email address: the notification's Reply-To. */
export const replyToFor = (contact: string) => (contact.includes("@") ? contact : undefined);

type Result = { ok: true; data: ContactSubmission } | { ok: false; errors: FieldErrors };

/** Validates the three fields. Returns the first error key per field. */
export function validateContact(input: Record<Field, unknown>): Result {
  const result = z.safeParse(ContactSubmission, input);
  if (result.success) return { ok: true, data: result.data };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as Field;
    // A missing or non-string value counts as "required".
    const key = (["required", "tooLong", "invalid"] as const).find((k) => k === issue.message);
    errors[field] ??= key ?? "required";
  }
  return { ok: false, errors };
}

/**
 * Before validation (with or without JavaScript): the form posts the email
 * field as "contact" and the WhatsApp number as "phone". When there's no email
 * but there is a number, the number becomes the contact, and the "phone"
 * extra is dropped so the email doesn't show it twice. An empty message
 * (the question is optional) becomes `noMessage`.
 */
export function resolveSubmission(form: FormData, noMessage: string): void {
  const value = (key: string) => String(form.get(key) ?? "").trim();
  if (!value(FIELD.contact) && value(FIELD.phone)) {
    form.set(FIELD.contact, value(FIELD.phone));
    form.delete(FIELD.phone);
  }
  if (!value(FIELD.message)) form.set(FIELD.message, noMessage);
}

/** Reads the three fields from posted form data. */
export const readFields = (form: FormData): Record<Field, unknown> => ({
  name: form.get(FIELD.name),
  contact: form.get(FIELD.contact),
  message: form.get(FIELD.message),
});

/** The optional details: trimmed and cut to length. Empty values are left out. */
export type ContactExtras = {
  company?: string;
  phone?: string;
  needs: string[];
  goal?: string;
  page?: string;
  from?: string;
};

const SITE_PATH = /^\/[\w\-./]*$/;

/** Reads the optional details. Paths that aren't plain site paths are dropped. */
export function readExtras(form: FormData): ContactExtras {
  const text = (key: string, max: number) => {
    const value = String(form.get(key) ?? "")
      .trim()
      .slice(0, max);
    return value || undefined;
  };
  const path = (key: string) => {
    const value = text(key, LIMITS.path);
    return value && SITE_PATH.test(value) ? value : undefined;
  };
  return {
    company: text(FIELD.company, LIMITS.company),
    phone: text(FIELD.phone, LIMITS.phone),
    needs: [...new Set(form.getAll(FIELD.needs).map((n) => String(n).trim()))].filter(Boolean),
    goal: text(FIELD.goal, LIMITS.goal),
    page: path(FIELD.page),
    from: path(FIELD.from),
  };
}
