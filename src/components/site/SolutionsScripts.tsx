"use client";

import { useEffect } from "react";

/**
 * Update 4 §1: the industry index accordion (reference solutions.html).
 * One row open at a time; clicking the open row closes it. Closed panels
 * are inert, so their links aren't focusable while collapsed.
 */
export function SolutionsScripts() {
  useEffect(() => {
    const rows = [...document.querySelectorAll<HTMLElement>(".bi-row")];
    const parts = rows.map((row) => ({
      row,
      btn: row.querySelector<HTMLButtonElement>(".bi-btn"),
      panel: row.querySelector<HTMLElement>(".bi-panel"),
    }));

    const set = (open: HTMLElement | null) =>
      parts.forEach(({ row, btn, panel }) => {
        const on = row === open;
        row.classList.toggle("open", on);
        btn?.setAttribute("aria-expanded", String(on));
        if (panel) panel.inert = !on;
      });
    set(rows.find((r) => r.classList.contains("open")) ?? null);

    const cleanups = parts.map(({ row, btn }) => {
      const onClick = () => set(row.classList.contains("open") ? null : row);
      btn?.addEventListener("click", onClick);
      return () => btn?.removeEventListener("click", onClick);
    });
    return () => cleanups.forEach((c) => c());
  }, []);
  return null;
}
