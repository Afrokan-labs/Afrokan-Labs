import { NextResponse } from "next/server";

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "The form data couldn't be read." }, { status: 400 });
  }

  // Bots fill the hidden field; pretend it worked.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 200);
  const service = clean(body.service, 80);
  const message = clean(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "hello@afrokanlabs.com";
  const from = process.env.CONTACT_FROM_EMAIL || "Afrokan Labs website <website@afrokanlabs.com>";

  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY is not set; message not delivered.", { name, email });
    return NextResponse.json({ error: "The contact form isn't connected yet." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Company", company || "Not given"],
    ["Email", email],
    ["Needs", service || "Not given"],
  ];

  const html = `
    <h2>New enquiry from afrokanlabs.com</h2>
    <table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
      .join("")}</table>
    <p style="white-space:pre-wrap">${escape(message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New enquiry: ${name}${company ? `, ${company}` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "The message didn't go through." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
