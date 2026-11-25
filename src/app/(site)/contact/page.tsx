import "@/styles/pages/contact.css";
import localFont from "next/font/local";
import { ContactForm } from "@/components/site/ContactForm";
import { LogoMark } from "@/components/site/LogoMark";
import { Nav } from "@/components/site/Nav";
import { env } from "@/lib/env";
import { getContactCopy, getSite } from "@/lib/content";
import { getLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";
import { whatsappBase } from "@/lib/whatsapp";

export const metadata = pageMetadata({ path: "/contact", ...getContactCopy().page.meta });

// The headline and questions are Unbounded 600–700 and the thank-you title holds
// the visitor's name, so this page needs the full Latin set; the site-wide file
// is an 11 KB subset of a few words. Declared here, so only /contact loads it.
// Licence: src/app/fonts/Unbounded-OFL.txt.
const unbounded = localFont({
  src: "../../fonts/unbounded-latin-600-700.woff2",
  weight: "600 700",
  display: "swap",
  variable: "--nf-unbounded-text",
  fallback: ["Arial Black", "system-ui", "sans-serif"],
});

/**
 * Contact form update (2026-11-25): an off-white page, one centred column
 * (headline, subline, the stepped form card, a WhatsApp line), with two faint
 * logo marks behind it. The site's own nav and footer stay.
 */
export default function ContactPage() {
  const links = getLinks();
  const { page, form } = getContactCopy();
  const [lead, tail] = page.chatLine.split("{whatsapp}");
  return (
    <div className={`x c-page ${unbounded.variable}`} id="top">
      <LogoMark className="c-deco c-deco-a" />
      <LogoMark className="c-deco c-deco-b" />
      <div className="c-top">
        <Nav current="contact" />
      </div>
      <div className="c-col">
        <h1 className="c-h1">
          {page.headline} <span className="c-hl">{page.headlineHighlight}</span>
        </h1>
        <p className="c-subline">{page.subline}</p>
        <ContactForm
          copy={form}
          email={links.email}
          whatsapp={links.whatsapp}
          whatsappBase={whatsappBase()}
          replyWithin={getSite().replyWithin}
          turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        />
        <p className="c-chat">
          {lead}
          <a href={links.whatsapp}>{page.chatLink}</a>
          {tail}
        </p>
      </div>
    </div>
  );
}
