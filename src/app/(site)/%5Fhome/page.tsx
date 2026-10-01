/**
 * TEMPORARY homepage preview at /_home while "/" shows the coming-soon page.
 * Sections are added here in page order (BUILD_PLAN 2.3–2.5); at launch
 * (BUILD_PLAN 5.1) this becomes "/". Not indexed.
 */
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { trackingAttrs } from "@/lib/analytics";
import {
  getConversationCaption,
  getHome,
  getProjects,
  getProofLine,
  getSpeakerLabels,
  getStatusLabels,
} from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Homepage preview",
  robots: { index: false, follow: false },
};

export default function HomePreview() {
  const home = getHome();
  const projects = getProjects();
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const caption = featured && getConversationCaption(featured);

  return (
    <main id="main">
      <Hero
        headline={home.hero.headline}
        subhead={home.hero.subhead}
        cta={{ ...whatsappLink({ location: "hero" }), label: home.hero.primaryCta }}
        proof={
          featured && {
            line: getProofLine(featured),
            status: featured.status,
            statusLabels: getStatusLabels(featured),
          }
        }
        caseStudy={
          featured && {
            href: `/work/${featured.slug}`,
            label: home.hero.secondaryLink,
            tracking: trackingAttrs("case_study_click", { location: "hero" }),
          }
        }
        conversation={
          featured?.conversation && caption
            ? {
                messages: featured.conversation.messages,
                caption,
                speakerLabels: getSpeakerLabels(featured),
              }
            : undefined
        }
      />
    </main>
  );
}
