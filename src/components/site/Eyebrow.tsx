/** The curved "↳" arrow of the site-update-1 eyebrows and buttons (.ae-cv). */
export function CurveArrow() {
  return (
    <svg className="ae-cv" viewBox="0 0 20 14" aria-hidden="true">
      <path
        d="M2 3c0 6 4 8 10 8M12 11l-3-3M12 11l-3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  children: React.ReactNode;
  /** Above a section heading: its own row, as in the reference. */
  block?: boolean;
};

/** "↳ LABEL" above a heading (reference .ae-eye, site update 1). */
export function Eyebrow({ children, block }: Props) {
  return (
    <span className="ae-eye" style={block ? { display: "flex", marginBottom: "10px" } : undefined}>
      <CurveArrow />
      {children}
    </span>
  );
}
