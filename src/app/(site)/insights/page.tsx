import "@/styles/pages/insights.css";
import { Fragment } from "react";
import { Nav } from "@/components/site/Nav";
import { InsightsScripts } from "@/components/site/InsightsScripts";
import { PosterCard } from "@/components/site/PosterCard";
import { getArticles, getInsights, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/insights", ...getInsights().meta });

export default function InsightsPage() {
  const { heading, board, search, recommended, comingSoon, all, empty, newsletter } = getInsights();
  const articles = getArticles();
  const site = getSite();
  return (
    <>
      <InsightsScripts preview={newsletter.preview} invalid={newsletter.invalid} />
      <div className="x x-glow">
        <div className="x-wrap i-top">
          <Nav current="insights" dark />
          <section className="i-board" aria-labelledby="i-title">
            <h1 className="i-h1" id="i-title">
              {heading}
            </h1>
            <div className="i-words">
              <div className="i-row">
                <span className="i-big" aria-hidden="true">
                  {board.automate[0]}
                  <span className="i-tile">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="none"
                        stroke="#94DE57"
                        strokeWidth="2.2"
                        d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                      />
                    </svg>
                  </span>
                  {board.automate[1]}
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  {board.small[0]}
                </span>{" "}
                <span className="i-big" aria-hidden="true">
                  {board.connect[0]}
                  <span className="i-glyph">
                    <svg viewBox="0 0 30 36">
                      <path
                        d="M15 4C8 4 3 9 3 15.5 3 22 8 27 15 27h1l7 6v-7.5c3.6-2 6-5.6 6-10C29 9 23 4 15 4z"
                        fill="none"
                        stroke="#94DE57"
                        strokeWidth="3.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {board.connect[1]}
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  {board.small[1]}
                </span>
              </div>
              <div className="i-row">
                <span className="i-small" aria-hidden="true">
                  {board.small[2]}
                </span>{" "}
                <span className="i-big" aria-hidden="true">
                  {board.build}
                </span>
                <form className="i-search" id="isearch" role="search">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M16.5 16.5 21 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>{" "}
                  <label htmlFor="iq">{search.label}</label>
                  <input
                    id="iq"
                    type="search"
                    placeholder={search.placeholder}
                    autoComplete="off"
                  />
                  <button type="submit" aria-label={search.submit}>
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
                  </button>
                </form>
                <span className="i-big" aria-hidden="true">
                  {board.grow}
                </span>
              </div>
              <div className="i-row">
                <span className="i-big" aria-hidden="true">
                  {board.shine[0]}
                  <span className="i-glyph" style={{ width: ".5em" }}>
                    <svg viewBox="0 0 20 36">
                      <path
                        d="M10 3a8 8 0 0 0-4.6 14.5c1.1.8 1.6 2 1.6 3.2V24h6v-3.3c0-1.2.5-2.4 1.6-3.2A8 8 0 0 0 10 3zM7 28h6M8 32h4"
                        fill="none"
                        stroke="#E5DED3"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {board.shine[1]}
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  {board.small[3]}
                </span>{" "}
                <span className="i-big" aria-hidden="true">
                  {board.deploy[0]}
                  <span className="i-tile r">
                    <svg viewBox="0 0 24 24">
                      <path
                        d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"
                        fill="none"
                        stroke="#94DE57"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {board.deploy[1]}
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  {board.small[4]}
                </span>
              </div>
            </div>
            <div className="i-rec-head">
              <h2>{recommended.heading}</h2>
              <a href={recommended.seeAll.href}>{recommended.seeAll.label}</a>
            </div>
            <ul className="pc-grid pc-arts">
              {articles.flatMap((a) =>
                a.poster
                  ? [
                      <PosterCard
                        key={a.title}
                        poster={a.poster}
                        layout="articles"
                        href={a.poster.href ?? recommended.seeAll.href}
                        name={site.name}
                        role={all.categories[a.category]}
                        pill={a.poster.href ? recommended.read : comingSoon}
                      />,
                    ]
                  : [],
              )}
            </ul>
          </section>
        </div>
        <div className="x-wrap">
          <section className="x-sec" id="all" aria-labelledby="all-title">
            <div className="x-head">
              <h2 className="x-h2" id="all-title">
                {all.heading.lead}
                <span className="x-hl">{all.heading.mark}</span>
              </h2>
              <p>{all.body}</p>
            </div>
            <div className="i-filter" role="group" aria-label={all.filterLabel}>
              <button type="button" aria-pressed="true" data-cat="all">
                {all.allLabel}
              </button>
              {Object.entries(all.categories).map(([key, label]) => (
                <Fragment key={key}>
                  {" "}
                  <button type="button" aria-pressed="false" data-cat={key}>
                    {label}
                  </button>
                </Fragment>
              ))}
            </div>
            <ul className="i-list" id="ilist">
              {articles.map((a) => (
                <li key={a.title} className="i-item" data-cat={a.category}>
                  <span className="i-k">{a.category}</span>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.summary}</p>
                  </div>
                  <span className="i-st">{comingSoon}</span>
                </li>
              ))}
            </ul>
            <p className="i-empty" id="iempty" hidden>
              {empty.lead}
              <a href={empty.link.href} style={{ color: "var(--x-lime)" }}>
                {empty.link.label}
              </a>
              {empty.tail}
            </p>
          </section>
          {newsletter.enabled && (
            <section className="i-news" aria-labelledby="news-title">
              <div>
                <h2 id="news-title">{newsletter.heading}</h2>
                <p>{newsletter.body}</p>
              </div>
              <form id="inews" noValidate>
                <label htmlFor="inews-email">{newsletter.label}</label>
                <input
                  id="inews-email"
                  type="email"
                  placeholder={newsletter.placeholder}
                  autoComplete="email"
                />
                <button type="submit">{newsletter.submit}</button>
              </form>
              <p className="i-msg" id="inewsmsg" role="status" />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
