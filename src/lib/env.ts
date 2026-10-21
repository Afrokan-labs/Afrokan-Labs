/**
 * Public environment variables, validated at build time (architecture §12).
 * Only NEXT_PUBLIC_* variables belong here: they are inlined into the static
 * build. Function secrets are read and validated inside the Pages Function
 * at runtime (functions/api/contact.ts), never by the Next build.
 */
import { z } from "zod";

const blankToUndefined = (v: string | undefined) => (v?.trim() ? v.trim() : undefined);

const isCloudflareProduction =
  process.env.CF_PAGES === "1" && process.env.CF_PAGES_BRANCH === "main";
/** Turnstile's published test site keys look like 1x00000000000000000000AA. */
const isTurnstileTestKey = (key: string) => /^[1-3]x0{20}[A-Z]{2}$/.test(key);

const PublicEnv = z.object({
  /** Canonical URL for metadata, sitemap and robots. Differs for preview deployments. */
  NEXT_PUBLIC_SITE_URL: z
    .url({ error: "NEXT_PUBLIC_SITE_URL must be a full URL, e.g. https://afrokanlabs.com" })
    .transform((url) => url.replace(/\/+$/, "")),
  /**
   * Cloudflare Turnstile site key for the /contact form (Phase 6). Previews,
   * CI and local builds use Turnstile's published test key; production
   * (Cloudflare branch main) must use the real one.
   */
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string({ error: "NEXT_PUBLIC_TURNSTILE_SITE_KEY is required (see .env.example)" })
    .regex(/^[0-3]x[\w-]{18,}$/, "NEXT_PUBLIC_TURNSTILE_SITE_KEY must be a Turnstile site key")
    .refine(
      (key) => !(isCloudflareProduction && isTurnstileTestKey(key)),
      "Production must use the real Turnstile site key, not a test key",
    ),
});

// Each variable is referenced by its full name so Next can inline it.
const result = PublicEnv.safeParse({
  NEXT_PUBLIC_SITE_URL: blankToUndefined(process.env.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: blankToUndefined(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
});

if (!result.success) {
  throw new Error(
    `Invalid public environment variables (see .env.example):\n${z.prettifyError(result.error)}`,
  );
}

export const env = result.data;
