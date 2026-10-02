/**
 * Builds the homepage's section props from validated content. Pages call
 * getHomeData(); sections receive the result as props and never read content.
 *
 * Takes the project list as an argument so the same code renders the real
 * homepage and the tier fixtures (/_fixtures/*).
 */
import { trackingAttrs } from "./analytics";
import {
  clientDisplayName,
  getConversationCaption,
  getHome,
  getProcess,
  getProjects,
  getProofLine,
  getServices,
  getSite,
  getSpeakerLabels,
  getStatusLabels,
  getTeam,
} from "./content";
import type { Project } from "../content/schema";
import { confirmed } from "./confirmed";
import { getImage } from "./images";
import { demoOfferLink, whatsappLink } from "./whatsapp";

const stepNumber = (i: number) => String(i + 1).padStart(2, "0");

type Options = { demoOfferEnabled?: boolean };

export function getHomeData(projects: Project[] = getProjects(), options: Options = {}) {
  const site = getSite();
  const home = getHome();
  const services = getServices();
  const process = getProcess();
  const team = getTeam();

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const caption = featured && getConversationCaption(featured);
  const conversation =
    featured?.conversation && caption
      ? {
          messages: featured.conversation.messages,
          caption,
          speakerLabels: getSpeakerLabels(featured),
        }
      : undefined;
  const caseStudyHref = featured && `/work/${featured.slug}`;
  const tagFor = (kind: string) => services.items.find((s) => s.kind === kind)?.tag ?? kind;

  const hero = {
    headline: home.hero.headline,
    subhead: home.hero.subhead,
    cta: { ...whatsappLink({ location: "hero" }), label: home.hero.primaryCta },
    // No published project: no proof line and no case-study link (architecture §4).
    proof: featured && {
      line: getProofLine(featured),
      status: featured.status,
      statusLabels: getStatusLabels(featured),
    },
    caseStudy: featured && {
      href: caseStudyHref!,
      label: home.hero.secondaryLink,
      tracking: trackingAttrs("case_study_click", { location: "hero" }),
    },
    conversation,
  };

  const featuredWork = featured && {
    eyebrow: home.featured.eyebrow,
    title: featuredTitle(featured, home.featured.titles),
    fields: [
      { label: home.featured.fields.client, value: clientDisplayName(featured) },
      { label: home.featured.fields.industry, value: featured.industry },
    ],
    status: {
      label: home.featured.fields.status,
      status: featured.status,
      labels: getStatusLabels(featured),
    },
    built: { label: home.featured.fields.built, values: featured.built.map(tagFor) },
    body: `${featured.summary.problem} ${featured.summary.solution}`,
    // Optional blocks are omitted when absent; the schema allows them only at the named tier.
    result: featured.result && { label: home.featured.resultLabel, text: featured.result.text },
    testimonial: featured.testimonial && {
      quote: featured.testimonial.quote,
      name: featured.testimonial.name,
      role: featured.testimonial.role,
      organisation: featured.client.name,
    },
    conversation,
    caseStudy: {
      href: caseStudyHref!,
      label: home.featured.caseStudyLink,
      tracking: trackingAttrs("case_study_click", { location: "featured-work" }),
    },
    whatsapp: { ...whatsappLink({ location: "featured-work" }), label: home.featured.whatsappCta },
  };

  const offer =
    (options.demoOfferEnabled ?? site.demoOffer.enabled)
      ? {
          title: home.offer.title,
          body: home.offer.body,
          cta: { ...demoOfferLink(), label: home.offer.cta },
        }
      : undefined;

  const servicesSection = {
    title: services.section.title,
    items: services.items.map((s, i) => ({
      number: stepNumber(i),
      title: s.title,
      body: s.body,
      tag: s.tag,
    })),
    cta: { ...whatsappLink({ location: "services" }), label: services.section.cta! },
  };

  const processSection = {
    title: process.section.title,
    steps: process.steps.map((s, i) => ({ number: stepNumber(i), title: s.title, body: s.body })),
    // Open decision #3: omitted until a pricing line is chosen.
    pricingNote: confirmed(process.pricingNote) ? process.pricingNote : undefined,
    cta: { ...whatsappLink({ location: "process" }), label: process.section.cta! },
  };

  const about = {
    title: team.section.title,
    statement: team.statement,
    // Members with unconfirmed names or roles are left out until confirmed.
    members: team.members
      .filter((m) => confirmed(m.name) && confirmed(m.role))
      .map((m) => ({
        name: m.name,
        role: m.role,
        photo: m.photo && { ...getImage(m.photo.src), alt: m.photo.alt },
      })),
  };

  const contact = {
    title: home.contact.title,
    body: home.contact.body,
    responseNote: confirmed(site.replyWithin)
      ? home.contact.responseNote.replace("{replyWithin}", site.replyWithin)
      : undefined,
    cta: { ...whatsappLink({ location: "contact" }), label: home.contact.cta },
    email: site.email,
    emailTracking: trackingAttrs("email_click", { location: "contact" }),
    location: site.location,
  };

  // Mobile sticky bar (design-system §8): appears after the hero CTA, hides at Contact.
  const sticky = {
    cta: { ...whatsappLink({ location: "sticky" }), label: home.hero.primaryCta },
    showAfter: "hero-cta",
    hideAt: "contact",
  };

  return {
    sticky,
    hero,
    featuredWork,
    offer,
    services: servicesSection,
    process: processSection,
    about,
    contact,
  };
}

export type HomeData = ReturnType<typeof getHomeData>;

function featuredTitle(p: Project, titles: Record<string, string>): string {
  const title = titles[p.slug];
  if (!title) throw new Error(`src/content/home.ts: featured.titles has no entry for "${p.slug}".`);
  return title;
}
