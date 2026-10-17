import "@/styles/pages/insights.css";
import { Nav } from "@/components/site/Nav";
import { InsightsScripts } from "@/components/site/InsightsScripts";
import { articles, SHOW_NEWSLETTER } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/insights", title: "Insights" });

export default function InsightsPage() {
  return (
    <>
      <InsightsScripts />
      <div className="x x-glow">
        <div className="x-wrap i-top">
          <Nav current="insights" dark />
          <section className="i-board" aria-labelledby="i-title">
            <h1 className="i-h1" id="i-title">
              Afrokan Labs Insights: articles on automation, WhatsApp AI, building and growing
              businesses in Ghana
            </h1>
            <div className="i-words">
              <div className="i-row">
                <span className="i-big" aria-hidden="true">
                  Aut
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
                  mate
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  Workflows
                </span>{" "}
                <span className="i-big" aria-hidden="true">
                  C
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
                  nnect
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  WhatsApp AI
                </span>
              </div>
              <div className="i-row">
                <span className="i-small" aria-hidden="true">
                  Ghana first
                </span>{" "}
                <span className="i-big" aria-hidden="true">
                  Build
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
                  <label htmlFor="iq">Search articles</label>
                  <input id="iq" type="search" placeholder="Search" autoComplete="off" />
                  <button type="submit" aria-label="Search">
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
                  Grow
                </span>
              </div>
              <div className="i-row">
                <span className="i-big" aria-hidden="true">
                  Sh
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
                  ne
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  Case studies
                </span>{" "}
                <span className="i-big" aria-hidden="true">
                  Depl
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
                  y
                </span>{" "}
                <span className="i-small" aria-hidden="true">
                  Guides
                </span>
              </div>
            </div>
            <div className="i-rec-head">
              <h2>Recommended articles</h2>
              <a href="#all">See all</a>
            </div>
            <ul className="i-rec">
              <li className="i-card i-c1">
                <span className="i-cat">Guides · Soon</span>{" "}
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
                <h3>Why your customers would rather WhatsApp you than visit your website</h3>
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
                <span className="i-soon">Coming soon</span>
              </li>
              <li className="i-card i-c2">
                <h3>What a WhatsApp AI assistant can and can&apos;t do for your business</h3>
                <span className="i-cat">AI · Soon</span>{" "}
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
                <span className="i-soon">Coming soon</span>
              </li>
              <li className="i-card i-c3">
                <span className="i-cat">Case study · Soon</span>{" "}
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
                <h3>How we built a document checklist generator for a clearing firm</h3>
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
                <span className="i-soon">Coming soon</span>
              </li>
              <li className="i-card i-c4">
                <h3>From paper files to a simple tracker: a starter guide</h3>
                <span className="i-cat">Workflows · Soon</span>{" "}
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
                <span className="i-soon">Coming soon</span>
              </li>
            </ul>
          </section>
        </div>
        <div className="x-wrap">
          <section className="x-sec" id="all" aria-labelledby="all-title">
            <div className="x-head">
              <h2 className="x-h2" id="all-title">
                All <span className="x-hl">articles</span>
              </h2>
              <p>
                Practical notes on AI, WhatsApp and software for Ghanaian businesses. We&apos;re
                writing these now; they&apos;ll go live one by one.
              </p>
            </div>
            <div className="i-filter" role="group" aria-label="Filter by topic">
              <button type="button" aria-pressed="true" data-cat="all">
                All
              </button>{" "}
              <button type="button" aria-pressed="false" data-cat="Guides">
                Guides
              </button>{" "}
              <button type="button" aria-pressed="false" data-cat="AI">
                AI
              </button>{" "}
              <button type="button" aria-pressed="false" data-cat="Workflows">
                Workflows
              </button>{" "}
              <button type="button" aria-pressed="false" data-cat="Case study">
                Case studies
              </button>
            </div>
            <ul className="i-list" id="ilist">
              {articles.map((a) => (
                <li key={a.title} className="i-item" data-cat={a.category}>
                  <span className="i-k">{a.category}</span>
                  <div>
                    <h3>{a.title}</h3>
                    <p>{a.summary}</p>
                  </div>
                  <span className="i-st">Coming soon</span>
                </li>
              ))}
            </ul>
            <p className="i-empty" id="iempty" hidden>
              No articles match that search yet. Try another word, or{" "}
              <a href="/contact" style={{ color: "var(--x-lime)" }}>
                ask us directly
              </a>
              .
            </p>
          </section>
          {SHOW_NEWSLETTER && (
            <section className="i-news" aria-labelledby="news-title">
              <div>
                <h2 id="news-title">Get new articles when they&apos;re published</h2>
                <p>
                  One short email when something new goes live. No spam, and you can unsubscribe any
                  time.
                </p>
              </div>
              <form id="inews" noValidate>
                <label htmlFor="inews-email">Your email</label>
                <input
                  id="inews-email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <button type="submit">Notify me</button>
              </form>
              <p className="i-msg" id="inewsmsg" role="status" />
            </section>
          )}
        </div>
      </div>
    </>
  );
}
