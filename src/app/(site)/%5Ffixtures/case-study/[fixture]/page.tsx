/**
 * TEMPORARY: the case study page with test fixtures at
 * /_fixtures/case-study/anonymised and /_fixtures/case-study/named
 * (BUILD_PLAN 3.1 acceptance). Delete before launch. Not indexed.
 */
import type { Metadata } from "next";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { CaseStudy } from "@/components/work/CaseStudy";
import { caseStudyFixtures, type CaseStudyFixtureName } from "@/fixtures/projects";
import { getCaseStudyData } from "@/lib/case-study";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(caseStudyFixtures).map((fixture) => ({ fixture }));
}

export const metadata: Metadata = {
  title: "Case study fixture",
  robots: { index: false, follow: false },
};

export default async function CaseStudyFixture({
  params,
}: {
  params: Promise<{ fixture: string }>;
}) {
  const { fixture } = await params;
  const data = getCaseStudyData(caseStudyFixtures[fixture as CaseStudyFixtureName]);
  return (
    <>
      <main id="main">
        <CaseStudy {...data} body={<p>Sample case study body (test data).</p>} />
      </main>
      <StickyActionBar {...data.sticky} />
    </>
  );
}
