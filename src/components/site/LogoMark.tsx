/** The Afrokan Labs "A" mark (assets/brand/logo-mark-*.svg), in currentColor. */
export function LogoMark({
  className,
  strokeWidth = 165,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg className={className} viewBox="105 115 1100 990" aria-hidden="true">
      <path
        d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The WhatsApp glyph from the page's <symbol id="wa"> (WaSprite). */
export function WaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <use href="#wa" />
    </svg>
  );
}

/** Once per page (root layout): the symbol every WhatsApp icon uses. */
export function WaSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="wa" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c0 .2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"
        />
      </symbol>
    </svg>
  );
}
