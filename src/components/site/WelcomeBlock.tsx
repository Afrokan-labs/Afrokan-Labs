import { Fragment } from "react";
import type { Home, Site } from "@/content/schema";
import { CurveArrow, Eyebrow } from "./Eyebrow";
import { Img } from "./Img";

const ICONS: Record<Site["industries"][number]["icon"], React.ReactNode> = {
  truck: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  bag: <path d="M4 8h16l-1 12H5zM8 8a4 4 0 0 1 8 0" />,
  cap: <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />,
  cross: <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" />,
  house: <path d="M3 11l9-7 9 7M5 10v10h14V10" />,
  dish: <path d="M4 14h16M6 14a6 6 0 0 1 12 0M12 6V4M3 18h18" />,
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
    </>
  ),
};

function Industry({ item }: { item: Site["industries"][number] }) {
  return (
    <span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {ICONS[item.icon]}
        </g>
      </svg>
      {item.label}
    </span>
  );
}

/**
 * Home "Welcome" block (site update 1, reference .ae-intro, .ae-split and
 * .ae-strip): intro headline, the dark "About the team" card beside the CEO
 * photo with two stat cards, then the industry marquee.
 */
type Props = { copy: Home["welcome"]; industries: Site["industries"] };

export function WelcomeBlock({ copy, industries }: Props) {
  const { team, mini, photo } = copy;
  return (
    <>
      <section className="ae-intro" aria-labelledby="ae-title">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <h2 className="ae-h" id="ae-title">
          {copy.headline.lead}{" "}
          <span className="ae-tile" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M6 6c0 7 4 11 12 11M18 17l-4-4M18 17l-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          <span className="g">{copy.headline.tail}</span>
        </h2>
        <p>{copy.intro}</p>
      </section>
      <div className="ae-split">
        <div className="ae-dark">
          <Eyebrow>{team.eyebrow}</Eyebrow>
          <h3>
            {team.heading[0]} <br />
            <span>{team.heading[1]}</span>
          </h3>
          <p>{team.body}</p>
          <div className="ae-btns">
            <a className="ae-btn g" href={team.buttons[0].href}>
              {team.buttons[0].label} <CurveArrow />
            </a>{" "}
            <a className="ae-btn w" href={team.buttons[1].href}>
              {team.buttons[1].label} <CurveArrow />
            </a>
          </div>
          <a className="ae-mini" href={mini.cta.href}>
            <Img src={mini.image.src} alt={mini.image.alt} sizes="84px" />
            <span>
              <b>{mini.title}</b>
              <small>
                {mini.cta.label} <CurveArrow />
              </small>
            </span>
          </a>
        </div>
        <div className="ae-photo">
          <Img src={photo.src} alt={photo.alt} sizes="(max-width: 860px) 100vw, 50vw" />
          <div className="ae-stats">
            {copy.stats.map((stat) => (
              <div className="ae-stat" key={stat.label}>
                <b>
                  {stat.value}
                  {stat.unit && <i>{stat.unit}</i>}
                </b>
                <span>{stat.label}</span>
                <em>{stat.note}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ae-strip" aria-label={copy.stripLabel}>
        <div className="ae-strip-in">
          {industries.map((item) => (
            <Fragment key={item.label}>
              {" "}
              <Industry item={item} />
            </Fragment>
          ))}
          {/* The copy that makes the loop seamless; screen readers hear the list once. */}
          <span aria-hidden="true" style={{ display: "contents" }}>
            {industries.map((item) => (
              <Industry key={item.label} item={item} />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
