import type { Metadata } from "next";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { HomeSections } from "@/components/sections/HomeSections";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHome } from "@/lib/content";
import { getHomeData } from "@/lib/home";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

const home = getHome();

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: home.meta.title,
  description: home.meta.description,
});

export default function HomePage() {
  const data = getHomeData();
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <main id="main">
        <HomeSections data={data} />
      </main>
      <StickyActionBar {...data.sticky} />
    </>
  );
}
