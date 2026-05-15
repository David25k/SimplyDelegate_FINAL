import { AgencyHero } from "@/components/AgencyHero";
import { AiVisibilitySection } from "@/components/AiVisibilitySection";
import { GoogleRankingSection } from "@/components/GoogleRankingSection";

export default function Home() {
  return (
    <main className="agency-page min-h-screen overflow-x-hidden">
      <AgencyHero />
      <GoogleRankingSection />
      <AiVisibilitySection />
    </main>
  );
}
