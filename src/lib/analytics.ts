/**
 * Analytics events (architecture §7). This map is the canonical list: an
 * event or location that isn't here fails type-checking.
 *
 * Two ways to record an event, both inert when NEXT_PUBLIC_ANALYTICS_ID is
 * unset (the Umami script is then never loaded, BUILD_PLAN 4.1):
 * - trackingAttrs(): data-umami-* attributes for links and buttons. Umami
 *   records the click itself, so Server Components ship no JavaScript.
 * - track(): for client components that need to record something in code.
 *
 * Safe to import from client components: it reads the env var directly
 * (inlined at build) instead of importing the Zod-based src/lib/env.ts.
 */

export type WhatsAppLocation =
  | "header"
  | "menu"
  | "hero"
  | "featured-work"
  | "services"
  | "process"
  | "contact"
  | "sticky"
  | "case-study"
  | "footer";

export type AnalyticsEvents = {
  whatsapp_click: { location: WhatsAppLocation };
  case_study_click: { location: "hero" | "featured-work" };
  demo_offer_click: undefined;
  email_click: { location: "contact" | "footer" };
  contact_form_submit: { result: "success" | "error" }; // Phase 6
};

export type AnalyticsEvent = keyof AnalyticsEvents;

type PropsArg<E extends AnalyticsEvent> = AnalyticsEvents[E] extends undefined
  ? []
  : [props: AnalyticsEvents[E]];

/** data-umami-* attributes, e.g. { "data-umami-event": "email_click", "data-umami-event-location": "footer" }. */
export type TrackingAttrs = Record<`data-umami-event${string}`, string>;

export function trackingAttrs<E extends AnalyticsEvent>(
  event: E,
  ...[props]: PropsArg<E>
): TrackingAttrs {
  const attrs: TrackingAttrs = { "data-umami-event": event };
  for (const [key, value] of Object.entries(props ?? {}))
    attrs[`data-umami-event-${key}`] = String(value);
  return attrs;
}

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
  }
}

export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_ANALYTICS_ID);

/**
 * Umami Cloud's tracker, and the origin it sends events to (checked against the
 * real tracker). The CSP must allow both (BUILD_PLAN 4.2).
 */
export const ANALYTICS_SCRIPT = "https://cloud.umami.is/script.js";
export const ANALYTICS_ENDPOINT_ORIGIN = "https://gateway.umami.is";

/** Records an event from a client component. Does nothing without an analytics ID or script. */
export function track<E extends AnalyticsEvent>(event: E, ...[props]: PropsArg<E>): void {
  if (!analyticsEnabled || typeof window === "undefined") return;
  window.umami?.track(event, props as Record<string, string> | undefined);
}
