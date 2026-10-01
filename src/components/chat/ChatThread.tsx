"use client";

import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "./ChatBubble";
import styles from "./ChatThread.module.css";
import { TypingIndicator } from "./TypingIndicator";

export type ChatMessage = { speaker: "customer" | "assistant"; text: string };

type Props = {
  messages: ChatMessage[];
  /** "A real exchange with ESE's live assistant." (tier-derived). */
  caption: string;
  speakerLabels: { customer: string; assistant: string };
  /**
   * true: the hero copy (≥1024px), plays once on load.
   * false: the Featured work copy (<1024px), rendered complete, never animates.
   */
  animate: boolean;
  className?: string;
};

type ThreadState = "idle" | "animating" | "complete";

/** design-system §8: the typing indicator, then the reply, takes about 1.5s. */
const MESSAGE_MS = 1500;

/**
 * design-system §8 ChatThread. The whole conversation is in the server HTML.
 * Later bubbles are hidden by CSS before first paint, and only when scripts
 * run and motion is allowed (ChatThread.module.css), with a 4s CSS failsafe.
 * Before starting any timers this component checks, in order:
 *   1. it is the copy actually displayed at this width;
 *   2. reduced motion, scripting support, and whether the failsafe already fired.
 * If any check fails it goes straight to the complete state.
 */
export function ChatThread({ messages, caption, speakerLabels, animate, className }: Props) {
  const listRef = useRef<HTMLOListElement>(null);
  // Hydrates in the same state the server rendered, so there is no mismatch.
  const [state, setState] = useState<ThreadState>(animate ? "idle" : "complete");
  const [shownCount, setShownCount] = useState(1);
  const [typingTop, setTypingTop] = useState<number | null>(null);

  useEffect(() => {
    if (!animate) return;
    const list = listRef.current;
    if (!list) return;

    // Displayed-instance check: the other copy is display:none at this width.
    // A hidden copy never runs timers; it shows the full thread if it is
    // revealed later by a resize, rather than restarting.
    if (list.offsetParent === null) {
      setState("complete");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Browsers without the `scripting` media feature never hid the bubbles,
    // so animating them now would cause the flash this pattern prevents.
    const hiddenByCss = window.matchMedia("(scripting: enabled)").matches;
    // If hydration arrived after the 4s failsafe fired, the visitor is already
    // reading the full thread. Hiding it again to animate would cause the same flash.
    const bubbles = list.querySelectorAll<HTMLElement>("[data-step]");
    const lastBubble = bubbles[bubbles.length - 1];
    const alreadyRevealed = !!lastBubble && getComputedStyle(lastBubble).opacity === "1";

    if (reduce || !hiddenByCss || alreadyRevealed) {
      setState("complete");
      return;
    }
    setState("animating");

    // Each later message: wait (with the typing indicator for assistant
    // replies), then arrive over --dur-slow.
    const arrivalMs = parseFloat(getComputedStyle(list).getPropertyValue("--dur-slow")) || 0;
    const timers: number[] = [];
    let at = 0;
    for (let i = 1; i < messages.length; i++) {
      const bubble = bubbles[i];
      if (messages[i].speaker === "assistant") {
        timers.push(window.setTimeout(() => setTypingTop(bubble.offsetTop), at));
      }
      at += MESSAGE_MS - arrivalMs;
      timers.push(
        window.setTimeout(() => {
          setTypingTop(null);
          setShownCount(i + 1);
        }, at),
      );
      at += arrivalMs;
    }
    timers.push(window.setTimeout(() => setState("complete"), at));

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [animate, messages]);

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")}>
      <ol ref={listRef} className={styles.thread} data-state={state}>
        {messages.map((m, i) => (
          <ChatBubble
            key={i}
            step={i}
            speaker={m.speaker}
            speakerLabel={speakerLabels[m.speaker]}
            text={m.text}
            shown={state === "animating" && i < shownCount}
          />
        ))}
        {state === "animating" && typingTop !== null && (
          // Overlays the next bubble's reserved slot, so nothing shifts.
          <TypingIndicator className={styles.typing} style={{ top: typingTop }} />
        )}
      </ol>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
