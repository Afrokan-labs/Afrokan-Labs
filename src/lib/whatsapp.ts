/**
 * The only way to build a WhatsApp link (CLAUDE.md component rule 3).
 * The number lives only in src/content/site.ts.
 *
 * Server-side: it reads content through src/lib/content.ts. Pages call it and
 * pass the result to client components as props.
 *
 *   <Button {...whatsappLink()}>{hero.primaryCta}</Button>
 */
import { getSite } from "./content";
import { waMeUrl } from "./wa-me";

export type WhatsAppLinkProps = {
  href: string;
  /** Tells Button to show the WhatsApp glyph. */
  whatsapp: true;
  /** Screen-reader note: "(opens WhatsApp)". */
  srNote: string;
};

function waHref(message: string): string {
  const { whatsappNumber } = getSite();
  // Until the number is confirmed the link is an inert in-page anchor;
  // launch:check blocks launch while the TODO_ remains.
  if (whatsappNumber.startsWith("TODO_")) return `#${whatsappNumber}`;
  return waMeUrl(whatsappNumber, message);
}

/** A WhatsApp CTA with the default prefilled message. */
export function whatsappLink(): WhatsAppLinkProps {
  const site = getSite();
  return {
    href: waHref(site.whatsappPrefill.default),
    whatsapp: true,
    srNote: site.ui.opensWhatsApp,
  };
}

/**
 * A plain WhatsApp text link (no Button glyph flag), for footers and inline
 * links that draw their own icon. Same href and note as whatsappLink().
 */
export function whatsappTextLink() {
  const site = getSite();
  return {
    href: waHref(site.whatsappPrefill.default),
    srNote: site.ui.opensWhatsApp,
  };
}

/** The demo-offer CTA (OfferBand), with the demo prefill. */
export function demoOfferLink(): WhatsAppLinkProps {
  const site = getSite();
  return {
    href: waHref(site.whatsappPrefill.demo),
    whatsapp: true,
    srNote: site.ui.opensWhatsApp,
  };
}
