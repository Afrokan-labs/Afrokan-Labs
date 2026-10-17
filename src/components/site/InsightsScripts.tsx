"use client";

import { useEffect } from "react";

/** reference insights.html: topic filter pills, search box and the (flagged) newsletter box. */
export function InsightsScripts({ preview, invalid }: { preview: string; invalid: string }) {
  useEffect(() => {
    const q = document.getElementById("iq") as HTMLInputElement | null;
    const empty = document.getElementById("iempty");
    const items = [...document.querySelectorAll<HTMLElement>("#ilist .i-item")];
    const btns = [...document.querySelectorAll<HTMLButtonElement>(".i-filter button")];
    if (!q || !empty) return;
    let cat = "all";

    const apply = () => {
      const t = q.value.trim().toLowerCase();
      let n = 0;
      items.forEach((li) => {
        const ok =
          (cat === "all" || li.dataset.cat === cat) &&
          (!t || (li.textContent ?? "").toLowerCase().includes(t));
        li.hidden = !ok;
        if (ok) n++;
      });
      empty.hidden = n > 0;
    };
    btns.forEach((b) => {
      b.onclick = () => {
        cat = b.dataset.cat ?? "all";
        btns.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        apply();
      };
    });
    q.addEventListener("input", apply);

    const search = document.getElementById("isearch");
    const onSearch = (e: Event) => {
      e.preventDefault();
      apply();
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("all")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };
    search?.addEventListener("submit", onSearch);

    const news = document.getElementById("inews");
    const onNews = (e: Event) => {
      e.preventDefault();
      const v = (document.getElementById("inews-email") as HTMLInputElement | null)?.value.trim();
      const m = document.getElementById("inewsmsg");
      if (m) m.textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? "") ? preview : invalid;
    };
    news?.addEventListener("submit", onNews);

    return () => {
      q.removeEventListener("input", apply);
      search?.removeEventListener("submit", onSearch);
      news?.removeEventListener("submit", onNews);
    };
  }, [preview, invalid]);
  return null;
}
