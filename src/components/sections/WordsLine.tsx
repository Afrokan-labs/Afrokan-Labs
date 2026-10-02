import { Star4, STAR4_PATH } from "@/components/ui/icons";
import type { HomeData } from "@/lib/home";
import styles from "./WordsLine.module.css";

type Props = HomeData["words"];

/**
 * reference §6: three Unbounded words fitted to the full width with
 * textLength, so the line fills edge to edge at every size.
 */
export function WordsLine({ label, items }: Props) {
  const [a, b, c] = items;
  return (
    <section className={styles.words} aria-label={label}>
      <svg className={styles.line} viewBox="0 0 1000 104" role="img" aria-label={label}>
        <text x="0" y="82" fontSize="78" textLength="300" lengthAdjust="spacingAndGlyphs">
          {a}
        </text>
        <path className={styles.star} transform="translate(315 34) scale(.3)" d={STAR4_PATH} />
        <text x="360" y="82" fontSize="78" textLength="268" lengthAdjust="spacingAndGlyphs">
          {b}
        </text>
        <path className={styles.star} transform="translate(643 34) scale(.3)" d={STAR4_PATH} />
        <text x="688" y="82" fontSize="78" textLength="312" lengthAdjust="spacingAndGlyphs">
          {c}
        </text>
      </svg>
      <div className={styles.divider} aria-hidden="true">
        <Star4 />
      </div>
    </section>
  );
}
