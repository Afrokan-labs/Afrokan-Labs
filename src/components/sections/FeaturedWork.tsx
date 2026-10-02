import { ChatThread } from "@/components/chat/ChatThread";
import { Button } from "@/components/primitives/Button";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { StatusChip } from "@/components/primitives/StatusChip";
import { TextLink } from "@/components/primitives/TextLink";
import { FieldList } from "@/components/work/FieldList";
import { PullQuote } from "@/components/work/PullQuote";
import type { HomeData } from "@/lib/home";
import styles from "./FeaturedWork.module.css";

type Props = NonNullable<HomeData["featuredWork"]>;

/**
 * design-system §8 FeaturedWork: Dossier (FieldList, Narrative, PullQuote) on
 * --surface-2, the static ChatThread below 1024px, then the CTAs. Result and
 * testimonial blocks render only when they exist (full tier).
 */
export function FeaturedWork(props: Props) {
  const { eyebrow, title, fields, status, built, body, result, testimonial, conversation } = props;
  const { label: whatsappLabel, ...whatsappLinkProps } = props.whatsapp;

  return (
    <section className={styles.section} aria-labelledby="featured-title">
      <div className="container">
        <SectionHeader id="featured-title" label={eyebrow} title={title} />

        <div className={styles.dossier}>
          <div className={styles.fields}>
            <FieldList
              fields={[
                ...fields,
                {
                  label: status.label,
                  value: <StatusChip status={status.status} labels={status.labels} />,
                },
                { label: built.label, value: built.values.join(", ") },
              ]}
            />
          </div>

          <div className={styles.narrative}>
            <p className={styles.body}>{body}</p>

            {result && (
              <div className={styles.result}>
                <MetaLabel as="p" tone="muted">
                  {result.label}
                </MetaLabel>
                <p className={styles.resultText}>{result.text}</p>
              </div>
            )}

            {testimonial && <PullQuote {...testimonial} />}
          </div>
        </div>

        {conversation && (
          // The static copy of the conversation: below 1024px only (§8 placement).
          <div className={styles.chat}>
            <ChatThread
              animate={false}
              messages={conversation.messages}
              caption={conversation.caption}
              speakerLabels={conversation.speakerLabels}
            />
          </div>
        )}

        <div className={styles.actions}>
          <TextLink standalone arrow href={props.caseStudy.href} {...props.caseStudy.tracking}>
            {props.caseStudy.label}
          </TextLink>
          <Button variant="secondary" {...whatsappLinkProps}>
            {whatsappLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
