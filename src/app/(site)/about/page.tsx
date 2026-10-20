import "@/styles/pages/about.css";
import { Fragment } from "react";
import { CtaBox } from "@/components/site/CtaBox";
import { Img } from "@/components/site/Img";
import { LogoMark } from "@/components/site/LogoMark";
import { Members } from "@/components/site/Members";
import { Nav } from "@/components/site/Nav";
import { Philosophy } from "@/components/site/Philosophy";
import type { About } from "@/content/schema";
import { getAbout, getMembers, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/about", ...getAbout().meta });

/** The hero collage, member by member (reference): frame shape, name colour, and whether the role sits above. */
const COLLAGE = [
  { pic: "x-pic-circle", name: "x-n-lime up", roleFirst: true },
  { pic: "x-pic-arch", name: "x-n-ink", roleFirst: false },
  { pic: "x-pic-blob", name: "x-n-sand up", roleFirst: true },
];

const VALUE_ICONS: Record<About["values"]["items"][number]["icon"], React.ReactNode> = {
  whatsapp: <use href="#wa" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9.5" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15 14.2c3 0 5.5 1.6 5.5 4.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </>
  ),
  document: (
    <path
      d="M5 4h10l4 4v12H5z M15 4v4h4 M8 12h8M8 16h5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  shield: (
    <path
      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M8.5 12l2.5 2.5 4.5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
};

export default function AboutPage() {
  const { hero, pile, proof, story, members, philosophy, values, road } = getAbout();
  const team = getMembers();
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap x-hero-wrap">
          <div className="x-hero" id="top">
            <Nav current="about" />
            <div className="x-hero-grid">
              <div>
                <span className="x-eyebrow">{hero.eyebrow}</span>
                <h1 className="x-h1">
                  <span className="x-line">
                    {hero.heading.first} <span className="x-sh x-sh-dot" aria-hidden="true" />
                    <span className="x-sh x-sh-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 14">
                        <path
                          d="M1 7h20M15 1l6 6-6 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>{" "}
                  <span className="x-line">
                    <span className="x-sh x-sh-ring" aria-hidden="true" />
                    <span className="x-sh x-sh-pill" aria-hidden="true" /> {hero.heading.second}
                  </span>{" "}
                  <span className="x-line">
                    {hero.heading.third.lead}
                    <span className="x-mark">{hero.heading.third.mark}</span>
                  </span>
                </h1>
                <div className="x-intro">
                  <a className="x-btn x-btn-ink" href={hero.workLink.href}>
                    {hero.workLink.label}
                  </a>
                  <p>{hero.intro}</p>
                </div>
              </div>
              <div className="x-collage" aria-label={hero.collageLabel}>
                {team.slice(0, COLLAGE.length).map((m, i) => {
                  const look = COLLAGE[i];
                  const role = <span className="x-role">{m.abbr}</span>;
                  const name = <span className={`x-name ${look.name}`}>{m.name[0]}</span>;
                  return (
                    <div className="x-mate" key={m.abbr}>
                      {look.roleFirst ? role : name}
                      <div className={`x-pic ${look.pic}`}>
                        <Img
                          priority
                          sizes="(max-width: 760px) 50vw, 320px"
                          src={m.photo.src}
                          alt={m.photo.alt}
                        />
                      </div>
                      {look.roleFirst ? name : role}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="x-lower">
              <div className="x-pile" aria-label={pile.label}>
                <svg className="x-burst" viewBox="0 0 100 100" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M50 0 57 33 85 15 67 43 100 50 67 57 85 85 57 67 50 100 43 67 15 85 33 57 0 50 33 43 15 15 43 33Z"
                  />
                </svg>{" "}
                {pile.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="x-proof">
                <svg className="x-twinkle" viewBox="0 0 40 40" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M16 4c1 10 4 13 14 14-10 1-13 4-14 14-1-10-4-13-14-14 10-1 13-4 14-14Z"
                  />
                  <path
                    fill="currentColor"
                    d="M33 0c.4 3.5 1.5 4.6 5 5-3.5.4-4.6 1.5-5 5-.4-3.5-1.5-4.6-5-5 3.5-.4 4.6-1.5 5-5Z"
                  />
                </svg>{" "}
                <svg className="x-curl" viewBox="0 0 240 120" aria-hidden="true">
                  <path
                    d="M236 8C200 8 170 30 150 52c-14 16-34 34-50 30-14-4-12-26 2-28 18-2 16 30-4 44-22 15-60 12-80 8M20 106l-6-10M20 106l-12 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <p>{proof.caption}</p>
                <div className="x-proof-pill">
                  <b>{proof.value}</b>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>
                  <span>
                    {proof.lines.map((line, i) => (
                      <Fragment key={i}>
                        {i > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="x-wrap">
          <section className="x-sec st" aria-labelledby="story-title">
            <div className="st-top">
              <span className="x-label" id="story-title">
                {story.label}
              </span>
              <span className="st-from">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g {...LINE}>
                    <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />
                  </g>
                </svg>
                {story.from}
              </span>
            </div>
            <p className="st-lead">{story.lead}</p>
            <div className="st-flow">
              <div className="st-old">
                <span className="st-k">{story.old.label}</span>
                <ul>
                  {story.old.items.map((item) => (
                    <li key={item.label}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <g {...LINE}>{STORY_ICONS[item.icon]}</g>
                      </svg>
                      {item.label}
                    </li>
                  ))}
                </ul>
                <p>{story.old.tail}</p>
              </div>
              <span className="st-arrow" aria-hidden="true">
                <svg viewBox="0 0 80 24">
                  <path
                    d="M2 12h70M62 4l10 8-10 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="st-new">
                <span className="st-mark" aria-hidden="true">
                  <LogoMark />
                </span>
                <span className="st-k">{story.new.label}</span>
                <p className="st-big">
                  {story.new.big.map((line, i) => (
                    <Fragment key={line}>
                      {i > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </div>
            </div>
            <ul className="st-facts">
              {story.facts.map((fact) => (
                <li className="st-fact" key={fact.label}>
                  <span className="st-ic">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <g {...LINE}>{STORY_ICONS[fact.icon]}</g>
                    </svg>
                  </span>
                  <span className="st-dt">{fact.label}</span>{" "}
                  <span className="st-dd">{fact.value}</span>
                  {fact.chips && (
                    <ul className="st-mini">
                      {fact.chips.map((chip) => (
                        <li key={chip.label}>
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <g {...LINE}>{STORY_ICONS[chip.icon]}</g>
                          </svg>
                          {chip.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </section>
          <Members title={members.title} members={team} />
          <Philosophy copy={philosophy} />
          <section className="x-sec" aria-labelledby="values-title">
            <div className="x-head">
              <h2 className="x-h2" id="values-title">
                {values.heading.lead}
                <span className="x-hl">{values.heading.mark}</span>
              </h2>
              <p>{values.body}</p>
            </div>
            <ul className="x-values">
              {values.items.map((item) => (
                <li className="x-value" key={item.title}>
                  <span className="x-vi">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {VALUE_ICONS[item.icon]}
                    </svg>
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <section className="x-sec rd" aria-labelledby="road-title">
            <div className="x-head">
              <h2 className="x-h2" id="road-title">
                {road.heading.lead}
                <span className="x-hl">{road.heading.mark}</span>
              </h2>
              <p>{road.body}</p>
            </div>
            <div className="rd-panel">
              <svg
                className="rd-line"
                viewBox="0 0 1000 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="0" y1="10" x2="1000" y2="10" className="bg" />
                <line x1="0" y1="10" x2="1000" y2="10" className="fg" />
              </svg>
              <ol className="rd-stops">
                {road.stops.map((stop, i) => (
                  <li className={i === 0 ? "rd-stop now" : "rd-stop"} key={stop.tag}>
                    <div className="rd-vis" aria-hidden="true">
                      {/* Reach grows by a ring a stop: 2, 3, then 4. */}
                      <svg viewBox="0 0 120 120">
                        {RING_RADII.slice(0, i + 2).map((r) => (
                          <circle cx="60" cy="60" r={r} key={r} />
                        ))}
                      </svg>
                      <span className="rd-dot">{i === 0 && <LogoMark />}</span>
                      <span className="rd-place">{stop.place}</span>
                    </div>
                    <span className="rd-tag">
                      {stop.tag}
                      {i === 0 && (
                        <>
                          {" "}
                          <i>{road.here}</i>
                        </>
                      )}
                    </span>
                    <span className="rd-k">{stop.kicker}</span>
                    <h3>{stop.title}</h3>
                    <p>{stop.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <CtaBox copy={getSite().ctaBox} />
        </div>
      </div>
    </>
  );
}

/** The story's line icons (24-unit box, drawn with LINE). */
const LINE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const STORY_ICONS = {
  chat: (
    <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
  ),
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  paper: <path d="M6 3h9l4 4v14H6zM15 3v4h4M9 12h7M9 16h5" />,
  pin: (
    <>
      <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  code: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  browser: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
    </>
  ),
  checklist: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 9l1.5 1.5L12 8M8 14l1.5 1.5L12 13" />
    </>
  ),
};

/** The roadmap's dashed rings, inner to outer. */
const RING_RADII = [12, 26, 40, 54];
