"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/site.config";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "The message didn't go through.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "The message didn't go through.");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-done" role="status">
        <p className="form-done-title">Message sent.</p>
        <p>We reply within two working days. If it&apos;s urgent, email {site.email}.</p>
        <button type="button" className="btn btn--ghost-dark" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row">
        <label className="field">
          <span>Your name</span>
          <input name="name" type="text" autoComplete="name" required maxLength={120} />
        </label>
        <label className="field">
          <span>Company</span>
          <input name="company" type="text" autoComplete="organization" maxLength={160} />
        </label>
      </div>

      <label className="field">
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" required maxLength={200} />
      </label>

      <label className="field">
        <span>What do you need?</span>
        <select name="service" defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          <option>A website</option>
          <option>An AI assistant or chatbot</option>
          <option>A backend or workflow system</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <label className="field">
        <span>Tell us about the project</span>
        <textarea name="message" rows={5} required maxLength={4000} />
      </label>

      {/* Spam trap: hidden from people, filled in by bots */}
      <label className="hp" aria-hidden="true">
        Leave this empty
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      {status === "error" && (
        <p className="form-error" role="alert">
          {error} You can also email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}

      <button type="submit" className="btn btn--green" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
