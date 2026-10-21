import "@/styles/pages/privacy.css";
import "@/styles/not-found.css";
import { Nav } from "@/components/site/Nav";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";

type Props = {
  title: string;
  body: string;
  whatsapp: WhatsAppLinkProps & { label: string };
};

/**
 * Where the contact form lands when posted without JavaScript: /contact/sent
 * or /contact/not-sent, drawn like the 404 (inner-page nav, centred, green pill).
 * The failure page has no link back to the form on purpose: a link would load
 * an empty form, while the browser's Back button keeps what was typed.
 */
export function ContactResult({ title, body, whatsapp }: Props) {
  // Drop `whatsapp: true` (a Button flag): this pill draws no glyph.
  const { label, srNote, href } = whatsapp;
  return (
    <div className="x x-glow">
      <div className="x-wrap lg-top">
        <Nav dark current="contact" />
        <section className="nf" aria-labelledby="cr-title">
          <h1 id="cr-title" className="nf-title">
            {title}
          </h1>
          <p className="nf-body">{body}</p>
          <a className="nf-home" href={href}>
            {label}
            <span className="sr-only"> {srNote}</span>
          </a>
        </section>
      </div>
    </div>
  );
}
