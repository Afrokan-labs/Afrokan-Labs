"use client";

import { useEffect } from "react";

/** The drag strip: a mouse drags it sideways. Touch and keyboard scroll it natively. */
export function AboutScripts() {
  useEffect(() => {
    const track = document.getElementById("dstrack");
    if (!track) return;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      dragging = true;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add("dragging");
      track.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (dragging) track.scrollLeft = startLeft - (e.clientX - startX);
    };
    const up = () => {
      dragging = false;
      track.classList.remove("dragging");
    };
    track.addEventListener("pointerdown", down);
    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", up);
    track.addEventListener("pointercancel", up);
    return () => {
      track.removeEventListener("pointerdown", down);
      track.removeEventListener("pointermove", move);
      track.removeEventListener("pointerup", up);
      track.removeEventListener("pointercancel", up);
    };
  }, []);
  return null;
}
