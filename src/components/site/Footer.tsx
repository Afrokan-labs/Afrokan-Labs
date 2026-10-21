import { getLinks, NAV } from "@/lib/links";
import { LogoMark, SocialIcon } from "./LogoMark";

/** reference footer (every page): GET IN TOUCH, three columns, © line, Accra clock, back to top. */
export function Footer() {
  const links = getLinks();
  return (
    <footer className="x x-footwrap">
      <div className="x-wrap f-wrap">
        <div className="f-circle" aria-hidden="true" />
        <p className="f-ask">Got a problem worth solving? Let&apos;s build it together.</p>
        <a className="f-big" href="/contact" aria-label="Get in touch">
          <svg viewBox="0 0 1000 150" aria-hidden="true">
            <text x="0" y="132" textLength="555" lengthAdjust="spacingAndGlyphs">
              GET IN T
            </text>
            <ellipse className="f-o" cx="614" cy="80" rx="50" ry="57" />
            <text x="672" y="132" textLength="328" lengthAdjust="spacingAndGlyphs">
              UCH
            </text>
          </svg>
        </a>
        <div className="f-cols">
          <div className="f-col f-nav">
            <h2>Navigation</h2>
            <ul>
              {NAV.all.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h2>Socials</h2>
            <ul>
              {links.social.map((p) => (
                <li key={p.key}>
                  <a
                    className="f-social"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.label} ${links.opensNewTab}`}
                  >
                    <SocialIcon className="social-icon" path={p.path} />
                    {p.name}
                  </a>
                </li>
              ))}
              <li>
                <a href={links.whatsapp} {...links.whatsappAttrs}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={links.mailto}>{links.email}</a>
              </li>
              <li>{links.location}</li>
              <li>
                <a href="/privacy">Privacy</a>
              </li>
              <li>
                <a href="/terms">Terms</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="f-bottom">
          <div className="f-brandrow">
            <LogoMark className="f-logo" />
            <p className="f-brand">
              © 2026
              <br />
              Afrokan Labs
            </p>
          </div>
          <div className="f-time">
            <h2>Local time</h2>
            <span id="ftime">Accra, GMT+0</span>
          </div>
          <a className="f-top" href="#top" aria-label="Back to top">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 19V5M6 11l6-6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
