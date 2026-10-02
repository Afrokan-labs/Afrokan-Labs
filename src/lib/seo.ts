/**
 * Metadata and JSON-LD helpers (architecture §8). Every indexable page builds
 * its metadata here, so canonical, Open Graph and Twitter tags stay in step.
 * Unconfirmed (TODO_) descriptions and facts are omitted, never rendered.
 */
import type { Metadata } from "next";
import { confirmed } from "./confirmed";
import { getHome, getSite } from "./content";
import { env } from "./env";
import { getOgImage } from "./pages";

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
  const image = getOgImage(path);

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
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description: desc,
      images: image ? [image.url] : undefined,
    },
  };
}

const ORGANIZATION_ID = "/#organization";

/** Homepage: the company as an Organization and a ProfessionalService, at city level. */
export function organizationJsonLd() {
  const site = getSite();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": absolute(ORGANIZATION_ID),
    name: site.name,
    url: absolute("/"),
    description: getHome().meta.description,
    email: site.email,
    ...(confirmed(site.whatsappNumber) ? { telephone: site.whatsappNumber } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressCountry: site.address.country,
    },
    ...(confirmed(site.social.linkedin) ? { sameAs: [site.social.linkedin] } : {}),
  };
}

/**
 * Case study: an Article written and published by the company. No dates
 * until the content has a confirmed one to use.
 */
export function articleJsonLd({ path, title, description }: Omit<PageSeo, "type">) {
  const site = getSite();
  const org = { "@type": "Organization", "@id": absolute(ORGANIZATION_ID), name: site.name };
  const image = getOgImage(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(confirmed(description) ? { description } : {}),
    url: absolute(path),
    mainEntityOfPage: absolute(path),
    inLanguage: "en-GH",
    author: org,
    publisher: org,
    ...(image ? { image: [absolute(image.url)] } : {}),
  };
}
