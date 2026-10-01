import styles from "./ChatBubble.module.css";

type Props = {
  speaker: "customer" | "assistant";
  /** Read before the text by screen readers, e.g. "Customer:". */
  speakerLabel: string;
  text: string;
  /** Position in the thread; ChatThread uses it to sequence the animation. */
  step: number;
};

/** design-system §8 ChatThread item. Customer left on --surface-2, assistant right on --chat-assistant. */
export function ChatBubble({ speaker, speakerLabel, text, step }: Props) {
  return (
    <li className={`${styles.bubble} ${styles[speaker]}`} data-step={step}>
      <span className="sr-only">{speakerLabel} </span>
      {text}
    </li>
  );
}
