import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getIndexablePaths, getLastModified } from "@/lib/pages";

export const dynamic = "force-static";

/** Every indexable page (src/lib/pages.ts), with <lastmod> from git history. */
export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexablePaths().map((path) => {
    const lastModified = getLastModified(path);
    return {
      url: new URL(path, env.NEXT_PUBLIC_SITE_URL).href,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}
