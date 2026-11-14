import type { Metadata } from "next";
import { ClosingCta } from "@/components/marketing/closing-cta";
import { HomeHero } from "@/components/marketing/home-hero";
import { MethodologySection } from "@/components/marketing/methodology-section";
import { MissionSection } from "@/components/marketing/mission-section";
import { ModulesSection } from "@/components/marketing/modules-section";
import { RegionsSection } from "@/components/marketing/regions-section";

export const metadata: Metadata = {
  title: { absolute: "DELTA 2100 — The Last Line of Defense" },
  description:
    "Explore documented coastal loss, climate-risk intelligence for five vulnerable regions, and a transparent survival simulation. Understand. Prepare. Protect.",
  alternates: {
    canonical: "/",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DELTA 2100",
  alternateName: "DELTA 2100 — The Last Line of Defense",
  url: "https://delta2100.example",
  description:
    "A climate-risk intelligence platform for understanding water-driven change in deltas, coastlines and island nations.",
  inLanguage: "en",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeHero />
      <MissionSection />
      <ModulesSection />
      <RegionsSection />
      <MethodologySection />
      <ClosingCta />
    </>
  );
}
