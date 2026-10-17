import "@/styles/pages/work.css";
import { CtaBox } from "@/components/site/CtaBox";
import { Img } from "@/components/site/Img";
import { Nav } from "@/components/site/Nav";
import { getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/work", title: "Work" });

export default function WorkPage() {
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap w-top">
          <Nav current="work" dark />
          <section className="w-hero" aria-labelledby="w-title">
            <div className="w-icons" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path
                  d="M8 7l-5 5 5 5M16 7l5 5-5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{" "}
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>{" "}
              <svg viewBox="0 0 24 24">
                <path
                  d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <svg className="w-dots" viewBox="0 0 18 18" aria-hidden="true">
              <g fill="currentColor">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="11" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="11" width="6" height="6" rx="1" />
                <rect x="11" y="11" width="6" height="6" rx="1" />
              </g>
            </svg>
            <h1 className="w-kick" id="w-title">
              Software we&apos;ve shipped <span>for</span>
              <br />
              <span>Ghanaian businesses</span>
            </h1>
            <p className="w-big" aria-hidden="true">
              work.
            </p>
            <Img
              priority
              sizes="(max-width: 760px) 90vw, 600px"
              src="work-hero-samuel.webp"
              className="w-person"
              alt="Samuel Antwi, CIO of Afrokan Labs, in an Afrokan Labs hoodie"
            />
            <div className="w-intro">
              <p>
                Afrokan Labs works with businesses to build tools that feel simple, save time, and
                fit how customers and staff already work.
              </p>
              <a href="#cases">
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M4 4l8 8M12 5v7H5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                See our case studies
              </a>
            </div>
          </section>
        </div>
        <div className="x-wrap">
          <section className="w-phil" aria-labelledby="phil-title">
            <span className="w-label" id="phil-title">
              Our approach
            </span>
            <p className="w-statement">
              We build for impact where it matters most: logistics, retail, schools and service
              businesses that run on WhatsApp. Our work is built to answer customers faster, take
              paperwork off your team, and keep working long after launch.
            </p>
            <div className="w-cols">
              <div className="w-col">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Strategy</h3>
                <p>Problem discovery, user research, scoping and pricing</p>
              </div>
              <div className="w-col">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M8 7l-5 5 5 5M16 7l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Build</h3>
                <p>WhatsApp AI assistants, web platforms, workflow tools</p>
              </div>
              <div className="w-col">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
                <h3>Support</h3>
                <p>Team training, maintenance and ongoing improvements</p>
              </div>
            </div>
          </section>
          <section className="w-cases" id="cases" aria-labelledby="cases-title">
            <div className="w-cases-head">
              <h2 id="cases-title">Case studies</h2>
              <span>(2026)</span>
            </div>
            <ul className="w-grid">
              <li className="w-card">
                <a className="w-shot" href="/#work" aria-label="ESE Logistic WhatsApp AI assistant">
                  <Img src="work-bg-port.webp" className="w-bg" alt="" />{" "}
                  <svg className="w-mock phone" viewBox="0 0 200 400" aria-hidden="true">
                    <rect width="200" height="400" rx="22" fill="#0D0D0D" />
                    <rect x="8" y="8" width="184" height="384" rx="16" fill="#ECE5DD" />
                    <rect x="8" y="8" width="184" height="54" rx="16" fill="#1F3A2C" />
                    <circle cx="34" cy="38" r="12" fill="#94DE57" />
                    <rect x="54" y="30" width="80" height="7" rx="3.5" fill="#fff" />
                    <rect x="54" y="42" width="44" height="5" rx="2.5" fill="#fff" opacity=".6" />
                    <rect x="60" y="80" width="120" height="34" rx="9" fill="#DCF8C6" />
                    <rect x="20" y="124" width="140" height="66" rx="9" fill="#fff" />
                    <g fill="#9a9a9a">
                      <rect x="30" y="136" width="110" height="6" rx="3" />
                      <rect x="30" y="150" width="90" height="6" rx="3" />
                      <rect x="30" y="164" width="104" height="6" rx="3" />
                    </g>
                    <rect x="80" y="200" width="100" height="26" rx="9" fill="#DCF8C6" />
                    <rect x="20" y="236" width="150" height="80" rx="9" fill="#fff" />
                    <g fill="#9a9a9a">
                      <rect x="30" y="248" width="120" height="6" rx="3" />
                      <rect x="30" y="262" width="100" height="6" rx="3" />
                      <rect x="30" y="276" width="114" height="6" rx="3" />
                      <rect x="30" y="290" width="70" height="6" rx="3" />
                    </g>
                    <rect x="16" y="350" width="140" height="30" rx="15" fill="#fff" />
                    <circle cx="174" cy="365" r="15" fill="#1F3A2C" />
                  </svg>
                </a>
                <div className="w-meta">
                  <h3>ESE Logistic: WhatsApp AI assistant</h3>
                  <span>AI · WhatsApp · Logistics</span>
                </div>
              </li>
              <li className="w-card">
                <a
                  className="w-shot"
                  href="/#work"
                  aria-label="ESE Logistic document checklist generator"
                >
                  <Img src="work-bg-desk.webp" className="w-bg" alt="" />{" "}
                  <svg className="w-mock" viewBox="0 0 420 280" aria-hidden="true">
                    <rect width="420" height="280" rx="10" fill="#fff" />
                    <rect width="420" height="30" rx="10" fill="#F3F3EF" />
                    <g fill="#ccc">
                      <circle cx="16" cy="15" r="4" />
                      <circle cx="30" cy="15" r="4" />
                      <circle cx="44" cy="15" r="4" />
                    </g>
                    <text x="24" y="62" fontSize="15" fontWeight="600" fill="#0D0D0D">
                      Document checklist
                    </text>
                    <rect
                      x="24"
                      y="76"
                      width="170"
                      height="26"
                      rx="6"
                      fill="#F3F3EF"
                      stroke="#ddd"
                    />
                    <text x="34" y="93" fontSize="10" fill="#555">
                      Cargo type: Vehicle
                    </text>
                    <rect x="206" y="76" width="90" height="26" rx="6" fill="#1F3A2C" />
                    <text x="251" y="93" textAnchor="middle" fontSize="10" fill="#fff">
                      Generate
                    </text>
                    <rect
                      x="24"
                      y="124"
                      width="16"
                      height="16"
                      rx="4"
                      fill="#94DE57"
                      stroke="#94DE57"
                    />
                    <path
                      d="M28 132l3 3 6-6"
                      stroke="#0D0D0D"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <rect
                      x="50"
                      y="129"
                      width="190"
                      height="7"
                      rx="3.5"
                      fill="#0D0D0D"
                      opacity=".75"
                    />
                    <rect
                      x="24"
                      y="152"
                      width="16"
                      height="16"
                      rx="4"
                      fill="#94DE57"
                      stroke="#94DE57"
                    />
                    <path
                      d="M28 160l3 3 6-6"
                      stroke="#0D0D0D"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <rect
                      x="50"
                      y="157"
                      width="160"
                      height="7"
                      rx="3.5"
                      fill="#0D0D0D"
                      opacity=".75"
                    />
                    <rect
                      x="24"
                      y="180"
                      width="16"
                      height="16"
                      rx="4"
                      fill="#94DE57"
                      stroke="#94DE57"
                    />
                    <path
                      d="M28 188l3 3 6-6"
                      stroke="#0D0D0D"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <rect
                      x="50"
                      y="185"
                      width="210"
                      height="7"
                      rx="3.5"
                      fill="#0D0D0D"
                      opacity=".75"
                    />
                    <rect x="24" y="208" width="16" height="16" rx="4" fill="#fff" stroke="#bbb" />
                    <rect x="50" y="213" width="170" height="7" rx="3.5" fill="#ccc" opacity="1" />
                    <rect x="24" y="236" width="16" height="16" rx="4" fill="#fff" stroke="#bbb" />
                    <rect x="50" y="241" width="140" height="7" rx="3.5" fill="#ccc" opacity="1" />
                    <rect x="300" y="124" width="96" height="132" rx="8" fill="#F3F3EF" />
                    <text
                      x="348"
                      y="176"
                      textAnchor="middle"
                      fontSize="26"
                      fontWeight="600"
                      fill="#1F3A2C"
                    >
                      3/5
                    </text>
                    <text x="348" y="196" textAnchor="middle" fontSize="9" fill="#777">
                      documents ready
                    </text>
                  </svg>
                </a>
                <div className="w-meta">
                  <h3>ESE Logistic: Checklist generator</h3>
                  <span>Workflow tool · Internal</span>
                </div>
              </li>
              <li className="w-card">
                <a className="w-shot" href="/#work" aria-label="ESE Logistic website">
                  <Img src="work-bg-skyline.webp" className="w-bg" alt="" />{" "}
                  <svg className="w-mock" viewBox="0 0 420 270" aria-hidden="true">
                    <rect width="420" height="270" rx="10" fill="#0E1E16" />
                    <rect width="420" height="28" rx="10" fill="#16291F" />
                    <g fill="#94DE57">
                      <rect x="20" y="10" width="40" height="8" rx="4" />
                    </g>
                    <g fill="#fff" opacity=".5">
                      <rect x="260" y="11" width="30" height="6" rx="3" />
                      <rect x="300" y="11" width="30" height="6" rx="3" />
                      <rect x="340" y="11" width="30" height="6" rx="3" />
                    </g>
                    <text x="24" y="80" fontSize="22" fontWeight="600" fill="#fff">
                      ESE Logistic
                    </text>
                    <text x="24" y="104" fontSize="22" fontWeight="600" fill="#94DE57">
                      Solution Ltd
                    </text>
                    <g fill="#fff" opacity=".45">
                      <rect x="24" y="122" width="200" height="6" rx="3" />
                      <rect x="24" y="134" width="160" height="6" rx="3" />
                    </g>
                    <rect x="24" y="152" width="96" height="26" rx="13" fill="#94DE57" />
                    <g>
                      <rect x="24" y="196" width="118" height="56" rx="6" fill="#1D3427" />
                      <rect x="151" y="196" width="118" height="56" rx="6" fill="#1D3427" />
                      <rect x="278" y="196" width="118" height="56" rx="6" fill="#1D3427" />
                    </g>
                    <rect x="250" y="50" width="146" height="128" rx="8" fill="#26402F" />
                    <path d="M262 160 L300 110 L330 140 L352 118 L384 160Z" fill="#3B5E45" />
                  </svg>
                </a>
                <div className="w-meta">
                  <h3>ESE Logistic: Company website</h3>
                  <span>Web platform · Marketing</span>
                </div>
              </li>
              <li className="w-card w-open">
                <a className="w-shot" href="/contact">
                  <span className="w-open-in">
                    <b>Your project could be next</b>
                    <span>
                      Start a conversation{" "}
                      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
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
                  </span>
                </a>
                <div className="w-meta">
                  <h3>Open slot</h3>
                  <span>Retail · Schools · Healthcare · More</span>
                </div>
              </li>
            </ul>
          </section>
          <CtaBox copy={getSite().ctaBox} />
        </div>
      </div>
    </>
  );
}
