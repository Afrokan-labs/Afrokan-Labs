import "@/styles/pages/about.css";
import { CtaBox } from "@/components/site/CtaBox";
import { Img } from "@/components/site/Img";
import { Members } from "@/components/site/Members";
import { Nav } from "@/components/site/Nav";
import { Philosophy } from "@/components/site/Philosophy";
import { getMembers } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/about", title: "About" });

export default function AboutPage() {
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap x-hero-wrap">
          <div className="x-hero" id="top">
            <Nav current="about" />
            <div className="x-hero-grid">
              <div>
                <span className="x-eyebrow">About us</span>
                <h1 className="x-h1">
                  <span className="x-line">
                    we&apos;re a <span className="x-sh x-sh-dot" aria-hidden="true" />
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
                    <span className="x-sh x-sh-pill" aria-hidden="true" /> small AI
                  </span>{" "}
                  <span className="x-line">
                    studio in <span className="x-mark">Accra</span>
                  </span>
                </h1>
                <div className="x-intro">
                  <a className="x-btn x-btn-ink" href="/#work">
                    See our work
                  </a>
                  <p>
                    We build software that fits how Ghanaian businesses run: on WhatsApp, on mobile,
                    and often on paper.
                  </p>
                </div>
              </div>
              <div className="x-collage" aria-label="The team">
                <div className="x-mate">
                  <span className="x-role">CEO</span>
                  <div className="x-pic x-pic-circle">
                    <Img
                      priority
                      sizes="(max-width: 760px) 50vw, 320px"
                      src="team-ceo-franklin.webp"
                      alt="Franklin Asare Wiafe, CEO"
                    />
                  </div>
                  <span className="x-name x-n-lime up">Franklin</span>
                </div>
                <div className="x-mate">
                  <span className="x-name x-n-ink">Kwabena</span>
                  <div className="x-pic x-pic-arch">
                    <Img
                      priority
                      sizes="(max-width: 760px) 50vw, 320px"
                      src="team-cto-kwabena.webp"
                      alt="Kwabena Mawuli, CTO"
                    />
                  </div>
                  <span className="x-role">CTO</span>
                </div>
                <div className="x-mate">
                  <span className="x-role">CIO</span>
                  <div className="x-pic x-pic-blob">
                    <Img
                      priority
                      sizes="(max-width: 760px) 50vw, 320px"
                      src="team-cio-samuel.webp"
                      alt="Samuel Antwi, CIO"
                    />
                  </div>
                  <span className="x-name x-n-sand up">Samuel</span>
                </div>
              </div>
            </div>
            <div className="x-lower">
              <div className="x-pile" aria-label="What we do">
                <svg className="x-burst" viewBox="0 0 100 100" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M50 0 57 33 85 15 67 43 100 50 67 57 85 85 57 67 50 100 43 67 15 85 33 57 0 50 33 43 15 15 43 33Z"
                  />
                </svg>{" "}
                <span>WhatsApp AI</span>
                <span>Web Platforms</span>
                <span>Chatbots</span>
                <span>Workflow Tools</span>
                <span>Dashboards</span>
                <span>Backend Systems</span>
                <span>Websites</span>
                <span>Automation</span>
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
                <p>Our first client project, delivered</p>
                <div className="x-proof-pill">
                  <b>3</b>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
                  </svg>
                  <span>
                    systems built for
                    <br />
                    ESE Logistic
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
                  Our story
                </span>
              </div>
              <div>
                <p className="x-statement">
                  Afrokan Labs started as a group of students at the University of Ghana who kept
                  seeing the same thing:{" "}
                  <span className="x-dim">
                    businesses running on WhatsApp chats, phone calls and paper files, with software
                    that wasn&apos;t built for them.
                  </span>{" "}
                  So we started building <span className="x-chip">for how Ghana works.</span>
                </p>
                <dl className="x-facts">
                  <div className="x-fact">
                    <dt>Based in</dt>
                    <dd>Accra, Ghana</dd>
                  </div>
                  <div className="x-fact">
                    <dt>We build</dt>
                    <dd>AI, web &amp; workflow tools</dd>
                  </div>
                  <div className="x-fact">
                    <dt>First client</dt>
                    <dd>ESE Logistic Solution Ltd</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
          <Members members={getMembers()} />
          <Philosophy />
          <section className="x-sec" aria-labelledby="values-title">
            <div className="x-head">
              <h2 className="x-h2" id="values-title">
                What we <span className="x-hl">believe</span>
              </h2>
              <p>
                Four ideas shape how we take on every project, from a single WhatsApp assistant to a
                full platform.
              </p>
            </div>
            <ul className="x-values">
              <li className="x-value">
                <span className="x-vi">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#wa" />
                  </svg>
                </span>
                <h3>Software should fit how you already work</h3>
                <p>
                  Your customers are on WhatsApp and your staff are on their phones. We build for
                  that, instead of asking everyone to change their habits.
                </p>
              </li>
              <li className="x-value">
                <span className="x-vi">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle
                      cx="9"
                      cy="8"
                      r="3.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="17"
                      cy="9.5"
                      r="2.4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M3 19c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M15 14.2c3 0 5.5 1.6 5.5 4.3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>The people who scope it build it</h3>
                <p>
                  No hand-offs to a team you&apos;ve never met. You talk to the engineers writing
                  your code from the first call to launch.
                </p>
              </li>
              <li className="x-value">
                <span className="x-vi">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M5 4h10l4 4v12H5z M15 4v4h4 M8 12h8M8 16h5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>A clear price before any work starts</h3>
                <p>
                  You get a written plan, timeline and price up front, so there are no surprises
                  halfway through.
                </p>
              </li>
              <li className="x-value">
                <span className="x-vi">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M8.5 12l2.5 2.5 4.5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <h3>We stay after launch</h3>
                <p>
                  We train your team on what we built and stay available to fix, adjust and improve
                  it as your business grows.
                </p>
              </li>
            </ul>
          </section>
          <section className="x-sec" aria-labelledby="road-title">
            <div className="x-head">
              <h2 className="x-h2" id="road-title">
                Where we&apos;re <span className="x-hl">headed</span>
              </h2>
              <p>We&apos;re starting at home and growing step by step.</p>
            </div>
            <ol className="x-road">
              <li className="x-stop now">
                <span className="x-tag">Now</span>
                <h3>Web solutions for Ghanaian companies</h3>
                <p>
                  Websites, AI chatbots and workflow systems for businesses that want to serve
                  customers faster.
                </p>
              </li>
              <li className="x-stop">
                <span className="x-tag">Next</span>
                <h3>AI products for the Ghanaian market</h3>
                <p>
                  Turning what we learn from client work into AI tools built for local businesses.
                </p>
              </li>
              <li className="x-stop">
                <span className="x-tag">Later</span>
                <h3>Across Africa</h3>
                <p>Taking what works in Ghana to businesses in other African markets.</p>
              </li>
            </ol>
          </section>
          <CtaBox />
        </div>
      </div>
    </>
  );
}
