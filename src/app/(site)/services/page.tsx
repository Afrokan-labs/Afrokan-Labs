import "@/styles/pages/services.css";
import { CtaBox } from "@/components/site/CtaBox";
import { Nav } from "@/components/site/Nav";
import { ServicesScripts } from "@/components/site/ServicesScripts";
import { getLinks } from "@/lib/links";
import { getPackages, getServices, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/services", ...getServices().meta });

export default function ServicesPage() {
  const links = getLinks();
  const { hero, details, items } = getServices();
  const { tabs } = details;
  const packages = getPackages();
  const { quote } = packages;
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap s-top">
          <Nav current="services" dark />
          <section className="s-hero" aria-labelledby="s-title">
            <span className="s-badge">
              <b>{hero.badge.bold}</b>
              {hero.badge.rest}
            </span>
            <h1 className="s-h1" id="s-title">
              <span>{hero.heading.first}</span>
              <span className="s-grad">
                <span className="s-script">{hero.heading.script}</span>
                {hero.heading.rest}
              </span>
            </h1>
            <p className="s-lede">{hero.lede}</p>
            <div className="s-ctas">
              <a className="x-btn x-btn-lime" href={links.whatsapp} {...links.whatsappAttrs}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#wa" />
                </svg>
                {hero.whatsapp}
              </a>{" "}
              <a className="x-btn x-btn-line" href={hero.details.href}>
                {hero.details.label}
              </a>
            </div>
            <span className="s-tag s-tag-a" aria-hidden="true">
              {hero.tags[0]}
              <svg viewBox="0 0 16 16">
                <path fill="currentColor" d="M2 1l12 6-5 1.6L7 14z" />
              </svg>
            </span>{" "}
            <span className="s-tag s-tag-b" aria-hidden="true">
              {hero.tags[1]}
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
                <h2>{items[3].card.title}</h2>
                <small>{items[3].card.sub}</small>{" "}
                {serviceArt(3, "s-art")}
              </a>{" "}
              <a className="s-card" href="#svc-2">
                <h2>{items[1].card.title}</h2>
                <small>{items[1].card.sub}</small>{" "}
                {serviceArt(1, "s-art")}
              </a>{" "}
              <a className="s-card" href="#svc-1">
                <h2>{items[0].card.title}</h2>
                <small>{items[0].card.sub}</small>{" "}
                <span className="s-go">
                  {hero.start}
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
                {serviceArt(0, "s-art")}
              </a>{" "}
              <a className="s-card" href="#svc-3">
                <h2>{items[2].card.title}</h2>
                <small>{items[2].card.sub}</small>{" "}
                {serviceArt(2, "s-art")}
              </a>{" "}
              <a className="s-card" href="#svc-5">
                <h2>{items[4].card.title}</h2>
                <small>{items[4].card.sub}</small>{" "}
                {serviceArt(4, "s-art")}
              </a>
            </div>
          </section>
        </div>
        <div className="x-wrap">
          <section className="x-sec sd" id="details" aria-labelledby="details-title">
            <div className="x-head">
              <h2 className="x-h2" id="details-title">
                {details.heading.lead}
                <span className="x-hl">{details.heading.mark}</span>
                {details.heading.tail}
              </h2>
              <p>{details.body}</p>
            </div>
            <div className="sd-wrap">
              <ul className="sd-tabs" role="tablist" aria-label={tabs.label}>
                {items.map((item, i) => (
                  <li key={item.name} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`tab-svc-${i + 1}`}
                      aria-controls={`svc-${i + 1}`}
                      aria-selected={i === 0}
                      tabIndex={i === 0 ? 0 : -1}
                      className="sd-tab"
                    >
                      <span className="sd-n">{pad(i + 1)}</span>
                      <span className="sd-t">{item.name}</span>
                      <span className="sd-arr" aria-hidden="true">
                        {ARROW}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="sd-panels">
                {items.map((item, i) => (
                  <article
                    className="sd-panel"
                    role="tabpanel"
                    id={`svc-${i + 1}`}
                    aria-labelledby={`tab-svc-${i + 1}`}
                    hidden={i !== 0}
                    key={item.name}
                  >
                    <div className="sd-art">
                      <span className="sd-big" aria-hidden="true">
                        {pad(i + 1)}
                      </span>
                      {serviceArt(i, "sd-artsvg")}
                    </div>
                    <div className="sd-body">
                      <span className="sd-k">
                        {tabs.counter
                          .replace("{n}", pad(i + 1))
                          .replace("{total}", pad(items.length))}
                      </span>
                      <h3>{item.name}</h3>
                      <p className="sd-sub">{item.sub}</p>
                      <h4>{tabs.features}</h4>
                      <ul className="sd-feats">
                        {item.points.map((point) => (
                          <li key={point}>
                            <span className="sd-ck">{CHECK}</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <div className="sd-foot">
                        <div>
                          <h4>{tabs.goodFor}</h4>
                          <ul className="sd-chips">
                            {item.goodFor.map((g) => (
                              <li key={g}>{g}</li>
                            ))}
                          </ul>
                        </div>
                        <a className="sd-cta" href={tabs.ask.href}>
                          {tabs.ask.label}
                          <span aria-hidden="true">{ARROW}</span>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            {/* Without JavaScript the tabs can't switch, so every panel shows, stacked. */}
            <noscript
              dangerouslySetInnerHTML={{
                __html:
                  "<style>.sd-tabs{display:none}.sd-wrap{grid-template-columns:minmax(0,1fr)}.sd-panels{display:grid;gap:14px}.sd-panel[hidden]{display:grid!important}</style>",
              }}
            />
            <ServicesScripts />
          </section>
          <section className="pk-panel" id="packages" aria-labelledby="pk-title">
            <div className="pk-head">
              <h2 id="pk-title">{packages.heading}</h2>
              <p>{packages.note}</p>
            </div>
            <ul className="pk-grid">
              {packages.items.map((pk) => (
                <li className={pk.featured ? "pk-card on" : "pk-card"} key={pk.name}>
                  <a href={packages.href} className="pk-link">
                    <div className="pk-top">
                      <h3>
                        {pk.name}
                        <br />
                        {packages.suffix}
                      </h3>
                      <span className="pk-go" aria-hidden="true">
                        {ARROW}
                      </span>
                    </div>
                    <p className="pk-for">{pk.for}</p>
                    <p className="pk-inc">{pk.includes.join(" · ")}</p>
                    <div className="pk-art">{PACKAGE_ART[pk.art]}</div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
          <section className="pk-quote" aria-label={quote.label}>
            <span className="pk-sp a">{ASTERISK}</span>
            <span className="pk-sp b">{SPARKLE}</span>
            <span className="pk-sp c">{SPARKLE}</span>
            <span className="pk-sp d">{ASTERISK}</span>
            <p className="pk-q">
              {quote.before}
              <span className="pk-pill">{quote.pill}</span>
              {quote.after}
              <br />
              {quote.line2}
              <span className="pk-g">{quote.highlight}</span>
            </p>
            <p className="pk-by">
              <b>{quote.name}</b>
              <br />
              {quote.role}
            </p>
          </section>
          <CtaBox copy={getSite().ctaBox} />
        </div>
      </div>
    </>
  );
}

const ARROW = (
  <svg viewBox="0 0 16 16">
    <path
      d="M4 12 12 4M5.5 4H12v6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CHECK = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3.5 8.5l3 3 6-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const pad = (n: number) => String(n).padStart(2, "0");

const ASTERISK = (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <path d="M20 4v32M4 20h32M8.7 8.7l22.6 22.6M31.3 8.7 8.7 31.3" />
    </g>
  </svg>
);

const SPARKLE = (
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20 2c1.6 11 7 16.4 18 18-11 1.6-16.4 7-18 18-1.6-11-7-16.4-18-18 11-1.6 16.4-7 18-18Z"
    />
  </svg>
);

/** The drawings on the package cards' bottom tabs (reference .pk-art). */
const PACKAGE_ART = {
  site: (
    <svg viewBox="0 0 220 120" aria-hidden="true">
      <rect x="30" y="16" width="160" height="104" rx="10" fill="#fff" />
      <rect x="30" y="16" width="160" height="22" rx="10" fill="#0D0D0D" />
      <circle cx="44" cy="27" r="4" fill="#94DE57" />
      <circle cx="56" cy="27" r="4" fill="#fff" />
      <rect x="46" y="52" width="70" height="10" rx="5" fill="#0D0D0D" />
      <rect x="46" y="70" width="110" height="6" rx="3" fill="#cfcfcf" />
      <rect x="46" y="82" width="90" height="6" rx="3" fill="#cfcfcf" />
      <rect x="46" y="96" width="54" height="14" rx="7" fill="#94DE57" />
      <rect x="132" y="50" width="44" height="40" rx="6" fill="#E5DED3" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 220 120" aria-hidden="true">
      <rect x="18" y="22" width="120" height="98" rx="10" fill="#fff" />
      <rect x="18" y="22" width="120" height="18" rx="9" fill="#1F3A2C" />
      <rect x="30" y="54" width="70" height="8" rx="4" fill="#0D0D0D" />
      <rect x="30" y="68" width="92" height="5" rx="2.5" fill="#cfcfcf" />
      <rect x="30" y="80" width="80" height="5" rx="2.5" fill="#cfcfcf" />
      <rect x="128" y="10" width="74" height="110" rx="14" fill="#0D0D0D" />
      <rect x="134" y="18" width="62" height="102" rx="9" fill="#ECE5DD" />
      <rect x="134" y="18" width="62" height="18" rx="9" fill="#1F3A2C" />
      <rect x="160" y="44" width="30" height="12" rx="5" fill="#D9FDD3" />
      <rect x="140" y="62" width="40" height="18" rx="5" fill="#fff" />
      <rect x="156" y="86" width="34" height="12" rx="5" fill="#D9FDD3" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 220 120" aria-hidden="true">
      <rect x="22" y="18" width="176" height="102" rx="10" fill="#fff" />
      <rect x="22" y="18" width="40" height="102" rx="10" fill="#0D0D0D" />
      <rect x="32" y="34" width="20" height="5" rx="2.5" fill="#94DE57" />
      <g fill="#fff" opacity=".6">
        <rect x="32" y="48" width="20" height="5" rx="2.5" />
        <rect x="32" y="60" width="20" height="5" rx="2.5" />
      </g>
      <rect x="74" y="32" width="54" height="34" rx="6" fill="#E5DED3" />
      <rect x="134" y="32" width="54" height="34" rx="6" fill="#D9E8C8" />
      <g textAnchor="middle" fontSize="13" fontWeight="600" fill="#0D0D0D">
        <text x="101" y="55">
          24
        </text>
        <text x="161" y="55">
          98%
        </text>
      </g>
      <g fill="#94DE57">
        <rect x="80" y="100" width="12" height="12" rx="2" />
        <rect x="98" y="88" width="12" height="24" rx="2" />
        <rect x="116" y="80" width="12" height="32" rx="2" />
        <rect x="134" y="92" width="12" height="20" rx="2" />
        <rect x="152" y="76" width="12" height="36" rx="2" />
      </g>
    </svg>
  ),
};

/** The five services' drawings, in content order: on the fanned hero cards and in the tab panels. */
const SERVICE_ART = [
  (className: string) => (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
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
  ),
  (className: string) => (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
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
  ),
  (className: string) => (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
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
  ),
  (className: string) => (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
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
  ),
  (className: string) => (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
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
  ),
];

const serviceArt = (i: number, className: string) => SERVICE_ART[i](className);
