import { ResponsiveImage, type ImageSource } from "@/components/primitives/ResponsiveImage";
import styles from "./VisualStrip.module.css";

type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sources: ImageSource[];
};

/**
 * design-system §8 VisualStrip: product screenshots, full width on desktop;
 * on mobile a horizontal scroll-snap row with a visible peek of the next panel.
 */
export function VisualStrip({ images }: { images: Image[] }) {
  return (
    <ul className={styles.strip}>
      {images.map((img) => (
        <li key={img.src} className={styles.panel}>
          <ResponsiveImage {...img} sizes="(max-width: 900px) 85vw, 400px" />
        </li>
      ))}
    </ul>
  );
}
