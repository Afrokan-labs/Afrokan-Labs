import "@/styles/pages/home.css";
import { Fragment } from "react";
import { Img } from "@/components/site/Img";
import { LogoMark, WaIcon } from "@/components/site/LogoMark";
import { Eyebrow } from "@/components/site/Eyebrow";
import { HomeScripts } from "@/components/site/HomeScripts";
import { Nav } from "@/components/site/Nav";
import { RotatingBadge } from "@/components/site/RotatingBadge";
import { WelcomeBlock } from "@/components/site/WelcomeBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Site } from "@/content/schema";
import {
  clientDisplayName,
  getHome,
  getMembers,
  getProjects,
  getSite,
  getStatusLabels,
} from "@/lib/content";
import { confirmed } from "@/lib/confirmed";
import { getLinks } from "@/lib/links";
import { whatsappTextLink } from "@/lib/whatsapp";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/", ...getHome().meta });

/** The crossing bands' line icons (update 2 §3, reference .xb). */
const BAND_ICONS: Record<Site["ticker"]["items"][number]["icon"], React.ReactNode> = {
  chat: (
    <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
  ),
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
    </>
  ),
  checklist: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 9l1.5 1.5L12 8M8 14l1.5 1.5L12 13M14 9.5h2M14 14.5h2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  bot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="4" />
      <path d="M12 8V4M9 13h.01M15 13h.01" />
    </>
  ),
};

/** Where each orbit slider's knob starts (reference); HomeScripts moves them. */
const SLIDER_START = [".15", ".55", ".1"];

