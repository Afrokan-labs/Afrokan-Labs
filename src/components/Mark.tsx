type MarkProps = {
  className?: string;
  /** Accessible label. Omit when the mark is decorative. */
  title?: string;
};

/** The Afrokan Labs mark, redrawn as a single vector stroke from the original logo. */
export const MARK_PATH =
  "M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922";

export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="105 115 1100 990"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d={MARK_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={165}
        strokeLinejoin="round"
      />
    </svg>
  );
}
