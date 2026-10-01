import styles from "./ResponsiveImage.module.css";

export type ImageSource = { type: "image/avif" | "image/webp"; srcSet: string };

type Props = {
  src: string;
  /** Required. Describe what the image shows, or "" if it is purely decorative. */
  alt: string;
  /** Required so the layout holds before the image loads (no layout shift). */
  width: number;
  height: number;
  /** AVIF/WebP sources from the image pipeline (BUILD_PLAN 2.6). */
  sources?: ImageSource[];
  sizes?: string;
  /** Above-the-fold images load eagerly; everything else is lazy. */
  priority?: boolean;
  className?: string;
};

/** design-system §11: <picture> with explicit dimensions. Use instead of next/image. */
export function ResponsiveImage(props: Props) {
  const { src, alt, width, height, sources = [], sizes, priority, className } = props;
  return (
    <picture className={styles.picture}>
      {sources.map((s) => (
        <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />
      ))}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className={[styles.img, className].filter(Boolean).join(" ")}
      />
    </picture>
  );
}
