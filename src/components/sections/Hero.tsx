import { ChatThread, type ChatMessage } from "@/components/chat/ChatThread";
import { Button } from "@/components/primitives/Button";
import { StatusChip } from "@/components/primitives/StatusChip";
import { TextLink } from "@/components/primitives/TextLink";
import type { TrackingAttrs } from "@/lib/analytics";
import type { WhatsAppLinkProps } from "@/lib/whatsapp";
import styles from "./Hero.module.css";

type Props = {
  headline: string;
  subhead: string;
  cta: WhatsAppLinkProps & { label: string };
  /** Omitted when no project is published (architecture §4). */
  proof?: {
    line: string;
    status: "live" | "delivered";
    statusLabels: { live: string; delivered: string };
  };
  /** "See the case study", omitted when no project is published. */
  caseStudy?: { href: string; label: string; tracking: TrackingAttrs };
  /** Shown from 1024px only, and only once a conversation is approved. */
  conversation?: {
    messages: ChatMessage[];
    caption: string;
    speakerLabels: { customer: string; assistant: string };
  };
};

/**
 * design-system §8 Hero. Server-rendered: the headline is the LCP element and
 * never waits for JS. ChatThread is the only client island, desktop only.
 */
export function Hero({ headline, subhead, cta, proof, caseStudy, conversation }: Props) {
  const { label: ctaLabel, ...ctaLink } = cta;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner} ${conversation ? styles.withChat : ""}`}>
        <div className={styles.text}>
          <h1 id="hero-title">{headline}</h1>
          <p className={styles.subhead}>{subhead}</p>

          {proof && (
            <p className={styles.proof}>
              <StatusChip status={proof.status} labels={proof.statusLabels} />
              <span>{proof.line}</span>
            </p>
          )}

          <div className={styles.actions}>
            <Button {...ctaLink}>{ctaLabel}</Button>
            {caseStudy && (
              <TextLink standalone arrow href={caseStudy.href} {...caseStudy.tracking}>
                {caseStudy.label}
              </TextLink>
            )}
          </div>
        </div>

        {conversation && (
          <div className={styles.device}>
            <ChatThread
              animate
              messages={conversation.messages}
              caption={conversation.caption}
              speakerLabels={conversation.speakerLabels}
            />
          </div>
        )}
      </div>
    </section>
  );
}
