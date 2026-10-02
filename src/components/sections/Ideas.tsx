import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { Bulb, Star4 } from "@/components/ui/icons";
import type { HomeData } from "@/lib/home";
import styles from "./Ideas.module.css";

type Props = HomeData["ideas"];

/** reference §3: split header, the wide team photo with its banner, the tall portrait. */
export function Ideas({ title, body, banner, wide, tall }: Props) {
  return (
    <section className={styles.ideas} id="ideas" aria-labelledby="ideas-title">
      <div className={styles.head}>
        <h2 id="ideas-title" className={styles.h2}>
          {title}
        </h2>
        <p>{body}</p>
      </div>
      <div className={styles.grid}>
        <div className={styles.wide}>
          <Star4 className={styles.star} />
          <div className={styles.clip}>
            <ResponsiveImage
              {...wide}
              sizes="(max-width: 760px) 100vw, 680px"
              className={styles.img}
            />
          </div>
          <p className={styles.banner}>
            <span>{banner}</span>
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </p>
        </div>
        <div className={styles.tall}>
          <ResponsiveImage
            {...tall}
            sizes="(max-width: 760px) 100vw, 400px"
            className={styles.img}
          />
          <Bulb className={styles.bulb} />
        </div>
      </div>
    </section>
  );
}
