"use client";

import { useState } from "react";
import { ArrowRight } from "@/components/ui/icons";
import styles from "./Services.module.css";

type Item = { number: string; name: string; body: string };

/**
 * reference §4 service rows: one open at a time, the first open by default.
 * Without JavaScript every description shows (CSS `scripting: none`).
 */
export function ServiceAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className={styles.rows}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const descId = `service-${i}`;
        return (
          <li key={item.name} className={styles.row} data-open={isOpen}>
            <h3 className={styles.rowHeading}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={descId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={styles.n} aria-hidden="true">
                  {item.number}
                </span>
                {item.name}
                <ArrowRight className={styles.ar} />
              </button>
            </h3>
            <p className={styles.desc} id={descId}>
              {item.body}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
