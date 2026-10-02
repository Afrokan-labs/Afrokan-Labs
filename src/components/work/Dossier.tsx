import type { ReactNode } from "react";
import { FieldList, type Field } from "./FieldList";
import styles from "./Dossier.module.css";

/**
 * design-system §8 Dossier on --surface-2: FieldList beside the narrative
 * (4/8 columns on desktop, 2×2 fields above the narrative on mobile).
 */
export function Dossier({ fields, children }: { fields: Field[]; children: ReactNode }) {
  return (
    <div className={styles.dossier}>
      <div className={styles.fields}>
        <FieldList fields={fields} />
      </div>
      <div className={styles.narrative}>{children}</div>
    </div>
  );
}
