import type { Metadata } from "next";
import { SimulationHeader } from "@/components/simulation/simulation-header";

export const metadata: Metadata = {
  title: "Last 100 Years",
  description:
    "Allocate a fixed adaptation budget across four coastal-defense strategies and explore the simulated consequences.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SimulationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-[100svh] bg-navy">
      <SimulationHeader />
      <main id="main-content" className="mx-auto w-full max-w-[1240px] px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-12">
        {children}
      </main>
    </div>
  );
}
