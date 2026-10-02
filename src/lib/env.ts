/**
 * Public environment variables, validated at build time (architecture §12).
 * Only NEXT_PUBLIC_* variables belong here: they are inlined into the static
 * build. Function secrets are read and validated inside the Pages Function
 * at runtime (Phase 6), never by the Next build.
 */
import { z } from "zod";

const blankToUndefined = (v: string | undefined) => (v?.trim() ? v.trim() : undefined);

const PublicEnv = z.object({
  /** Canonical URL for metadata, sitemap and robots. Differs for preview deployments. */
  NEXT_PUBLIC_SITE_URL: z
    .url({ error: "NEXT_PUBLIC_SITE_URL must be a full URL, e.g. https://afrokanlabs.com" })
    .transform((url) => url.replace(/\/+$/, "")),
  /** Umami website ID. Unset in previews and locally, so track() does nothing. */
  NEXT_PUBLIC_ANALYTICS_ID: z
    .uuid({ error: "NEXT_PUBLIC_ANALYTICS_ID must be the Umami website ID (a UUID)" })
    .optional(),
});

// Each variable is referenced by its full name so Next can inline it.
const result = PublicEnv.safeParse({
  NEXT_PUBLIC_SITE_URL: blankToUndefined(process.env.NEXT_PUBLIC_SITE_URL),
  NEXT_PUBLIC_ANALYTICS_ID: blankToUndefined(process.env.NEXT_PUBLIC_ANALYTICS_ID),
});

if (!result.success) {
  throw new Error(
    `Invalid public environment variables (see .env.example):\n${z.prettifyError(result.error)}`,
  );
}

export const env = result.data;
