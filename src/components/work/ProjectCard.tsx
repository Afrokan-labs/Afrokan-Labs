import { MetaLabel } from "@/components/primitives/MetaLabel";
import { StatusChip } from "@/components/primitives/StatusChip";
import { TextLink } from "@/components/primitives/TextLink";
import type { WorkIndexData } from "@/lib/work";
import { Dossier } from "./Dossier";
import styles from "./ProjectCard.module.css";

type Props = WorkIndexData["projects"][number];

/**
 * One project on the work index. With a single project it spans the full
 * width as a dossier (design-system §9): no fake grid, no filler line.
 */
export function ProjectCard({ slug, title, client, fields, status, built, summary, link }: Props) {
  return (
    <article className={styles.card} aria-labelledby={`project-${slug}`}>
      <div className={styles.head}>
        <MetaLabel as="p">{client}</MetaLabel>
        <h2 id={`project-${slug}`}>{title}</h2>
      </div>
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
        <p className={styles.summary}>{summary}</p>
        <TextLink standalone arrow href={link.href}>
          {link.label}
        </TextLink>
      </Dossier>
    </article>
  );
}
