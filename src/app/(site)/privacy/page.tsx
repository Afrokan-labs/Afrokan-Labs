import type { Metadata } from "next";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { getPrivacy, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const privacy = getPrivacy();

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: privacy.title,
  description: privacy.description,
});

export default function PrivacyPage() {
  const [y, m, d] = privacy.lastUpdated.date.split("-").map(Number);
  const lastUpdatedText = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));

  return (
    <main id="main" className="container">
      <PrivacyPolicy
        title={privacy.title}
        intro={privacy.intro}
        sections={privacy.sections}
        lastUpdated={privacy.lastUpdated}
        email={getSite().email}
        lastUpdatedText={lastUpdatedText}
      />
    </main>
  );
}
