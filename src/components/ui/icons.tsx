/**
 * Decorative and UI glyphs from docs/design/handoff/reference.html, as inline
 * SVG. All are aria-hidden: the text next to them carries the meaning.
 */
type IconProps = { className?: string };

const hidden = { "aria-hidden": true, focusable: false } as const;

/** Thin 4-point star (reference .x-star4, dividers, words line). */
export const STAR4_PATH =
  "M50 0C53 36 64 47 100 50 64 53 53 64 50 100 47 64 36 53 0 50 36 47 47 36 50 0Z";

export function Star4({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" {...hidden}>
      <path fill="currentColor" d={STAR4_PATH} />
    </svg>
  );
}

/** Small spark used in the hero badge row. */
export function Spark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" {...hidden}>
      <path fill="currentColor" d="M10 0 12 8 20 10 12 12 10 20 8 12 0 10 8 8Z" />
    </svg>
  );
}

/** 16-ray burst beside the hero headline. */
export function Burst({ className }: IconProps) {
  const rays = (
    <>
      <line x1="50" y1="6" x2="50" y2="36" />
      <line x1="50" y1="64" x2="50" y2="94" />
      <line x1="6" y1="50" x2="36" y2="50" />
      <line x1="64" y1="50" x2="94" y2="50" />
    </>
  );
  return (
    <svg className={className} viewBox="0 0 100 100" {...hidden}>
      <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
        {rays}
        {[22.5, 45, 67.5].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            {rays}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Three-line squiggle after the hero headline. */
export function Tail({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 30 28" {...hidden}>
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" fill="none">
        <path d="M4 10 L26 3" />
        <path d="M4 15 L22 15" />
        <path d="M4 20 L26 26" />
      </g>
    </svg>
  );
}

/** Three tick marks above the hero lede. */
export function Ticks({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 26 20" {...hidden}>
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M3 18 L6 3" />
        <path d="M9 18 L17 6" />
        <path d="M13 19 L24 13" />
      </g>
    </svg>
  );
}

/** Curly arrow beside the hero portrait. */
export function Swirl({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 60 90" {...hidden}>
      <path
        d="M44 4 C20 10 8 30 22 40 C36 50 46 30 30 30 C10 30 8 58 22 70 C28 75 34 78 38 84 M38 84 L30 82 M38 84 L37 76"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Light-bulb doodle on the tall Ideas portrait. */
export function Bulb({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" {...hidden}>
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
  );
}

/** Lime blob behind team avatars. */
export function Blob({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 100 100" {...hidden}>
      <path
        fill="currentColor"
        d="M50 4c10 0 13 9 21 11s17 1 21 10-3 15-1 24 9 15 4 23-14 6-21 11-9 14-20 13-12-10-21-13-18-2-22-11 3-15 1-23-10-14-5-22 14-6 21-11S39 4 50 4Z"
      />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...hidden}>
      <path
        d="M2 8h11M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...hidden}>
      <path
        d="M13 8H3M7 4 3 8l4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...hidden}>
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuoteMark({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 22 18" {...hidden}>
      <path
        fill="currentColor"
        d="M0 18V10C0 4 3 1 9 0v4c-3 1-4 3-4 5h4v9zm13 0V10c0-6 3-9 9-10v4c-3 1-4 3-4 5h4v9z"
      />
    </svg>
  );
}

export function WhatsAppGlyph({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...hidden}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c0 .2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"
      />
    </svg>
  );
}

export function LinkedInGlyph({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...hidden}>
      <path
        fill="currentColor"
        d="M3.6 5.6h2.1V13H3.6zM4.6 2.5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zM7 5.6h2v1c.3-.6 1.1-1.2 2.2-1.2 2.3 0 2.7 1.5 2.7 3.4V13h-2.1V9.2c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9V13H7z"
      />
    </svg>
  );
}

export function XGlyph({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...hidden}>
      <path
        fill="currentColor"
        d="M2 2h3.4l3 4.2L12 2h1.6L9.2 7.2 14 14h-3.4L7.4 9.5 3.6 14H2l4.7-5.4z"
      />
    </svg>
  );
}

export function InstagramGlyph({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 16 16" {...hidden}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="12" height="12" rx="3.5" />
        <circle cx="8" cy="8" r="2.8" />
      </g>
      <circle cx="11.6" cy="4.4" r=".9" fill="currentColor" />
    </svg>
  );
}
