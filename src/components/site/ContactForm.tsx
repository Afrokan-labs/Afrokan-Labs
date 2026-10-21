"use client";

import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import type { ContactCopy } from "@/content/schema";
import {
  CONTACT_ENDPOINT,
  CONTACT_PREFILL_KEY,
  FIELD,
  LIMITS,
  TURNSTILE_SCRIPT,
  type ContactResponse,
  type Field,
  type SendError,
} from "@/lib/contact-fields";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, string>) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { name?: string; email?: string; message?: string };

/** The function's field names, as the form names them (it posts the email as "contact"). */
const FORM_FIELD: Record<Field, keyof Errors> = {
  name: "name",
  contact: "email",
  message: "message",
};
const ORDER = ["name", "email", "message"] as const;

type Props = {
  copy: ContactCopy["form"];
  email: string;
  /** The site's WhatsApp link, for the success and error messages. */
  whatsapp: string;
  /** How soon we reply (site.replyWithin), for the success message. */
  replyWithin: string;
  /** Unset in local builds: the widget is skipped and the server refuses the post. */
  turnstileSiteKey?: string;
};

function reveal(el: HTMLElement | null) {
  if (!el) return;
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "center", behavior: still ? "auto" : "smooth" });
  el.focus({ preventScroll: true });
}

/** Fills {placeholders} in a copy string with text or links. */
function fill(template: string, parts: Record<string, ReactNode>): ReactNode[] {
  return template
    .split(/\{(\w+)\}/)
    .map((piece, i) => (i % 2 ? <Fragment key={i}>{parts[piece]}</Fragment> : piece));
}

/**
 * reference contact.html form: inline errors, then a post to the contact
 * Pages Function (functions/api/contact.ts), which emails every field on its
 * own row. Turnstile loads when the visitor first focuses the form.
 *
 * Once sent, the form is replaced by a success panel. A failed send keeps
 * everything the visitor typed and shows an error panel offering WhatsApp and
 * email instead. Both panels sit in live regions, scroll into view and take
 * focus when they appear.
 */
