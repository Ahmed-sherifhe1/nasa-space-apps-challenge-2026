import type { Metadata } from "next";
import { ArrowUpRight, CircleAlert, Globe2, Radar, Waves } from "lucide-react";
import Link from "next/link";
import { DataStatusBadge } from "@/components/brand/data-status";
import { RiskBadge } from "@/components/brand/risk-badge";
import { Topographic } from "@/components/brand/topographic";
import { RiskGlobe } from "@/components/maps/risk-globe";
import { RiskWatchlist } from "@/components/risk/risk-watchlist";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { dataService } from "@/services";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Risk Intelligence",
  description: "Regional coastal risk indicators, historical trends and 2100 planning scenarios.",
};

export default async function RiskIntelligencePage() {
  const regions = await dataService.risk.listRegions();
  const critical = regions.filter((region) => region.riskLevel === "Critical").length;
  const priority = [...regions].sort((a, b) => b.riskScore - a.riskScore)[0];
  const totalExposed = regions.reduce((sum, region) => {
    const middle = region.scenarios.find((scenario) => scenario.id === "mid") ?? region.scenarios[0];
    return sum + middle.exposedPopulation;
  }, 0);

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="eyebrow">Risk Intelligence / Watchlist</p>
              <DataStatusBadge status="illustrative" />
            </div>
            <h1 className="display-title mt-4 text-4xl text-cloud sm:text-5xl">
              Five places. One pressure system.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Compare what is happening now with what the century could hold.
              Indicators, trend records and planning scenarios are separated so a
              projected outcome is never mistaken for an observation.
            </p>
          </div>
          <ButtonLink href="/app/last-100-years" variant="secondary" className="shrink-0">
            Test interventions
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="overflow-hidden rounded-panel border border-line bg-intelligence/45">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative flex items-center justify-center overflow-hidden border-b border-line p-4 sm:p-6 lg:border-b-0 lg:border-r">
              <Topographic className="absolute inset-0 h-full w-full" opacity={0.1} />
              <RiskGlobe regions={regions} className="relative w-full" />
            </div>

            <div className="flex flex-col p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mono-label text-[9px]">Global watch</p>
                  <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-cloud">
                    Exposure at a glance
                  </h2>
                </div>
                <Radar className="size-5 text-cyan" aria-hidden="true" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <div className="rounded-control border border-line bg-navy/35 p-3">
                  <p className="font-mono text-2xl tracking-[-0.05em] text-cloud">{regions.length}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-muted">Regions</p>
                </div>
                <div className="rounded-control border border-line bg-navy/35 p-3">
                  <p className="font-mono text-2xl tracking-[-0.05em] text-critical">{critical}</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-muted">Critical</p>
                </div>
                <div className="rounded-control border border-line bg-navy/35 p-3">
                  <p className="font-mono text-2xl tracking-[-0.05em] text-amber">2100</p>
                  <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-muted">Horizon</p>
                </div>
              </div>

              <div className="mt-5 rounded-card border border-critical/20 bg-critical/[0.045] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-critical">
                      Priority signal
                    </p>
                    <p className="mt-1 text-sm font-semibold text-cloud">{priority.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{priority.country}</p>
                  </div>
                  <RiskBadge level={priority.riskLevel} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted">{priority.headline}</p>
                <Link
                  href={`/app/risk-intelligence/${priority.id}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-critical hover:text-cloud"
                >
                  Open priority assessment
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-4 rounded-card border border-line p-4">
                <div className="flex items-center gap-2">
                  <Waves className="size-3.5 text-cyan" aria-hidden="true" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-cloud">
                    Intermediate 2100 envelope
                  </p>
                </div>
                <p className="mt-2 font-mono text-2xl tracking-[-0.05em] text-cloud">
                  {formatNumber(totalExposed)}
                </p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted">
                  Illustrative people in exposed zones across the five study
                  areas. Not a sum of verified census exposure.
                </p>
              </div>

              <div className="mt-auto flex items-start gap-2 border-t border-line pt-4 text-[9px] leading-relaxed text-muted">
                <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" aria-hidden="true" />
                Risk scores are composite demonstrations, not official indices.
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <RiskWatchlist regions={regions} />

      <Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Observed",
              body: "Direct measurement or documented record, such as a tide-gauge series or satellite image.",
              tone: "border-cyan/25 bg-cyan/[0.045] text-cyan",
              icon: Globe2,
            },
            {
              title: "Projected",
              body: "A scenario output conditioned on emissions, ice response and adaptation assumptions.",
              tone: "border-high/25 bg-high/[0.045] text-high",
              icon: Waves,
            },
            {
              title: "Illustrative",
              body: "A demonstration value or visual envelope used to exercise the interface, not a measurement.",
              tone: "border-amber/25 bg-amber/[0.045] text-amber",
              icon: CircleAlert,
            },
          ].map((item) => (
            <div key={item.title} className={`rounded-card border p-4 ${item.tone}`}>
              <item.icon className="size-4" aria-hidden="true" />
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em]">{item.title}</p>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
