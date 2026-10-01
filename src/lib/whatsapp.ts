/**
 * The only way to build a WhatsApp link (CLAUDE.md component rule 3).
 * The number lives only in src/content/site.ts.
 *
 * Server-side: it reads content through src/lib/content.ts. Pages call it and
 * pass the result to client components as props.
 *
 *   <Button {...whatsappLink({ location: "hero" })}>{hero.primaryCta}</Button>
 */
import { trackingAttrs, type TrackingAttrs, type WhatsAppLocation } from "./analytics";
import { getSite } from "./content";

export type WhatsAppLinkProps = TrackingAttrs & {
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
  return `https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** A WhatsApp CTA with the default prefilled message, tracked as whatsapp_click. */
export function whatsappLink({ location }: { location: WhatsAppLocation }): WhatsAppLinkProps {
  const site = getSite();
  return {
    href: waHref(site.whatsappPrefill.default),
    whatsapp: true,
    srNote: site.ui.opensWhatsApp,
    ...trackingAttrs("whatsapp_click", { location }),
  };
}

/** The demo-offer CTA (OfferBand), with the demo prefill, tracked as demo_offer_click. */
export function demoOfferLink(): WhatsAppLinkProps {
  const site = getSite();
  return {
    href: waHref(site.whatsappPrefill.demo),
    whatsapp: true,
    srNote: site.ui.opensWhatsApp,
    ...trackingAttrs("demo_offer_click"),
  };
}
