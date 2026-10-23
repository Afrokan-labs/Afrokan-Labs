import { getLlms, getSite } from "@/lib/content";
import { displayHours, displayNumber } from "@/lib/links";
import { waMeUrl } from "@/lib/wa-me";

export const dynamic = "force-static";

/** /llms.txt: src/content/llms.ts with its contact facts filled in from site.ts. */
export function GET() {
  const site = getSite();
  const facts: Record<string, string> = {
    "{whatsappUrl}": waMeUrl(site.whatsappNumber),
    "{phone}": displayNumber(site.whatsappNumber),
    "{hours}": displayHours(site.hours),
    "{email}": site.email,
    "{location}": site.location,
  };
  const text = Object.entries(facts).reduce(
    (t, [token, value]) => t.replaceAll(token, value),
    getLlms(),
  );
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
