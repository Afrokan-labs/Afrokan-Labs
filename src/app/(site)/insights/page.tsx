import "@/styles/pages/insights.css";
import { Fragment } from "react";
import { Nav } from "@/components/site/Nav";
import { InsightsScripts } from "@/components/site/InsightsScripts";
import { getArticles, getInsights } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/insights", ...getInsights().meta });

export default function InsightsPage() {
  const { heading, board, search, recommended, comingSoon, all, empty, newsletter } = getInsights();
  const articles = getArticles();
  const rec = articles.slice(0, 4);
  const cat = (i: number) => `${rec[i].category} · ${recommended.soon}`;
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
            <ul className="i-rec">
              <li className="i-card i-c1">
                <span className="i-cat">{cat(0)}</span>{" "}
                <svg
                  className="i-art"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="d1" cx=".4" cy=".35" r=".7">
                      <stop offset="0" stopColor="#CDF2A8" />
                      <stop offset=".6" stopColor="#94DE57" />
                      <stop offset="1" stopColor="#66AE34" />
                    </radialGradient>
                  </defs>
                  <circle cx="118" cy="40" r="78" fill="url(#d1)" />
                  <circle cx="100" cy="30" r="40" fill="#fff" />
                </svg>
                <h3>{rec[0].title}</h3>
                <span className="i-go">
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
                </span>
                <span className="i-soon">{comingSoon}</span>
              </li>
              <li className="i-card i-c2">
                <h3>{rec[1].title}</h3>
                <span className="i-cat">{cat(1)}</span>{" "}
                <svg
                  className="i-art"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient id="d2" cx=".35" cy=".3" r=".8">
                      <stop offset="0" stopColor="#94DE57" />
                      <stop offset="1" stopColor="#367520" />
                    </radialGradient>
                  </defs>
                  <circle cx="120" cy="150" r="46" fill="url(#d2)" />
                  <circle cx="160" cy="118" r="24" fill="url(#d2)" />
                  <circle cx="84" cy="176" r="22" fill="url(#d2)" />
                  <circle cx="150" cy="176" r="14" fill="url(#d2)" />
                  <circle cx="66" cy="140" r="6" fill="#367520" />
                </svg>{" "}
                <span className="i-go">
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
                </span>
                <span className="i-soon">{comingSoon}</span>
              </li>
              <li className="i-card i-c3">
                <span className="i-cat">{cat(2)}</span>{" "}
                <svg
                  className="i-art"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="d3" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#4a4d52" />
                      <stop offset="1" stopColor="#26282B" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="40"
                    y="-30"
                    width="36"
                    height="150"
                    rx="18"
                    transform="rotate(30 58 45)"
                    fill="url(#d3)"
                  />
                  <rect
                    x="110"
                    y="-20"
                    width="44"
                    height="130"
                    rx="22"
                    transform="rotate(30 132 45)"
                    fill="url(#d3)"
                  />
                </svg>
                <h3>{rec[2].title}</h3>
                <span className="i-go">
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
                </span>
                <span className="i-soon">{comingSoon}</span>
              </li>
              <li className="i-card i-c4">
                <h3>{rec[3].title}</h3>
                <span className="i-cat">{cat(3)}</span>{" "}
                <svg
                  className="i-art"
                  viewBox="0 0 200 200"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden="true"
                >
                  <path
                    d="M20 210V160a16 16 0 0 1 32 0v20a16 16 0 0 0 32 0v-20a16 16 0 0 1 32 0v20a16 16 0 0 0 32 0v-20a16 16 0 0 1 32 0v50"
                    fill="none"
                    stroke="#fff"
                    strokeOpacity=".55"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                </svg>{" "}
                <span className="i-go">
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
                </span>
                <span className="i-soon">{comingSoon}</span>
              </li>
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
