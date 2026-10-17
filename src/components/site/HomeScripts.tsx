"use client";

import { useEffect } from "react";
import type { Home } from "@/content/schema";
import { CONTACT_PREFILL_KEY } from "@/lib/contact-fields";

const A =
  '<svg viewBox="105 115 1100 990"><path d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922" fill="none" stroke="currentColor" stroke-width="150" stroke-linejoin="round"/></svg>';
const WA = '<svg viewBox="0 0 24 24"><use href="#wa"/></svg>';
const CHAT =
  '<svg viewBox="0 0 24 24"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><g fill="currentColor"><circle cx="8.5" cy="11" r="1.2"/><circle cx="12" cy="11" r="1.2"/><circle cx="15.5" cy="11" r="1.2"/></g></svg>';
const CODE =
  '<svg viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const LIST =
  '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M8 8l1.5 1.5L12 7M8 13l1.5 1.5L12 12M14 8.5h2.5M14 13.5h2.5M8 18h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const GEAR =
  '<svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>';
const WEB =
  '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 9h18" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="6.6" r=".9" fill="currentColor"/><circle cx="8.8" cy="6.6" r=".9" fill="currentColor"/></svg>';
const DB =
  '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const WAVE =
  '<svg viewBox="0 0 60 24"><path d="M4 12c6-14 12 14 18 0s12 14 18 0 12 14 16 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';

type Stack = { x: number; y: number; s: number; r: number; front?: number };

/** Content strings go into innerHTML, so escape them. */
const esc = (t: string) => t.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

type Tiles = Home["orbit"]["tiles"];

/** The orbit tiles: class, content, and where each lands when they stack (fractions of the stage). */
function tiles(founder: string, t: Tiles): [string, string, Stack][] {
  return [
    ["o-t-ink", A, { x: 0.2, y: -0.06, s: 0.34, r: 4 }],
    ["o-t-white", WA, { x: -0.24, y: -0.24, s: 0.22, r: -6 }],
    ["o-t-lime", WAVE, { x: -0.2, y: -0.3, s: 0.3, r: -3 }],
    ["o-t-sand", CHAT, { x: 0.24, y: -0.28, s: 0.26, r: 5 }],
    ["o-t-grey", GEAR, { x: 0.3, y: 0.1, s: 0.2, r: -4 }],
    ["o-t-ink", `<span class="o-word">${esc(t.ai)}</span>`, { x: -0.32, y: 0.06, s: 0.2, r: 6 }],
    [
      "o-t-white",
      `<span class="o-word big" style="color:var(--c-0d0d0d)">${esc(t.hello)}</span>`,
      { x: 0, y: 0.04, s: 0.46, r: 0, front: 1 },
    ],
    ["o-t-sage", LIST, { x: -0.12, y: 0.26, s: 0.26, r: -5 }],
    [
      "o-t-ink",
      `<div class="o-card"><b>${esc(t.card[0])}</b>${esc(t.card[1])}</div>`,
      { x: -0.08, y: 0.3, s: 0.38, r: 0, front: 2 },
    ],
    ["o-t-white", WEB, { x: 0.3, y: 0.3, s: 0.22, r: 4 }],
    ["o-t-lime", CODE, { x: 0.14, y: 0.36, s: 0.22, r: -4 }],
    [
      "o-t-ink",
      `<span class="o-word" style="font-size:calc(var(--s)*.22)">${esc(t.always)}</span>`,
      { x: -0.34, y: -0.04, s: 0.18, r: 3 },
    ],
    ["o-t-sand", DB, { x: 0.06, y: -0.32, s: 0.2, r: -2 }],
    [
      "o-t-white",
      founder ? `<img alt="" src="${founder}">` : A,
      { x: 0.26, y: -0.08, s: 0.3, r: 3, front: 0 },
    ],
    [
      "o-t-lime",
      `<span class="o-word" style="font-size:calc(var(--s)*.24)">${esc(t.ghana)}</span>`,
      { x: -0.3, y: 0.3, s: 0.18, r: -6 },
    ],
    ["o-t-grey", WA, { x: 0.34, y: -0.34, s: 0.16, r: 6 }],
  ];
}

type Props = {
  chat: Home["hero"]["phone"]["chat"];
  online: string;
  typing: string;
  tiles: Tiles;
  invalidEmail: string;
};

