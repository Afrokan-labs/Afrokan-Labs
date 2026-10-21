/**
 * Contact facts and links the site handoff pages share (nav, footer, CTAs).
 * Server-side: reads src/content/site.ts through src/lib/content.ts.
 */
import { getSite } from "./content";
import { socialLinks } from "./social";
import { whatsappTextLink } from "./whatsapp";

export type NavKey = "services" | "solutions" | "work" | "about" | "contact" | "insights";

export const NAV = {
  left: [
    { key: "services", label: "Services", href: "/services" },
    { key: "solutions", label: "Solutions", href: "/solutions" },
  ],
  right: [
    { key: "work", label: "Work", href: "/work" },
    { key: "about", label: "About", href: "/about" },
  ],
  contact: { key: "contact", label: "Contact", href: "/contact" },
  /** Footer and menu sheet order. */
  all: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export function getLinks() {
  const site = getSite();
  const whatsapp = whatsappTextLink().href;
  return {
    email: site.email,
    mailto: `mailto:${site.email}`,
    location: site.location,
    /** wa.me link with the prefilled message (an inert anchor until the number is set). */
    whatsapp,
    /** X, Instagram, LinkedIn: confirmed profiles only, with their logos and accessible names. */
    social: socialLinks(site.social, site.name, site.ui.socialLabel),
    /** Screen-reader note for links that open in a new tab. */
    opensNewTab: site.ui.opensNewTab,
  };
}
