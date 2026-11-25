"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  links: readonly { key: string; label: string; href: string }[];
  current?: string;
  /** The button's two labels: "Menu" while closed, "Close" while open. */
  menu: string;
  close: string;
  /** The nav's own classes, so the copy of its row inside the dialog matches it. */
  className: string;
  /** The nav's logo and "Book a free call" links, repeated above the panel. */
  logo: React.ReactNode;
  cta: React.ReactNode;
  social?: React.ReactNode;
};

/** The panel's slide (update 7 §2: 600ms); a fade only under reduced motion. */
const SLIDE_MS = 600;
const FADE_MS = 200;

/**
 * Update 7 §2: the MENU pill and the panel it opens. The panel is a modal
 * <dialog>, so focus stays inside it and Escape closes it natively. The logo
 * and "Book a free call" stay clickable above it: the dialog carries a copy of
 * the nav's row, placed exactly over the original, with CLOSE in MENU's place.
 */
export function MenuSheet({ links, current, menu, close, className, logo, cta, social }: Props) {
  const id = useId();
  const button = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [open, setOpen] = useState(false);

  const unlock = () => {
    const html = document.documentElement;
    html.style.overflow = "";
    html.style.paddingRight = "";
  };

  const show = (keyboard: boolean) => {
    const d = dialog.current;
    const nav = button.current?.closest<HTMLElement>(".cl");
    if (!d || !nav) return;
    clearTimeout(timer.current);
    // Put the row's copy where the nav is now, at the nav's own padding and logo size.
    const r = nav.getBoundingClientRect();
    const cs = getComputedStyle(nav);
    // The nav's own logo (":scope >"), not the copy inside this dialog.
    const logoSize = getComputedStyle(nav.querySelector(":scope > .cl-logo")!).fontSize;
    const place: Record<string, string> = {
      "--cl-top": `${r.top}px`,
      "--cl-left": `${r.left}px`,
      "--cl-width": `${r.width}px`,
      "--cl-height": `${r.height}px`,
      "--cl-pl": cs.paddingLeft,
      "--cl-pr": cs.paddingRight,
      "--cl-logo-size": logoSize,
    };
    for (const [k, v] of Object.entries(place)) d.style.setProperty(k, v);
    // No page scroll behind the panel; the scrollbar's width is kept so nothing shifts.
    const html = document.documentElement;
    const bar = innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    if (bar > 0) html.style.paddingRight = `${bar}px`;
    if (!d.open) d.showModal();
    // Lay the closed state out first, so the slide runs.
    void d.offsetWidth;
    setOpen(true);
    // Focus moves to the first link only when opened from the keyboard, so mouse
    // users don't see a focus ring (update 7 §2).
    if (keyboard)
      timer.current = setTimeout(
        () => d.querySelector<HTMLElement>(".cl-panel a")?.focus({ preventScroll: true }),
        350,
      );
  };

  const hide = () => {
    const d = dialog.current;
    if (!d?.open) return;
    setOpen(false);
    clearTimeout(timer.current);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(
      () => {
        // close() returns focus to the MENU button.
        d.close();
        unlock();
      },
      reduce ? FADE_MS : SLIDE_MS,
    );
  };

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      unlock();
    },
    [],
  );

  const bars = (
    <span className="cl-bars" aria-hidden="true">
      <i />
      <i />
    </span>
  );

  return (
    <>
      <button
        ref={button}
        type="button"
        className="cl-menu"
        aria-expanded={open}
        aria-controls={id}
        // detail is 0 for a keyboard "click" (Enter or Space).
        onClick={(e) => show(e.detail === 0)}
      >
        {bars}
        <span>{menu}</span>
      </button>
      <dialog
        ref={dialog}
        id={id}
        className={open ? "cl-dialog open" : "cl-dialog"}
        aria-label={menu}
        onCancel={(e) => {
          // Escape: run the closing slide instead of vanishing.
          e.preventDefault();
          hide();
        }}
      >
        <div className="cl-dim" aria-hidden="true" onClick={hide} />
        <div className="cl-panel">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={l.href}
                  aria-current={l.key === current ? "page" : undefined}
                  onClick={hide}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {social}
        </div>
        <div className={`${className} cl-mirror`}>
          <button
            type="button"
            className="cl-menu"
            aria-expanded="true"
            aria-controls={id}
            onClick={hide}
          >
            {bars}
            <span>{close}</span>
          </button>{" "}
          {logo} {cta}
        </div>
      </dialog>
    </>
  );
}
