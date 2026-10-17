import "@/styles/pages/terms.css";
import { LegalPage } from "@/components/site/LegalPage";
import { getLegal, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/terms", ...getLegal().terms.meta });

export default function TermsPage() {
  const { email, domain } = getSite();
  return <LegalPage doc={getLegal().terms} email={email} domain={domain} />;
}
