import styles from "./ChatBubble.module.css";

type Props = {
  speaker: "customer" | "assistant";
  /** Read before the text by screen readers, e.g. "Customer:". */
  speakerLabel: string;
  text: string;
  /** Position in the thread; ChatThread's CSS uses it to sequence the animation. */
  step: number;
  /** While the thread animates, marks bubbles that have arrived (data-shown). */
  shown?: boolean;
};

/** design-system §8 ChatThread item. Customer left on --surface-2, assistant right on --chat-assistant. */
export function ChatBubble({ speaker, speakerLabel, text, step, shown }: Props) {
  return (
    <li
      className={`${styles.bubble} ${styles[speaker]}`}
      data-step={step}
      data-shown={shown ? "" : undefined}
    >
      <span className="sr-only">{speakerLabel} </span>
      {text}
    </li>
  );
}
