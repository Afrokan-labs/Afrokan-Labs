/**
 * Props for the site-wide header and footer, shared by the layouts and the
 * root 404 page (which sits outside the route groups).
 */
import { trackingAttrs } from "./analytics";
import { confirmed } from "./confirmed";
import { getNav, getSite } from "./content";
import { whatsappLink, whatsappTextLink } from "./whatsapp";

export function getChromeProps() {
  const site = getSite();
  const nav = getNav();
  const { newsletter } = site.footer;

  const profiles = [
    { name: "LinkedIn", url: site.social.linkedin },
    { name: "X", url: site.social.x },
    { name: "Instagram", url: site.social.instagram },
  ] as const;
  // Only profiles with a confirmed URL get an icon; WhatsApp joins once the number is set.
  const social = [
    ...profiles.flatMap((p) => (confirmed(p.url) ? [{ name: p.name, href: p.url }] : [])),
    ...(confirmed(site.whatsappNumber)
      ? [{ name: "WhatsApp" as const, href: whatsappTextLink({ location: "footer" }).href }]
      : []),
  ];

  return {
    header: {
      skipLink: { label: site.ui.skipLink, target: "main" },
      links: nav.items,
      menuCta: { ...whatsappLink({ location: "menu" }), label: nav.cta },
      labels: {
        nav: site.ui.nav.main,
        home: site.ui.nav.home,
        menu: site.ui.nav.menu,
        close: site.ui.nav.close,
      },
    },
    footer: {
      siteName: site.name,
      blurb: site.footer.blurb,
      columns: nav.columns,
      email: site.email,
      emailTracking: trackingAttrs("email_click", { location: "footer" }),
      whatsapp: {
        ...whatsappTextLink({ location: "footer" }),
        label: nav.columns.contact.whatsapp,
      },
      location: site.location,
      newsletter: newsletter.enabled ? newsletter : undefined,
      social,
      opensNewTab: site.ui.opensNewTab,
      labels: { nav: site.ui.nav.footer, social: site.ui.nav.social, home: site.ui.nav.home },
      copyright: site.footer.copyright.replace("{year}", String(new Date().getFullYear())),
    },
  };
}

export type ChromeProps = ReturnType<typeof getChromeProps>;
