/**
 * Props for the work index (/work): one card per visible project, in order.
 * Case-study views are counted by page-view tracking, so these links carry
 * no custom event (architecture §7).
 */
import type { Project } from "../content/schema";
import {
  clientDisplayName,
  getCaseStudyCopy,
  getHome,
  getServices,
  getStatusLabels,
} from "./content";

export function getWorkIndexData(projects: Project[]) {
  const home = getHome();
  const services = getServices();
  const tagFor = (kind: string) => services.items.find((s) => s.kind === kind)?.tag ?? kind;

  return {
    title: getCaseStudyCopy().workIndex.title,
    projects: projects.map((p) => {
      const title = home.featured.titles[p.slug];
      if (!title)
        throw new Error(`src/content/home.ts: featured.titles has no entry for "${p.slug}".`);
      return {
        slug: p.slug,
        title,
        client: clientDisplayName(p),
        fields: [
          { label: home.featured.fields.client, value: clientDisplayName(p) },
          { label: home.featured.fields.industry, value: p.industry },
        ],
        status: {
          label: home.featured.fields.status,
          status: p.status,
          labels: getStatusLabels(p),
        },
        built: { label: home.featured.fields.built, values: p.built.map(tagFor) },
        summary: `${p.summary.problem} ${p.summary.solution}`,
        link: { href: `/work/${p.slug}`, label: home.featured.caseStudyLink },
      };
    }),
  };
}

export type WorkIndexData = ReturnType<typeof getWorkIndexData>;
