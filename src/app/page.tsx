import { getSite } from "@/lib/content";

// Temporary until the coming-soon page (BUILD_PLAN 1.6) and the homepage (Phase 2).
export default function Home() {
  const site = getSite();
  return (
    <main id="top" className="container">
      <h1>{site.name}</h1>
    </main>
  );
}
