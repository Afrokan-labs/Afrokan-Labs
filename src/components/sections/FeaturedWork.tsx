import { Button } from "@/components/primitives/Button";
import { StatusChip } from "@/components/primitives/StatusChip";
import { HeadingText } from "@/components/ui/Highlight";
import { SectionPanel } from "@/components/ui/SectionPanel";
import type { HomeData } from "@/lib/home";
import styles from "./FeaturedWork.module.css";

type Props = NonNullable<HomeData["featuredWork"]>;

/**
 * reference §5: the "CASE STUDY" panel. Fact cards come from the project;
 * the result block is omitted unless confirmed (CLAUDE.md content rules).
 */
export function FeaturedWork({
  id,
  tab,
  heading,
  title,
  body,
  client,
  industry,
  status,
  built,
  result,
  caseStudy,
  whatsapp,
}: Props) {
  const { label: whatsappLabel, ...whatsappAttrs } = whatsapp;
  return (
    <SectionPanel id={id} labelledBy="work-title" tab={tab} className={styles.panel}>
      <div className={styles.grid}>
        <div className={styles.main}>
          <h2 id="work-title" className={styles.h2}>
            <HeadingText {...heading} />
          </h2>
          <h3 className={styles.title}>{title}</h3>
          <p>{body}</p>
          {result && (
            <p className={styles.result}>
              <span className={styles.resultLabel}>{result.label}</span> {result.text}
            </p>
          )}
          <div className={styles.btns}>
            <Button href={caseStudy.href} {...caseStudy.tracking}>
              {caseStudy.label}
            </Button>
            <Button variant="line" {...whatsappAttrs}>
              {whatsappLabel}
            </Button>
          </div>
        </div>
        <dl className={styles.facts}>
          <div className={`${styles.fact} ${styles.wide}`}>
            <dt>{client.label}</dt>
            <dd>{client.value}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{industry.label}</dt>
            <dd>{industry.value}</dd>
          </div>
          <div className={styles.fact}>
            <dt>{status.label}</dt>
            <dd>
              <StatusChip status={status.status} labels={status.labels} />
            </dd>
          </div>
          <div className={`${styles.fact} ${styles.wide}`}>
            <dt>{built.label}</dt>
            <dd className={styles.tags}>
              {built.values.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </SectionPanel>
  );
}
