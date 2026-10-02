import { SiteHeader } from "@/components/layout/SiteHeader";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { Burst, Spark, Swirl, Tail, Ticks } from "@/components/ui/icons";
import type { HomeData } from "@/lib/home";
import styles from "./Hero.module.css";

type Props = HomeData["hero"];

/**
 * reference §1: the white hero card with the pill nav inside, the centred
 * headline (the LCP element, server-rendered text), and the three-column
 * stage: lede, portrait with the CTA group, and the badge.
 */
export function Hero({
  header,
  introId,
  headline,
  lede,
  workLink,
  ctaId,
  startProject,
  whatsapp,
  badge,
  photo,
}: Props) {
  const { label: whatsappLabel, srNote, ...whatsappAttrs } = whatsapp;
  return (
    <div className={styles.hero} id="top">
      <SiteHeader {...header} inCard />

      <div className={styles.h1Row} id={introId} tabIndex={-1}>
        <Burst className={styles.burst} />
        <h1 className={styles.h1}>
          {headline}
          <Tail className={styles.tail} />
        </h1>
      </div>

      <div className={styles.stage}>
        <div className={styles.left}>
          <Ticks className={styles.ticks} />
          <p className={styles.lede}>{lede}</p>
          <a className={styles.ghost} href={workLink.href}>
            {workLink.label}
          </a>
        </div>

        <div className={styles.photo}>
          <div className={styles.circle} aria-hidden="true" />
          <div className={styles.person}>
            <ResponsiveImage
              {...photo}
              priority
              sizes="(max-width: 900px) 70vw, 330px"
              className={styles.personImg}
            />
          </div>
          <Swirl className={styles.swirl} />
          <div className={styles.ctas} id={ctaId}>
            <a className={styles.go} href={startProject.href}>
              {startProject.label}
            </a>
            <a {...whatsappAttrs}>
              {whatsappLabel}
              <span className="sr-only"> {srNote}</span>
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.sparks} aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Spark key={i} />
            ))}
          </div>
          <span className={styles.big}>{badge.title}</span>
          <span className={styles.small}>{badge.line}</span>
        </div>
      </div>
      <div className={styles.foot} aria-hidden="true" />
    </div>
  );
}
