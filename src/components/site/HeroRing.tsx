"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "./LogoMark";

type Kind = "lab" | "pic" | "dark" | "blank";
type Icon = "chat" | "ok" | "dash" | "flow" | "web";
/** The chip behind a label panel's icon: Afrokan Green, the deep green, or Ink. */
type Chip = "lime" | "deep" | "ink";

/**
 * The prototype's P array, value for value: [row (-1 upper, 1 lower), start
 * angle in degrees (0 faces the viewer), kind, width, height (fractions of the
 * portrait's width S)], then a label panel's copy index, icon and chip, or a
 * picture panel's picture index.
 */
const P: [number, number, Kind, number, number, ([number, Icon, Chip] | number)?][] = [
  [-1, -62, "lab", 0.44, 0.16, [0, "chat", "lime"]],
  [-1, -8, "lab", 0.44, 0.16, [1, "ok", "lime"]],
  [-1, 46, "lab", 0.44, 0.16, [2, "dash", "deep"]],
  [-1, 95, "blank", 0.2, 0.26],
  [-1, 145, "blank", 0.26, 0.2],
  [-1, 195, "blank", 0.24, 0.22],
  [-1, 248, "pic", 0.24, 0.24, 0],
  [1, -82, "pic", 0.24, 0.27, 1],
  [1, -24, "lab", 0.44, 0.16, [3, "flow", "ink"]],
  [1, 30, "blank", 0.22, 0.22],
  [1, 78, "dark", 0.22, 0.24],
  [1, 128, "pic", 0.24, 0.22, 2],
  [1, 180, "blank", 0.26, 0.2],
  [1, 232, "lab", 0.44, 0.16, [4, "web", "deep"]],
];

const ICONS: Record<Icon, React.ReactNode> = {
  chat: (
    <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9h18" />
    </>
  ),
  flow: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 9l1.5 1.5L12 8M8 14l1.5 1.5L12 13M14 9.5h2M14 14.5h2" />
    </>
  ),
  dash: <path d="M4 20V10M10 20V4M16 20v-7" />,
  ok: <path d="M5 12.5 10 17l9-10" />,
};

/** Each panel's angle on the ring (the lower row is offset 14deg, as in the prototype). */
const angle = ([row, a]: (typeof P)[number]) => a + (row > 0 ? 14 : 0);
/** A panel faces the viewer while cos(angle) > -0.12; behind the head otherwise. */
const isFront = (deg: number) => Math.cos((deg * Math.PI) / 180) > -0.12;

/** Spin per frame (0.05deg) and per dragged pixel (0.3deg), from the prototype. */
const SPEED = 0.05;
const DRAG = 0.3;

type Props = {
  /** The ring's accessible name, listing the services. */
  label: string;
  /** The five label panels' copy, in ring order. */
  panels: { title: string; body: string }[];
  /** The three picture panels' images (server-rendered <Img>s). */
  pictures: React.ReactNode[];
  /** The portrait (server-rendered, the LCP image) between the ring's two layers. */
  children: React.ReactNode;
};

/**
 * Update 7 §3: a CSS 3D ring of glass panels round the portrait's head. Every
 * panel sits in both layers, the back one (behind the portrait) and the front
 * one; only the copy on the side it's facing shows. One custom property (--rot)
 * turns the whole ring. It spins while on screen, pauses under the pointer,
 * follows a sideways drag, and stays still under prefers-reduced-motion.
 */
export function HeroRing({ label, panels, pictures, children }: Props) {
  const subject = useRef<HTMLDivElement>(null);
  const hit = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = subject.current;
    const area = hit.current;
    if (!el || !area) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = [...el.querySelectorAll<HTMLElement>(".hx-rot")];
    const [back, front] = layers.map((l) => [...l.children] as HTMLElement[]);
    const facing = P.map((p) => isFront(angle(p)));
    let rot = 0;
    let hover = false;
    let drag = false;
    let lastX = 0;
    let raf = 0;
    let onScreen = false;

    const draw = () => {
      el.style.setProperty("--rot", `${rot}deg`);
      P.forEach((p, i) => {
        const f = isFront(angle(p) + rot);
        if (f === facing[i]) return;
        facing[i] = f;
        front[i].toggleAttribute("data-off", !f);
        back[i].toggleAttribute("data-off", f);
      });
    };
    const frame = () => {
      raf = 0;
      if (!hover && !drag) rot += SPEED;
      draw();
      if (onScreen) raf = requestAnimationFrame(frame);
    };
    // Frames run only while the hero is on screen.
    const seen = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting && !reduce;
      if (onScreen && !raf) raf = requestAnimationFrame(frame);
    });
    seen.observe(el);

    const enter = () => (hover = true);
    const leave = () => {
      hover = false;
      drag = false;
      area.classList.remove("drag");
    };
    const down = (e: PointerEvent) => {
      drag = true;
      lastX = e.clientX;
      area.setPointerCapture(e.pointerId);
      area.classList.add("drag");
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      rot += (e.clientX - lastX) * DRAG;
      lastX = e.clientX;
      if (!onScreen) draw();
    };
    const up = () => {
      drag = false;
      area.classList.remove("drag");
    };
    area.addEventListener("pointerenter", enter);
    area.addEventListener("pointerleave", leave);
    area.addEventListener("pointerdown", down);
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerup", up);
    area.addEventListener("pointercancel", up);
    return () => {
      seen.disconnect();
      cancelAnimationFrame(raf);
      area.removeEventListener("pointerenter", enter);
      area.removeEventListener("pointerleave", leave);
      area.removeEventListener("pointerdown", down);
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerup", up);
      area.removeEventListener("pointercancel", up);
    };
  }, []);

  const layer = (side: "back" | "front") =>
    P.map((p, i) => {
      const [row, , kind, w, h, x] = p;
      const off = isFront(angle(p)) !== (side === "front");
      const style = {
        "--a": `${angle(p)}deg`,
        "--row": row,
        "--w": w,
        "--h": h,
        // Non-label panels sit slightly further from the ring's middle line.
        "--dy": kind === "lab" ? 0 : row * 0.015,
      } as React.CSSProperties;
      let content: React.ReactNode = null;
      if (kind === "lab" && Array.isArray(x)) {
        const [copy, icon, chip] = x;
        content = (
          <>
            <span className={`hx-chip ${chip}`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[icon]}
              </svg>
            </span>
            <b>{panels[copy].title}</b>
            <span>{panels[copy].body}</span>
          </>
        );
      } else if (kind === "pic" && typeof x === "number") content = pictures[x];
      else if (kind === "dark") content = <LogoMark />;
      return (
        <div
          key={i}
          className={kind === "blank" ? "hx-p" : `hx-p ${kind}`}
          style={style}
          data-off={off || undefined}
        >
          {content}
        </div>
      );
    });

  return (
    <>
      <div className="hx-subject" ref={subject}>
        <div className="hx-ring back" aria-hidden="true">
          <div className="hx-rot">{layer("back")}</div>
        </div>
        {children}
        <div className="hx-ring front" role="img" aria-label={label}>
          <div className="hx-rot" aria-hidden="true">
            {layer("front")}
          </div>
        </div>
      </div>
      <div className="hx-hit" ref={hit} aria-hidden="true" />
    </>
  );
}
