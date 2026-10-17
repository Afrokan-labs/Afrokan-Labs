import "@/styles/pages/contact.css";
import { ContactForm } from "@/components/site/ContactForm";
import { env } from "@/lib/env";
import { getLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/contact", title: "Contact" });

export default function ContactPage() {
  const links = getLinks();
  return (
    <>
      <div className="x">
        <div className="c-split" id="top">
          <section className="c-left" aria-label="Why talk to us">
            <svg
              className="c-art"
              viewBox="0 0 600 900"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="cbg" cx=".55" cy=".35" r=".9">
                  <stop offset="0" stopColor="#C9C9C5" />
                  <stop offset=".6" stopColor="#9C9C98" />
                  <stop offset="1" stopColor="#6E6E6A" />
                </radialGradient>
                <pattern id="cdots" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#fff" opacity=".18" />
                </pattern>
                <linearGradient id="cA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#F4F4F2" />
                  <stop offset=".55" stopColor="#BDBDB8" />
                  <stop offset="1" stopColor="#6A6A66" />
                </linearGradient>
                <filter id="cshadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="-18" dy="26" stdDeviation="22" floodOpacity=".35" />
                </filter>
              </defs>
              <rect width="600" height="900" fill="url(#cbg)" />
              <rect width="600" height="900" fill="url(#cdots)" />
              <g transform="translate(250 60) rotate(-8) scale(.42)" filter="url(#cshadow)">
                <path
                  d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
                  fill="none"
                  stroke="url(#cA)"
                  strokeWidth="170"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </g>
            </svg>{" "}
            <a className="c-logo" href="/" aria-label="Afrokan Labs home">
              <svg viewBox="105 115 1100 990" aria-hidden="true">
                <path
                  d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="165"
                  strokeLinejoin="round"
                />
              </svg>
              Afrokan Labs
            </a>
            <h2 className="c-big">
              <span>Let&apos;s</span>
              <span>Build</span>
            </h2>
            <p className="c-sub">Your next tool starts with a message</p>
            <p className="c-txt">
              Tell us what&apos;s slowing your business down. The first conversation is free, and
              you&apos;ll get a written plan, timeline and price before any work begins.
            </p>
            <a className="c-wa" href={links.whatsapp} {...links.whatsappAttrs}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <use href="#wa" />
              </svg>
              Chat on WhatsApp
            </a>
          </section>
          <section className="c-right" aria-labelledby="c-title">
            <a className="c-close" href="/" aria-label="Close and go back home">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <h1 id="c-title">Contact us</h1>
            <p className="c-intro">
              Interested in working with us? Fill in the form below and we&apos;ll get back to you
              within one working day.
            </p>
            <ContactForm
              email={links.email}
              turnstileSiteKey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            />
            <div className="c-direct">
              <span>
                <b>Email</b>
                <a href={links.mailto}>{links.email}</a>
              </span>
              <span>
                <b>Based in</b>
                {links.location}
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
