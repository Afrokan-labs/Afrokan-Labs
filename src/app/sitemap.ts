import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getIndexablePaths } from "@/lib/pages";

export const dynamic = "force-static";

/** Every indexable page; /work and case studies only while a project is visible. */
export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexablePaths().map((path) => ({ url: new URL(path, env.NEXT_PUBLIC_SITE_URL).href }));
}
