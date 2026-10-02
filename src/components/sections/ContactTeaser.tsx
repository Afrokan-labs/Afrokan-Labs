"use client";

import { useRef, useState, type FormEvent } from "react";
import { CONTACT_PREFILL_KEY } from "@/lib/contact-fields";
import styles from "./Contact.module.css";

type Props = {
  action: string;
  label: string;
  placeholder: string;
  submit: string;
  invalid: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The homepage email box (reference §11). It doesn't send anything: "Contact
 * Us" opens the /contact form with the address filled in, so there is one
 * form to maintain and spam protection stays off the homepage (CLAUDE.md
 * override 6). The address travels in sessionStorage, never in the URL.
 * Without JavaScript the box is a plain link-style form to /contact.
 */
export function ContactTeaser({ action, label, placeholder, submit, invalid }: Props) {
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";
    if (email && !EMAIL.test(email)) {
      setError(true);
      inputRef.current?.focus();
      return;
    }
    try {
      if (email) sessionStorage.setItem(CONTACT_PREFILL_KEY, email);
    } catch {
      // Storage blocked: the form still opens, just empty.
    }
    window.location.assign(action);
  }

  return (
    <>
      <form className={styles.form} action={action} method="get" onSubmit={onSubmit} noValidate>
        <label htmlFor="teaser-email" className="sr-only">
          {label}
        </label>
        {/* No name attribute: without JS the address is not put in the URL. */}
        <input
          ref={inputRef}
          id="teaser-email"
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          aria-invalid={error || undefined}
          aria-describedby={error ? "teaser-error" : undefined}
          onChange={() => error && setError(false)}
        />
        <button type="submit">{submit}</button>
      </form>
      <p className={styles.msg} role="status" id="teaser-error">
        {error ? invalid : null}
      </p>
    </>
  );
}
