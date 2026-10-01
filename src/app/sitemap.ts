import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";

const site = getSite();

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
