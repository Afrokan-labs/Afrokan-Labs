"use client";

import { useEffect } from "react";

const REVEAL =
  ".x-ideas-head, .x-shot, .o-text, .o-stage, .sv-top, .sv-row, .x-work-grid, .x-words, .hw-row, .x-crew-head, .x-arch, .rv-h, .rv-row, .x-tband, .x-contact-text, .x-mapwrap, .f-big, .f-cols, .f-bottom, .x-head, .s-row, .sol-moment, .sol-i, .i-card, .i-item, .i-news, .x-value, .rd-panel, .x-stop, .x-story, .st-lead, .st-flow, .st-facts, .x-cta, .x-lower > *, .c-direct";

/**
 * The reference's shared page script, run once per page load: theme toggle,
 * the footer's Accra clock and back-to-top, page fade transitions and the
 * staggered scroll reveals. Internal links are plain <a>, so each page is a
 * fresh document and this runs on every page.
 */
export function SiteScripts() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const done = () => cleanups.forEach((c) => c());
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // Theme toggle: data-site-theme="light" on <html>, saved as afk-theme.
    const btns = [...document.querySelectorAll<HTMLButtonElement>(".x-theme button")];
    const setTheme = (t: string, save: boolean) => {
      if (t === "light") root.setAttribute("data-site-theme", "light");
      else root.removeAttribute("data-site-theme");
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.t === t)));
      if (!save) return;
      try {
        localStorage.setItem("afk-theme", t);
      } catch {
        // Storage blocked: the choice lasts for this page only.
      }
    };
    setTheme(root.getAttribute("data-site-theme") === "light" ? "light" : "dark", false);
    btns.forEach((b) => (b.onclick = () => setTheme(b.dataset.t ?? "dark", true)));

    // Footer clock (Accra) and back to top.
    const time = document.getElementById("ftime");
    if (time) {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZone: "Africa/Accra",
      });
      const tick = () => {
        time.textContent = fmt.format(new Date()).toUpperCase() + " GMT+0, Accra";
      };
      tick();
      const id = setInterval(tick, 30000);
      cleanups.push(() => clearInterval(id));
    }
    const top = document.querySelector<HTMLAnchorElement>(".f-top");
    if (top) {
      top.onclick = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      };
    }

    if (reduce) return done;

    // Page transitions: fade out, then go to the other page of the site.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const h = a.getAttribute("href") ?? "";
      if (!h.startsWith("/") || h.startsWith("//") || a.target === "_blank") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const url = new URL(a.href);
      // Another anchor on this page: let the browser scroll.
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      root.classList.add("fx-leave");
      setTimeout(() => (location.href = url.href), 260);
      setTimeout(() => root.classList.remove("fx-leave"), 1500);
    };
    const onShow = () => root.classList.remove("fx-leave");
    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onShow);
    cleanups.push(() => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onShow);
    });

    // Staggered scroll reveals, only for things below the first screen at load.
    if (!("IntersectionObserver" in window)) return done;
    const els = [...document.querySelectorAll<HTMLElement>(REVEAL)];
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("fx-in");
          en.target.classList.remove("fx-pre");
          io.unobserve(en.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      const sibs = el.parentElement
        ? [...el.parentElement.children].filter((c) => c.matches(REVEAL))
        : [];
      const i = Math.max(0, sibs.indexOf(el));
      el.style.setProperty("--fx-d", Math.min(i, 5) * 0.09 + "s");
      el.classList.add("fx-pre");
      io.observe(el);
    });
    // Safety net: never leave anything on screen hidden.
    const safety = setTimeout(() => {
      els.forEach((el) => {
        if (
          el.classList.contains("fx-pre") &&
          el.getBoundingClientRect().top < window.innerHeight
        ) {
          el.classList.add("fx-in");
          el.classList.remove("fx-pre");
        }
      });
    }, 2500);
    cleanups.push(() => {
      io.disconnect();
      clearTimeout(safety);
    });
    return done;
  }, []);
  return null;
}
