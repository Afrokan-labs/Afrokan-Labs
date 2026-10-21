/**
 * Analytics: Cloudflare Web Analytics, switched on in the Cloudflare dashboard.
 * Cloudflare injects its beacon into every page at the edge, so the site ships
 * no analytics code: no cookies, no events, aggregated page views only.
 *
 * The beacon loads from SCRIPT_ORIGIN and reports to ENDPOINT_ORIGIN, so every
 * CSP in public/_headers must allow both (checked by scripts/validate-content.ts).
 */
export const CF_ANALYTICS_SCRIPT_ORIGIN = "https://static.cloudflareinsights.com";
export const CF_ANALYTICS_ENDPOINT_ORIGIN = "https://cloudflareinsights.com";