/** The home page's scripts from reference/index.html: hero chat loop, orbit, email box. */
export function HomeScripts({
  chat: CHAT_SCRIPT,
  online,
  typing,
  tiles: tileCopy,
  invalidEmail,
}: Props) {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const id = setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    };
    let raf = 0;

    // Hero phone: customer asks, AI types and replies, booking confirmed, loop.
    const chat = document.getElementById("wachat");
    const status = document.getElementById("wastatus");
    if (chat && status) {
      const time = () => {
        const d = new Date();
        return d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
      };
      const add = (kind: "in" | "out", text: string) => {
        const m = document.createElement("div");
        m.className = "x-msg " + kind + (kind === "in" ? " ai" : "");
        m.textContent = text;
        const s = document.createElement("small");
        s.textContent = time() + (kind === "out" ? " ✓✓" : "");
        m.appendChild(s);
        chat.appendChild(m);
        while (chat.children.length > 6) chat.removeChild(chat.firstChild!);
      };
      if (reduce) {
        CHAT_SCRIPT.forEach(([k, t]) => add(k, t));
      } else {
        let i = 0;
        const step = () => {
          if (i >= CHAT_SCRIPT.length) {
            later(() => {
              chat.innerHTML = "";
              i = 0;
              step();
            }, 4200);
            return;
          }
          const [kind, text] = CHAT_SCRIPT[i++];
          if (kind === "in") {
            status.textContent = typing;
            const ty = document.createElement("div");
            ty.className = "x-typing";
            ty.innerHTML = "<i></i><i></i><i></i>";
            chat.appendChild(ty);
            later(() => {
              ty.remove();
              status.textContent = online;
              add("in", text);
              later(step, 1600);
            }, 1300);
          } else {
            add("out", text);
            later(step, 900);
          }
        };
        add("out", CHAT_SCRIPT[0][1]);
        i = 1;
        later(step, 900);
      }
    }

    // Orbit: 16 tiles circle the sliders, then stack into a collage, and back.
    const stage = document.getElementById("ostage");
    const ring = document.getElementById("oring");
    if (stage && ring) {
      const founder = document.querySelector<HTMLImageElement>(".x-arch img")?.currentSrc ?? "";
      const T = tiles(founder, tileCopy);
      ring.innerHTML = "";
      const els = T.map(([cls, html]) => {
        const d = document.createElement("div");
        d.className = "o-tile " + cls;
        d.innerHTML = html;
        ring.appendChild(d);
        return d;
      });
      const knobs = [...stage.querySelectorAll<HTMLElement>(".o-sl b")];
      const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      let ang = 0;
      let mix = 0;
      let phaseT = 0;
      let last = performance.now();
      let knobTick = -1;
      const frame = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        if (!reduce) {
          ang += dt * 0.22;
          phaseT += dt;
        }
        // Cycle: 6s ring, 3.2s stacked.
        const target = phaseT % 9.2 > 6 ? 1 : 0;
        mix += (target - mix) * Math.min(1, dt * 2.6);
        stage.classList.toggle("stacked", mix > 0.5);
        const W = stage.clientWidth;
        const R = W * 0.4;
        const n = els.length;
        const m = ease(Math.max(0, Math.min(1, mix)));
        els.forEach((el, i) => {
          const a = ang + i * ((Math.PI * 2) / n);
          // Focus side is the right (angle 0): tiles grow as they pass it.
          const f = Math.pow((Math.cos(a) + 1) / 2, 4);
          const rs = W * (0.055 + 0.17 * f);
          const rx = Math.cos(a) * R;
          const ry = Math.sin(a) * R;
          const st = T[i][2];
          const s = rs + (W * st.s - rs) * m;
          const x = rx + (st.x * W - rx) * m;
          const y = ry + (st.y * W - ry) * m;
          el.style.setProperty("--s", s + "px");
          el.style.transform = `translate(${x}px,${y}px) rotate(${st.r * m}deg)`;
          el.style.zIndex = String(
            m > 0.5
              ? st.front != null
                ? 50 + (st.front === 2 ? 3 : st.front === 1 ? 2 : 1)
                : Math.round(st.s * 100)
              : Math.round(f * 100),
          );
        });
        if (!reduce && Math.floor(now / 1600) !== knobTick) {
          knobTick = Math.floor(now / 1600);
          knobs.forEach((k) => k.style.setProperty("--p", (Math.random() * 0.8 + 0.1).toFixed(2)));
        }
        if (!reduce) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    // Email box: validate, then carry the address to the /contact form
    // (CLAUDE.md override 6: the full form, with Turnstile, lives there).
    const form = document.getElementById("xform");
    const onSubmit = (e: Event) => {
      e.preventDefault();
      const input = document.getElementById("x-email") as HTMLInputElement | null;
      const msg = document.getElementById("xformmsg");
      const v = input?.value.trim() ?? "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        if (msg) msg.textContent = invalidEmail;
        input?.focus();
        return;
      }
      try {
        sessionStorage.setItem(CONTACT_PREFILL_KEY, v);
      } catch {
        // Storage blocked: the visitor types it again on /contact.
      }
      location.href = "/contact";
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      form?.removeEventListener("submit", onSubmit);
    };
  }, [CHAT_SCRIPT, online, typing, tileCopy, invalidEmail]);
  return null;
}
