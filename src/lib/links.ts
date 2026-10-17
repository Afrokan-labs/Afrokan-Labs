/**
 * Contact facts and links the site handoff pages share (nav, footer, CTAs).
 * Server-side: reads src/content/site.ts through src/lib/content.ts.
 */
import { confirmed } from "./confirmed";
import { getSite } from "./content";
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

/** An unconfirmed (TODO_) profile renders as an inert "#" link until it's set. */
const orHash = (url: string | undefined) => (url && confirmed(url) ? url : "#");

export function getLinks() {
  const site = getSite();
  const wa = whatsappTextLink({ location: "contact" });
  const whatsapp = wa.href;
  // srNote is for Button; these links take only the data-umami-* tracking attributes.
  const whatsappAttrs = Object.fromEntries(
    Object.entries(wa).filter(([k]) => k.startsWith("data-")),
  );
  return {
    email: site.email,
    mailto: `mailto:${site.email}`,
    location: site.location,
    /** wa.me link with the prefilled message (an inert anchor until the number is set). */
    whatsapp,
    /** Umami click tracking for WhatsApp links. */
    whatsappAttrs,
    linkedin: orHash(site.social.linkedin),
    x: orHash(site.social.x),
    instagram: orHash(site.social.instagram),
  };
}
