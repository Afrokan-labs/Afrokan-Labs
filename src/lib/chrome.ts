/**
 * Props for the site-wide header and footer, shared by the (site) layout and
 * the root 404 page (which sits outside that route group).
 */
import { trackingAttrs } from "./analytics";
import { confirmed } from "./confirmed";
import { getNav, getSite } from "./content";
import { whatsappLink } from "./whatsapp";

export function getChromeProps() {
  const site = getSite();
  const nav = getNav();
  const linkedin = site.social.linkedin;

  return {
    header: {
      siteName: site.name,
      skipLink: { label: site.ui.skipLink, target: "main" },
      links: nav.items,
      headerCta: whatsappLink({ location: "header" }),
      menuCta: whatsappLink({ location: "menu" }),
      ctaLabel: nav.cta,
      labels: { nav: site.ui.nav.main, menu: site.ui.nav.menu, close: site.ui.nav.close },
    },
    footer: {
      siteName: site.name,
      email: site.email,
      emailTracking: trackingAttrs("email_click", { location: "footer" }),
      // Shown only once the LinkedIn page exists and is kept active (copy §7).
      linkedin: confirmed(linkedin)
        ? { href: linkedin, label: site.footer.linkedinLabel, externalNote: site.ui.opensNewTab }
        : undefined,
      links: nav.footerLinks,
      navLabel: site.ui.nav.footer,
      year: new Date().getFullYear(),
    },
  };
}
