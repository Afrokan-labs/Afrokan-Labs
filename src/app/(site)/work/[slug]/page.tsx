import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { JsonLd } from "@/components/seo/JsonLd";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getCaseStudyData } from "@/lib/case-study";
import { getProject, getProjectBody, getProjects } from "@/lib/content";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

// Only visible projects get a page: published ones, plus drafts under `next dev`.
export const dynamicParams = false;

/**
 * Static export rejects an empty list here, so with no visible project the
 * route gets one placeholder slug that renders notFound(), and
 * scripts/prune-export.ts deletes out/work afterwards: no /work pages ship.
 */
const NO_PROJECTS_SLUG = "__none";

export function generateStaticParams() {
  const slugs = getProjects().map((p) => ({ slug: p.slug }));
  return slugs.length ? slugs : [{ slug: NO_PROJECTS_SLUG }];
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  const { seo } = getCaseStudyData(project);
  return pageMetadata({ path: `/work/${project.slug}`, ...seo, type: "article" });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const data = getCaseStudyData(project);
  const Body = await getProjectBody(slug);

  return (
    <>
      <JsonLd data={articleJsonLd({ path: `/work/${slug}`, ...data.seo })} />
      <main id="main">
        <CaseStudy {...data} body={<Body />} />
      </main>
      <StickyActionBar {...data.sticky} />
    </>
  );
}
