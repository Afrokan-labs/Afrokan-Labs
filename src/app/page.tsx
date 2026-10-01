import { site } from "@/content/site";

// Temporary until the coming-soon page (BUILD_PLAN 1.6) and the homepage (Phase 2).
export default function Home() {
  return (
    <main id="top">
      <h1>{site.name}</h1>
    </main>
  );
}
