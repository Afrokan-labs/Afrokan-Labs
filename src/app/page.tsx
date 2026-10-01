import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { getHome, getSite } from "@/lib/content";

const home = getHome();

export const metadata: Metadata = {
  title: { absolute: home.meta.title },
  description: home.meta.description,
  alternates: { canonical: "/" },
};

// Temporary coming-soon page (BUILD_PLAN 1.6) until the homepage ships at launch.
export default function Page() {
  const site = getSite();
  return (
    <ComingSoon
      siteName={site.name}
      skipLinkLabel={site.ui.skipLink}
      headline={home.hero.headline}
      subhead={home.hero.subhead}
      contactTitle={home.contact.title}
      email={site.email}
      location={site.location}
      year={new Date().getFullYear()}
    />
  );
}
