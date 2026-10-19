import "@/styles/pages/solutions.css";
import { Fragment } from "react";
import { CtaBox } from "@/components/site/CtaBox";
import { Nav } from "@/components/site/Nav";
import { Img } from "@/components/site/Img";
import { getSite, getSolutions } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/solutions", ...getSolutions().meta });

// The poster's photos, in wedge order. sizes: each photo's share of the
// 1200-wide artwork, which spans the viewport up to about 1240px.
const PHOTOS = [
  { src: "solutions-morning.webp", sizes: "(max-width: 1240px) 32vw, 400px" },
  { src: "solutions-office.webp", sizes: "(max-width: 1240px) 64vw, 800px" },
  { src: "solutions-yard.webp", sizes: "(max-width: 1240px) 55vw, 680px" },
  { src: "solutions-evening.webp", sizes: "(max-width: 1240px) 53vw, 660px" },
];

export default function SolutionsPage() {
  const { poster, day, industries } = getSolutions();
  const moments = day.moments;
  const pillTime = (time: string) => poster.pillTime.replace("{time}", time);
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap x-hero-wrap">
          <div className="sol-card" id="top">
            <Nav current="solutions" />
            <div className="sol-poster">
              {/* Three layers, so each photo can be a responsive <img> (an SVG <image>
                  can't take a srcset, and phones downloaded the desktop files):
                  the backdrop, the four photos clipped to their wedges, then the
                  wedge outlines and time pills. Positions are the 1200×760 artwork's. */}
              <div className="sol-art" role="img" aria-label={poster.label}>
                <svg className="sol-layer" viewBox="0 0 1200 760" aria-hidden="true">
                  <defs>
                    {/* The wedges in each photo's own 0–1 box (objectBoundingBox). */}
                    <clipPath id="sol-w0" clipPathUnits="objectBoundingBox">
                      <path d="M0.05885 0.70074 A1.25 3.52941 0 0 1 0.82396 1.00441 L1.70312 -4.08456 A3.25521 9.19118 0 0 0 -0.28932 -4.875 Z" />
                    </clipPath>
                    <clipPath id="sol-w1" clipPathUnits="objectBoundingBox">
                      <path d="M0.00573 0.41646 A0.625 1.46341 0 0 1 0.27305 1 L1.14128 -0.17378 A1.6276 3.81098 0 0 0 0.44531 -1.6936 Z" />
                    </clipPath>
                    <clipPath id="sol-w2" clipPathUnits="objectBoundingBox">
                      <path d="M0.00259 0.50617 A0.73171 0.74074 0 0 1 0.09878 0.92824 L1.26982 1.01111 A1.90549 1.92901 0 0 0 1.01905 -0.08796 Z" />
                    </clipPath>
                    <clipPath id="sol-w3" clipPathUnits="objectBoundingBox">
                      <path d="M0.06456 0.00893 A0.75949 2.85714 0 0 1 -0.11123 1.64583 L0.82215 4.59226 A1.97785 7.44048 0 0 0 1.28006 0.32857 Z" />
                    </clipPath>
                  </defs>
                  <rect width="1200" height="760" fill="#ECECEC" />
                  <circle cx="130" cy="560" r="476" fill="#fff" />
                </svg>
                {PHOTOS.map((photo, i) => (
                  <Img
                    key={photo.src}
                    priority
                    src={photo.src}
                    className={`sol-photo sol-ph${i}`}
                    sizes={photo.sizes}
                    alt=""
                  />
                ))}
                <svg className="sol-layer" viewBox="0 0 1200 760" aria-hidden="true">
                  <defs>
                    <filter id="sh" x="-20%" y="-30%" width="140%" height="180%">
                      <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity=".18" />
                    </filter>
                  </defs>
                  <path
                    d="M46.6 87.3 A480 480 0 0 1 340.4 128.6 L678.0 -563.5 A1250 1250 0 0 0 -87.1 -671.0Z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M340.4 128.6 A480 480 0 0 1 545.7 320.0 L1212.5 -65.0 A1250 1250 0 0 0 678.0 -563.5Z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M545.7 320.0 A480 480 0 0 1 608.8 593.5 L1377.0 647.2 A1250 1250 0 0 0 1212.5 -65.0Z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M608.8 593.5 A480 480 0 0 1 497.7 868.5 L1087.6 1363.5 A1250 1250 0 0 0 1377.0 647.2Z"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <g className="sol-pill" transform="translate(72 30)">
                    <rect width="170" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                    <text x="85" y="22" textAnchor="middle">
                      {moments[0].title}
                    </text>
                    <text x="85" y="40" textAnchor="middle">
                      {pillTime(moments[0].time)}
                    </text>
                  </g>
                  <g className="sol-pill" transform="translate(400 40)">
                    <rect width="154" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                    <text x="77" y="22" textAnchor="middle">
                      {moments[1].title}
                    </text>
                    <text x="77" y="40" textAnchor="middle">
                      {pillTime(moments[1].time)}
                    </text>
                  </g>
                  <g className="sol-pill" transform="translate(1016 40)">
                    <rect width="145" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                    <text x="73" y="22" textAnchor="middle">
                      {moments[2].title}
                    </text>
                    <text x="73" y="40" textAnchor="middle">
                      {pillTime(moments[2].time)}
                    </text>
                  </g>
                  <g className="sol-pill" transform="translate(624 640)">
                    <rect width="187" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                    <text x="94" y="22" textAnchor="middle">
                      {moments[3].title}
                    </text>
                    <text x="94" y="40" textAnchor="middle">
                      {pillTime(moments[3].time)}
                    </text>
                  </g>
                </svg>
              </div>
              <div className="sol-text">
                <p className="sol-kicker">
                  {poster.kicker.map((line, i) => (
                    <Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
                <h1 className="sol-h1">
                  {poster.heading.lead}
                  <b>{poster.heading.bold}</b>
                </h1>
                <p className="sol-tagline">
                  <span>{poster.tagline.tag}</span>
                  {poster.tagline.rest}
                </p>
                <span className="sol-brand">
                  <svg viewBox="105 115 1100 990" aria-hidden="true">
                    <path
                      d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="165"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {getSite().name}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="x-wrap">
          <section className="x-sec" aria-labelledby="day-title">
            <div className="x-head">
              <h2 className="x-h2" id="day-title">
                {day.heading.lead}
                <span className="x-hl">{day.heading.mark}</span>
              </h2>
              <p>{day.body}</p>
            </div>
            <ol className="sol-day">
              {moments.map((m) => (
                <li className="sol-moment" key={m.time}>
                  <span className="sol-time">{m.time}</span>
                  <h3>{m.title}</h3>
                  <dl>
                    <div>
                      <dt>{day.labels.before}</dt>
                      <dd>{m.before}</dd>
                    </div>
                    <div className="sol-with">
                      <dt>{day.labels.with}</dt>
                      <dd>{m.with}</dd>
                    </div>
                  </dl>
                  <span className="sol-tool">{m.tool}</span>
                </li>
              ))}
            </ol>
          </section>
          <section className="x-sec" aria-labelledby="ind-title">
            <div className="x-head">
              <h2 className="x-h2" id="ind-title">
                {industries.heading.lead}
                <span className="x-hl">{industries.heading.mark}</span>
              </h2>
              <p>{industries.body}</p>
            </div>
            <ul className="sol-ind">
              {industries.items.map((item) => (
                <li className="sol-i" key={item.title}>
                  <span className={item.delivered ? "sol-badge" : "sol-badge idea"}>
                    {item.delivered ? industries.badges.delivered : industries.badges.fit}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
          <CtaBox copy={getSite().ctaBox} />
        </div>
      </div>
    </>
  );
}
