import type { ReactNode } from "react";
import { MetaLabel } from "@/components/primitives/MetaLabel";
import styles from "./FieldList.module.css";

export type Field = { label: string; value: ReactNode };

/** design-system §8 Dossier FieldList: mono field labels over values. 2×2 on mobile. */
export function FieldList({ fields }: { fields: Field[] }) {
  return (
    <dl className={styles.list}>
      {fields.map((f) => (
        <div key={f.label} className={styles.field}>
          <MetaLabel as="dt" tone="muted">
            {f.label}
          </MetaLabel>
          <dd className={styles.value}>{f.value}</dd>
        </div>
      ))}
    </dl>
  );
}
