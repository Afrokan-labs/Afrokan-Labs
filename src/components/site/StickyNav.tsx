"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * Update 2 §1, reference .snav: once the page's nav scrolls out of view, a
 * floating copy (the same <Nav>, passed in as children) slides down from the
 * top, and slides back up when the original is visible again.
 *
 * The copy is portalled to <body>, so no transformed or animated ancestor can
 * break its position: fixed. While hidden it's inert (and aria-hidden), so its
 * links can't be reached with Tab or by a screen reader.
 */
export function StickyNav({ children }: { children: React.ReactNode }) {
  // Sits right after the page's own nav, so its previous sibling is that nav.
  const marker = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);
  const [on, setOn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const nav = marker.current?.previousElementSibling;
    if (!nav) return;
    const io = new IntersectionObserver(([entry]) =>
      // Shown only once the nav has gone off the top, not while it's below the fold.
      setOn(!entry.isIntersecting && entry.boundingClientRect.bottom < 0),
    );
    io.observe(nav);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <span ref={marker} hidden />
      {mounted &&
        createPortal(
          <div className={on ? "snav x on" : "snav x"} aria-hidden={!on} inert={!on}>
            {children}
          </div>,
          document.body,
        )}
    </>
  );
}
