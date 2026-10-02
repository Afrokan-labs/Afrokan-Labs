/**
 * TEMPORARY homepage preview at /_home while "/" shows the coming-soon page.
 * At launch (BUILD_PLAN 5.1) this becomes "/". Not indexed.
 */
import type { Metadata } from "next";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { HomeSections } from "@/components/sections/HomeSections";
import { getHomeData } from "@/lib/home";

export const metadata: Metadata = {
  title: "Homepage preview",
  robots: { index: false, follow: false },
};

export default function HomePreview() {
  const data = getHomeData();
  return (
    <>
      <main id="main">
        <HomeSections data={data} />
      </main>
      <StickyActionBar {...data.sticky} />
    </>
  );
}
