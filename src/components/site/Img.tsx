import { getImage } from "@/lib/images";

type Props = {
  /** File name in assets/images/, e.g. "home-ideas-team.webp". */
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Above-the-fold images load eagerly with high priority; the rest are lazy. */
  priority?: boolean;
  /** Above the fold but not the LCP element: eager, at normal priority. */
  eager?: boolean;
};

/**
 * An image from the pipeline (AVIF/WebP at several widths, explicit size).
 * The <picture> is display: contents, so the reference's selectors and
 * absolute positioning apply to the <img> exactly as in the handoff files.
 */
export function Img({ src, alt, className, sizes = "100vw", priority, eager }: Props) {
  const img = getImage(`assets/images/${src}`);
  return (
    <picture style={{ display: "contents" }}>
      {img.sources.map((s) => (
        <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />
      ))}
      <img
        className={className}
        src={img.src}
        alt={alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        loading={priority || eager ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}
