import { NAV, type NavKey } from "@/lib/links";
import { LogoMark } from "./LogoMark";
import { MenuSheet } from "./MenuSheet";

type Props = {
  /** The page's own link shows as the green pill. */
  current?: NavKey;
  /** Inner pages with a dark hero use the dark pill (#1A1A1A, 1px border). */
  dark?: boolean;
  /** The home page's logo scrolls to the top instead. */
  logoHref?: string;
};

/** reference .x-nav: Services · Solutions | logo | Work · About · Contact. */
export function Nav({ current, dark, logoHref = "/" }: Props) {
  const link = (l: { key: string; label: string; href: string }) => (
    <a key={l.key} href={l.href} aria-current={l.key === current ? "page" : undefined}>
      {l.label}
    </a>
  );
  return (
    <nav className={dark ? "x-nav x-nav-dark" : "x-nav"} aria-label="Main">
      <div className="x-nav-side">{NAV.left.map(link)}</div>
      <a className="x-logo" href={logoHref} aria-label="Afrokan Labs home">
        <LogoMark />
        Afrokan Labs
      </a>
      <div className="x-nav-side">
        {NAV.right.map(link)}
        <a
          className="x-nav-cta"
          href={NAV.contact.href}
          aria-current={current === "contact" ? "page" : undefined}
        >
          {NAV.contact.label}
        </a>
      </div>
      <div className="x-menu-row">
        <a className="x-menu" href={NAV.contact.href}>
          {NAV.contact.label}
        </a>
        <MenuSheet links={NAV.all} current={current} />
      </div>
    </nav>
  );
}
