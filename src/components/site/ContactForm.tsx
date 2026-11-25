"use client";

import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import type { ContactCopy } from "@/content/schema";
import {
  CONTACT_ENDPOINT,
  CONTACT_PREFILL_KEY,
  FIELD,
  LIMITS,
  TURNSTILE_SCRIPT,
  isPhone,
  type ContactResponse,
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

type Copy = ContactCopy["form"];

type Props = {
  copy: Copy;
  email: string;
  /** The site's WhatsApp link, for the verification message. */
  whatsapp: string;
  /** The bare wa.me link (whatsappBase()); the thank-you screen adds its own message. */
  whatsappBase: string;
  /** How soon we reply (site.replyWithin), for the thank-you screen. */
  replyWithin: string;
  /** Unset in local builds: the widget is skipped and the server refuses the post. */
  turnstileSiteKey?: string;
};

/** The five questions, in order; index 5 is the thank-you screen. */
const STEPS = ["needs", "goal", "message", "name", "reach"] as const;
const TOTAL = STEPS.length;
const DONE = TOTAL;
/** How long "Sent" shows on the button before the thank-you screen. */
const SUCCESS_MS = 900;

type SendState = "idle" | "loading" | "success" | "error";
/** Which field an error belongs to, so only that one is marked invalid. */
type ErrorField = "name" | "phone" | "email" | "both";
type StepError = { text: string; field?: ErrorField };
type Sent = {
  name: string;
  company: string;
  phone: string;
  email: string;
  needs: string[];
  goal: string;
};

/** Fills {placeholders} in a copy string with text or links. */
function fill(template: string, parts: Record<string, ReactNode>): ReactNode[] {
  return template
    .split(/\{(\w+)\}/)
    .map((piece, i) => (i % 2 ? <Fragment key={i}>{parts[piece]}</Fragment> : piece));
}
const fillText = (template: string, parts: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(parts[k] ?? ""));

const ARROW = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const CHECK = (cls: string) => (
  <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12l5 5L19 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * The contact form (contact form update, 2026-11-25): five short questions in
 * one card, then a thank-you screen. It posts to the contact Pages Function
 * (functions/api/contact.ts).
 *
 * Progressive enhancement: the server render is one ordinary form with every
 * question stacked and one submit button, posting natively. After hydration it
 * shows one question at a time. Every step stays mounted (inactive ones are
 * `hidden`), so values survive Back and the Turnstile widget stays in the DOM.
 */
export function ContactForm({
  copy,
  email,
  whatsapp,
  whatsappBase,
  replyWithin,
  turnstileSiteKey,
}: Props) {
  const [enhanced, setEnhanced] = useState(false);
  const [step, setStep] = useState(0);
  const [needs, setNeeds] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [hasMessage, setHasMessage] = useState(false);
  const [error, setError] = useState<StepError | null>(null);
  const [send, setSend] = useState<SendState>("idle");
  const [sendError, setSendError] = useState<SendError>("failed");
  const [sent, setSent] = useState<Sent | null>(null);
  const [engaged, setEngaged] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const headings = useRef<(HTMLElement | null)[]>([]);
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  /** Focus moves to a step's heading only after the visitor has moved, never on page load. */
  const moved = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const busy = send === "loading" || send === "success";
  const notSure = copy.needs.options.at(-1)!;

  useEffect(() => {
    setEnhanced(true);
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    if (moved.current) headings.current[step]?.focus();
  }, [step]);

  // An address typed into the home page's email box arrives in question 5.
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

  // Turnstile loads on the first interaction; the widget renders in question 5
  // once it's on screen (or straight away in the stacked, unenhanced form).
  useEffect(() => {
    if (!engaged || !turnstileSiteKey) return;
    if (!document.querySelector(`script[src="${TURNSTILE_SCRIPT}"]`)) {
      const s = document.createElement("script");
      s.src = TURNSTILE_SCRIPT;
      s.async = true;
      document.head.append(s);
    }
    const el = widget.current;
    if (!el || (enhanced && step !== TOTAL - 1)) return;
    const id = setInterval(() => {
      if (!window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(el, { sitekey: turnstileSiteKey });
      clearInterval(id);
    }, 200);
    return () => clearInterval(id);
  }, [engaged, turnstileSiteKey, enhanced, step]);

  /** A text field's trimmed value. */
  const value = (name: string) =>
    String(
      (formRef.current?.elements.namedItem(name) as HTMLInputElement | null)?.value ?? "",
    ).trim();

  const go = (n: number) => {
    moved.current = true;
    setError(null);
    setStep(n);
  };

  /** The step's error, if any. Email uses the shared isEmail (zod), loaded only now. */
  async function validate(n: number): Promise<StepError | null> {
    const errors = copy.errors;
    if (n === 0 && !needs.length) return { text: errors.needs };
    if (n === 1 && !goal) return { text: errors.goal };
    if (n === 3 && !value(FIELD.name)) return { text: errors.name, field: "name" };
    if (n === 4) {
      const phone = value(FIELD.phone);
      const mail = value(FIELD.contact);
      if (!phone && !mail) return { text: errors.reach, field: "both" };
      if (phone && !isPhone(phone)) return { text: errors.phone, field: "phone" };
      if (mail) {
        const { isEmail } = await import("@/lib/contact-form");
        if (!isEmail(mail)) return { text: errors.email, field: "email" };
      }
    }
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Enter in a field, or Continue: the next question (Send on the last one).
    e.preventDefault();
    if (busy) return;
    const problem = await validate(step);
    if (problem) {
      setError(problem);
      return;
    }
    if (step < TOTAL - 1) go(step + 1);
    else void submit();
  }

  async function submit() {
    const data = new FormData(formRef.current!);
    const token = String(data.get(FIELD.turnstile) ?? "");
    // No token: the widget was blocked or hasn't finished, and the server would refuse the post.
    if (turnstileSiteKey && !token) {
      setSendError("verification");
      setSend("error");
      return;
    }
    const snapshot: Sent = {
      name: value(FIELD.name),
      company: value(FIELD.company),
      phone: value(FIELD.phone),
      email: value(FIELD.contact),
      needs,
      goal,
    };
    const body = new FormData();
    body.set(FIELD.name, snapshot.name);
    body.set(FIELD.contact, snapshot.email);
    body.set(FIELD.phone, snapshot.phone);
    body.set(FIELD.message, value(FIELD.message));
    body.set(FIELD.company, snapshot.company);
    for (const need of needs) body.append(FIELD.needs, need);
    body.set(FIELD.goal, goal);
    body.set(FIELD.page, location.pathname);
    // The site page the visitor came from, if any: the email shows it beside this one.
    try {
      const from = new URL(document.referrer);
      if (from.origin === location.origin) body.set(FIELD.from, from.pathname);
    } catch {
      // No referrer.
    }
    body.set(FIELD.honeypot, value(FIELD.honeypot));
    body.set(FIELD.turnstile, token);

    setError(null);
    setSend("loading");
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

    if (reply.ok) {
      setSend("success");
      setSent(snapshot);
      timer.current = setTimeout(() => {
        setSend("idle");
        go(DONE);
      }, SUCCESS_MS);
      return;
    }
    // Turnstile tokens are single-use, so a retry needs a fresh one.
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    if ("errors" in reply && (reply.errors.name || reply.errors.contact)) {
      setSend("idle");
      if (reply.errors.name) {
        go(3);
        setError({ text: copy.errors.name, field: "name" });
      } else setError({ text: copy.errors.reach, field: "both" });
      return;
    }
    setSendError("error" in reply && reply.error === "verification" ? "verification" : "failed");
    setSend("error");
  }

  /** Any edit clears the step's error, and returns a failed Send button to its default. */
  function onInput(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    if (target.name === FIELD.message) setHasMessage(target.value.trim() !== "");
    if (busy) return;
    setError(null);
    if (send === "error") setSend("idle");
  }

  function toggleNeed(option: string) {
    setError(null);
    setNeeds((current) =>
      current.includes(option)
        ? current.filter((n) => n !== option)
        : option === notSure
          ? [option]
          : [...current.filter((n) => n !== notSure), option],
    );
  }

  function restart() {
    formRef.current?.reset();
    setNeeds([]);
    setGoal("");
    setHasMessage(false);
    setSent(null);
    setSend("idle");
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
    go(0);
  }

  // ----- Pieces -----

  const done = enhanced && step === DONE;
  const errId = (n: number) => `c-err-${n}`;
  const stepError = (n: number) =>
    error && (!enhanced || step === n) ? (
      <p className="c-err" id={errId(n)} role="alert">
        {error.text}
      </p>
    ) : null;
  const invalid = (...fields: ErrorField[]) =>
    error?.field && fields.includes(error.field) ? true : undefined;
  const heading = (n: number, text: string, id = `c-h-${n}`) => (
    <h2
      className="c-q"
      id={id}
      tabIndex={-1}
      ref={(el) => {
        headings.current[n] = el;
      }}
    >
      {text}
    </h2>
  );
  // Rendered from the server on, so nothing shifts at hydration; CSS hides them
  // when JavaScript is off (the stacked form has only Send).
  const next = (label: string = copy.next, arrow = true) => (
    <button type="submit" className="c-cta c-next">
      {label}
      {arrow && ARROW}
    </button>
  );

  /** Answer rows: toggle buttons once enhanced, native checkboxes/radios before. */
  const options = (kind: "need" | "goal") => {
    const list = kind === "need" ? copy.needs.options : copy.goal.options;
    return list.map((option) => {
      const on = kind === "need" ? needs.includes(option) : goal === option;
      const mark =
        kind === "need" ? (
          <span className="c-box" aria-hidden="true">
            {on && CHECK("c-pop")}
          </span>
        ) : (
          <span className="c-dot" aria-hidden="true" />
        );
      if (!enhanced)
        return (
          <label className="c-opt" key={option}>
            <input
              type={kind === "need" ? "checkbox" : "radio"}
              name={kind === "need" ? FIELD.needs : FIELD.goal}
              value={option}
            />
            {mark}
            <span>{option}</span>
          </label>
        );
      return (
        <button
          type="button"
          key={option}
          className={on ? "c-opt is-on" : "c-opt"}
          aria-pressed={on}
          onClick={() => {
            if (kind === "need") toggleNeed(option);
            else {
              setError(null);
              setGoal(option);
            }
          }}
        >
          {mark}
          <span>{option}</span>
        </button>
      );
    });
  };

  const sendLabel = {
    idle: copy.send.idle,
    loading: copy.send.loading,
    success: copy.send.success,
    error: copy.send.error,
  }[send];
  const sendIcon = {
    idle: null,
    loading: (
      <svg className="c-spin" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M21 12a9 9 0 1 1-9-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    success: CHECK("c-pop"),
    error: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5.5M12 16.5h.01" />
        </g>
      </svg>
    ),
  }[send];
  const status =
    send === "error"
      ? sendError === "verification"
        ? fill(copy.verification, {
            whatsapp: <a href={whatsapp}>{copy.whatsappLabel}</a>,
            email: <a href={`mailto:${email}`}>{email}</a>,
          })
        : copy.send.errorStatus
      : send === "loading"
        ? copy.send.loading
        : send === "success"
          ? copy.send.success
          : "";

  // The thank-you screen.
  let thanks: ReactNode = null;
  if (done && sent) {
    const first = sent.name.split(/\s+/)[0] || copy.sent.fallbackName;
    const via =
      sent.phone && sent.email
        ? copy.sent.via.both
        : sent.phone
          ? copy.sent.via.whatsapp
          : copy.sent.via.email;
    const p = copy.waPrefill;
    const message = [
      fillText(p.intro, {
        name: sent.name,
        company: sent.company ? fillText(p.company, { company: sent.company }) : "",
      }),
      fillText(p.needs, { needs: sent.needs.join(", ") }),
      fillText(p.goal, { goal: sent.goal }),
    ].join("\n");
    const href = whatsappBase.startsWith("https:")
      ? `${whatsappBase}?text=${encodeURIComponent(message)}`
      : whatsappBase;
    thanks = (
      <div className="c-thanks">
        <span className="c-tick" aria-hidden="true">
          {CHECK("")}
        </span>
        {heading(DONE, fillText(copy.sent.title, { firstName: first }), "c-h-done")}
        <p>{fillText(copy.sent.body, { via, replyWithin })}</p>
        <a className="c-cta" href={href}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <use href="#wa" />
          </svg>
          {copy.sent.waCta}
        </a>
        <button type="button" className="c-link" onClick={restart}>
          {copy.sent.again}
        </button>
      </div>
    );
  }

  const back = enhanced && step > 0 && step < DONE;
  const hint = done ? copy.timeHints.sent : step < 3 ? copy.timeHints.early : copy.timeHints.late;

  return (
    <div className="c-card">
      <div className="c-band">
        <div className="c-band-row">
          {back ? (
            <button
              type="button"
              className="c-back"
              aria-label={copy.back}
              aria-disabled={busy || undefined}
              onClick={() => !busy && go(step - 1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M19 12H5M11 6l-6 6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <svg className="c-mark" viewBox="105 115 1100 990" aria-hidden="true">
              <path
                d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
                fill="none"
                stroke="currentColor"
                strokeWidth="165"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <span className="c-count">
            {done ? copy.done : fillText(copy.progress, { n: step + 1, total: TOTAL })}
          </span>
          <span className="c-hint">{hint}</span>
        </div>
        <div className="c-bar" aria-hidden="true">
          {STEPS.map((s, i) => (
            <i key={s} className={done || i <= step ? "on" : undefined} />
          ))}
        </div>
      </div>

      <div className="c-body">
        {thanks}
        <form
          className={enhanced ? "c-form is-enhanced" : "c-form"}
          id="cform"
          ref={formRef}
          hidden={done}
          noValidate
          method="post"
          action={CONTACT_ENDPOINT}
          onSubmit={onSubmit}
          onInput={onInput}
          onFocus={() => setEngaged(true)}
          onPointerDown={() => setEngaged(true)}
        >
          {/* 1. Needs */}
          <section className="c-step" hidden={enhanced && step !== 0}>
            <fieldset aria-labelledby="c-h-0" aria-describedby="c-hint-0">
              {heading(0, copy.steps.needs.title)}
              <p className="c-sub" id="c-hint-0">
                {copy.steps.needs.hint}
              </p>
              <div className="c-opts">{options("need")}</div>
            </fieldset>
            {stepError(0)}
            {next()}
          </section>

          {/* 2. Goal */}
          <section className="c-step" hidden={enhanced && step !== 1}>
            <fieldset aria-labelledby="c-h-1" aria-describedby="c-hint-1">
              {heading(1, copy.steps.goal.title)}
              <p className="c-sub" id="c-hint-1">
                {copy.steps.goal.hint}
              </p>
              <div className="c-opts">{options("goal")}</div>
            </fieldset>
            {stepError(1)}
            {next()}
          </section>

          {/* 3. Details (optional) */}
          <section className="c-step" hidden={enhanced && step !== 2}>
            {heading(2, copy.steps.message.title)}
            <p className="c-sub" id="c-hint-2">
              {copy.steps.message.hint}
            </p>
            <textarea
              className="c-in"
              id="c-msg"
              name={FIELD.message}
              rows={4}
              maxLength={LIMITS.message}
              placeholder={copy.messagePlaceholder}
              aria-labelledby="c-h-2"
              aria-describedby="c-hint-2"
            />
            {next(hasMessage ? copy.next : copy.skip, hasMessage)}
          </section>

          {/* 4. Name */}
          <section className="c-step" hidden={enhanced && step !== 3}>
            {heading(3, copy.steps.name.title)}
            {copy.steps.name.hint && <p className="c-sub">{copy.steps.name.hint}</p>}
            <div className="c-field">
              <label htmlFor="c-name">{copy.labels.name}</label>
              <input
                className="c-in"
                id="c-name"
                name={FIELD.name}
                autoComplete="name"
                maxLength={LIMITS.name}
                aria-invalid={invalid("name")}
                aria-describedby={invalid("name") && errId(3)}
              />
            </div>
            <div className="c-field">
              <label htmlFor="c-company">
                {copy.labels.company} <i>{copy.optional}</i>
              </label>
              <input
                className="c-in"
                id="c-company"
                name={FIELD.company}
                autoComplete="organization"
                maxLength={LIMITS.company}
              />
            </div>
            {stepError(3)}
            {next()}
          </section>

          {/* 5. Reach, then Send */}
          <section className="c-step" hidden={enhanced && step !== 4}>
            {heading(4, copy.steps.reach.title)}
            <p className="c-sub">{copy.steps.reach.hint}</p>
            <div className="c-field">
              <label htmlFor="c-phone">{copy.labels.phone}</label>
              <input
                className="c-in"
                id="c-phone"
                name={FIELD.phone}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={LIMITS.phone}
                placeholder={copy.phonePlaceholder}
                disabled={busy}
                aria-invalid={invalid("phone", "both")}
                aria-describedby={invalid("phone", "both") && errId(4)}
              />
            </div>
            <div className="c-field">
              <label htmlFor="c-email">{copy.labels.email}</label>
              <input
                className="c-in"
                id="c-email"
                name={FIELD.contact}
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.contact}
                placeholder={copy.emailPlaceholder}
                disabled={busy}
                aria-invalid={invalid("email", "both")}
                aria-describedby={invalid("email", "both") && errId(4)}
              />
            </div>
            {/* The honeypot, inside a `hidden` element: never rendered, so no browser or
                password manager fills it, while bots that fill every input in the HTML
                still do. It's still posted with the form. An off-screen field got
                autofilled, which dropped real requests as spam. */}
            <div hidden>
              <input
                type="text"
                name={FIELD.honeypot}
                tabIndex={-1}
                autoComplete="off"
                data-1p-ignore=""
                data-lpignore="true"
                data-bwignore=""
                data-form-type="other"
              />
            </div>
            <input type="hidden" name={FIELD.page} value="/contact" />
            {turnstileSiteKey && <div ref={widget} className="c-turnstile" />}
            {stepError(4)}
            <button
              type="submit"
              className={send === "idle" ? "c-cta" : `c-cta is-${send}`}
              aria-disabled={busy || undefined}
            >
              {sendIcon}
              <span>{sendLabel}</span>
            </button>
            <p className={send === "error" ? "c-status is-error" : "c-status"} role="status">
              {status}
            </p>
            <p className="c-privacy">
              {fill(copy.privacyNote, {
                privacy: <a href={copy.privacyLink.href}>{copy.privacyLink.label}</a>,
              })}
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}
