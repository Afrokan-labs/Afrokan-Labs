/**
 * TEMPORARY: the homepage rendered with test fixtures at /_fixtures/none,
 * /_fixtures/anonymised and /_fixtures/named (BUILD_PLAN 2.4 acceptance).
 * Delete before launch (BUILD_PLAN 5.1). Not indexed, not in Lighthouse.
 */
import type { Metadata } from "next";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { HomeSections } from "@/components/sections/HomeSections";
import { fixtures, type FixtureName } from "@/fixtures/projects";
import { getHomeData } from "@/lib/home";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(fixtures).map((fixture) => ({ fixture }));
}

export const metadata: Metadata = {
  title: "Fixture",
  robots: { index: false, follow: false },
};

export default async function FixturePage({ params }: { params: Promise<{ fixture: string }> }) {
  const { fixture } = await params;
  const projects = fixtures[fixture as FixtureName];
  // The named fixture also turns the demo offer on, so OfferBand is exercised.
  const data = getHomeData([...projects], { demoOfferEnabled: fixture === "named" });
  return (
    <>
      <main id="main">
        <HomeSections data={data} />
      </main>
      <StickyActionBar {...data.sticky} />
    </>
  );
}
