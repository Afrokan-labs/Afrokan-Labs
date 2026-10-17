"use client";

import { useRef } from "react";

type Props = {
  links: readonly { label: string; href: string }[];
  current?: string;
};

/**
 * Phones and tablets (≤900px), where the nav shows only the logo and the
 * Contact pill: a Menu button opening a sheet with every page. A modal
 * <dialog> gives focus containment and Escape-to-close natively.
 */
export function MenuSheet({ links, current }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className="x-burger"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Menu</span>
      </button>
      <dialog
        ref={dialog}
        className="x-sheet"
        aria-label="Menu"
        onClick={(e) => {
          // A click on the backdrop (the dialog itself, outside the panel) closes it.
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="x-sheet-panel">
          <button type="button" className="x-sheet-close" onClick={() => dialog.current?.close()}>
            Close
          </button>
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} aria-current={l.href === `/${current}` ? "page" : undefined}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
