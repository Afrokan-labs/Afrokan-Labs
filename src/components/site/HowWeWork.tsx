import type { Home } from "@/content/schema";
import { Eyebrow } from "./Eyebrow";

const TICK = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12.5l4.5 4.5L19 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ARROW = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const num = (n: number) => String(n).padStart(2, "0");

/**
 * Home "How we work" (update 5 §2, reference .hw2): a sticky stage of step
 * illustrations beside a railed list of steps. Step 1 is active in the server
 * HTML; HomeScripts moves the active step, illustration, pip and rail on scroll.
 */
export function HowWeWork({ process }: { process: Home["process"] }) {
  const { steps } = process;
  const v = process.visuals;
  return (
    <section className="x-process hw2" id="process" aria-labelledby="process-new-title">
      <div className="x-ideas-head">
        <Eyebrow block>{process.eyebrow}</Eyebrow>
        <h2 className="x-h2" id="process-new-title">
          {process.heading.lead}
          <span className="x-hl">{process.heading.mark}</span>
        </h2>
        <p>{process.body}</p>
      </div>
      <div className="hw2-grid">
        <div className="hw2-stage" aria-hidden="true">
          <div className="hw2-frame">
            <div className="hw-vis v1 is-on">
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
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E2DC" strokeWidth="7" />
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
                  <b>{v.gauge.value}</b>
                  <span>{v.gauge.label}</span>
                  <em>{v.gauge.note}</em>
                </div>
              </div>
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
                        {v.quote.total}
                      </text>
                      <text x="104" y="272" fontWeight="600" fontSize="18" fill="#0D0D0D">
                        {v.quote.fixed}
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
                    {v.checklist.items[0]}
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
                    {v.checklist.items[1]}
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
                    {v.checklist.items[2]}
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
                      {v.checklist.ready}
                    </small>
                  </li>
                </ul>
              </div>
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
                    <circle cx="120" cy="170" r="26" fill="#fff" stroke="#94DE57" strokeWidth="5" />
                    <text x="120" y="176" fill="#0D0D0D">
                      1
                    </text>
                    <circle cx="230" cy="230" r="22" fill="#fff" stroke="#94DE57" strokeWidth="5" />
                    <text x="230" y="236" fill="#0D0D0D">
                      2
                    </text>
                    <circle cx="140" cy="300" r="22" fill="#fff" stroke="#94DE57" strokeWidth="5" />
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
                      <b>{v.checkIn.title}</b>
                      <small>{v.checkIn.sub}</small>
                    </div>
                  </div>
                  <span className="hw-tag">{v.checkIn.progress}</span>
                  <i className="hw-bar">
                    <b style={{ width: "60%" }} />
                  </i>
                </div>
              </div>
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
                    <rect x="176" y="98" width="56" height="8" rx="4" fill="#fff" opacity=".8" />
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
                    {v.handover.items[0]}
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
                    {v.handover.items[1]}
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
                    {v.handover.items[2]}
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
                    <em>{v.handover.live}</em>
                    {v.handover.launched}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="hw2-meter">
            <span className="hw2-count">
              <b>{num(1)}</b> / {num(steps.length)}
            </span>
            <span className="hw2-pips">
              {steps.map((step, i) => (
                <i className={i === 0 ? "on" : undefined} key={step.title} />
              ))}
            </span>
          </div>
        </div>
        <div className="hw2-list">
          <span className="hw2-rail" aria-hidden="true">
            <i />
          </span>
          <ol className="hw2-steps">
            {steps.map((step, i) => (
              <li className={i === 0 ? "hw2-step is-on" : "hw2-step"} key={step.title}>
                <span className="hw2-dot" aria-hidden="true">
                  {num(i + 1)}
                </span>
                <div className="hw2-card">
                  <div className="hw2-top">
                    <span className="hw2-num" aria-hidden="true">
                      {num(i + 1)}
                    </span>
                    <span className="hw2-chip">{step.chip}</span>
                  </div>
                  <h3>
                    <span className="sr-only">
                      {process.stepPrefix.replace("{n}", String(i + 1))}
                    </span>
                    {step.title}
                  </h3>
                  <p>{step.body}</p>
                  <div className="hw2-get">
                    <b>{process.getLabel}</b>
                    <ul>
                      {step.get.map((item) => (
                        <li key={item}>
                          {TICK}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a className="hw2-link" href={step.link.href}>
                    {step.link.label}
                    {ARROW}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="hw2-end">
        <p>
          <b>{process.end.lead}</b>
          {process.end.rest}
        </p>
        <a className="hw-btn" href={process.end.cta.href}>
          {process.end.cta.label}
        </a>
      </div>
    </section>
  );
}
