import { Button } from "@/components/primitives/Button";
import type { HomeData } from "@/lib/home";
import styles from "./OfferBand.module.css";

type Props = NonNullable<HomeData["offer"]>;

/** Demo offer (copy §2b), a lime card. The page renders it only when site.demoOffer.enabled. */
export function OfferBand({ title, body, cta }: Props) {
  const { label, ...link } = cta;
  return (
    <section className={styles.band} aria-labelledby="offer-title">
      <div className={styles.text}>
        <h2 id="offer-title" className={styles.title}>
          {title}
        </h2>
        <p>{body}</p>
      </div>
      <Button variant="white" {...link}>
        {label}
      </Button>
    </section>
  );
}
