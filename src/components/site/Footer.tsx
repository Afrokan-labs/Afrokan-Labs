import { getLinks, NAV } from "@/lib/links";
import { LogoMark } from "./LogoMark";

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
            <h3>Navigation</h3>
            <ul>
              {NAV.all.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="f-col">
            <h3>Socials</h3>
            <ul>
              <li>
                <a href={links.linkedin}>LinkedIn</a>
              </li>
              <li>
                <a href={links.x}>X</a>
              </li>
              <li>
                <a href={links.instagram}>Instagram</a>
              </li>
              <li>
                <a href={links.whatsapp} {...links.whatsappAttrs}>
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div className="f-col">
            <h3>Contact</h3>
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
            <h3>Local time</h3>
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
