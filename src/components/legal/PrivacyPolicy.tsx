import { Fragment } from "react";
import { TextLink } from "@/components/primitives/TextLink";
import type { Privacy } from "@/content/schema";
import styles from "./PrivacyPolicy.module.css";

type Props = Omit<Privacy, "approvedBy" | "description"> & {
  email: string;
  /** Formatted date, e.g. "2 October 2026". */
  lastUpdatedText: string;
};

/** Privacy page (docs/content/privacy.md). "{email}" in a paragraph becomes a mail link. */
export function PrivacyPolicy({
  title,
  intro,
  sections,
  lastUpdated,
  lastUpdatedText,
  email,
}: Props) {
  const withEmail = (text: string) =>
    text.split("{email}").map((part, i, all) => (
      <Fragment key={i}>
        {part}
        {i < all.length - 1 && <TextLink href={`mailto:${email}`}>{email}</TextLink>}
      </Fragment>
    ));

  return (
    <article className={styles.page}>
      <h1>{title}</h1>
      <p className={styles.intro}>{intro}</p>
      {sections.map((s) => (
        <section key={s.heading} className={styles.section}>
          <h2 className={styles.heading}>{s.heading}</h2>
          {s.paragraphs.map((p) => (
            <p key={p}>{withEmail(p)}</p>
          ))}
          {s.list && (
            <ul className={styles.list}>
              {s.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {s.after?.map((p) => (
            <p key={p}>{withEmail(p)}</p>
          ))}
        </section>
      ))}
      <p className={styles.updated}>
        {lastUpdated.label} <time dateTime={lastUpdated.date}>{lastUpdatedText}</time>
      </p>
    </article>
  );
}
