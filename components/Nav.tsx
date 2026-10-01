"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./Mark";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#products", label: "Products" },
  { href: "#team", label: "Team" },
];

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
          <a href="#contact" className="btn btn--green nav-cta" onClick={() => setOpen(false)}>
            Start a project
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
