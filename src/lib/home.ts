/**
 * Builds the homepage's section props from validated content. Pages call
 * getHomeData(); sections receive the result as props and never read content.
 *
 * Takes the project list as an argument so the same code renders the real
 * page (/_home) and the tier fixtures (/_fixtures/*).
 */
import { trackingAttrs } from "./analytics";
import { getChromeProps } from "./chrome";
import { confirmed } from "./confirmed";
import {
  clientDisplayName,
  getHome,
  getProcess,
  getProjects,
  getServices,
  getSite,
  getStatusLabels,
  getTeam,
  getTestimonials,
} from "./content";
import type { Project } from "../content/schema";
import { getImage } from "./images";
import { demoOfferLink, whatsappLink, whatsappTextLink } from "./whatsapp";

const stepNumber = (i: number) => String(i + 1).padStart(2, "0");

type Quote = {
  quote: string;
  name: string;
  role: string;
  company: string;
  photo?: { src: string; alt: string };
};
type Options = {
  demoOfferEnabled?: boolean;
  /** Fixture pages only: quotes that replace the (empty) content list. */
  testimonials?: Quote[];
};

/** Section anchors, shared by the nav, the cards that link to sections, and the sticky bar. */
export const HOME_IDS = {
  heroCta: "hero-cta",
  /** The skip link's target on the homepage: the headline, just after the nav. */
  intro: "intro",
  work: "work",
  services: "services",
  process: "process",
  about: "about",
  contact: "contact",
} as const;

export function getHomeData(projects: Project[] = getProjects(), options: Options = {}) {
  const site = getSite();
  const home = getHome();
  const services = getServices();
  const process = getProcess();
  const team = getTeam();
  const quotes = getTestimonials();
  const picture = (p: { src: string; alt: string }) => ({ ...getImage(p.src), alt: p.alt });

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const tagFor = (kind: string) => services.items.find((s) => s.kind === kind)?.tag ?? kind;

  const hero = {
    header: {
      ...getChromeProps().header,
      siteName: site.name,
      skipLink: { label: site.ui.skipLink, target: HOME_IDS.intro },
    },
    introId: HOME_IDS.intro,
    headline: home.hero.headline,
    lede: home.hero.lede,
    // No published project: the work link points at the services instead (architecture §4).
    workLink: {
      href: featured ? `#${HOME_IDS.work}` : `#${HOME_IDS.services}`,
      label: home.hero.workLink,
    },
    ctaId: HOME_IDS.heroCta,
    startProject: { href: `#${HOME_IDS.contact}`, label: home.hero.startProject },
    whatsapp: { ...whatsappTextLink({ location: "hero" }), label: home.hero.whatsapp },
    badge: home.hero.badge,
    photo: picture(home.hero.photo),
  };

  const stats = home.stats;

  const ideas = {
    title: home.ideas.title,
    body: home.ideas.body,
    banner: home.ideas.banner,
    wide: picture(home.ideas.wide),
    tall: picture(home.ideas.tall),
  };

  const servicesSection = {
    id: HOME_IDS.services,
    tab: services.tab,
    heading: services.heading,
    body: services.body,
    items: services.items.map((s, i) => ({ number: stepNumber(i), name: s.name, body: s.body })),
    image: picture(services.image),
    ring: services.ring,
    cards: {
      process: { ...services.cards.process, href: `#${HOME_IDS.process}` },
      contact: { ...services.cards.contact, href: `#${HOME_IDS.contact}` },
    },
  };

  const featuredWork = featured && {
    id: HOME_IDS.work,
    tab: home.featured.tab,
    heading: home.featured.heading,
    title: featuredTitle(featured, home.featured.titles),
    body: `${featured.summary.problem} ${featured.summary.solution}`,
    client: { label: home.featured.fields.client, value: clientDisplayName(featured) },
    industry: { label: home.featured.fields.industry, value: featured.industry },
    status: {
      label: home.featured.fields.status,
      status: featured.status,
      labels: getStatusLabels(featured),
    },
    built: { label: home.featured.fields.built, values: featured.built.map(tagFor) },
    // Optional blocks are omitted when absent; the schema allows them only at the named tier.
    result: featured.result && { label: home.featured.resultLabel, text: featured.result.text },
    caseStudy: {
      href: `/work/${featured.slug}`,
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

  const processSection = {
    id: HOME_IDS.process,
    heading: process.heading,
    body: process.body,
    steps: process.steps.map((s, i) => ({ number: stepNumber(i), title: s.title, body: s.body })),
    cta: { ...whatsappLink({ location: "process" }), label: process.cta },
  };

  const teamSection = {
    id: HOME_IDS.about,
    heading: team.heading,
    join: { href: `#${HOME_IDS.contact}`, label: team.join },
    linkedinLabel: "LinkedIn",
    opensNewTab: site.ui.opensNewTab,
    // Only real people: members with unconfirmed names or roles are left out.
    members: team.members
      .filter((m) => confirmed(m.name) && confirmed(m.role))
      .map((m) => ({
        name: m.name,
        role: m.role,
        bio: confirmed(m.bio) ? m.bio : undefined,
        linkedin: confirmed(m.linkedin) ? m.linkedin : undefined,
        photo: m.photo && { ...getImage(m.photo.src), alt: m.photo.alt },
      })),
  };

  // Hidden entirely until a real, approved quote exists (design-system §7).
  const quoteItems = options.testimonials ?? quotes.items;
  const testimonials = quoteItems.length
    ? {
        label: quotes.label,
        labels: quotes.labels,
        items: quoteItems.map((q) => ({
          quote: q.quote,
          name: q.name,
          role: q.role,
          company: q.company,
          photo: q.photo && picture(q.photo),
        })),
      }
    : undefined;

  const contact = {
    id: HOME_IDS.contact,
    title: home.contact.title,
    body: home.contact.body,
    form: {
      action: "/contact",
      label: home.contact.emailLabel,
      placeholder: home.contact.emailPlaceholder,
      submit: home.contact.submit,
      invalid: home.contact.invalid,
    },
    whatsapp: { ...whatsappTextLink({ location: "contact" }), label: home.contact.whatsapp },
    image: picture(home.contact.image),
  };

  // Mobile sticky bar: appears after the hero CTA, hides at Contact.
  const sticky = {
    cta: { ...whatsappLink({ location: "sticky" }), label: home.hero.primaryCta },
    showAfter: HOME_IDS.heroCta,
    hideAt: HOME_IDS.contact,
  };

  return {
    sticky,
    hero,
    stats,
    ideas,
    services: servicesSection,
    featuredWork,
    offer,
    words: home.words,
    process: processSection,
    team: teamSection,
    testimonials,
    ticker: site.ticker,
    contact,
  };
}

export type HomeData = ReturnType<typeof getHomeData>;

function featuredTitle(p: Project, titles: Record<string, string>): string {
  const title = titles[p.slug];
  if (!title) throw new Error(`src/content/home.ts: featured.titles has no entry for "${p.slug}".`);
  return title;
}
