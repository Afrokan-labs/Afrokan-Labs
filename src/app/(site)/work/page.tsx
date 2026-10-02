import type { Metadata } from "next";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getCaseStudyCopy, getHome, getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/whatsapp";
import { getWorkIndexData } from "@/lib/work";
import styles from "./page.module.css";

const data = getWorkIndexData(getProjects());

export const metadata: Metadata = pageMetadata({
  path: "/work",
  title: data.title,
  description: getCaseStudyCopy().workIndex.description,
});

/**
 * The work index. With no visible project this page is still built (static
 * export), and scripts/prune-export.ts removes it from out/.
 */
export default function WorkIndex() {
  const sticky = { ...whatsappLink({ location: "sticky" }), label: getHome().hero.primaryCta };
  return (
    <>
      <main id="main" className={`container ${styles.page}`}>
        <h1>{data.title}</h1>
        <div className={styles.list}>
          {data.projects.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>
      </main>
      {/* No hero CTA and no closing CTA here: the bar shows from load and hides at the footer. */}
      <StickyActionBar cta={sticky} hideAt="site-footer" />
    </>
  );
}
