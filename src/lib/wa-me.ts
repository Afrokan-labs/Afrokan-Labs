/**
 * The wa.me URL for a number and an optional prefilled message. Dependency-free,
 * so the contact Pages Function can use it as well as src/lib/whatsapp.ts.
 * No path aliases, because wrangler bundles this file into the function.
 */
export function waMeUrl(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
