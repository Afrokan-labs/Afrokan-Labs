import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { HeadingText } from "@/components/ui/Highlight";
import { ArrowUpRight } from "@/components/ui/icons";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { HomeData } from "@/lib/home";
import { ServiceAccordion } from "./ServiceAccordion";
import styles from "./Services.module.css";

type Props = HomeData["services"];

/** reference §4: the "WHAT WE DO" panel: accordion rows, the photo with its ring, two link cards. */
export function Services({ id, tab, heading, body, items, image, ring, cards }: Props) {
  return (
    <SectionPanel id={id} labelledBy="services-title" tab={tab} className={styles.panel}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <h2 id="services-title" className={styles.h2}>
            <HeadingText {...heading} />
          </h2>
          <p>{body}</p>
          <ServiceAccordion items={items} />
        </div>

        <div className={styles.photo}>
          <ResponsiveImage
            {...image}
            sizes="(max-width: 560px) 100vw, 360px"
            className={styles.img}
          />
          <svg className={styles.ring} viewBox="0 0 200 200" aria-hidden="true">
            <defs>
              <path id="ring-path" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1 -148 0" />
            </defs>
            <g>
              <ellipse
                cx="100"
                cy="100"
                rx="86"
                ry="86"
                fill="none"
                stroke="currentColor"
                strokeWidth=".8"
                strokeDasharray="2 5"
                opacity=".6"
              />
              <text fontSize="11" fontWeight="500" fill="currentColor" letterSpacing="1.5">
                <textPath href="#ring-path">{ring}</textPath>
              </text>
            </g>
          </svg>
        </div>

        <div className={styles.side}>
          <a className={`${styles.mini} ${styles.miniDark}`} href={cards.process.href}>
            <span className={styles.miniText}>{cards.process.text}</span>
            <span className={styles.foot}>
              <b>{cards.process.label}</b>
              <span className={styles.circ}>
                <ArrowUpRight />
              </span>
            </span>
          </a>
          <a className={`${styles.mini} ${styles.miniLime}`} href={cards.contact.href}>
            <span className={styles.miniText}>{cards.contact.text}</span>
            <span className={styles.foot}>
              <b>{cards.contact.label}</b>
              <span className={styles.circ}>
                <ArrowUpRight />
              </span>
            </span>
          </a>
        </div>
      </div>
    </SectionPanel>
  );
}
