import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { trackingAttrs } from "@/lib/analytics";
import { getNav, getSite } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Shared header and footer for the site's pages. The coming-soon page at "/"
 * sits outside this group until launch (BUILD_PLAN 5.1). Pages here render
 * <main id="main">, the skip link's target.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();
  const nav = getNav();
  const linkedin = site.social.linkedin;

  return (
    <>
      <SiteHeader
        siteName={site.name}
        skipLink={{ label: site.ui.skipLink, target: "main" }}
        links={nav.items}
        headerCta={whatsappLink({ location: "header" })}
        menuCta={whatsappLink({ location: "menu" })}
        ctaLabel={nav.cta}
        labels={{ nav: site.ui.nav.main, menu: site.ui.nav.menu, close: site.ui.nav.close }}
      />
      {children}
      <SiteFooter
        siteName={site.name}
        email={site.email}
        emailTracking={trackingAttrs("email_click", { location: "footer" })}
        linkedin={
          linkedin && !linkedin.startsWith("TODO_")
            ? {
                href: linkedin,
                label: site.footer.linkedinLabel,
                externalNote: site.ui.opensNewTab,
              }
            : undefined
        }
        links={nav.footerLinks}
        navLabel={site.ui.nav.footer}
        year={new Date().getFullYear()}
      />
    </>
  );
}
