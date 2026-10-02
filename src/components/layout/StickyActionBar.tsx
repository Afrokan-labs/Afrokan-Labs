"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";
import styles from "./StickyActionBar.module.css";

type Props = {
  /** whatsappLink({ location: "sticky" }), built on the server. */
  cta: WhatsAppLinkProps & { label: string };
  /**
   * id of the element the bar waits for: it appears once this has scrolled
   * out of view above (the homepage's hero CTA). Omit to show from load.
   */
  showAfter?: string;
  /**
   * id of the page's closing CTA (the Contact section on the homepage). The
   * bar hides while it is in view and below it, so two identical buttons never
   * show at once and the bar never covers the footer.
   */
  hideAt: string;
};

/**
 * design-system §8 StickyActionBar, below 1024px only. Render it directly
 * after the page's <main>. IntersectionObserver only, no scroll listeners.
 * Fixed position and transform-only motion, so it never shifts the layout.
 */
export function StickyActionBar({ cta, showAfter, hideAt }: Props) {
  const [pastTrigger, setPastTrigger] = useState(!showAfter);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    // "Above the viewport": scrolled past, rather than not yet reached.
    const above = (e: IntersectionObserverEntry) => e.boundingClientRect.bottom <= 0;

    const trigger = showAfter ? document.getElementById(showAfter) : null;
    if (trigger) {
      const o = new IntersectionObserver(([e]) => setPastTrigger(!e.isIntersecting && above(e)));
      o.observe(trigger);
      observers.push(o);
    }

    const end = document.getElementById(hideAt);
    if (end) {
      const o = new IntersectionObserver(([e]) => setAtEnd(e.isIntersecting || above(e)));
      o.observe(end);
      observers.push(o);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [showAfter, hideAt]);

  const visible = pastTrigger && !atEnd;
  const { label, ...link } = cta;

  return (
    // Hidden until JS decides; inert keeps the off-screen button out of the tab order.
    <div className={styles.bar} data-visible={visible} inert={!visible}>
      <Button fullWidth {...link}>
        {label}
      </Button>
    </div>
  );
}
