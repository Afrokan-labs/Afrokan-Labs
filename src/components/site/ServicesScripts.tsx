"use client";

import { useEffect } from "react";

/**
 * Update 3: the "Every service, in detail" tabs (reference services.html).
 * Click or arrow keys switch tabs; #svc-n (on load, on hashchange, or a
 * same-page link such as the fanned hero cards) selects that tab and
 * scrolls to #details.
 */
export function ServicesScripts() {
  useEffect(() => {
    const tabs = [...document.querySelectorAll<HTMLButtonElement>(".sd-tab")];
    const details = document.getElementById("details");
    if (!tabs.length || !details) return;
    const reduce = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

    const select = (i: number, focus = false) => {
      tabs.forEach((t, k) => {
        const on = k === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls") ?? "");
        if (panel) panel.hidden = !on;
      });
      if (focus) tabs[i]?.focus();
      // Keeps the chosen pill in view when the tabs are a sideways row (≤900px).
      tabs[i]?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };
    const indexOf = (id: string) => tabs.findIndex((t) => t.getAttribute("aria-controls") === id);

    const cleanups = tabs.map((t, i) => {
      const onClick = () => select(i);
      const onKey = (e: KeyboardEvent) => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
        if (!step) return;
        e.preventDefault();
        select((i + step + tabs.length) % tabs.length, true);
      };
      t.addEventListener("click", onClick);
      t.addEventListener("keydown", onKey);
      return () => {
        t.removeEventListener("click", onClick);
        t.removeEventListener("keydown", onKey);
      };
    });

    const fromHash = () => {
      const i = indexOf(location.hash.slice(1));
      if (i < 0) return;
      select(i);
      details.scrollIntoView();
    };
    window.addEventListener("hashchange", fromHash);
    fromHash();

    const onLink = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#svc-"]');
      if (!a) return;
      const i = indexOf(a.getAttribute("href")?.slice(1) ?? "");
      if (i < 0) return;
      e.preventDefault();
      select(i);
      details.scrollIntoView({ behavior: reduce() ? "auto" : "smooth" });
    };
    document.addEventListener("click", onLink);

    return () => {
      cleanups.forEach((c) => c());
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onLink);
    };
  }, []);
  return null;
}
