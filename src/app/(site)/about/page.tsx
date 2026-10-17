import "@/styles/pages/about.css";
import { Fragment } from "react";
import { CtaBox } from "@/components/site/CtaBox";
import { Img } from "@/components/site/Img";
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
          <section className="x-sec" aria-labelledby="story-title">
            <div className="x-story">
              <div>
                <span className="x-label" id="story-title">
                  {story.label}
                </span>
              </div>
              <div>
                <p className="x-statement">
                  {story.lead} <span className="x-dim">{story.dim}</span> {story.then}{" "}
                  <span className="x-chip">{story.chip}</span>
                </p>
                <dl className="x-facts">
                  {story.facts.map((fact) => (
                    <div className="x-fact" key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
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
          <section className="x-sec" aria-labelledby="road-title">
            <div className="x-head">
              <h2 className="x-h2" id="road-title">
                {road.heading.lead}
                <span className="x-hl">{road.heading.mark}</span>
              </h2>
              <p>{road.body}</p>
            </div>
            <ol className="x-road">
              {road.stops.map((stop, i) => (
                <li className={i === 0 ? "x-stop now" : "x-stop"} key={stop.tag}>
                  <span className="x-tag">{stop.tag}</span>
                  <h3>{stop.title}</h3>
                  <p>{stop.body}</p>
                </li>
              ))}
            </ol>
          </section>
          <CtaBox copy={getSite().ctaBox} />
        </div>
      </div>
    </>
  );
}
