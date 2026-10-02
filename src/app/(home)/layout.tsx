import { SiteFooter } from "@/components/layout/SiteFooter";
import { getChromeProps } from "@/lib/chrome";

/**
 * The homepage and its fixtures: the site header lives inside the hero card
 * (src/components/sections/Hero.tsx), so this layout adds only the footer.
 */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter {...getChromeProps().footer} />
    </>
  );
}
