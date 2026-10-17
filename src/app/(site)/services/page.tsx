import "@/styles/pages/services.css";
import { CtaBox } from "@/components/site/CtaBox";
import { Nav } from "@/components/site/Nav";
import { getLinks } from "@/lib/links";
import { getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/services", title: "Services" });

export default function ServicesPage() {
  const links = getLinks();
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap s-top">
          <Nav current="services" dark />
          <section className="s-hero" aria-labelledby="s-title">
            <span className="s-badge">
              <b>Now taking projects</b> — Accra, Ghana
            </span>
            <h1 className="s-h1" id="s-title">
              <span>Tools that work</span>
              <span className="s-grad">
                <span className="s-script">the</span> way you work
              </span>
            </h1>
            <p className="s-lede">
              WhatsApp assistants, web platforms and workflow tools for Ghanaian businesses. Pick
              what you need, or tell us the problem and we&apos;ll recommend the right fit.
            </p>
            <div className="s-ctas">
              <a className="x-btn x-btn-lime" href={links.whatsapp} {...links.whatsappAttrs}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#wa" />
                </svg>
                Talk to us on WhatsApp
              </a>{" "}
              <a className="x-btn x-btn-line" href="#details">
                See every service
              </a>
            </div>
            <span className="s-tag s-tag-a" aria-hidden="true">
              Your customer
              <svg viewBox="0 0 16 16">
                <path fill="currentColor" d="M2 1l12 6-5 1.6L7 14z" />
              </svg>
            </span>{" "}
            <span className="s-tag s-tag-b" aria-hidden="true">
              Your team
              <svg viewBox="0 0 16 16">
                <path fill="currentColor" d="M2 1l12 6-5 1.6L7 14z" />
              </svg>
            </span>
            <div className="s-fan">
              <svg className="s-prop s-prop-1" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id="pm" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" />
                    <stop offset="1" stopColor="#bdbdbd" />
                  </linearGradient>
                </defs>
                <path d="M18 42l46-24v62L18 58z" fill="url(#pm)" />
                <rect x="8" y="40" width="14" height="20" rx="4" fill="#94DE57" />
                <path d="M28 58l6 22h10l-4-18" fill="#d6d6d6" />
                <circle cx="72" cy="30" r="5" fill="#94DE57" />
                <circle cx="80" cy="48" r="4" fill="#E5DED3" />
                <circle cx="72" cy="66" r="5" fill="#94DE57" />
              </svg>{" "}
              <svg className="s-prop s-prop-2" viewBox="0 0 100 100" aria-hidden="true">
                <rect x="10" y="18" width="78" height="60" rx="10" fill="#E5DED3" />
                <rect x="10" y="18" width="78" height="14" rx="7" fill="#fff" />
                <circle cx="20" cy="25" r="3" fill="#0D0D0D" />
                <circle cx="29" cy="25" r="3" fill="#94DE57" />
                <rect x="20" y="42" width="40" height="6" rx="3" fill="#0D0D0D" opacity=".7" />
                <rect x="20" y="54" width="56" height="6" rx="3" fill="#0D0D0D" opacity=".35" />
                <path d="M62 66l18 8-8 3-3 8z" fill="#0D0D0D" />
              </svg>{" "}
              <a className="s-card" href="#svc-4">
                <h2>Backend Systems</h2>
                <small>Databases &amp; integrations</small>{" "}
                <svg className="s-art" viewBox="0 0 200 200" aria-hidden="true">
                  <ellipse cx="100" cy="150" rx="62" ry="18" fill="#000" opacity=".25" />
                  <g>
                    <rect x="46" y="96" width="108" height="44" fill="#4a4a4a" />
                    <ellipse cx="100" cy="140" rx="54" ry="16" fill="#4a4a4a" />
                    <ellipse cx="100" cy="96" rx="54" ry="16" fill="#6a6a6a" />
                  </g>
                  <g>
                    <rect x="46" y="60" width="108" height="36" fill="#5a5a5a" />
                    <ellipse cx="100" cy="60" rx="54" ry="16" fill="#94DE57" />
                  </g>
                  <circle cx="70" cy="118" r="4" fill="#94DE57" />
                  <circle cx="70" cy="80" r="4" fill="#fff" />
                </svg>
              </a>{" "}
              <a className="s-card" href="#svc-2">
                <h2>Web Platforms</h2>
                <small>Websites &amp; web apps</small>{" "}
                <svg className="s-art" viewBox="0 0 200 200" aria-hidden="true">
                  <ellipse cx="100" cy="166" rx="66" ry="14" fill="#000" opacity=".12" />
                  <rect x="26" y="40" width="148" height="112" rx="16" fill="#fff" />
                  <rect x="26" y="40" width="148" height="26" rx="13" fill="#0D0D0D" />
                  <circle cx="42" cy="53" r="4" fill="#94DE57" />
                  <circle cx="55" cy="53" r="4" fill="#fff" />
                  <rect x="40" y="80" width="70" height="10" rx="5" fill="#0D0D0D" />
                  <rect x="40" y="98" width="110" height="7" rx="3.5" fill="#cfcfcf" />
                  <rect x="40" y="112" width="90" height="7" rx="3.5" fill="#cfcfcf" />
                  <rect x="40" y="128" width="54" height="14" rx="7" fill="#94DE57" />
                  <circle
                    cx="148"
                    cy="124"
                    r="16"
                    fill="#E5DED3"
                    stroke="#0D0D0D"
                    strokeWidth="3"
                  />
                  <g fill="#0D0D0D">
                    <circle cx="143" cy="121" r="2.4" />
                    <circle cx="153" cy="121" r="2.4" />
                  </g>
                  <path
                    d="M142 129q6 5 12 0"
                    stroke="#0D0D0D"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </a>{" "}
              <a className="s-card" href="#svc-1">
                <h2>WhatsApp AI</h2>
                <small>Assistants that answer 24/7</small>{" "}
                <span className="s-go">
                  Get started
                  <i>
                    <svg viewBox="0 0 16 16">
                      <path
                        d="M4 12 12 4M5.5 4H12v6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </i>
                </span>{" "}
                <svg className="s-art" viewBox="0 0 200 200" aria-hidden="true">
                  <ellipse cx="100" cy="172" rx="70" ry="14" fill="#000" opacity=".15" />
                  <path
                    d="M40 40h96a20 20 0 0 1 20 20v44a20 20 0 0 1-20 20H78l-26 22v-22H40a20 20 0 0 1-20-20V60a20 20 0 0 1 20-20z"
                    fill="#0D0D0D"
                  />
                  <g fill="#fff">
                    <circle cx="64" cy="80" r="7" />
                    <circle cx="104" cy="80" r="7" />
                  </g>
                  <path
                    d="M70 98q14 10 28 0"
                    stroke="#fff"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M118 104h50a16 16 0 0 1 16 16v26a16 16 0 0 1-16 16h-6v16l-18-16h-26a16 16 0 0 1-16-16v-26a16 16 0 0 1 16-16z"
                    fill="#fff"
                  />
                  <g fill="#0D0D0D">
                    <circle cx="128" cy="133" r="5" />
                    <circle cx="145" cy="133" r="5" />
                    <circle cx="162" cy="133" r="5" />
                  </g>
                </svg>
              </a>{" "}
              <a className="s-card" href="#svc-3">
                <h2>Workflow Tools</h2>
                <small>Checklists, trackers, forms</small>{" "}
                <svg className="s-art" viewBox="0 0 200 200" aria-hidden="true">
                  <ellipse cx="100" cy="170" rx="60" ry="12" fill="#000" opacity=".12" />
                  <rect x="44" y="28" width="112" height="136" rx="14" fill="#fff" />
                  <rect x="76" y="18" width="48" height="20" rx="10" fill="#0D0D0D" />
                  <g>
                    <rect x="60" y="56" width="18" height="18" rx="5" fill="#94DE57" />
                    <path
                      d="M64 65l4 4 7-8"
                      stroke="#0D0D0D"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <rect x="86" y="61" width="54" height="8" rx="4" fill="#0D0D0D" />
                  </g>
                  <g>
                    <rect x="60" y="88" width="18" height="18" rx="5" fill="#94DE57" />
                    <path
                      d="M64 97l4 4 7-8"
                      stroke="#0D0D0D"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <rect x="86" y="93" width="44" height="8" rx="4" fill="#0D0D0D" />
                  </g>
                  <g>
                    <rect
                      x="60"
                      y="120"
                      width="18"
                      height="18"
                      rx="5"
                      fill="none"
                      stroke="#0D0D0D"
                      strokeWidth="3"
                    />
                    <rect x="86" y="125" width="50" height="8" rx="4" fill="#bdbdbd" />
                  </g>
                </svg>
              </a>{" "}
              <a className="s-card" href="#svc-5">
                <h2>AI Chatbots</h2>
                <small>On your website</small>{" "}
                <svg className="s-art" viewBox="0 0 200 200" aria-hidden="true">
                  <ellipse cx="100" cy="170" rx="58" ry="12" fill="#000" opacity=".25" />
                  <line x1="100" y1="34" x2="100" y2="56" stroke="#94DE57" strokeWidth="5" />
                  <circle cx="100" cy="30" r="9" fill="#94DE57" />
                  <rect x="44" y="56" width="112" height="90" rx="30" fill="#E5DED3" />
                  <rect x="60" y="76" width="80" height="44" rx="20" fill="#0D0D0D" />
                  <g fill="#94DE57">
                    <circle cx="82" cy="98" r="7" />
                    <circle cx="118" cy="98" r="7" />
                  </g>
                  <rect x="34" y="88" width="12" height="26" rx="6" fill="#bdbdbd" />
                  <rect x="154" y="88" width="12" height="26" rx="6" fill="#bdbdbd" />
                  <path d="M86 132h28" stroke="#0D0D0D" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </section>
        </div>
        <div className="x-wrap">
          <section className="x-sec" id="details" aria-labelledby="details-title">
            <div className="x-head">
              <h2 className="x-h2" id="details-title">
                Every <span className="x-hl">service</span>, in detail
              </h2>
              <p>
                Each project starts with a free conversation and a written plan, timeline and price
                before any work begins.
              </p>
            </div>
            <ol className="s-list">
              <li className="s-row" id="svc-1">
                <span className="s-num" aria-hidden="true">
                  01
                </span>
                <div>
                  <h3>WhatsApp AI Assistants</h3>
                  <p className="s-sub">
                    An assistant on your WhatsApp Business number that answers customer questions
                    from your own documents, prices and policies, any time of day.
                  </p>
                  <div className="s-good">
                    <span>Logistics</span>
                    <span>Retail</span>
                    <span>Service businesses</span>
                  </div>
                </div>
                <ul>
                  <li>Answers from your real documents, not guesses</li>
                  <li>Hands the chat to a staff member when it should</li>
                  <li>Works in the app your customers already use</li>
                  <li>Trained on your business, updated as things change</li>
                </ul>
              </li>
              <li className="s-row" id="svc-2">
                <span className="s-num" aria-hidden="true">
                  02
                </span>
                <div>
                  <h3>Web Platforms</h3>
                  <p className="s-sub">
                    Fast, mobile-first websites and web apps that explain what you do and turn
                    visitors into WhatsApp conversations.
                  </p>
                  <div className="s-good">
                    <span>New businesses</span>
                    <span>Growing companies</span>
                  </div>
                </div>
                <ul>
                  <li>Designed for phones first</li>
                  <li>Clear WhatsApp and contact buttons on every page</li>
                  <li>Pages you can update without calling us</li>
                  <li>Hosting and domain set-up handled</li>
                </ul>
              </li>
              <li className="s-row" id="svc-3">
                <span className="s-num" aria-hidden="true">
                  03
                </span>
                <div>
                  <h3>Workflow Tools</h3>
                  <p className="s-sub">
                    Simple internal tools, such as checklists, trackers and forms, built around the
                    way your team already runs.
                  </p>
                  <div className="s-good">
                    <span>Operations teams</span>
                    <span>Offices on paper</span>
                  </div>
                </div>
                <ul>
                  <li>Replace paper files and scattered spreadsheets</li>
                  <li>Generate documents and checklists in seconds</li>
                  <li>Everyone sees the same, up-to-date information</li>
                  <li>Works on the phones your staff already carry</li>
                </ul>
              </li>
              <li className="s-row" id="svc-4">
                <span className="s-num" aria-hidden="true">
                  04
                </span>
                <div>
                  <h3>Backend Systems</h3>
                  <p className="s-sub">
                    The databases, dashboards and integrations that keep your tools connected behind
                    the scenes.
                  </p>
                  <div className="s-good">
                    <span>Multi-tool businesses</span>
                    <span>Reporting</span>
                  </div>
                </div>
                <ul>
                  <li>One place for your business data</li>
                  <li>Dashboards that show what&apos;s happening today</li>
                  <li>Connects your website, WhatsApp and internal tools</li>
                  <li>Secure access for the right people</li>
                </ul>
              </li>
              <li className="s-row" id="svc-5">
                <span className="s-num" aria-hidden="true">
                  05
                </span>
                <div>
                  <h3>AI Chatbots</h3>
                  <p className="s-sub">
                    A chat assistant on your website that answers visitors&apos; questions and
                    passes serious enquiries to your team.
                  </p>
                  <div className="s-good">
                    <span>Websites with traffic</span>
                    <span>Customer support</span>
                  </div>
                </div>
                <ul>
                  <li>Answers common questions instantly</li>
                  <li>Collects the details your team needs</li>
                  <li>Sends warm leads straight to WhatsApp</li>
                  <li>Matches your brand&apos;s tone</li>
                </ul>
              </li>
            </ol>
          </section>
          <CtaBox copy={getSite().ctaBox} />
        </div>
      </div>
    </>
  );
}
