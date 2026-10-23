import { Fragment } from "react";
import { NAV, type NavKey } from "@/lib/links";
import { LogoMark } from "./LogoMark";
import { MenuSheet } from "./MenuSheet";
import { StickyNav } from "./StickyNav";

type Props = {
  /** The page's own link shows as the green pill. */
  current?: NavKey;
  /** Inner pages with a dark hero use the dark pill (#1A1A1A, 1px border). */
  dark?: boolean;
  /** The home page's logo scrolls to the top instead. */
  logoHref?: string;
  /** The floating copy StickyNav shows after scrolling (update 2 §1). */
  sticky?: boolean;
};

/**
 * reference .x-nav: Services · Solutions | logo | Work · About · Contact.
 * Every page nav also gets a sticky copy that appears once it scrolls away.
 */
export function Nav({ current, dark, logoHref = "/", sticky }: Props) {
  // The spaces are dropped by the flex rows but keep the links apart when copied.
  const link = (l: { key: string; label: string; href: string }) => (
    <Fragment key={l.key}>
      {" "}
      <a href={l.href} aria-current={l.key === current ? "page" : undefined}>
        {l.label}
      </a>
    </Fragment>
  );
  return (
    <>
      <nav
        className={dark ? "x-nav x-nav-dark" : "x-nav"}
        aria-label={sticky ? "Main (sticky)" : "Main"}
      >
        <div className="x-nav-side">{NAV.left.map(link)}</div>
        <a className="x-logo" href={logoHref} aria-label="Afrokan Labs home">
          <LogoMark />
          Afrokan Labs
        </a>
        <div className="x-nav-side">
          {NAV.right.map(link)}{" "}
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
          </a>{" "}
          <MenuSheet links={NAV.all} current={current} />
        </div>
      </nav>
      {!sticky && (
        <StickyNav>
          <Nav current={current} dark={dark} logoHref={logoHref} sticky />
        </StickyNav>
      )}
    </>
  );
}
