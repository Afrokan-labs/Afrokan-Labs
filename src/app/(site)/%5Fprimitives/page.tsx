/**
 * TEMPORARY: primitives reference page at /_primitives (BUILD_PLAN 2.1).
 * Delete before launch (BUILD_PLAN 5.1). The folder is named %5Fprimitives
 * because App Router folders starting with "_" are private and never routed.
 *
 * Variant names below are developer labels for this page only, not site copy.
 */
import type { Metadata } from "next";
import { ChatBubble } from "@/components/chat/ChatBubble";
import { ChatThread, type ChatMessage } from "@/components/chat/ChatThread";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Button } from "@/components/primitives/Button";
import { Container, Grid, Rule } from "@/components/primitives/Layout";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { StatusChip } from "@/components/primitives/StatusChip";
import { TextLink } from "@/components/primitives/TextLink";
import { trackingAttrs } from "@/lib/analytics";
import { getHome, getServices, getSite } from "@/lib/content";
import { demoOfferLink, whatsappLink } from "@/lib/whatsapp";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Primitives",
  robots: { index: false, follow: false },
};

// A 4:3 SVG so the image primitive has something to render before the pipeline (2.6) exists.
const SAMPLE_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#EEE9E1"/><path d="M40 260 L160 120 L240 200 L300 150 L360 260 Z" fill="#E2DCD3"/></svg>',
  );

// SAMPLE messages for testing ChatThread only. Not a real conversation, never
// shown on a public page; the hero uses the ESE-approved conversation once it exists.
const SAMPLE_THREAD: ChatMessage[] = [
  { speaker: "customer", text: "Sample customer message (test data)" },
  { speaker: "assistant", text: "Sample assistant reply (test data)" },
  { speaker: "customer", text: "Sample follow-up (test data)" },
  { speaker: "assistant", text: "Sample second reply (test data)" },
];
const SAMPLE_LABELS = { customer: "Customer:", assistant: "Assistant:" };

export default function PrimitivesPage() {
  const site = getSite();
  const home = getHome();
  const services = getServices();

  return (
    <main id="main" className={styles.page}>
      <Container>
        <MetaLabel>Internal · delete before launch</MetaLabel>
        <h1 className={styles.title}>Primitives</h1>

        <section className={styles.block} aria-labelledby="buttons">
          <SectionHeader id="buttons" number="01" label="Button" title="Buttons" />
          <div className={styles.row}>
            <Button {...whatsappLink({ location: "hero" })}>{home.hero.primaryCta}</Button>
            <Button variant="secondary" {...demoOfferLink()}>
              secondary
            </Button>
            <Button variant="ghost">ghost</Button>
            <Button disabled>disabled</Button>
          </div>
          <div className={styles.narrow}>
            <Button fullWidth {...whatsappLink({ location: "sticky" })}>
              {home.hero.primaryCta}
            </Button>
          </div>
        </section>

        <section className={styles.block} aria-labelledby="links">
          <SectionHeader id="links" number="02" label="TextLink" title="Links" />
          <p>
            <TextLink
              standalone
              href="#links"
              {...trackingAttrs("case_study_click", { location: "hero" })}
            >
              {home.hero.secondaryLink}
            </TextLink>
          </p>
          <p>
            <TextLink
              standalone
              href={`mailto:${site.email}`}
              {...trackingAttrs("email_click", { location: "footer" })}
            >
              {site.email}
            </TextLink>
          </p>
          <p>
            <TextLink
              standalone
              href="https://example.com"
              external
              externalNote={site.ui.opensNewTab}
            >
              external
            </TextLink>
          </p>
        </section>

        <section className={styles.block} aria-labelledby="labels">
          <SectionHeader id="labels" number="03" label="MetaLabel · StatusChip" title="Labels" />
          <div className={styles.row}>
            <MetaLabel>accent</MetaLabel>
            <MetaLabel tone="muted">muted</MetaLabel>
          </div>
          <div className={styles.row}>
            <StatusChip status="live" labels={site.ui.status} />
            <StatusChip status="delivered" labels={site.ui.status} />
          </div>
        </section>

        <section className={styles.block} aria-labelledby="layout">
          <SectionHeader id="layout" number="04" label="Grid · Rule" title="Layout" />
          <Grid className={styles.gridDemo}>
            {services.items.map((s) => (
              <div key={s.kind} className={styles.cell}>
                <h3>{s.title}</h3>
              </div>
            ))}
          </Grid>
          <div className={styles.rules}>
            <Rule />
            <Rule variant="strong" />
          </div>
        </section>

        <section className={styles.block} aria-labelledby="image">
          <SectionHeader id="image" number="05" label="ResponsiveImage" title="Image" />
          <div className={styles.narrow}>
            <ResponsiveImage
              src={SAMPLE_IMAGE}
              alt="A flat illustration of hills"
              width={400}
              height={300}
            />
          </div>
        </section>

        <section className={styles.block} aria-labelledby="chat">
          <SectionHeader id="chat" number="06" label="ChatBubble · TypingIndicator" title="Chat" />
          <ol className={styles.chat}>
            <ChatBubble
              speaker="customer"
              speakerLabel="customer:"
              text="customer bubble"
              step={0}
            />
            <ChatBubble
              speaker="assistant"
              speakerLabel="assistant:"
              text="assistant bubble"
              step={1}
            />
            <TypingIndicator />
          </ol>
          <div className={styles.threads}>
            <div data-test="animated">
              <MetaLabel tone="muted">ChatThread · animated</MetaLabel>
              <ChatThread
                animate
                messages={SAMPLE_THREAD}
                caption="Sample caption (test data)"
                speakerLabels={SAMPLE_LABELS}
              />
            </div>
            <div data-test="static">
              <MetaLabel tone="muted">ChatThread · static</MetaLabel>
              <ChatThread
                animate={false}
                messages={SAMPLE_THREAD}
                caption="Sample caption (test data)"
                speakerLabels={SAMPLE_LABELS}
              />
            </div>
            {/* Displayed-instance check: an animated copy that is display:none must not run timers. */}
            <div data-test="hidden" hidden>
              <ChatThread
                animate
                messages={SAMPLE_THREAD}
                caption="Sample caption (test data)"
                speakerLabels={SAMPLE_LABELS}
              />
            </div>
          </div>
        </section>
      </Container>

      <section className={styles.dark} aria-labelledby="on-dark">
        <Container>
          <h2 id="on-dark">{home.contact.title}</h2>
          <div className={styles.row}>
            <Button variant="onDark" {...whatsappLink({ location: "contact" })}>
              {home.hero.primaryCta}
            </Button>
            <TextLink
              standalone
              tone="onDark"
              href={`mailto:${site.email}`}
              {...trackingAttrs("email_click", { location: "contact" })}
            >
              {site.email}
            </TextLink>
            <MetaLabel tone="onDark">{site.location}</MetaLabel>
          </div>
          <Rule variant="onDark" />
        </Container>
      </section>
    </main>
  );
}
