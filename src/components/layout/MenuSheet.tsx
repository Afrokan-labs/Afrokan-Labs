"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/Mark";
import { Button } from "@/components/primitives/Button";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";
import styles from "./MenuSheet.module.css";

type Props = {
  siteName: string;
  links: { label: string; href: string }[];
  /** whatsappLink({ location: "menu" }), built on the server. */
  cta: WhatsAppLinkProps & { label: string };
  labels: { menu: string; close: string; nav: string };
};

/**
 * design-system §8 MenuSheet (below 1024px). Built on native <dialog> with
 * showModal(): the browser provides the focus trap, Escape to close and the
 * inert background. This component adds closing on link tap and returning
 * focus to the toggle.
 */
export function MenuSheet({ siteName, links, cta, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // preventScroll: after a link tap the page is scrolling to that section;
    // focusing the toggle normally would jump back to the header.
    const onClose = () => toggleRef.current?.focus({ preventScroll: true });
    dialog.addEventListener("close", onClose);

    // The sheet is mobile-only. If the window grows past 1024px, close it.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && dialog.open && dialog.close();
    desktop.addEventListener("change", onResize);

    return () => {
      dialog.removeEventListener("close", onClose);
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();
  const { label: ctaLabel, ...ctaLink } = cta;

  return (
    <div className={styles.root}>
      <Button
        ref={toggleRef}
        variant="ghost"
        aria-haspopup="dialog"
        aria-controls="menu-sheet"
        onClick={open}
      >
        {labels.menu}
      </Button>

      <dialog id="menu-sheet" ref={dialogRef} className={styles.sheet} aria-label={labels.menu}>
        <div className={`container ${styles.top}`}>
          <Link href="/" className={styles.brand} aria-label={siteName} onClick={close}>
            <Wordmark />
          </Link>
          <Button variant="ghost" onClick={close}>
            {labels.close}
          </Button>
        </div>

        <nav className="container" aria-label={labels.nav}>
          <ul className={styles.list}>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`container ${styles.bottom}`}>
          <Button fullWidth {...ctaLink} onClick={close}>
            {ctaLabel}
          </Button>
        </div>
      </dialog>
    </div>
  );
}