/** Heading lines with the reference's <br> between them. */
function lines(items: readonly string[]) {
  return items.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

export default function HomePage() {
  const links = getLinks();
  const members = getMembers();
  const home = getHome();
  const {
    hero,
    welcome,
    ideas,
    orbit,
    services,
    work,
    words,
    process,
    team,
    project: banner,
    contact,
  } = home;
  const site = getSite();
  const ticker = site.ticker;
  const bannerWaHref = whatsappTextLink().href;
  // The banner's team, by role: CTO left, CIO right, CEO centre and in front.
  const byRole = (abbr: string) => members.find((m) => m.abbr === abbr);
  const bannerTeam = [
    { cls: "p1", member: byRole("CTO") },
    { cls: "p3", member: byRole("CIO") },
    { cls: "p2", member: byRole("CEO") },
  ];
  // Band 2 runs the list the other way; the chip colours cycle c0–c3 in each band.
  const bands = [
    { cls: "b1", items: ticker.items },
    { cls: "b2", items: [...ticker.items].reverse() },
  ];
  const v = process.visuals;
  // Featured work (architecture §4): omitted without a featured project, and the
  // client's real name only when approved.
  const project = getProjects().find((p) => p.featured);
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HomeScripts
        chat={hero.phone.chat}
        online={hero.phone.online}
        typing={hero.phone.typing}
        tiles={orbit.tiles}
        invalidEmail={contact.invalid}
      />
      <div className="x x-glow">
        <div className="x-wrap x-hero-wrap">
          <div className="x-hero" id="top">
            <div className="x-bigword" aria-hidden="true">
              {hero.bigWord}
            </div>
            <Nav logoHref="#top" />
            <div className="x-h1-row">
              <svg className="x-burst" viewBox="0 0 100 100" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
                  <line x1="50" y1="6" x2="50" y2="36" />
                  <line x1="50" y1="64" x2="50" y2="94" />
                  <line x1="6" y1="50" x2="36" y2="50" />
                  <line x1="64" y1="50" x2="94" y2="50" />
                  <g transform="rotate(22.5 50 50)">
                    <line x1="50" y1="6" x2="50" y2="36" />
                    <line x1="50" y1="64" x2="50" y2="94" />
                    <line x1="6" y1="50" x2="36" y2="50" />
                    <line x1="64" y1="50" x2="94" y2="50" />
                  </g>
                  <g transform="rotate(45 50 50)">
                    <line x1="50" y1="6" x2="50" y2="36" />
                    <line x1="50" y1="64" x2="50" y2="94" />
                    <line x1="6" y1="50" x2="36" y2="50" />
                    <line x1="64" y1="50" x2="94" y2="50" />
                  </g>
                  <g transform="rotate(67.5 50 50)">
                    <line x1="50" y1="6" x2="50" y2="36" />
                    <line x1="50" y1="64" x2="50" y2="94" />
                    <line x1="6" y1="50" x2="36" y2="50" />
                    <line x1="64" y1="50" x2="94" y2="50" />
                  </g>
                </g>
              </svg>
              <h1 className="x-h1">
                {hero.headline}
                <svg className="x-tail" viewBox="0 0 30 28" aria-hidden="true">
                  <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" fill="none">
                    <path d="M4 10 L26 3" />
                    <path d="M4 15 L22 15" />
                    <path d="M4 20 L26 26" />
                  </g>
                </svg>
              </h1>
            </div>
            <div className="x-stage">
              <div className="x-left">
                <svg className="x-ticks" viewBox="0 0 26 20" aria-hidden="true">
                  <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M3 18 L6 3" />
                    <path d="M9 18 L17 6" />
                    <path d="M13 19 L24 13" />
                  </g>
                </svg>
                <p className="x-lede">{hero.lede}</p>
                <a className="x-ghost" href={hero.workLink.href}>
                  {hero.workLink.label}
                </a>
              </div>
              <div className="x-photo">
                <div className="x-circle" aria-hidden="true" />
                <div className="x-phone" aria-label={hero.phone.label} role="img">
                  <div className="x-screen">
                    <div className="x-wa-top">
                      <span className="x-wa-av">
                        <svg viewBox="105 115 1100 990" aria-hidden="true">
                          <path
                            d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="165"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="x-wa-name">
                        <b>{hero.phone.name}</b>
                        <small id="wastatus">{hero.phone.online}</small>
                      </span>
                    </div>
                    <div className="x-wa-chat" id="wachat" aria-hidden="true" />
                  </div>
                </div>
                <svg className="x-swirl" viewBox="0 0 60 90" aria-hidden="true">
                  <path
                    d="M44 4 C20 10 8 30 22 40 C36 50 46 30 30 30 C10 30 8 58 22 70 C28 75 34 78 38 84 M38 84 L30 82 M38 84 L37 76"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="x-ctas">
                  <a className="x-go" href={hero.startProject.href}>
                    {hero.startProject.label}
                  </a>{" "}
                  <a href={links.whatsapp}>{hero.whatsapp}</a>
                </div>
              </div>
              <div className="x-right">
                <div className="x-sparks" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>{" "}
                  <svg viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>{" "}
                  <svg viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>{" "}
                  <svg viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>{" "}
                  <svg viewBox="0 0 20 20">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>
                </div>
                <span className="x-big">{hero.badge.big}</span>{" "}
                <span className="x-small">{hero.badge.small}</span>
              </div>
            </div>
            <div style={{ height: "clamp(0px,1vw,8px)" }} />
          </div>
          <div className="x-stats" role="list" aria-label={home.stats.label}>
            {home.stats.items.map((stat) => (
              <div className="x-stat" role="listitem" key={stat.label}>
                <b>
                  {stat.value}
                  {stat.unit && <i>{stat.unit}</i>}
                </b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <WelcomeBlock copy={welcome} industries={getSite().industries} />
          <section className="x-ideas" id="ideas" aria-labelledby="ideas-title">
            <RotatingBadge className="rbadge" text={ideas.badge} />
            <div className="x-ideas-head">
              <Eyebrow block>{ideas.eyebrow}</Eyebrow>
              <h2 className="x-h2" id="ideas-title">
                {lines(ideas.heading)}
              </h2>
              <p>{ideas.body}</p>
            </div>
            <div className="x-ideas-grid">
              <div className="x-shot x-shot-wide">
                <svg className="x-star4" viewBox="0 0 100 100" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"
                  />
                </svg>
                <div className="x-clip">
                  <Img src={ideas.wide.src} className="x-img" alt={ideas.wide.alt} />
                </div>
                <div className="x-banner">
                  <span>{lines(ideas.banner)}</span>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="x-shot x-shot-tall">
                <Img src={ideas.tall.src} className="x-img" alt={ideas.tall.alt} />
                <svg className="x-bulb" viewBox="0 0 100 100" aria-hidden="true">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M50 30c-14 0-24 10-24 23 0 9 5 15 10 20 3 3 4 6 4 10h20c0-4 1-7 4-10 5-5 10-11 10-20 0-13-10-23-24-23z"
                      transform="rotate(-14 50 55)"
                    />
                    <path d="M42 88h18M44 94h14" transform="rotate(-14 50 55)" />
                    <path d="M50 18v-12M26 26l-8-8M74 26l8-8M16 46H4M84 46h12" />
                    <path d="M46 60l4-10 4 10" transform="rotate(-14 50 55)" />
                  </g>
                </svg>
              </div>
            </div>
          </section>
          <section className="o-sec" id="orbit" aria-labelledby="orbit-title">
            <div className="o-text">
              <span className="o-eyebrow">{orbit.eyebrow}</span>
              <h2 className="x-h2 o-h2" id="orbit-title">
                {orbit.heading.lead}
                <span className="x-hl">{orbit.heading.mark}</span>
              </h2>
              <p>{orbit.body}</p>
              <a className="o-btn" href={orbit.cta.href}>
                {orbit.cta.label}
                <span>
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M4 12 12 4M5.5 4H12v6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
            <div className="o-stage" id="ostage" aria-hidden="true">
              <div className="o-ctrl">
                {orbit.sliders.map(([from, to], k) => (
                  <div className="o-sl" key={from}>
                    <span>{from}</span>
                    <i>
                      <b style={{ "--p": SLIDER_START[k] } as React.CSSProperties} />
                    </i>
                    <span>{to}</span>
                  </div>
                ))}
              </div>
              <div className="o-ring" id="oring" />
            </div>
          </section>
          <section className="sv" id="services-new" aria-labelledby="sv-title">
            <div className="sv-top">
              <span>{lines(services.side)}</span>
              <h2 id="sv-title" className="sv-h2">
                {lines(services.heading)}
              </h2>
              <span className="sv-r">{lines(services.guide)}</span>
            </div>
            <ol className="sv-list">
              {services.items.map((item, k) => (
                <li className={`sv-row ${k % 2 ? "open" : "boxed"}`} key={item.href}>
                  <a className="sv-link" href={item.href}>
                    <span className="sv-num" aria-hidden="true">
                      {String(k + 1).padStart(2, "0")}
                    </span>{" "}
                    <span className="sv-text">
                      <span className="sv-title">
                        <span>{item.title[0]}</span>
                        <span className="sv-l2">
                          <small>
                            00 - {k + 1}&nbsp;&nbsp;&nbsp;&nbsp;{services.tag}
                          </small>
                          {item.title[1]}
                        </span>
                        <span>{item.title[2]}</span>
                      </span>{" "}
                      <span className="sv-desc">{item.body}</span>
                    </span>{" "}
                    <svg className="sv-arrow" viewBox="0 0 60 60" aria-hidden="true">
                      <path
                        d="M12 48 48 12M20 12h28v28"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ol>
            <div className="sv-foot">
              <a className="hw-btn" href={services.cta.href}>
                {services.cta.label}
              </a>
            </div>
          </section>
          {project && (
            <section className="x-svc x-work" id="work" aria-labelledby="work-new-title">
              <div className="x-wm" aria-hidden="true">
                <span>{work.watermark}</span>
                <span>{work.watermark}</span>
                <span>{work.watermark}</span>
              </div>
              <div className="x-notch">
                <div className="x-dots" aria-hidden="true">
                  <span className="d1">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <use href="#wa" />
                    </svg>
                  </span>
                  <span className="d2">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="5"
                        y="3"
                        width="14"
                        height="18"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 8l1.5 1.5L12 7M8 13l1.5 1.5L12 12M14 8.5h2.5M14 13.5h2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="d3">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </div>
                <p>{work.notch}</p>
              </div>
              <div className="x-tab" aria-hidden="true">
                <span>{work.tab}</span>
              </div>
              <div className="x-work-grid">
                <div className="x-work-main">
                  <h2 className="x-h2" id="work-new-title">
                    {work.heading.lead}
                    <span className="x-hl">{work.heading.mark}</span>
                  </h2>
                  <h3>{work.titles[project.slug]}</h3>
                  <p>
                    {project.summary.problem} {project.summary.solution}
                  </p>
                  <div className="x-btns">
                    <a className="x-pill x-pill-lime" href={work.caseStudy.href}>
                      {work.caseStudy.label}
                    </a>{" "}
                    <a className="x-pill x-pill-line" href={links.whatsapp}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <use href="#wa" />
                      </svg>
                      {work.whatsapp}
                    </a>
                  </div>
                </div>
                <dl className="x-facts">
                  <div className="x-fact x-wide">
                    <dt>{work.fields.client}</dt>
                    <dd>{clientDisplayName(project)}</dd>
                  </div>
                  <div className="x-fact">
                    <dt>{work.fields.industry}</dt>
                    <dd>{project.industry}</dd>
                  </div>
                  <div className="x-fact">
                    <dt>{work.fields.status}</dt>
                    <dd className="x-live">{getStatusLabels(project)[project.status]}</dd>
                  </div>
                  <div className="x-fact x-wide">
                    <dt>{work.fields.built}</dt>
                    <dd className="x-tags">
                      {project.built.map((kind) => (
                        <span key={kind}>{work.builtLabels[kind]}</span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          )}
          <section className="x-words" aria-label={words.label}>
            <svg className="x-wordline" viewBox="0 0 1000 104" role="img" aria-label={words.label}>
              <text
                className="x-w"
                x="0"
                y="82"
                fontSize="78"
                textLength="300"
                lengthAdjust="spacingAndGlyphs"
              >
                {words.items[0]}
              </text>
              <path
                fill="var(--x-lime)"
                transform="translate(315 34) scale(.3)"
                d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"
              />
              <text
                className="x-w"
                x="360"
                y="82"
                fontSize="78"
                textLength="268"
                lengthAdjust="spacingAndGlyphs"
              >
                {words.items[1]}
              </text>
              <path
                fill="var(--x-lime)"
                transform="translate(643 34) scale(.3)"
                d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"
              />
              <text
                className="x-w"
                x="688"
                y="82"
                fontSize="78"
                textLength="312"
                lengthAdjust="spacingAndGlyphs"
              >
                {words.items[2]}
              </text>
            </svg>
            <div className="x-divider" aria-hidden="true">
              <svg viewBox="0 0 100 100">
                <path
                  fill="currentColor"
                  d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"
                />
              </svg>
            </div>
          </section>
          <section className="x-process" id="process" aria-labelledby="process-new-title">
            <svg
              className="x-ribbon"
              viewBox="0 0 1600 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M-40 120 C 300 -40, 620 80, 760 260 S 1100 640, 1640 470" />
            </svg>
            <div className="x-ideas-head">
              <Eyebrow block>{process.eyebrow}</Eyebrow>
              <h2 className="x-h2" id="process-new-title">
                {process.heading.lead}
                <span className="x-hl">{process.heading.mark}</span>
              </h2>
              <p>{process.body}</p>
            </div>
            <ol className="hw-rows">
              <li className="hw-row">
                <div className="hw-text">
                  <span className="hw-chip">
                    <b>01</b>
                    {process.steps[0].chip}
                  </span>
                  <h3>{process.steps[0].title}</h3>
                  <p>{process.steps[0].body}</p>
                  <a className="hw-btn" href={process.steps[0].link.href}>
                    {process.steps[0].link.label}
                  </a>
                </div>
                <div className="hw-vis v1">
                  <svg className="hw-art" viewBox="0 0 400 400" aria-hidden="true">
                    <defs>
                      <linearGradient id="hw1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#CBD6CF" />
                        <stop offset="1" stopColor="#5E8A6C" />
                      </linearGradient>
                      <linearGradient id="hw2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#EFE8DC" />
                        <stop offset="1" stopColor="#CDBFA8" />
                      </linearGradient>
                      <linearGradient id="hw4" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#2E4A39" />
                        <stop offset="1" stopColor="#16241B" />
                      </linearGradient>
                      <clipPath id="hc1">
                        <path d="M200 215 L38.9 114.3 A190 190 0 0 1 361.1 114.3Z" />
                        <path d="M200 185 L380.8 258.0 A195 195 0 0 1 19.2 258.0Z" />
                      </clipPath>
                      <clipPath id="hc2">
                        <circle cx="185" cy="200" r="180" />
                      </clipPath>
                      <mask id="hm2">
                        <rect width="400" height="400" fill="#fff" />
                        <rect x="268" y="0" width="16" height="400" fill="#000" />
                      </mask>
                      <clipPath id="hc3">
                        <path d="M30 380V200a170 170 0 0 1 340 0v180z" />
                      </clipPath>
                      <mask id="hm4">
                        <circle cx="200" cy="200" r="185" fill="#fff" />
                        <circle cx="200" cy="22" r="40" fill="#000" />
                        <circle cx="200" cy="378" r="40" fill="#000" />
                        <circle cx="22" cy="200" r="36" fill="#000" />
                        <circle cx="378" cy="200" r="36" fill="#000" />
                      </mask>
                    </defs>
                    <g clipPath="url(#hc1)">
                      <rect width="400" height="400" fill="url(#hw1)" />
                      <g>
                        <rect x="110" y="100" width="170" height="54" rx="27" fill="#fff" />
                        <g fill="#0D0D0D" opacity=".75">
                          <rect x="132" y="118" width="96" height="8" rx="4" />
                          <rect x="132" y="132" width="64" height="8" rx="4" />
                        </g>
                      </g>
                      <g>
                        <rect x="160" y="250" width="170" height="54" rx="27" fill="#94DE57" />
                        <g fill="#0D0D0D" opacity=".8">
                          <rect x="182" y="268" width="110" height="8" rx="4" />
                          <rect x="182" y="282" width="72" height="8" rx="4" />
                        </g>
                      </g>
                      <g>
                        <rect x="70" y="318" width="150" height="50" rx="25" fill="#fff" />
                        <g fill="#0D0D0D">
                          <circle cx="102" cy="343" r="6" />
                          <circle cx="124" cy="343" r="6" />
                          <circle cx="146" cy="343" r="6" />
                        </g>
                      </g>
                      <circle cx="200" cy="200" r="0" fill="none" />
                      <path
                        d="M306 120h28M320 106v28"
                        stroke="#94DE57"
                        strokeWidth="5"
                        strokeLinecap="round"
                        opacity="0"
                      />
                    </g>
                  </svg>
                  <div className="hw-float f1" aria-hidden="true">
                    <div className="hw-gauge">
                      <svg viewBox="0 0 100 100" aria-hidden="true">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#E2E2DC"
                          strokeWidth="7"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#94DE57"
                          strokeWidth="7"
                          strokeDasharray="190 252"
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <b>{v.gauge.value}</b>
                      <span>{v.gauge.label}</span>
                      <em>{v.gauge.note}</em>
                    </div>
                  </div>
                </div>
              </li>
              <li className="hw-row rev">
                <div className="hw-text">
                  <span className="hw-chip">
                    <b>02</b>
                    {process.steps[1].chip}
                  </span>
                  <h3>{process.steps[1].title}</h3>
                  <p>{process.steps[1].body}</p>
                  <a className="hw-btn" href={process.steps[1].link.href}>
                    {process.steps[1].link.label}
                  </a>
                </div>
                <div className="hw-vis v2">
                  <svg className="hw-art" viewBox="0 0 400 400" aria-hidden="true">
                    <g mask="url(#hm2)">
                      <g clipPath="url(#hc2)">
                        <rect width="400" height="400" fill="url(#hw2)" />
                        <g transform="rotate(-8 170 210)">
                          <rect x="80" y="90" width="170" height="230" rx="14" fill="#fff" />
                          <rect x="104" y="120" width="90" height="12" rx="6" fill="#0D0D0D" />
                          <g fill="#CFCFC8">
                            <rect x="104" y="150" width="122" height="8" rx="4" />
                            <rect x="104" y="168" width="100" height="8" rx="4" />
                            <rect x="104" y="186" width="112" height="8" rx="4" />
                          </g>
                          <rect x="104" y="220" width="122" height="1.5" fill="#CFCFC8" />
                          <text x="104" y="250" fontSize="13" fill="#555">
                            {v.quote.total}
                          </text>
                          <text x="104" y="272" fontWeight="600" fontSize="18" fill="#0D0D0D">
                            {v.quote.fixed}
                          </text>
                          <rect x="104" y="280" width="70" height="22" rx="11" fill="#94DE57" />
                        </g>
                        <g transform="rotate(6 270 230)">
                          <rect x="210" y="150" width="130" height="170" rx="14" fill="#22352A" />
                          <g fill="#94DE57">
                            <rect x="230" y="176" width="40" height="40" rx="8" />
                          </g>
                          <g fill="#fff" opacity=".7">
                            <rect x="230" y="232" width="86" height="7" rx="3.5" />
                            <rect x="230" y="248" width="66" height="7" rx="3.5" />
                            <rect x="230" y="264" width="76" height="7" rx="3.5" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <div className="hw-float f2" aria-hidden="true">
                    <ul className="hw-list">
                      <li>
                        <i>1</i>
                        {v.checklist.items[0]}
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </li>
                      <li>
                        <i>2</i>
                        {v.checklist.items[1]}
                        <span>
                          <svg viewBox="0 0 24 24">
                            <rect
                              x="4"
                              y="5"
                              width="16"
                              height="15"
                              rx="2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                            <path
                              d="M4 10h16M9 3v4M15 3v4"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </li>
                      <li className="on">
                        <i>3</i>
                        {v.checklist.items[2]}
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M3 12V4h8l10 10-8 8z"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                            />
                            <circle cx="7.5" cy="8.5" r="1.5" fill="currentColor" />
                          </svg>
                        </span>
                        <small>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M5 12.5l4.5 4.5L19 7.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>{" "}
                          {v.checklist.ready}
                        </small>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="hw-row">
                <div className="hw-text">
                  <span className="hw-chip">
                    <b>03</b>
                    {process.steps[2].chip}
                  </span>
                  <h3>{process.steps[2].title}</h3>
                  <p>{process.steps[2].body}</p>
                  <a className="hw-btn" href={process.steps[2].link.href}>
                    {process.steps[2].link.label}
                  </a>
                </div>
                <div className="hw-vis v3">
                  <svg className="hw-art" viewBox="0 0 400 400" aria-hidden="true">
                    <g clipPath="url(#hc3)">
                      <rect width="400" height="400" fill="#DDE6DF" />
                      <g stroke="#fff" strokeWidth="10" fill="none" opacity=".9">
                        <path d="M-10 120 C 100 140, 160 60, 260 90 S 380 160, 420 140" />
                        <path d="M60 410 C 90 300, 160 260, 230 260 S 360 230, 420 300" />
                        <path d="M180 -10 C 170 80, 220 150, 200 220 S 140 330, 150 410" />
                      </g>
                      <g stroke="#C9D4CC" strokeWidth="3" fill="none">
                        <path d="M0 200H400M0 300H400M100 0V400M300 0V400" />
                      </g>
                      <rect x="250" y="20" width="160" height="110" fill="#BFD9EA" opacity=".9" />
                      <g fontWeight="500" fontSize="16" textAnchor="middle">
                        <circle
                          cx="120"
                          cy="170"
                          r="26"
                          fill="#fff"
                          stroke="#94DE57"
                          strokeWidth="5"
                        />
                        <text x="120" y="176" fill="#0D0D0D">
                          1
                        </text>
                        <circle
                          cx="230"
                          cy="230"
                          r="22"
                          fill="#fff"
                          stroke="#94DE57"
                          strokeWidth="5"
                        />
                        <text x="230" y="236" fill="#0D0D0D">
                          2
                        </text>
                        <circle
                          cx="140"
                          cy="300"
                          r="22"
                          fill="#fff"
                          stroke="#94DE57"
                          strokeWidth="5"
                        />
                        <text x="140" y="306" fill="#0D0D0D">
                          3
                        </text>
                      </g>
                      <path
                        d="M120 196 L230 208 M230 252 L140 278"
                        stroke="#22352A"
                        strokeWidth="3"
                        strokeDasharray="6 6"
                      />
                    </g>
                  </svg>
                  <div className="hw-float f3" aria-hidden="true">
                    <div className="hw-pin">
                      <div className="hw-pin-top">
                        <span className="hw-sq" />
                        <div>
                          <b>{v.checkIn.title}</b>
                          <small>{v.checkIn.sub}</small>
                        </div>
                      </div>
                      <span className="hw-tag">{v.checkIn.progress}</span>
                      <i className="hw-bar">
                        <b style={{ width: "60%" }} />
                      </i>
                    </div>
                  </div>
                </div>
              </li>
              <li className="hw-row rev">
                <div className="hw-text">
                  <span className="hw-chip">
                    <b>04</b>
                    {process.steps[3].chip}
                  </span>
                  <h3>{process.steps[3].title}</h3>
                  <p>{process.steps[3].body}</p>
                  <a className="hw-btn" href={process.steps[3].link.href}>
                    {process.steps[3].link.label}
                  </a>
                </div>
                <div className="hw-vis v4">
                  <svg className="hw-art" viewBox="0 0 400 400" aria-hidden="true">
                    <g mask="url(#hm4)">
                      <rect width="400" height="400" fill="url(#hw4)" />
                      <g transform="rotate(-6 200 220) translate(0 24) scale(1 .86)">
                        <rect x="128" y="70" width="150" height="290" rx="26" fill="#3A5A47" />
                        <rect x="138" y="84" width="130" height="262" rx="18" fill="#F3F3EF" />
                        <rect x="138" y="84" width="130" height="40" rx="18" fill="#22352A" />
                        <circle cx="160" cy="104" r="9" fill="#94DE57" />
                        <rect
                          x="176"
                          y="98"
                          width="56"
                          height="8"
                          rx="4"
                          fill="#fff"
                          opacity=".8"
                        />
                        <rect
                          x="150"
                          y="140"
                          width="80"
                          height="26"
                          rx="13"
                          fill="#fff"
                          stroke="#E2E2DC"
                        />
                        <rect x="176" y="176" width="80" height="26" rx="13" fill="#94DE57" />
                        <rect
                          x="150"
                          y="212"
                          width="96"
                          height="26"
                          rx="13"
                          fill="#fff"
                          stroke="#E2E2DC"
                        />
                        <rect x="170" y="248" width="86" height="26" rx="13" fill="#94DE57" />
                      </g>
                    </g>
                  </svg>
                  <div className="hw-float f4" aria-hidden="true">
                    <ul className="hw-stats">
                      <li>
                        <b>
                          <svg viewBox="0 0 24 24">
                            <circle
                              cx="9"
                              cy="8"
                              r="3.2"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                            <path
                              d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M16 5.5a3 3 0 0 1 0 5.6M21 19c0-2.4-1.4-4.2-3.6-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </b>
                        {v.handover.items[0]}
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M5 12.5l4.5 4.5L19 7.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </li>
                      <li>
                        <b>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M6 3h9l4 4v14H6z M15 3v4h4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </b>
                        {v.handover.items[1]}
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M5 12.5l4.5 4.5L19 7.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </li>
                      <li>
                        <b>
                          <svg viewBox="0 0 24 24">
                            <circle
                              cx="12"
                              cy="12"
                              r="8.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                            <circle
                              cx="12"
                              cy="12"
                              r="3.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                            <path
                              d="M6 6l3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />
                          </svg>
                        </b>
                        {v.handover.items[2]}
                        <span>
                          <svg viewBox="0 0 24 24">
                            <path
                              d="M5 12.5l4.5 4.5L19 7.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </li>
                      <li className="live">
                        <em>{v.handover.live}</em>
                        {v.handover.launched}
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ol>
          </section>
          <section className="x-crew" id="about" aria-labelledby="team-title">
            <div className="x-crew-head">
              <h2 className="x-crew-h" id="team-title">
                <b>{team.heading.first}</b>
                <span>
                  {team.heading.middle}{" "}
                  <span className="x-lime" style={{ display: "inline" }}>
                    {team.heading.brand}
                  </span>
                </span>
                <span>{team.heading.last}</span>
              </h2>
              <div className="x-crew-side">
                <p>{team.body}</p>
                <a className="x-crew-btn" href={team.join.href}>
                  {team.join.label}
                </a>
              </div>
            </div>
            <ul className="x-arches">
              {members.map((m) => {
                const name = m.name.join(" ");
                return (
                  <li className="x-arch" key={name}>
                    <b>{name}</b>
                    <span className="x-role">{m.abbr}</span>{" "}
                    {/* An unconfirmed (TODO_) profile is an inert "#" link until it's set. */}
                    <a
                      className="x-ln"
                      href={confirmed(m.linkedin) ? m.linkedin : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${team.linkedinLabel.replace("{name}", name)} ${links.opensNewTab}`}
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M3.6 5.6h2.1V13H3.6zM4.6 2.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM7 5.6h2v1c.3-.6 1.1-1.2 2.2-1.2 2.3 0 2.7 1.5 2.7 3.4V13h-2.1V9.2c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9V13H7z"
                        />
                      </svg>
                    </a>
                    <div className="x-pic">
                      <Img src={m.photo.src} alt={m.photo.alt} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
          {/*
            Testimonials go here, once a client has given a real quote with
            written permission. Add it to `testimonials` in
            src/content/testimonials.ts (the schema requires writtenPermission:
            true). No invented, placeholder or "your review here" quotes.
          */}
          <section
            className="xb"
            aria-label={`${ticker.label}: ${ticker.items.map((i) => i.label).join(", ")}`}
          >
            {bands.map((band) => (
              <div className={`xb-band ${band.cls}`} key={band.cls}>
                <div className="xb-move">
                  {/* The list twice, for a seamless loop; the copy is hidden. */}
                  {[false, true].map((copy) => (
                    <ul key={String(copy)} aria-hidden={copy || undefined}>
                      {band.items.map((item, i) => (
                        <li className={`c${i % 4}`} key={item.label}>
                          {item.label}
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              {BAND_ICONS[item.icon]}
                            </g>
                          </svg>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section className="bb2" aria-labelledby="bb-title">
            <div className="bb2-text">
              {site.availability && (
                <span className="bb2-eye">
                  <i />
                  {site.availability}
                </span>
              )}
              <h2 id="bb-title">
                {banner.heading.lead} <span className="bb2-hl">{banner.heading.mark}</span>
              </h2>
              <ol className="bb2-steps">
                {banner.steps.map((step, i) => (
                  <li key={step}>
                    <b>{String(i + 1).padStart(2, "0")}</b>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="bb2-btns">
                <a className="bb2-btn g" href={banner.start.href}>
                  {banner.start.label}
                  <span>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path
                        d="M4 12 12 4M5.5 4H12v6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
                <a className="bb2-btn o" href={bannerWaHref}>
                  <WaIcon />
                  {banner.whatsapp}
                </a>
              </div>
            </div>
            <div className="bb2-vis">
              <div className="bb2-word" aria-hidden="true">
                {banner.word}
              </div>
              {bannerTeam.map(
                ({ cls, member }) =>
                  member && (
                    <Img
                      key={cls}
                      src={member.cutout.src}
                      className={cls}
                      sizes="(max-width: 860px) 45vw, 300px"
                      alt={member.cutout.alt}
                    />
                  ),
              )}
              <div className="bb2-chip">
                <span>
                  <LogoMark />
                </span>
                <b>{lines(banner.chip)}</b>
              </div>
              <RotatingBadge className="bb2-badge" text={banner.badge} tone="black" radius={72} />
            </div>
          </section>
          <section className="x-contact" id="contact" aria-labelledby="contact-new-title">
            <div className="x-contact-text">
              <h2 className="x-h2" id="contact-new-title">
                {contact.heading}
              </h2>
              <p>{contact.body.replace("{replyWithin}", site.replyWithin)}</p>
              <form className="x-form" id="xform" noValidate>
                <label htmlFor="x-email">{contact.emailLabel}</label>
                <input
                  id="x-email"
                  name="email"
                  type="email"
                  placeholder={contact.emailPlaceholder}
                  autoComplete="email"
                />
                <button type="submit">{contact.submit}</button>
              </form>
              <p className="x-formmsg" id="xformmsg" role="status" />
              <a className="x-wa" href={links.whatsapp}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#wa" />
                </svg>
                {contact.whatsapp}
              </a>
            </div>
            <div className="x-cutout x-mapwrap">
              <div className="x-callout">
                <svg viewBox="0 0 40 40" aria-hidden="true">
                  <path
                    d="M8 8 30 30M30 12v18H12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{lines(contact.callout)}</span>
              </div>
              <svg
                className="x-map"
                viewBox="0 0 311 432"
                role="img"
                aria-label={contact.map.label}
              >
                <defs>
                  <radialGradient id="mg" cx=".45" cy=".42" r=".7">
                    <stop offset="0" stopColor="#D6F7B4" />
                    <stop offset=".45" stopColor="#94DE57" />
                    <stop offset="1" stopColor="#5A9F31" />
                  </radialGradient>
                  <clipPath id="mclip">
                    <path d="M45.3 25.5 L96.8 25.5 L152.6 23.6 L183.6 19.3 L220.8 25.5 L217.7 44.1 L242.5 68.9 L241.3 118.5 L254.9 149.5 L248.7 180.5 L261.1 211.5 L254.9 242.5 L261.1 273.5 L254.9 289.0 L285.9 310.7 L295.2 329.3 L270.4 344.8 L220.8 360.3 L189.8 375.8 L158.8 391.3 L121.6 403.7 L93.7 413.0 L65.8 403.7 L28.6 391.3 L50.3 372.7 L37.9 354.1 L19.3 310.7 L22.4 285.9 L37.9 258.0 L53.4 211.5 L59.6 186.7 L50.3 149.5 L53.4 118.5 L41.0 93.7 L44.1 56.5Z" />
                  </clipPath>
                </defs>
                <path
                  d="M45.3 25.5 L96.8 25.5 L152.6 23.6 L183.6 19.3 L220.8 25.5 L217.7 44.1 L242.5 68.9 L241.3 118.5 L254.9 149.5 L248.7 180.5 L261.1 211.5 L254.9 242.5 L261.1 273.5 L254.9 289.0 L285.9 310.7 L295.2 329.3 L270.4 344.8 L220.8 360.3 L189.8 375.8 L158.8 391.3 L121.6 403.7 L93.7 413.0 L65.8 403.7 L28.6 391.3 L50.3 372.7 L37.9 354.1 L19.3 310.7 L22.4 285.9 L37.9 258.0 L53.4 211.5 L59.6 186.7 L50.3 149.5 L53.4 118.5 L41.0 93.7 L44.1 56.5Z"
                  fill="url(#mg)"
                />
                <g clipPath="url(#mclip)" fill="#fff" opacity=".16">
                  <path d="M150 70 L250 200 L205 200 L160 140 L110 210 L60 210 Z" />
                  <path d="M260 230 L215 390 L190 360 L215 290 L120 300 L140 255 Z" />
                  <path d="M90 250 L180 380 L120 400 L40 400 L70 360 L110 360 L60 290 Z" />
                </g>
                <g transform="translate(209.0 360.3)">
                  <circle r="16" fill="#0D0D0D" opacity=".18" className="x-pulse" />
                  <circle r="8" fill="#0D0D0D" />
                  <circle r="3" fill="#94DE57" />
                  <g transform="translate(14 -34)">
                    <rect width="74" height="28" rx="14" fill="#0D0D0D" />
                    <text
                      x="37"
                      y="18.5"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="500"
                      fill="#fff"
                    >
                      {contact.map.pin}
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
