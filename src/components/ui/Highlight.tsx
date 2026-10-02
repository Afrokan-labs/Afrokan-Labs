import type { Heading } from "@/content/schema";
import styles from "./Highlight.module.css";

/** design-system §4: a lime block, rotated −2deg, behind one phrase. */
export function Highlight({ children }: { children: React.ReactNode }) {
  return <span className={styles.hl}>{children}</span>;
}

/** Renders a content Heading: lead, the highlighted phrase, then any tail. */
export function HeadingText({ lead, mark, tail }: Heading) {
  return (
    <>
      {lead && `${lead} `}
      <Highlight>{mark}</Highlight>
      {tail && ` ${tail}`}
    </>
  );
}
