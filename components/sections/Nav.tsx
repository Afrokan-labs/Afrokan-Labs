"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Mark";
import { navCta, navLinks } from "@/content/home";
import { site } from "@/content/site";
import shared from "@/styles/shared.module.css";
import styles from "./Nav.module.css";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    // DESIGN: the original nav was transparent over the hero and gained a blurred dark background on scroll.
    <header className={`${styles.nav} ${open ? styles.open : ""}`}>
      <div className={`${shared.container} ${styles.inner}`}>
        <a href="/#top" className={styles.brand} aria-label={`${site.name}, home`} onClick={close}>
          <Wordmark />
        </a>

        <nav id="site-menu" className={styles.links} aria-label="Main">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={styles.link} onClick={close}>
              {l.label}
            </a>
          ))}
          <a href={navCta.href} className={`${shared.btn} ${shared.btnPrimary} ${styles.cta}`} onClick={close}>
            {navCta.label}
          </a>
        </nav>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className={`${styles.bar} ${styles.bar1}`} aria-hidden="true" />
          <span className={`${styles.bar} ${styles.bar2}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
