"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Mark, Wordmark } from "@/components/Mark";
import { contact, navCta, navLinks, navMenu } from "@/content/home";
import { site, whatsappHref } from "@/content/site";
import styles from "./Nav.module.css";

const pad = (n: number) => String(n + 1).padStart(2, "0");
const sectionIds = navLinks.map((l) => l.href.split("#")[1]).filter(Boolean);

/** Scroll position → bar state: condensed after a little scroll, hidden while scrolling down. */
function useScrollState(locked: boolean) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y < 320 || y < last - 4) setHidden(false);
      else if (y > last + 4) setHidden(true);
      last = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return { scrolled, hidden: hidden && !locked };
}

/** Which nav section is crossing the middle of the viewport. Null on pages without those sections. */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setActive(sectionIds.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

function AccraClock() {
  const { city, timeZone, zoneLabel } = navMenu.clock;
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <p className={styles.clock}>
      <span className={styles.clockDot} aria-hidden="true" />
      <span className={styles.clockCity}>{city}</span>
      <time className={styles.clockTime}>{time || "--:--"}</time>
      <span className={styles.clockZone}>{zoneLabel}</span>
    </p>
  );
}

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ x: 0, w: 0, on: false });

  const { scrolled, hidden } = useScrollState(open);
  const active = useActiveSection();

  const listRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstPanelLink = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock, Escape to close, and focus handling for the mobile panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const t = window.setTimeout(() => firstPanelLink.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the panel if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // The signal line follows the hovered link, falling back to the active section.
  const target = hovered ?? (active ? `/#${active}` : null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = target ? listRef.current?.querySelector<HTMLElement>(`a[href="${target}"]`) : null;
      setIndicator((prev) => (el ? { x: el.offsetLeft, w: el.offsetWidth, on: true } : { ...prev, on: false }));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [target]);

  const headerClass = [styles.header, scrolled && styles.scrolled, hidden && styles.hidden, open && styles.open]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <div className={styles.bar}>
          <a href="/#top" className={styles.brand} aria-label={`${site.name}, home`} onClick={close}>
            <Wordmark />
          </a>

          <nav className={styles.desktop} aria-label="Main">
            <ul ref={listRef} className={styles.list} onMouseLeave={() => setHovered(null)}>
              {navLinks.map((l, i) => {
                const isActive = active !== null && l.href === `/#${active}`;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                      aria-current={isActive ? "location" : undefined}
                      onMouseEnter={() => setHovered(l.href)}
                      onFocus={() => setHovered(l.href)}
                      onBlur={() => setHovered(null)}
                    >
                      <span className={styles.idx} aria-hidden="true">
                        {pad(i)}
                      </span>
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <span
              className={`${styles.signal} ${indicator.on ? styles.signalOn : ""}`}
              style={{ transform: `translateX(${indicator.x}px)`, width: indicator.w }}
              aria-hidden="true"
            />
          </nav>

          <div className={styles.actions}>
            <AccraClock />
            <a href={navCta.href} className={styles.cta} onClick={close}>
              <span>{navCta.label}</span>
              <Arrow />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span className={styles.toggleLabel}>{open ? navMenu.closeLabel : navMenu.openLabel}</span>
              <span className={styles.toggleIcon} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Holds the bar's space in the flow; the bar itself is fixed above it. */}
      <div className={styles.spacer} aria-hidden="true" />

      <div id="site-menu" className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
        <Mark className={styles.panelMark} />
        <nav aria-label="Mobile">
          <ol className={styles.panelList}>
            {navLinks.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <a href={l.href} ref={i === 0 ? firstPanelLink : undefined} className={styles.panelLink} onClick={close}>
                  <span className={styles.panelIdx} aria-hidden="true">
                    {pad(i)}
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
            <li style={{ "--i": navLinks.length } as React.CSSProperties}>
              <a href={navCta.href} className={styles.panelCta} onClick={close}>
                <span>{navCta.label}</span>
                <Arrow />
              </a>
            </li>
          </ol>
        </nav>

        <div className={styles.panelFoot}>
          <p className={styles.panelHeading}>{navMenu.contactHeading}</p>
          <a href={`mailto:${site.email}`} className={styles.panelEmail}>
            {site.email}
          </a>
          <div className={styles.panelMeta}>
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {contact.whatsappLabel}
              </a>
            )}
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                {contact.bookingLabel}
              </a>
            )}
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}
