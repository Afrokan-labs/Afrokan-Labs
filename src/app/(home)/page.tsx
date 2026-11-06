import "@/styles/pages/home.css";
import { Fragment } from "react";
import { ClientQuote } from "@/components/site/ClientQuote";
import { Img } from "@/components/site/Img";
import { LogoMark, WaIcon } from "@/components/site/LogoMark";
import { Eyebrow } from "@/components/site/Eyebrow";
import { HomeScripts } from "@/components/site/HomeScripts";
import { HowWeWork } from "@/components/site/HowWeWork";
import { Nav } from "@/components/site/Nav";
import { RotatingBadge } from "@/components/site/RotatingBadge";
import { WelcomeBlock } from "@/components/site/WelcomeBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import type { Site } from "@/content/schema";
import {
  clientDisplayName,
  getHome,
  getLeads,
  getMembers,
  getProjects,
  getSite,
  getStatusLabels,
  getTestimonials,
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
  const leads = getLeads();
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
  // Featured work (architecture §4): omitted without a featured project, and the
  // client's real name only when approved.
  const project = getProjects().find((p) => p.featured);
  const testimonials = getTestimonials();
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
                        <Fragment key={kind}>
                          {" "}
                          <span>{work.builtLabels[kind]}</span>
                        </Fragment>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          )}
          <section className="x-words" aria-label={words.sectionLabel}>
            <svg className="x-wordline" viewBox="0 0 1000 104" role="img" aria-label={words.label}>
              <text
                className="x-w"
                x="0"
                y="82"
                fontSize="78"
                textLength="282"
                lengthAdjust="spacingAndGlyphs"
              >
                {words.items[0]}
              </text>
              <path
                fill="var(--x-lime)"
                transform="translate(297 34) scale(.3)"
                d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"
              />
              <text
                className="x-w"
                x="342"
                y="82"
                fontSize="78"
                textLength="246"
                lengthAdjust="spacingAndGlyphs"
              >
                {words.items[1]}
              </text>
              <path
                fill="var(--x-lime)"
                transform="translate(603 34) scale(.3)"
                d="M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z"
              />
              <text
                className="x-w"
                x="648"
                y="82"
                fontSize="78"
                textLength="352"
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
          <HowWeWork process={process} />
          <section className="x-crew" id="about" aria-labelledby="team-title">
            <div className="x-crew-head">
              <h2 className="x-crew-h" id="team-title">
                <b>{team.heading.first}</b>{" "}
                <span>
                  {team.heading.middle}{" "}
                  <span className="x-lime" style={{ display: "inline" }}>
                    {team.heading.brand}
                  </span>
                </span>{" "}
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
            <div className="x-leads">
              <p className="x-leads-h">{team.leads.label}</p>
              <ul className="x-leads-row">
                {leads.map((lead, i) => (
                  <li className="x-lead" key={lead.role}>
                    <span className={i === 0 ? "x-lead-pic" : "x-lead-pic p2"}>
                      <Img
                        src={lead.cutout.src}
                        alt={`${lead.cutout.alt} at ${site.name}`}
                        sizes="72px"
                      />
                    </span>
                    <span className="x-lead-t">
                      <b>{lead.name.join(" ")}</b> <span>{lead.role}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <a className="x-leads-more" href={team.leads.more.href}>
                {team.leads.more.label}
              </a>
            </div>
          </section>
          {/* Real, approved quotes only (testimonials.ts); omitted while there are none. */}
          {testimonials.items[0] && (
            <ClientQuote label={testimonials.label} quote={testimonials.items[0]} />
          )}
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
                </a>{" "}
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
