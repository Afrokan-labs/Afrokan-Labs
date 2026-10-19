import { LogoMark } from "./LogoMark";

type Props = {
  /** The words run round the ring, e.g. "AI · SOFTWARE · ACCRA · GHANA ·". */
  text: string;
  /** The page's class for it (.rbadge, .bb2-badge, .mz-badge) sets size, place and centre. */
  className: string;
  /** green: green ring, ink text, the "A" in the centre. black: black ring, green text, an arrow. */
  tone?: "green" | "black";
  /** Ring radius in the 200-unit box (the reference uses 74 or 72). */
  radius?: number;
  fontSize?: number;
};

const ARROW = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M4 12 12 4M5.5 4H12v6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Update 2 §4: a circle of text that spins (18s; still under reduced motion,
 * set in the page CSS) round a centre mark. Decorative, so aria-hidden.
 */
export function RotatingBadge({
  text,
  className,
  tone = "green",
  radius = 74,
  fontSize = 17,
}: Props) {
  const id = `${className}-ring`;
  const r = radius;
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <defs>
          <path
            id={id}
            d={`M100 100m-${r} 0a${r} ${r} 0 1 1 ${2 * r} 0a${r} ${r} 0 1 1-${2 * r} 0`}
          />
        </defs>
        <circle cx="100" cy="100" r="98" fill={tone === "green" ? "#94DE57" : "#0D0D0D"} />
        <text
          fontSize={fontSize}
          fontWeight="600"
          letterSpacing="3"
          fill={tone === "green" ? "#0D0D0D" : "#94DE57"}
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span>{tone === "green" ? <LogoMark /> : ARROW}</span>
    </div>
  );
}
