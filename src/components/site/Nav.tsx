import { getNavCopy, NAV, type NavKey } from "@/lib/links";
import { LogoMark, SocialIcon } from "./LogoMark";
import { MenuSheet } from "./MenuSheet";
import { StickyNav } from "./StickyNav";

type Props = {
  /** The page's own link is marked current in the menu panel. */
  current?: NavKey;
  /** Pages with a dark top: same layout, colours swapped (update 7 §2 "Dark pages"). */
  dark?: boolean;
  /** The home page's logo scrolls to the top instead. */
  logoHref?: string;
  /** The floating copy StickyNav shows after scrolling (update 2 §1). */
  sticky?: boolean;
};

const ARROW = (
  <svg className="cl-arrow" viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Update 7 §2, prototype .cl: MENU pill | logo | "Book a free call" pill, with
 * no bar behind them. No other links in the top row; MENU opens the panel.
 * Every page nav also gets a sticky copy that appears once it scrolls away.
 */
export function Nav({ current, dark, logoHref = "/", sticky }: Props) {
  const copy = getNavCopy();
  const logo = (
    <a className="cl-logo" href={logoHref} aria-label={copy.home}>
      <LogoMark />
      <span>{copy.name}</span>
    </a>
  );
  const cta = (
    <a
      className="cl-cta"
      href={NAV.contact.href}
      aria-current={current === "contact" ? "page" : undefined}
    >
      <span className="cl-full">{copy.book}</span>
      <span className="cl-short">{copy.bookShort}</span>
      {ARROW}
    </a>
  );
  const social = copy.instagram && (
    <a className="cl-social" href={copy.instagram.href}>
      <SocialIcon path={copy.instagram.path} />
      <span className="sr-only">{copy.instagram.name}: </span>
      {copy.instagram.handle}
    </a>
  );
  const cls = ["cl", dark && "cl-dark", sticky && "cl-sticky"].filter(Boolean).join(" ");
  return (
    <>
      <nav className={cls} aria-label={sticky ? `${copy.main} (sticky)` : copy.main}>
        <MenuSheet
          links={NAV.menu}
          current={current}
          menu={copy.menu}
          close={copy.close}
          className={cls}
          logo={logo}
          cta={cta}
          social={social}
        />{" "}
        {logo} {cta}
      </nav>
      {/* The copy floats over the dark page below every hero, so it always uses
          the dark colours (the light theme turns them back). */}
      {!sticky && (
        <StickyNav>
          <Nav current={current} dark logoHref={logoHref} sticky />
        </StickyNav>
      )}
    </>
  );
}