export function ContactForm({ copy, email, whatsapp, replyWithin, turnstileSiteKey }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ name: string; email: string } | null>(null);
  const [sendError, setSendError] = useState<SendError | null>(null);
  const [engaged, setEngaged] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const busy = useRef(false);
  const doneRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  // Bring whichever panel just appeared into view (on phones the form runs below the fold) and focus it.
  useEffect(() => {
    if (sent) reveal(doneRef.current);
  }, [sent]);
  useEffect(() => {
    if (sendError) reveal(alertRef.current);
  }, [sendError]);

  // An address typed into the home page's email box arrives here.
  useEffect(() => {
    try {
      const prefill = sessionStorage.getItem(CONTACT_PREFILL_KEY);
      if (!prefill) return;
      sessionStorage.removeItem(CONTACT_PREFILL_KEY);
      const input = document.getElementById("c-email") as HTMLInputElement | null;
      if (input && !input.value) input.value = prefill;
    } catch {
      // Storage blocked: nothing to prefill.
    }
  }, []);

  useEffect(() => {
    if (!engaged || !turnstileSiteKey || !widget.current) return;
    if (!document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) {
      const s = document.createElement("script");
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      document.head.append(s);
    }
    const el = widget.current;
    const id = setInterval(() => {
      if (!window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(el, { sitekey: turnstileSiteKey });
      clearInterval(id);
    }, 200);
    return () => clearInterval(id);
  }, [engaged, turnstileSiteKey]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {
      name: get("name") ? undefined : copy.errors.name,
      email: EMAIL.test(get("email")) ? undefined : copy.errors.email,
      message: get("message").length > 4 ? undefined : copy.errors.message,
    };
    setErrors(next);
    setSendError(null);
    const firstBad = ORDER.find((k) => next[k]);
    if (firstBad) {
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    const token = String(data.get(FIELD.turnstile) ?? "");
    // No token: the widget was blocked or hasn't finished, and the server would refuse the post.
    if (turnstileSiteKey && !token) {
      setSendError("verification");
      return;
    }

    const body = new FormData();
    body.set(FIELD.name, get("name"));
    body.set(FIELD.contact, get("email"));
    body.set(FIELD.message, get("message").slice(0, LIMITS.message));
    body.set(FIELD.company, get("company"));
    body.set(FIELD.phone, get("phone"));
    for (const need of data.getAll("need")) body.append(FIELD.needs, String(need));
    body.set(FIELD.page, location.pathname);
    // The site page the visitor came from, if any: the email shows it beside this one.
    try {
      const from = new URL(document.referrer);
      if (from.origin === location.origin) body.set(FIELD.from, from.pathname);
    } catch {
      // No referrer.
    }
    body.set(FIELD.honeypot, get(FIELD.honeypot));
    body.set(FIELD.turnstile, token);

    busy.current = true;
    setSending(true);
    let reply: ContactResponse = { ok: false, error: "failed" };
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      reply = (await res.json()) as ContactResponse;
    } catch {
      // Offline, or a reply that isn't JSON: a server failure.
    }
    busy.current = false;
    setSending(false);

    if (reply.ok) {
      setSent({ name: get("name"), email: get("email") });
      return;
    }
    // Turnstile tokens are single-use, so a retry needs a fresh one.
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    if ("errors" in reply) {
      const fields: Errors = {};
      for (const field of Object.keys(reply.errors) as Field[])
        fields[FORM_FIELD[field]] = copy.errors[FORM_FIELD[field]];
      setErrors(fields);
      const bad = ORDER.find((k) => fields[k]);
      if (bad) {
        form.querySelector<HTMLElement>(`[name="${bad}"]`)?.focus();
        return;
      }
    }
    setSendError("error" in reply && reply.error === "verification" ? "verification" : "failed");
  }

  const waLink = <a href={whatsapp}>{copy.whatsappLabel}</a>;
  const links = { whatsapp: waLink, email: <a href={`mailto:${email}`}>{email}</a> };

  // Rendered from the start, so screen readers announce the panel when it fills.
  const done = (
    <div className="c-done-live" aria-live="polite">
      {sent && (
        <div className="c-done" ref={doneRef} tabIndex={-1}>
          <h2>
            {copy.sent.title} <span aria-hidden="true">✓</span>
          </h2>
          <p>{fill(copy.sent.body, { name: sent.name, email: sent.email, replyWithin })}</p>
          <p>{fill(copy.sent.urgent, { whatsapp: waLink })}</p>
        </div>
      )}
    </div>
  );
  if (sent) return done;

  const invalid = (k: keyof Errors) => (errors[k] ? true : undefined);

  return (
    <>
      {done}
      <form
        className="c-form"
        id="cform"
        noValidate
        method="post"
        action={CONTACT_ENDPOINT}
        onSubmit={onSubmit}
        onFocus={() => setEngaged(true)}
      >
        <div className="c-field">
          <label htmlFor="c-name">{copy.labels.name}</label>
          <input
            id="c-name"
            name="name"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            aria-invalid={invalid("name")}
            aria-describedby="e-name"
          />
          <span className="c-err" id="e-name">
            {errors.name}
          </span>
        </div>
        <div className="c-field">
          <label htmlFor="c-company">
            {copy.labels.company} <i>{copy.optional}</i>
          </label>
          <input id="c-company" name="company" autoComplete="organization" />
        </div>
        <div className="c-field">
          <label htmlFor="c-email">{copy.labels.email}</label>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={LIMITS.contact}
            aria-invalid={invalid("email")}
            aria-describedby="e-email"
          />
          <span className="c-err" id="e-email">
            {errors.email}
          </span>
        </div>
        <div className="c-field">
          <label htmlFor="c-phone">
            {copy.labels.phone} <i>{copy.optional}</i>
          </label>
          <input
            id="c-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder={copy.phonePlaceholder}
          />
        </div>
        <fieldset className="c-needs">
          <legend>{copy.needs.legend}</legend>
          <div className="c-chips">
            {copy.needs.options.map((n, i) => (
              <Fragment key={n}>
                {i > 0 && " "}
                <label>
                  <input type="checkbox" name="need" value={n} />
                  <span>{n}</span>
                </label>
              </Fragment>
            ))}
          </div>
        </fieldset>
        <div className="c-field full">
          <label htmlFor="c-msg">{copy.labels.message}</label>
          <textarea
            id="c-msg"
            name="message"
            required
            placeholder={copy.messagePlaceholder}
            aria-invalid={invalid("message")}
            aria-describedby="e-msg"
          />
          <span className="c-err" id="e-msg">
            {errors.message}
          </span>
        </div>
        <input
          className="c-hp"
          type="text"
          name={FIELD.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        {turnstileSiteKey && <div ref={widget} className="c-field full" />}
        <div className="c-actions">
          <small>{copy.privacyNote}</small>
          <button className="c-submit" type="submit" disabled={sending}>
            {sending ? copy.sending : copy.submit}
          </button>
        </div>
        <p className="c-status" id="cstatus" role="status">
          {sending ? copy.sending : ""}
        </p>
        <div className="c-alert-live" role="alert">
          {sendError && (
            <div className="c-alert" ref={alertRef} tabIndex={-1}>
              <h2>{copy.sendErrors.title}</h2>
              <p>{fill(copy.sendErrors[sendError], links)}</p>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
