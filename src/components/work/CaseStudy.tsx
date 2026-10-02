import type { ReactNode } from "react";
import { ChatThread } from "@/components/chat/ChatThread";
import { Button } from "@/components/primitives/Button";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import { StatusChip } from "@/components/primitives/StatusChip";
import type { CaseStudyData } from "@/lib/case-study";
import { Dossier } from "./Dossier";
import { PullQuote } from "./PullQuote";
import { VisualStrip } from "./VisualStrip";
import styles from "./CaseStudy.module.css";

type Props = Omit<CaseStudyData, "sticky" | "seo"> & {
  /** The compiled MDX body: the problem and what we built. */
  body: ReactNode;
};

/**
 * Case study page (case-studies/ese-logistics.md, Page structure): client and
 * context, problem, what we built, how it works, result, testimonial, CTA.
 * Blocks without confirmed data are omitted, never shown empty.
 */
export function CaseStudy(props: Props) {
  const { title, client, attribution, fields, status, built, body } = props;
  const { howItWorks, result, testimonial, cta } = props;
  const { label: ctaLabel, ...ctaLink } = cta.button;

  return (
    <article className={styles.page}>
      <header className={`container ${styles.header}`}>
        <MetaLabel as="p">{client}</MetaLabel>
        <h1>{title}</h1>
        {attribution && <p className={styles.attribution}>{attribution}</p>}
      </header>

      <div className="container">
        <Dossier
          fields={[
            ...fields,
            {
              label: status.label,
              value: <StatusChip status={status.status} labels={status.labels} />,
            },
            { label: built.label, value: built.values.join(", ") },
          ]}
        >
          <div className={styles.prose}>{body}</div>
        </Dossier>
      </div>

      {howItWorks && (
        <section className={`container ${styles.block}`} aria-labelledby="how-it-works">
          <h2 id="how-it-works">{howItWorks.heading}</h2>
          {howItWorks.conversation && (
            <div className={styles.chat}>
              <ChatThread animate={false} {...howItWorks.conversation} />
            </div>
          )}
          {howItWorks.images.length > 0 && <VisualStrip images={howItWorks.images} />}
        </section>
      )}

      {result && (
        <section className={`container ${styles.block}`} aria-labelledby="result">
          <h2 id="result">{result.heading}</h2>
          <p className={styles.result}>{result.text}</p>
        </section>
      )}

      {testimonial && (
        <div className={`container ${styles.block}`}>
          <PullQuote {...testimonial} />
        </div>
      )}

      <section id={cta.id} className={`container ${styles.cta}`} aria-labelledby="cta-title">
        <h2 id="cta-title">{cta.title}</h2>
        <Button {...ctaLink}>{ctaLabel}</Button>
      </section>
    </article>
  );
}
