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
import { FIELD, LIMITS, type Field, type FieldErrors } from "./contact-fields";

const email = z.email();

/** A well-formed email address. The form posts it as "contact". */
export const isEmail = (value: string): boolean => z.safeParse(email, value).success;

const text = (max: number) =>
  z.string().check(z.trim(), z.minLength(1, "required"), z.maxLength(max, "tooLong"));

export const ContactSubmission = z.object({
  name: text(LIMITS.name),
  contact: text(LIMITS.contact).check(z.refine(isEmail, "invalid")),
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
    page: path(FIELD.page),
    from: path(FIELD.from),
  };
}
