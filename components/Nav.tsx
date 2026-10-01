"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Mark";
import { navLinks as links, navCta } from "@/content/home";


export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav-inner container">
        <a href="#top" className="nav-brand" aria-label="Afrokan Labs, back to top" onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav id="site-menu" className="nav-links" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={navCta.href} className="btn btn--green nav-cta" onClick={() => setOpen(false)}>
            {navCta.label}
          </a>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-toggle-bar nav-toggle-bar--1" />
          <span className="nav-toggle-bar nav-toggle-bar--2" />
        </button>
      </div>
    </header>
  );
}
