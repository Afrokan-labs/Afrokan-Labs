import "@/styles/pages/privacy.css";
import { LegalPage } from "@/components/site/LegalPage";
import { getLegal, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/privacy", ...getLegal().privacy.meta });

export default function PrivacyPage() {
  const { email, domain } = getSite();
  return <LegalPage doc={getLegal().privacy} email={email} domain={domain} />;
}
