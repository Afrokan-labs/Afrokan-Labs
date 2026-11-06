import "@/styles/pages/poster-cards.css";
import type { Poster } from "@/content/schema";
import { Img } from "./Img";
import { LogoMark } from "./LogoMark";

/** The inner panel of each shape, in 0–100 units. Photo shapes use a matching CSS clip instead. */
const SHAPES = {
  s1: "M14 18 L86 18 L86 46 L77 55 L86 64 L86 84 L14 84 Z",
  s2: "M14 22 L43 22 L50 15 L57 22 L86 22 L86 84 L14 84 L14 58 L22 50 L14 42 Z",
  s3: "M10 15 L90 15 L90 64 L62 64 L55 71 L10 71 Z",
  s4: "M9 24 L56 24 L56 36 L64 43 L64 86 L9 86 Z",
} as const;

/** Where a shape puts its text and illustration, in cqi. Insights' cards hold longer titles. */
type Place = { left: number; top: number; width: number; size?: number };
type Layout = { head: Place; sub?: Place; ill?: { right: number; bottom: number; size: number } };

const LAYOUTS: Record<"values" | "articles", Record<Poster["shape"], Layout>> = {
  values: {
    s1: {
      head: { left: 20, top: 26, width: 52, size: 6.4 },
      sub: { left: 20, top: 62, width: 28 },
      ill: { right: 12, bottom: 15, size: 34 },
    },
    s2: {
      head: { left: 22, top: 30, width: 60, size: 6.4 },
      sub: { left: 22, top: 55, width: 50 },
      ill: { right: 16, bottom: 15, size: 22 },
    },
    s3: { head: { left: 10, top: 74, width: 80, size: 5.4 } },
    s4: {
      head: { left: 68, top: 24, width: 26, size: 6.4 },
      sub: { left: 6, top: 60, width: 40 },
    },
  },
  articles: {
    s1: {
      head: { left: 20, top: 26, width: 52, size: 6.2 },
      sub: { left: 20, top: 58, width: 30 },
      ill: { right: 12, bottom: 15, size: 30 },
    },
    s2: {
      head: { left: 22, top: 30, width: 60, size: 6.4 },
      sub: { left: 22, top: 50, width: 50 },
      ill: { right: 16, bottom: 15, size: 22 },
    },
    s3: { head: { left: 10, top: 73, width: 80, size: 5.6 } },
    s4: {
      head: { left: 68, top: 24, width: 27, size: 5.4 },
      sub: { left: 6, top: 62, width: 40 },
    },
  },
};

const place = ({ left, top, width, size }: Place): React.CSSProperties => ({
  left: `${left}cqi`,
  top: `${top}cqi`,
  width: `${width}cqi`,
  ...(size && { fontSize: `${size}cqi` }),
});

/** s1: two chat bubbles. */
const CHAT = (
  <svg viewBox="0 0 100 100">
    <path
      d="M14 18h56a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10H40L24 78V64H14A10 10 0 0 1 4 54V28a10 10 0 0 1 10-10z"
      fill="#0D0D0D"
    />
    <g fill="#94DE57">
      <circle cx="26" cy="41" r="5" />
      <circle cx="42" cy="41" r="5" />
      <circle cx="58" cy="41" r="5" />
    </g>
    <path
      d="M60 58h28a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-4v10l-12-10H60a8 8 0 0 1-8-8V66a8 8 0 0 1 8-8z"
      fill="#fff"
    />
  </svg>
);

/** s2: a quote with a green tick. */
const QUOTE = (
  <svg viewBox="0 0 100 100">
    <rect x="18" y="8" width="58" height="76" rx="6" fill="#fff" stroke="#0D0D0D" strokeWidth="3" />
    <rect x="28" y="20" width="30" height="5" rx="2.5" fill="#0D0D0D" />
    <g fill="#BDB5A8">
      <rect x="28" y="32" width="38" height="4" rx="2" />
      <rect x="28" y="41" width="32" height="4" rx="2" />
    </g>
    <rect x="28" y="56" width="24" height="5" rx="2.5" fill="#0D0D0D" />
    <text x="66" y="62" textAnchor="end" fontSize="10" fontWeight="700" fill="#3F7E20">
      GH₵
    </text>
    <circle cx="72" cy="78" r="16" fill="#94DE57" stroke="#0D0D0D" strokeWidth="3" />
    <path
      d="M64 78l6 6 10-11"
      fill="none"
      stroke="#0D0D0D"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SPEECH = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"
      fill="currentColor"
    />
  </svg>
);

type Props = {
  poster: Poster;
  layout: keyof typeof LAYOUTS;
  href: string;
  /** The small round picture: a person's photo, or the logo for the company. */
  avatar?: string;
  name: string;
  role: string;
  pill: string;
  /** Show the speech-bubble icon in the pill. */
  speech?: boolean;
};

/**
 * Update 2 §9, reference .pc: a square social-post card. Inner sizes are in
 * cqi, so it scales like an image. Photos are real <img>s clipped to the shape
 * (an SVG <image> can't take a srcset, so phones would get the desktop file).
 */
export function PosterCard({ poster, layout, href, avatar, name, role, pill, speech }: Props) {
  const { theme, shape, tag, headline, sub, photo } = poster;
  const spot = LAYOUTS[layout][shape];
  return (
    <li className={`pc t-${theme}`}>
      <a href={href}>
        {photo ? (
          <Img
            src={photo.src}
            alt=""
            className={`pc-photo ${shape} ${photo.tone}`}
            sizes="(max-width: 640px) 100vw, 500px"
          />
        ) : (
          <svg className="pc-shape" viewBox="0 0 100 100" aria-hidden="true">
            <path
              d={SHAPES[shape]}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="pc-frame" aria-hidden="true" />
        <span className="pc-tag">{tag}</span>{" "}
        <span className="pc-logo" aria-hidden="true">
          <LogoMark />
        </span>
        <h3 className="pc-h" style={place(spot.head)}>
          {headline}
        </h3>
        {sub && spot.sub && shape === "s4" && (
          <p className="pc-box" style={place(spot.sub)}>
            {sub}
          </p>
        )}
        {sub && spot.sub && shape !== "s4" && (
          <p className="pc-sub" style={place(spot.sub)}>
            {shape === "s2" ? <span className="pc-hl">{sub}</span> : sub}
          </p>
        )}
        {spot.ill && (
          <span
            className="pc-ill"
            aria-hidden="true"
            style={{
              right: `${spot.ill.right}cqi`,
              bottom: `${spot.ill.bottom}cqi`,
              width: `${spot.ill.size}cqi`,
              height: `${spot.ill.size}cqi`,
            }}
          >
            {shape === "s1" ? CHAT : QUOTE}
          </span>
        )}
        <div className="pc-foot">
          <span className="pc-who">
            <span className="pc-av">
              {avatar ? <Img src={avatar} alt="" sizes="48px" /> : <LogoMark />}
            </span>{" "}
            <span>
              <b>{name}</b> <small>{role}</small>
            </span>
          </span>{" "}
          <span className="pc-pill">
            {speech && SPEECH}
            {pill}
          </span>
        </div>
      </a>
    </li>
  );
}
