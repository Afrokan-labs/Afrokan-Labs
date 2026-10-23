/**
 * Metadata and JSON-LD helpers (architecture §8). Every indexable page builds
 * its metadata here, so canonical, Open Graph and Twitter tags stay in step.
 * Unconfirmed (TODO_) descriptions and facts are omitted, never rendered.
 */
import type { Metadata } from "next";
import { confirmed } from "./confirmed";
import { getHome, getMembers, getSite } from "./content";
import { env } from "./env";
import { getShareImage } from "./pages";

const absolute = (path: string) => new URL(path, env.NEXT_PUBLIC_SITE_URL).href;

type PageSeo = {
  /** Site-relative path, e.g. "/work". Becomes the canonical and og:url. */
  path: string;
  /** Page title. " | Afrokan Labs" is appended unless it already names the site. */
  title: string;
  description?: string;
  type?: "website" | "article";
};

export function pageMetadata({ path, title, description, type = "website" }: PageSeo): Metadata {
  const site = getSite();
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const desc = confirmed(description) ? description : undefined;
  // The page's own public/og/<page>.png, else /og-image.png; omitted while neither exists.
  const image = getShareImage(path);

  return {
    title: { absolute: fullTitle },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: "en_GH",
      title: fullTitle,
      description: desc,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: image ? [image.url] : undefined,
    },
  };
}

const ORGANIZATION_ID = "/#organization";

/**
 * Homepage: the company as an Organization and a ProfessionalService, at city
 * level, with its founders. Only what the homepage shows: the logo mark, the
 * footer's email, phone, place and profiles, and the team's names and roles.
 */
export function organizationJsonLd() {
  const site = getSite();
  const sameAs = Object.values(site.social).filter(confirmed);
  const founders = getMembers().map((m) => ({
    "@type": "Person",
    name: m.name.join(" "),
    // The role as the homepage shows it ("CEO"); About spells it out.
    jobTitle: m.abbr,
    ...(confirmed(m.linkedin) ? { sameAs: [m.linkedin] } : {}),
  }));
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": absolute(ORGANIZATION_ID),
    name: site.name,
    url: absolute("/"),
    logo: {
      "@type": "ImageObject",
      url: absolute("/apple-touch-icon.png"),
      width: 180,
      height: 180,
    },
    description: getHome().meta.description,
    email: site.email,
    // Shown as text on Contact and in the footer.
    ...(confirmed(site.whatsappNumber) ? { telephone: site.whatsappNumber } : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.days,
      opens: site.hours.opens,
      closes: site.hours.closes,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    ...(sameAs.length ? { sameAs } : {}),
    founder: founders,
  };
}
