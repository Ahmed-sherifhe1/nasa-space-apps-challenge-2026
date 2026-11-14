import type { Metadata } from "next";
import {
  Activity,
  Archive,
  ArrowUpRight,
  CircleDot,
  Database,
  Globe2,
  Radio,
  ShieldHalf,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { DataStatusBadge } from "@/components/brand/data-status";
import { RiskBadge } from "@/components/brand/risk-badge";
import { Topographic } from "@/components/brand/topographic";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { dataService } from "@/services";
import { cn, formatMillions } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mission control",
  description: "DELTA 2100 climate-risk intelligence console.",
};

const moduleCards = [
  {
    href: "/app/past",
    icon: Archive,
    number: "01",
    title: "The Past",
    description: "Documented cases of coastal and delta change.",
    accent: "text-amber",
  },
  {
    href: "/app/risk-intelligence",
    icon: Globe2,
    number: "02",
    title: "Risk Intelligence",
    description: "Five regions. Indicators, scenarios and exposure.",
    accent: "text-cyan",
  },
  {
    href: "/app/last-100-years",
    icon: ShieldHalf,
    number: "03",
    title: "Last 100 Years",
    description: "Allocate a $100M adaptation budget.",
    accent: "text-high",
  },
];

export default async function MissionControlPage() {
  const regions = await dataService.risk.listRegions();
  const criticalCount = regions.filter((region) => region.riskLevel === "Critical").length;

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end" data-onboarding-target="dashboard-overview">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="eyebrow">Mission control / Cycle 2026.11</p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber/25 bg-amber/[0.07] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.13em] text-amber">
                <Database className="size-2.5" aria-hidden="true" />
                Demonstration mode
              </span>
            </div>
            <h1 className="display-title mt-4 text-4xl text-cloud sm:text-5xl">
              Read the system.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              This console brings the archive, the five-region risk watchlist and
              the adaptation simulation into one operating picture. No marketing
              noise — just evidence, exposure and choices.
            </p>
          </div>
          <ButtonLink href="/app/risk-intelligence" variant="secondary" className="group shrink-0">
            Open risk globe
            <ArrowUpRight
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </ButtonLink>
        </div>
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]" data-onboarding-target="dashboard-module-cards">
        <Reveal>
          <div className="relative overflow-hidden rounded-panel border border-line bg-intelligence/55">
            <Topographic className="absolute inset-0 h-full w-full" opacity={0.12} />
            <div className="relative border-b border-line px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan" data-onboarding-target="dashboard-nav-sidebar">
                    <Radio className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mono-label text-[9px]">Intelligence brief</p>
                    <p className="text-sm font-semibold text-cloud">
                      Compound water risk dominates the watchlist
                    </p>
                  </div>
                </div>
                <DataStatusBadge status="illustrative" />
              </div>
            </div>

            <div className="relative grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_260px] lg:items-end">
              <div>
                <p className="font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-cloud sm:text-3xl">
                  Five deltas and coasts. Four are carrying critical exposure.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                  Sea-level rise is never the whole story. Subsidence, sediment
                  starvation, storm surge and groundwater extraction change the
                  baseline that communities are defending.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: "05", label: "Active regions" },
                    { value: String(criticalCount).padStart(2, "0"), label: "Critical" },
                    { value: "03", label: "Modules" },
                    { value: "100M", label: "Sim budget" },
                  ].map((stat) => (
                    <div key={stat.label} className="border-l border-line pl-3">
                      <p className="font-mono text-2xl tracking-[-0.05em] text-cloud">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.13em] text-muted">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-[230px]">
                <div className="absolute inset-0 rounded-full border border-cyan/25" aria-hidden="true" />
                <div className="absolute inset-[10%] rounded-full border border-line" aria-hidden="true" />
                <div className="absolute inset-[26%] rounded-full border border-cyan/20 bg-[radial-gradient(circle_at_40%_35%,rgba(0,184,217,0.16),rgba(16,27,53,0.6))]" aria-hidden="true" />
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line/60" aria-hidden="true" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line/60" aria-hidden="true" />
                {[
                  { top: "28%", left: "25%", tone: "bg-critical" },
                  { top: "22%", left: "57%", tone: "bg-high" },
                  { top: "47%", left: "64%", tone: "bg-critical" },
                  { top: "63%", left: "72%", tone: "bg-high" },
                  { top: "74%", left: "61%", tone: "bg-critical" },
                ].map((marker, index) => (
                  <span
                    key={index}
                    className={cn(
                      "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                      marker.tone,
                    )}
                    style={{ top: marker.top, left: marker.left }}
                    aria-hidden="true"
                  />
                ))}
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/80">
                    Earth status
                  </span>
                </span>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-line bg-navy/30 px-5 py-3">
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted/80">
                Source · demonstration data service
              </span>
              <Link
                href="/app/risk-intelligence"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan hover:text-cloud"
              >
                Inspect the watchlist
                <ArrowUpRight className="size-3" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col rounded-panel border border-line bg-intelligence/55 p-5" data-onboarding-target="dashboard-system-integrity">
            <div className="flex items-center justify-between">
              <p className="mono-label text-[9px]">System integrity</p>
              <CircleDot className="size-3 text-low" aria-hidden="true" />
            </div>
            <p className="mt-4 font-display text-xl font-semibold tracking-tight text-cloud">
              Data layer online.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Typed adapters are active. Every current metric is flagged as
              demonstration content.
            </p>
            <div className="mt-5 space-y-3">
              {[
                { label: "Historical archive", value: "Demo records", tone: "text-amber" },
                { label: "Regional metrics", value: "Illustrative", tone: "text-high" },
                { label: "Future scenarios", value: "Projected", tone: "text-critical" },
                { label: "Simulation engine", value: "Deterministic", tone: "text-low" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-3 border-b border-line/70 pb-2.5">
                  <span className="text-[11px] text-muted">{row.label}</span>
                  <span className={cn("font-mono text-[9px] uppercase tracking-[0.1em]", row.tone)}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-auto flex items-start gap-2 border-t border-line pt-4 text-[10px] leading-relaxed text-muted">
              <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" aria-hidden="true" />
              Verification pending from the data team.
            </div>
          </div>
        </Reveal>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {moduleCards.map((item, index) => (
          <Reveal key={item.href} delay={index * 0.05}>
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-card border border-line bg-intelligence/45 p-5 transition-colors hover:border-cyan/40 hover:bg-intelligence/75"
            >
              <div className="flex items-center justify-between">
                <item.icon className={cn("size-5", item.accent)} strokeWidth={1.55} aria-hidden="true" />
                <span className="font-mono text-[9px] text-muted">{item.number}</span>
              </div>
              <h2 className="mt-6 font-display text-xl font-semibold tracking-tight text-cloud">
                {item.title}
              </h2>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">
                {item.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan">
                Open module
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <div className="rounded-panel border border-line bg-intelligence/45">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p className="mono-label text-[9px]">Regional watchlist</p>
                <h2 className="mt-1 text-sm font-semibold text-cloud">Five study areas</h2>
              </div>
              <Link href="/app/risk-intelligence" className="text-[11px] text-cyan hover:text-cloud">
                View all
              </Link>
            </div>
            <div>
              {regions.map((region) => (
                <Link
                  key={region.id}
                  href={`/app/risk-intelligence/${region.id}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line/70 px-5 py-3.5 transition-colors last:border-b-0 hover:bg-panel/30 sm:grid-cols-[1fr_150px_auto]"
                >
                  <div>
                    <p className="text-sm font-medium text-cloud">{region.shortName}</p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                      {region.country}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          region.riskLevel === "Critical" ? "bg-critical" : "bg-high",
                        )}
                        style={{ width: `${region.riskScore}%` }}
                      />
                    </div>
                    <span className="w-7 text-right font-mono text-[10px] text-muted">
                      {region.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RiskBadge level={region.riskLevel} className="hidden sm:inline-flex" />
                    <ArrowUpRight className="size-3.5 text-muted transition-colors group-hover:text-cyan" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="flex h-full flex-col gap-4">
            <div className="rounded-panel border border-line bg-intelligence/45 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="mono-label text-[9px]">Latest signals</p>
                  <h2 className="mt-1 text-sm font-semibold text-cloud">Indicator feed</h2>
                </div>
                <Activity className="size-4 text-cyan" aria-hidden="true" />
              </div>
              <div className="mt-4 space-y-3">
                {regions.slice(0, 3).map((region) => (
                  <Link
                    key={region.id}
                    href={`/app/risk-intelligence/${region.id}`}
                    className="group flex items-start gap-3 border-b border-line/70 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium text-cloud">
                        {region.indicators[0].label} · {region.indicators[0].value}{" "}
                        {region.indicators[0].unit}
                      </p>
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                        {region.name} / illustrative
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 size-3 text-muted/50 transition-colors group-hover:text-cyan" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/app/last-100-years"
              className="group relative overflow-hidden rounded-panel border border-amber/25 bg-amber/[0.06] p-5 transition-colors hover:bg-amber/[0.1]"
            >
              <div className="absolute -right-5 -top-8 font-mono text-[110px] leading-none text-amber/[0.06]">
                100
              </div>
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-amber">
                    Simulation ready
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold tracking-tight text-cloud">
                    Build your defense.
                  </p>
                </div>
                <ShieldHalf className="size-5 text-amber" aria-hidden="true" />
              </div>
              <p className="relative mt-3 text-xs leading-relaxed text-muted">
                Allocate {formatMillions(100_000_000)} across four strategies and
                see the consequences of the trade-offs.
              </p>
              <span className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-amber">
                Begin the simulation
                <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
