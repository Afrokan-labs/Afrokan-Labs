/**
 * Builds the case study page's props from a validated project, applying the
 * tier rules (architecture §4, case-studies/ese-logistics.md):
 * - the real name and the formerBrand attribution only at the named tier;
 * - no image that shows client branding unless the client is named;
 * - result, testimonial and "How it works" only when the data exists.
 */
import type { Project } from "../content/schema";
import { confirmed } from "./confirmed";
import {
  clientDisplayName,
  getCaseStudyCopy,
  getConversationCaption,
  getHome,
  getServices,
  getSpeakerLabels,
  getStatusLabels,
} from "./content";
import { getImage } from "./images";
import { whatsappLink } from "./whatsapp";

export const CASE_STUDY_CTA_ID = "case-study-cta";

export function getCaseStudyData(p: Project) {
  const home = getHome();
  const copy = getCaseStudyCopy();
  const services = getServices();
  const named = p.client.nameApproved;
  const tagFor = (kind: string) => services.items.find((s) => s.kind === kind)?.tag ?? kind;

  const title = home.featured.titles[p.slug];
  if (!title) throw new Error(`src/content/home.ts: featured.titles has no entry for "${p.slug}".`);

  const caption = getConversationCaption(p);
  // Belt and braces: the schema already rejects branded images below the named tier.
  const images = p.images
    .filter((img) => named || !img.showsClientBranding)
    .map((img) => ({ ...getImage(img.src), alt: img.alt }));

  return {
    title,
    client: clientDisplayName(p),
    attribution:
      named && p.formerBrand ? copy.attribution.replace("{formerBrand}", p.formerBrand) : undefined,
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
    howItWorks:
      (p.conversation && caption) || images.length
        ? {
            heading: copy.headings.howItWorks,
            conversation:
              p.conversation && caption
                ? {
                    messages: p.conversation.messages,
                    caption,
                    speakerLabels: getSpeakerLabels(p),
                  }
                : undefined,
            images,
          }
        : undefined,
    result: p.result && { heading: copy.headings.result, text: p.result.text },
    testimonial: p.testimonial && {
      quote: p.testimonial.quote,
      name: p.testimonial.name,
      role: p.testimonial.role,
      organisation: p.client.name,
    },
    cta: {
      id: CASE_STUDY_CTA_ID,
      title: copy.cta.title,
      button: { ...whatsappLink({ location: "case-study" }), label: copy.cta.button },
    },
    sticky: {
      cta: { ...whatsappLink({ location: "sticky" }), label: home.hero.primaryCta },
      // No hero CTA on this page: the bar shows from load and hides at the closing CTA.
      hideAt: CASE_STUDY_CTA_ID,
    },
    seo: {
      title: confirmed(p.seo.title) ? p.seo.title : title,
      description: confirmed(p.seo.description) ? p.seo.description : undefined,
    },
  };
}

export type CaseStudyData = ReturnType<typeof getCaseStudyData>;
