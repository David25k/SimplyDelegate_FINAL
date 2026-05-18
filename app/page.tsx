import { AgencyHero } from "@/components/AgencyHero";
import { AiVisibilitySection } from "@/components/AiVisibilitySection";
import { ContactSection } from "@/components/ContactSection";
import { GoogleRankingSection } from "@/components/GoogleRankingSection";
import { StickyNavbar } from "@/components/StickyNavbar";

export default function Home() {
  return (
    <>
      <StickyNavbar />
      <main className="agency-page min-h-screen overflow-x-hidden">
        <AgencyHero />
        <GoogleRankingSection />
        <AiVisibilitySection />
        <ContactSection />
      </main>
    </>
  );
}
