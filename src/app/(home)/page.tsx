import "@/styles/pages/home.css";
import { Img } from "@/components/site/Img";
import { Eyebrow } from "@/components/site/Eyebrow";
import { HomeScripts } from "@/components/site/HomeScripts";
import { Nav } from "@/components/site/Nav";
import { Reviews } from "@/components/site/Reviews";
import { WelcomeBlock } from "@/components/site/WelcomeBlock";
import { getReviews, getSite } from "@/lib/content";
import { getImage, imageUrl } from "@/lib/images";
import { getLinks } from "@/lib/links";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/",
  title: "Afrokan Labs: AI and software studio in Accra",
});

/** Reviews with their pipeline image URLs (the client component can't read the manifest). */
function reviewItems() {
  return getReviews().map((r) => {
    const src = `assets/images/${r.image}`;
    const { width, height } = getImage(src);
    return { ...r, big: imageUrl(src, 1000), thumb: imageUrl(src, 400), width, height };
  });
}

export default function HomePage() {
  const links = getLinks();
  return (
    <>
      <HomeScripts />
      <div className="x x-glow">
        <div className="x-wrap x-hero-wrap">
          <div className="x-hero" id="top">
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
                Software built for how Ghanaian businesses actually work
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
                <p className="x-lede">
                  WhatsApp AI assistants, workflow tools and web platforms for growing businesses.
                  Tell us what slows your team down and we&apos;ll build around it.
                </p>
                <a className="x-ghost" href="#work">
                  See our work
                </a>
              </div>
              <div className="x-photo">
                <div className="x-circle" aria-hidden="true" />
                <div
                  className="x-phone"
                  aria-label="Example: an AI assistant answering a customer on WhatsApp"
                  role="img"
                >
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
                        <b>Your Business</b>
                        <small id="wastatus">online</small>
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
                  <a className="x-go" href="#contact">
                    Start your project
                  </a>{" "}
                  <a href={links.whatsapp} {...links.whatsappAttrs}>
                    Chat on WhatsApp
                  </a>
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
                <span className="x-big">Ghana-first</span>{" "}
                <span className="x-small">AI &amp; software studio, Accra</span>
              </div>
            </div>
            <div style={{ height: "clamp(0px,1vw,8px)" }} />
          </div>
          <div className="x-stats" role="list" aria-label="Quick facts">
            <div className="x-stat" role="listitem">
              <b>
                3<i>+</i>
              </b>
              <span>Systems delivered</span>
            </div>
            <div className="x-stat" role="listitem">
              <b>24/7</b>
              <span>WhatsApp replies</span>
            </div>
            <div className="x-stat" role="listitem">
              <b>
                100
                <i>%</i>
              </b>
              <span>Mobile-first builds</span>
            </div>
            <div className="x-stat" role="listitem">
              <b>
                4<i>-step</i>
              </b>
              <span>Clear delivery process</span>
            </div>
          </div>
          <WelcomeBlock industries={getSite().industries} />
          <section className="x-ideas" id="ideas" aria-labelledby="ideas-title">
            <div className="x-ideas-head">
              <Eyebrow block>Who we are</Eyebrow>
              <h2 className="x-h2" id="ideas-title">
                Turning ideas into
                <br />
                working software
              </h2>
              <p>
                We may be a small team, but we scope, build and support every project ourselves.
                Working hand-in-hand with you, we turn the problems that slow your business down
                into tools your staff and customers actually use.
              </p>
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
                  <Img
                    src="home-ideas-team.webp"
                    className="x-img"
                    alt="Franklin, Kwabena and Samuel of Afrokan Labs working together at laptops"
                  />
                </div>
                <div className="x-banner">
                  <span>
                    An AI &amp; software
                    <br />
                    studio in Accra
                  </span>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="x-shot x-shot-tall">
                <Img src="home-ideas-thinker.webp" className="x-img" alt="" />
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
              <span className="o-eyebrow">One studio, every piece</span>
              <h2 className="x-h2 o-h2" id="orbit-title">
                Everything your business runs on, <span className="x-hl">working together</span>
              </h2>
              <p>
                WhatsApp assistants, websites, workflow tools and the systems behind them. We design
                each piece to fit the others, so moving from manual to automated feels like one
                smooth change.
              </p>
              <a className="o-btn" href="/services">
                Explore our services
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
                <div className="o-sl">
                  <span>Manual</span>
                  <i>
                    <b style={{ "--p": ".15" } as React.CSSProperties} />
                  </i>
                  <span>Automated</span>
                </div>
                <div className="o-sl">
                  <span>Slow</span>
                  <i>
                    <b style={{ "--p": ".55" } as React.CSSProperties} />
                  </i>
                  <span>Instant</span>
                </div>
                <div className="o-sl">
                  <span>Paper</span>
                  <i>
                    <b style={{ "--p": ".1" } as React.CSSProperties} />
                  </i>
                  <span>Digital</span>
                </div>
              </div>
              <div className="o-ring" id="oring" />
            </div>
          </section>
          <section className="sv" id="services-new" aria-labelledby="sv-title">
            <div className="sv-top">
              <span>
                Our services:
                <br />
                what we build
              </span>
              <h2 id="sv-title" className="sv-h2">
                Four ways we help
                <br />
                your business run
              </h2>
              <span className="sv-r">
                A short guide
                <br />
                for new clients
              </span>
            </div>
            <ol className="sv-list">
              <li className="sv-row boxed">
                <a className="sv-link" href="/services#svc-1">
                  <span className="sv-num" aria-hidden="true">
                    01
                  </span>{" "}
                  <span className="sv-text">
                    <span className="sv-title">
                      <span>WhatsApp</span>
                      <span className="sv-l2">
                        <small>00 - 1&nbsp;&nbsp;&nbsp;&nbsp;Service</small>
                        AI
                      </span>
                      <span>assistants</span>
                    </span>{" "}
                    <span className="sv-desc">
                      Answers customer questions on your WhatsApp Business number from your own
                      documents and prices, any time of day.
                    </span>
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
              <li className="sv-row open">
                <a className="sv-link" href="/services#svc-2">
                  <span className="sv-num" aria-hidden="true">
                    02
                  </span>{" "}
                  <span className="sv-text">
                    <span className="sv-title">
                      <span>Web</span>
                      <span className="sv-l2">
                        <small>00 - 2&nbsp;&nbsp;&nbsp;&nbsp;Service</small>
                        platforms
                      </span>
                      <span>that sell</span>
                    </span>{" "}
                    <span className="sv-desc">
                      Fast, mobile-first websites and web apps that explain what you do and turn
                      visitors into WhatsApp conversations.
                    </span>
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
              <li className="sv-row boxed">
                <a className="sv-link" href="/services#svc-3">
                  <span className="sv-num" aria-hidden="true">
                    03
                  </span>{" "}
                  <span className="sv-text">
                    <span className="sv-title">
                      <span>Workflow</span>
                      <span className="sv-l2">
                        <small>00 - 3&nbsp;&nbsp;&nbsp;&nbsp;Service</small>
                        tools
                      </span>
                      <span>for your team</span>
                    </span>{" "}
                    <span className="sv-desc">
                      Checklists, trackers and forms that replace paper files and scattered
                      spreadsheets, built around how your team already works.
                    </span>
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
              <li className="sv-row open">
                <a className="sv-link" href="/services#svc-4">
                  <span className="sv-num" aria-hidden="true">
                    04
                  </span>{" "}
                  <span className="sv-text">
                    <span className="sv-title">
                      <span>Backend</span>
                      <span className="sv-l2">
                        <small>00 - 4&nbsp;&nbsp;&nbsp;&nbsp;Service</small>
                        systems
                      </span>
                      <span>that connect</span>
                    </span>{" "}
                    <span className="sv-desc">
                      The databases, dashboards and integrations that keep your website, WhatsApp
                      and internal tools working together.
                    </span>
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
            </ol>
            <div className="sv-foot">
              <a className="hw-btn" href="/services">
                See every service in detail
              </a>
            </div>
          </section>
          <section className="x-svc x-work" id="work" aria-labelledby="work-new-title">
            <div className="x-wm" aria-hidden="true">
              <span>Delivered</span>
              <span>Delivered</span>
              <span>Delivered</span>
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
              <p>Three tools, one delivery</p>
            </div>
            <div className="x-tab" aria-hidden="true">
              <span>CASE STUDY</span>
            </div>
            <div className="x-work-grid">
              <div className="x-work-main">
                <h2 className="x-h2" id="work-new-title">
                  Featured <span className="x-hl">Work</span>
                </h2>
                <h3>Helping a clearing and forwarding firm answer customers faster</h3>
                <p>
                  Customers kept calling the office with the same questions about clearance
                  documents, which pulled staff away from their work. We built a WhatsApp assistant
                  that answers those questions from the firm&apos;s own documents, a checklist
                  generator that tells customers exactly which documents they need, and a website
                  that brings in enquiries.
                </p>
                <div className="x-btns">
                  <a className="x-pill x-pill-lime" href="/work#cases">
                    Read the full case study
                  </a>{" "}
                  <a className="x-pill x-pill-line" href={links.whatsapp} {...links.whatsappAttrs}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <use href="#wa" />
                    </svg>
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
              <dl className="x-facts">
                <div className="x-fact x-wide">
                  <dt>Client</dt>
                  <dd>ESE Logistic Solution Limited</dd>
                </div>
                <div className="x-fact">
                  <dt>Industry</dt>
                  <dd>Clearing and forwarding</dd>
                </div>
                <div className="x-fact">
                  <dt>Status</dt>
                  <dd className="x-live">Delivered</dd>
                </div>
                <div className="x-fact x-wide">
                  <dt>Built</dt>
                  <dd className="x-tags">
                    <span>WhatsApp AI assistant</span>
                    <span>Internal tool</span>
                    <span>Website</span>
                  </dd>
                </div>
              </dl>
            </div>
          </section>
          <section className="x-words" aria-label="Innovate, inspire, create">
            <svg
              className="x-wordline"
              viewBox="0 0 1000 104"
              role="img"
              aria-label="Innovate. Inspire. Create."
            >
              <text
                className="x-w"
                x="0"
                y="82"
                fontSize="78"
                textLength="300"
                lengthAdjust="spacingAndGlyphs"
              >
                Innovate
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
                Inspire
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
                Create
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
              <Eyebrow block>Process</Eyebrow>
              <h2 className="x-h2" id="process-new-title">
                How we <span className="x-hl">work</span>
              </h2>
              <p>
                Four steps from first conversation to launch. You always know what&apos;s happening,
                what it costs and what comes next.
              </p>
            </div>
            <ol className="hw-rows">
              <li className="hw-row">
                <div className="hw-text">
                  <span className="hw-chip">
                    <b>01</b>
                    Free first conversation
                  </span>
                  <h3>Understand the problem</h3>
                  <p>
                    We start with a conversation about what&apos;s slowing your business down, not
                    about technology. We listen to how your team and customers actually work today,
                    on WhatsApp, on the phone and on paper.
                  </p>
                  <a className="hw-btn" href="#contact">
                    Start the conversation
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
                      <b>GH₵0</b>
                      <span>First call</span>
                      <em>Free</em>
                    </div>
                  </div>
                </div>
              </li>
              <li className="hw-row rev">
                <div className="hw-text">
                  <span className="hw-chip">
                    <b>02</b>
                    Clear plan before work starts
                  </span>
                  <h3>Scope and quote</h3>
                  <p>
                    You get a written plan with what we&apos;ll build, how long it takes and exactly
                    what it costs. Nothing starts until you&apos;re happy with it, so there are no
                    surprises halfway through.
                  </p>
                  <a className="hw-btn" href="/services">
                    See our services
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
                            Total price
                          </text>
                          <text x="104" y="272" fontWeight="600" fontSize="18" fill="#0D0D0D">
                            Fixed
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
                        Problem defined
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
                        Timeline agreed
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
                        Price fixed
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
                          Ready to start
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
                    Check-ins every week
                  </span>
                  <h3>Build, with you watching</h3>
                  <p>
                    We build in short steps and show you progress along the way, not just at the
                    end. You test early versions with your own team and tell us what to change while
                    it&apos;s still easy to change.
                  </p>
                  <a className="hw-btn" href="#work">
                    See a project we built
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
                          <b>Week 3 check-in</b>
                          <small>WhatsApp assistant</small>
                        </div>
                      </div>
                      <span className="hw-tag">Progress 60%</span>
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
                    We stay after launch
                  </span>
                  <h3>Hand over and support</h3>
                  <p>
                    We train your team on what we built, hand over everything you need, and stay
                    available to fix, adjust and improve it as your business grows.
                  </p>
                  <a className="hw-btn" href="/about">
                    Meet the team
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
                        Team trained
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
                        Guides handed over
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
                        Ongoing support
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
                        <em>Live</em>
                        Launched &amp; supported
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
                <b>The people</b>
                <span>
                  building{" "}
                  <span className="x-lime" style={{ display: "inline" }}>
                    Afrokan
                  </span>
                </span>
                <span>Labs</span>
              </h2>
              <div className="x-crew-side">
                <p>
                  We&apos;re a small team in Accra. The people who scope your project are the people
                  who build it, so you always know who you&apos;re talking to.
                </p>
                <a className="x-crew-btn" href="#contact">
                  Join our team
                </a>
              </div>
            </div>
            <ul className="x-arches">
              <li className="x-arch">
                <b>Franklin Asare Wiafe</b>
                <span className="x-role">CEO</span>{" "}
                <a className="x-ln" href="#" aria-label="Franklin Asare Wiafe on LinkedIn">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M3.6 5.6h2.1V13H3.6zM4.6 2.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM7 5.6h2v1c.3-.6 1.1-1.2 2.2-1.2 2.3 0 2.7 1.5 2.7 3.4V13h-2.1V9.2c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9V13H7z"
                    />
                  </svg>
                </a>
                <div className="x-pic">
                  <Img
                    src="team-ceo-franklin.webp"
                    alt="Franklin Asare Wiafe, CEO of Afrokan Labs"
                  />
                </div>
              </li>
              <li className="x-arch">
                <b>Kwabena Mawuli</b>
                <span className="x-role">CTO</span>{" "}
                <a className="x-ln" href="#" aria-label="Kwabena Mawuli on LinkedIn">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M3.6 5.6h2.1V13H3.6zM4.6 2.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM7 5.6h2v1c.3-.6 1.1-1.2 2.2-1.2 2.3 0 2.7 1.5 2.7 3.4V13h-2.1V9.2c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9V13H7z"
                    />
                  </svg>
                </a>
                <div className="x-pic">
                  <Img src="team-cto-kwabena.webp" alt="Kwabena Mawuli, CTO of Afrokan Labs" />
                </div>
              </li>
              <li className="x-arch">
                <b>Samuel Antwi</b>
                <span className="x-role">CIO</span>{" "}
                <a className="x-ln" href="#" aria-label="Samuel Antwi on LinkedIn">
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M3.6 5.6h2.1V13H3.6zM4.6 2.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM7 5.6h2v1c.3-.6 1.1-1.2 2.2-1.2 2.3 0 2.7 1.5 2.7 3.4V13h-2.1V9.2c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9V13H7z"
                    />
                  </svg>
                </a>
                <div className="x-pic">
                  <Img src="team-cio-samuel.webp" alt="Samuel Antwi, CIO of Afrokan Labs" />
                </div>
              </li>
            </ul>
          </section>
          <Reviews items={reviewItems()} />
          <section className="x-ticker" aria-label="What we build">
            <div className="x-tband">
              <div className="x-tmove">
                <ul className="x-tlist">
                  <li>WhatsApp AI</li>
                  <li>Web Platforms</li>
                  <li>Workflow Tools</li>
                  <li>Backend Systems</li>
                  <li>Chatbots</li>
                  <li>Dashboards</li>
                  <li>Websites</li>
                </ul>
                <ul className="x-tlist" aria-hidden="true">
                  <li>WhatsApp AI</li>
                  <li>Web Platforms</li>
                  <li>Workflow Tools</li>
                  <li>Backend Systems</li>
                  <li>Chatbots</li>
                  <li>Dashboards</li>
                  <li>Websites</li>
                </ul>
              </div>
            </div>
          </section>
          <section className="x-contact" id="contact" aria-labelledby="contact-new-title">
            <div className="x-contact-text">
              <h2 className="x-h2" id="contact-new-title">
                Get in Touch Today!
              </h2>
              <p>
                Have a problem in your business we could solve? Whether it&apos;s a WhatsApp
                assistant, a simple internal tool or a full web platform, leave your email and
                we&apos;ll reach out within one working day.
              </p>
              <form className="x-form" id="xform" noValidate>
                <label htmlFor="x-email">Your email</label>
                <input
                  id="x-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
                <button type="submit">Contact Us</button>
              </form>
              <p className="x-formmsg" id="xformmsg" role="status" />
              <a className="x-wa" href={links.whatsapp} {...links.whatsappAttrs}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#wa" />
                </svg>
                Prefer WhatsApp? Chat with us
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
                <span>
                  Based in Accra,
                  <br />
                  building for
                  <br />
                  all of Ghana
                </span>
              </div>
              <svg
                className="x-map"
                viewBox="0 0 311 432"
                role="img"
                aria-label="Map of Ghana with Accra marked"
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
                      Accra
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
