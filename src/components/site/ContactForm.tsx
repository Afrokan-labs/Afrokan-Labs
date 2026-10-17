"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { ContactCopy } from "@/content/schema";
import { track } from "@/lib/analytics";
import {
  CONTACT_ENDPOINT,
  CONTACT_PREFILL_KEY,
  FIELD,
  LIMITS,
  TURNSTILE_SCRIPT,
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

type Props = {
  copy: ContactCopy["form"];
  email: string;
  /** Unset in local builds: the widget is skipped and the server refuses the post. */
  turnstileSiteKey?: string;
};

/**
 * reference contact.html form: inline errors, then a post to the contact
 * Pages Function (functions/api/contact.ts). The function takes name,
 * contact and message, so company, WhatsApp number and needs travel inside
 * the message. Turnstile loads when the visitor first focuses the form.
 */
export function ContactForm({ copy, email, turnstileSiteKey }: Props) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

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
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {
      name: get("name") ? undefined : copy.errors.name,
      email: EMAIL.test(get("email")) ? undefined : copy.errors.email,
      message: get("message").length > 4 ? undefined : copy.errors.message,
    };
    setErrors(next);
    const firstBad = (["name", "email", "message"] as const).find((k) => next[k]);
    if (firstBad) {
      setStatus("");
      form.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }

    const needs = data.getAll("need").map(String);
    const message = [
      get("company") && `${copy.messageLines.company}: ${get("company")}`,
      get("phone") && `${copy.messageLines.phone}: ${get("phone")}`,
      needs.length > 0 && `${copy.messageLines.needs}: ${needs.join(", ")}`,
      (get("company") || get("phone") || needs.length > 0) && "",
      get("message"),
    ]
      .filter((l) => l !== false && l !== undefined)
      .join("\n")
      .slice(0, LIMITS.message);

    const body = new FormData();
    body.set(FIELD.name, get("name"));
    body.set(FIELD.contact, get("email"));
    body.set(FIELD.message, message);
    body.set(FIELD.honeypot, get(FIELD.honeypot));
    body.set(FIELD.turnstile, String(data.get(FIELD.turnstile) ?? ""));

    setSending(true);
    setStatus(copy.sending);
    let ok = false;
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      ok = res.ok && ((await res.json()) as { ok?: boolean }).ok === true;
    } catch {
      ok = false;
    }
    setSending(false);
    track("contact_form_submit", { result: ok ? "success" : "error" });
    if (ok) {
      form.reset();
      setStatus(copy.sent);
    } else {
      setStatus(copy.failed.replace("{email}", email));
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    }
  }

  const invalid = (k: keyof Errors) => (errors[k] ? true : undefined);

  return (
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
          {copy.submit}
        </button>
      </div>
      <p className="c-status" id="cstatus" role="status">
        {status}
      </p>
    </form>
  );
}
