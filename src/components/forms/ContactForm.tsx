"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/primitives/Button";
import { track } from "@/lib/analytics";
import {
  CONTACT_ENDPOINT,
  FIELD,
  TURNSTILE_SCRIPT,
  type ContactResponse,
  type ErrorKey,
  type Field,
  type FieldErrors,
} from "@/lib/contact-fields";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";
import styles from "./ContactForm.module.css";

type FieldCopy = { label: string; hint?: string; errors: Partial<Record<ErrorKey, string>> };

type Props = {
  fields: Record<Field, FieldCopy>;
  honeypotLabel: string;
  submit: string;
  sending: string;
  failed: string;
  noScript: string;
  success: { title: string; body: string; whatsapp: WhatsAppLinkProps & { label: string } };
  turnstileSiteKey: string;
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, string>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

/** How long to wait for Turnstile's script before giving up (the server then refuses the post). */
const TURNSTILE_WAIT_MS = 20_000;
/** On submit, how long to wait for a Turnstile token that hasn't arrived yet. */
const TOKEN_WAIT_MS = 10_000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** The validation rules (zod), loaded once the visitor starts on the form. */
const loadRules = () => import("@/lib/contact-form");

function addTurnstileScript() {
  if (document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) return;
  const script = document.createElement("script");
  script.src = TURNSTILE_SCRIPT;
  script.async = true;
  document.head.append(script);
}

const ORDER: Field[] = ["name", "contact", "message"];

/**
 * The /contact form (architecture §5, design-system §9).
 *
 * The markup is a plain form post to /api/contact, and the function answers a
 * plain post with a redirect to a result page. Turnstile, though, needs
 * JavaScript, so without it the post is refused: the <noscript> note points
 * to WhatsApp and email instead. Once hydrated, the form validates with the
 * same schema as the function, shows errors under each field, posts with
 * fetch and swaps in the confirmation. It never clears what the visitor typed.
 *
 * Turnstile and the validation rules load when the visitor first focuses or
 * taps the form, not with the page (performance budget, CLAUDE.md).
 */
export function ContactForm({
  fields,
  honeypotLabel,
  submit,
  sending,
  failed,
  noScript,
  success,
  turnstileSiteKey,
}: Props) {
  const [enhanced, setEnhanced] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed" | "sent">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  // Native validation covers the form before hydration; afterwards ours takes over.
  useEffect(() => setEnhanced(true), []);
  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  // On first use: fetch the rules and Turnstile, then render the widget.
  const formShown = status !== "sent";
  useEffect(() => {
    const el = widgetRef.current;
    if (!engaged || !formShown || !el) return;
    void loadRules();
    addTurnstileScript();
    const giveUp = Date.now() + TURNSTILE_WAIT_MS;
    let timer: ReturnType<typeof setTimeout>;
    const mount = () => {
      if (window.turnstile) {
        widgetId.current = window.turnstile.render(el, {
          sitekey: turnstileSiteKey,
          size: "flexible",
          theme: "light",
        });
      } else if (Date.now() < giveUp) timer = setTimeout(mount, 100);
    };
    mount();
    return () => {
      clearTimeout(timer);
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [engaged, formShown, turnstileSiteKey]);

  function showErrors(next: FieldErrors) {
    setErrors(next);
    const first = ORDER.find((f) => next[f]);
    const input = first && formRef.current?.elements.namedItem(FIELD[first]);
    if (input instanceof HTMLElement) input.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    setEngaged(true);
    const { validateContact, readFields } = await loadRules();

    const checked = validateContact(readFields(new FormData(form)));
    if (!checked.ok) return showErrors(checked.errors);

    setErrors({});
    setStatus("sending");
    // Turnstile usually finishes while the visitor types; if not, give it a moment.
    const token = () => new FormData(form).get(FIELD.turnstile);
    for (const end = Date.now() + TOKEN_WAIT_MS; !token() && Date.now() < end;) await sleep(200);
    const data = new FormData(form);

    let reply: ContactResponse | undefined;
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      reply = (await res.json()) as ContactResponse;
    } catch {
      reply = undefined;
    }

    if (reply?.ok) {
      track("contact_form_submit", { result: "success" });
      setStatus("sent");
      return;
    }
    track("contact_form_submit", { result: "error" });
    // A Turnstile token works once; get a fresh one for the next attempt.
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    if (reply && "errors" in reply) {
      setStatus("idle");
      showErrors(reply.errors);
    } else {
      setStatus("failed");
    }
  }

  if (status === "sent") {
    const { label, ...link } = success.whatsapp;
    return (
      <div className={styles.success}>
        <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
          {success.title}
        </h2>
        <p>{success.body}</p>
        <Button variant="secondary" {...link}>
          {label}
        </Button>
      </div>
    );
  }

  const errorFor = (field: Field) => {
    const key = errors[field];
    return key && (fields[field].errors[key] ?? fields[field].errors.required);
  };
  const describedBy = (field: Field) =>
    [fields[field].hint && `${field}-hint`, errors[field] && `${field}-error`]
      .filter(Boolean)
      .join(" ") || undefined;
  const clearError = (field: Field) => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const control = (field: Field) => ({
    id: field,
    name: FIELD[field],
    required: true,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": describedBy(field),
    onChange: () => clearError(field),
    className: styles.input,
  });

  const fieldBlock = (field: Field, input: ReactNode) => (
    <div className={styles.field}>
      <label htmlFor={field} className={styles.label}>
        {fields[field].label}
      </label>
      {fields[field].hint && (
        <p id={`${field}-hint`} className={styles.hint}>
          {fields[field].hint}
        </p>
      )}
      {input}
      {errors[field] && (
        <p id={`${field}-error`} className={styles.error}>
          {errorFor(field)}
        </p>
      )}
    </div>
  );

  return (
    <form
      ref={formRef}
      className={styles.form}
      method="post"
      action={CONTACT_ENDPOINT}
      noValidate={enhanced}
      onSubmit={onSubmit}
      onFocus={() => setEngaged(true)}
      onPointerDown={() => setEngaged(true)}
    >
      {fieldBlock("name", <input type="text" autoComplete="name" {...control("name")} />)}
      {fieldBlock("contact", <input type="text" spellCheck={false} {...control("contact")} />)}
      {fieldBlock("message", <textarea rows={6} {...control("message")} />)}

      {/* Honeypot: off-screen and out of the tab order. People never see it. */}
      <div className={styles.trap} aria-hidden="true">
        <label htmlFor={FIELD.honeypot}>{honeypotLabel}</label>
        <input
          id={FIELD.honeypot}
          name={FIELD.honeypot}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Turnstile renders into this element; React gives it no children to manage. */}
      <div ref={widgetRef} className={styles.turnstile} />
      <noscript>
        <p className={styles.error}>{noScript}</p>
      </noscript>

      <div className={styles.submit}>
        {/* Always in the page, so screen readers announce the text when it appears. */}
        <p role="alert" className={`${styles.error} ${styles.alert}`}>
          {status === "failed" ? failed : null}
        </p>
        <Button type="submit" loading={status === "sending"} loadingLabel={sending}>
          {submit}
        </Button>
      </div>
    </form>
  );
}
