import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CircleAlert,
  Database,
  MapPin,
  Minus,
  Ruler,
  ScanLine,
  Users,
  Waves,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataStatusBadge } from "@/components/brand/data-status";
import { RiskBadge } from "@/components/brand/risk-badge";
import { LineChart } from "@/components/charts/line-chart";
import { Sparkline } from "@/components/charts/sparkline";
import { ScenarioExplorer } from "@/components/risk/scenario-explorer";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { dataService } from "@/services";
import { cn, riskText } from "@/lib/utils";

interface RegionPageProps {
  params: Promise<{ region: string }>;
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { region: id } = await params;
  const region = await dataService.risk.getRegion(id);
  if (!region) return { title: "Region not found" };
  return {
    title: region.name,
    description: region.summary,
  };
}

const trendIcon = {
  up: ArrowUp,
  down: ArrowDown,
  steady: Minus,
} as const;

export default async function RegionIntelligencePage({ params }: RegionPageProps) {
  const { region: id } = await params;
  const [region, regions] = await Promise.all([
    dataService.risk.getRegion(id),
    dataService.risk.listRegions(),
  ]);

  if (!region) notFound();

  const currentIndex = regions.findIndex((item) => item.id === region.id);
  const nextRegion = regions[(currentIndex + 1) % regions.length];

  return (
    <div className="space-y-8">
      <Reveal>
        <Link
          href="/app/risk-intelligence"
          className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-cloud"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to the watchlist
        </Link>
      </Reveal>

      <Reveal>
        <header className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge level={region.riskLevel} />
              <DataStatusBadge status="illustrative" />
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                Region file / {String(currentIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <h1 className="display-title mt-4 text-4xl text-cloud sm:text-6xl">
              {region.name}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.11em] text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3 text-cyan" aria-hidden="true" />
                {region.country}
              </span>
              <span aria-hidden="true">/</span>
              <span>{region.coordinates.lat.toFixed(1)}°N {region.coordinates.lon.toFixed(1)}°E</span>
            </p>
            <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-snug tracking-[-0.02em] text-cloud/90 sm:text-2xl">
              {region.headline}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{region.summary}</p>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-panel border border-line bg-panel">
            <Image
              src={region.image}
              alt={region.imageAlt}
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 360px"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-navy/35" />
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <span className="rounded-full border border-white/15 bg-navy/65 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-cloud backdrop-blur">
                Composite risk {region.riskScore}
              </span>
              <Waves className="size-5 text-cyan" aria-hidden="true" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <div className="h-1 overflow-hidden rounded-full bg-white/15">
                <div
                  className={cn(
                    "h-full rounded-full",
                    region.riskLevel === "Critical" ? "bg-critical" : "bg-high",
                  )}
                  style={{ width: `${region.riskScore}%` }}
                />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-cloud/55">Population</p>
                  <p className="mt-0.5 text-[11px] font-medium text-cloud">{region.population}</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-cloud/55">Study area</p>
                  <p className="mt-0.5 text-[11px] font-medium text-cloud">{region.areaLabel}</p>
                </div>
              </div>
              <p className="mt-2 text-[7px] uppercase tracking-[0.08em] text-cloud/40">{region.imageCredit}</p>
            </div>
          </div>
        </header>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {region.indicators.map((indicator) => {
            const TrendIcon = trendIcon[indicator.trendDirection];
            return (
              <div key={indicator.id} className="rounded-card border border-line bg-intelligence/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium text-muted">{indicator.label}</p>
                    <p className="mt-1.5 font-mono text-2xl tracking-[-0.05em] text-cloud">
                      {indicator.value}
                      <span className="ml-1 text-[9px] tracking-normal text-muted">{indicator.unit}</span>
                    </p>
                  </div>
                  <Sparkline values={indicator.sparkline} risk={indicator.risk} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-line/70 pt-2.5">
                  <span className={cn("inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.08em]", riskText[indicator.risk])}>
                    <TrendIcon className="size-2.5" aria-hidden="true" />
                    {indicator.trend}
                  </span>
                  <DataStatusBadge status={indicator.status} />
                </div>
                <p className="mt-2 text-[9px] leading-relaxed text-muted/80">{indicator.description}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <Reveal>
          <section aria-labelledby="trend-heading" className="rounded-panel border border-line bg-intelligence/45 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="mono-label text-[9px]">Historical record</p>
                <h2 id="trend-heading" className="mt-1 font-display text-xl font-semibold text-cloud">
                  Trend series
                </h2>
              </div>
              <DataStatusBadge status="illustrative" />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              {region.name} sea-level and land-motion demonstration series. Both
              lines are illustrative proxies until verified station data are connected.
            </p>
            <LineChart series={region.historical} className="mt-4" />
          </section>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex h-full flex-col gap-4">
            <section className="rounded-panel border border-line bg-intelligence/45 p-5">
              <p className="mono-label text-[9px]">Hazard stack</p>
              <h2 className="mt-1 font-display text-xl font-semibold text-cloud">Compound threats</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {region.threats.map((threat) => (
                  <span key={threat} className="rounded-full border border-line bg-navy/35 px-2.5 py-1 text-[9px] text-muted">
                    {threat}
                  </span>
                ))}
              </div>
              <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
                {region.context}
              </p>
            </section>

            <div className="rounded-card border border-amber/20 bg-amber/[0.045] p-4">
              <div className="flex items-center gap-2">
                <CircleAlert className="size-3.5 text-amber" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-amber">
                  Interpret with care
                </p>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">
                Composite scores combine illustrative indicators. They are for
                interface testing and comparison, not official risk classification.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <section aria-labelledby="scenario-heading" className="rounded-panel border border-line bg-intelligence/45 p-5 sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mono-label text-[9px]">2100 planning envelope</p>
              <h2 id="scenario-heading" className="mt-1 font-display text-xl font-semibold text-cloud">
                Three futures, not predictions
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-high">
              <ScanLine className="size-3" aria-hidden="true" />
              Projected scenarios
            </span>
          </div>
          <div className="mt-5">
            <ScenarioExplorer scenarios={region.scenarios} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section aria-labelledby="future-heading" className="overflow-hidden rounded-panel border border-line bg-intelligence/45">
          <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
            <div>
              <p className="mono-label text-[9px]">Future narrative</p>
              <h2 id="future-heading" className="mt-1 font-display text-xl font-semibold text-cloud">
                If this pathway holds
              </h2>
            </div>
            <DataStatusBadge status="projected" />
          </div>
          <div className="grid md:grid-cols-2">
            {[
              { title: "The look", body: region.futureNarrative.look },
              { title: "Why", body: region.futureNarrative.why },
              { title: "Who is vulnerable", body: region.futureNarrative.vulnerable },
              { title: "Consequences", body: region.futureNarrative.consequences },
              { title: "What can change", body: region.futureNarrative.interventions },
              { title: "Uncertainty", body: region.futureNarrative.uncertainty },
            ].map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "border-line p-5 sm:p-6",
                  index < 4 && "border-b",
                  index % 2 === 0 && "md:border-r",
                )}
              >
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-cyan">
                  {String(index + 1).padStart(2, "0")} / {item.title}
                </p>
                <p className="mt-2 text-xs leading-[1.85] text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-line px-5 py-3 text-[9px] text-muted sm:px-6">
            <CircleAlert className="size-3 shrink-0 text-amber" aria-hidden="true" />
            Narrative describes an illustrative intermediate pathway, not a deterministic forecast.
          </div>
        </section>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.75fr]">
        <Reveal>
          <div className="rounded-panel border border-line bg-intelligence/45 p-5">
            <div className="flex items-center gap-2">
              <Database className="size-4 text-cyan" aria-hidden="true" />
              <h2 className="text-sm font-semibold text-cloud">Sources and data lineage</h2>
            </div>
            <ul className="mt-4 space-y-3">
              {region.sources.map((source) => (
                <li key={source.label}>
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-start justify-between gap-3"
                    >
                      <span>
                        <span className="block text-[11px] font-medium text-cloud group-hover:text-cyan">
                          {source.label}
                        </span>
                        <span className="mt-0.5 block text-[9px] uppercase tracking-[0.08em] text-muted">
                          {source.provider}
                        </span>
                      </span>
                      <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-muted" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-medium text-cloud">{source.label}</span>
                  )}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-3 text-[9px] leading-relaxed text-muted">
              External links point to the reference provider. Current metric
              values in this demonstration remain illustrative until adapters are verified.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex h-full flex-col justify-between rounded-panel border border-cyan/20 bg-cyan/[0.04] p-5">
            <div>
              <p className="mono-label text-[9px]">From evidence to choice</p>
              <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-cloud">
                What would you protect first?
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Take {region.shortName} into the adaptation simulation and
                allocate a fixed budget across barriers, mangroves, drainage and groundwater management.
              </p>
            </div>
            <ButtonLink href="/app/last-100-years" variant="primary" className="mt-5 w-full">
              Run the simulation
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-[10px] text-muted">
            <Ruler className="size-3.5 text-cyan" aria-hidden="true" />
            {region.name} / {region.country}
          </div>
          <Link
            href={`/app/risk-intelligence/${nextRegion.id}`}
            className="group inline-flex items-center gap-2 text-xs font-medium text-cloud hover:text-cyan"
          >
            Next region: {nextRegion.shortName}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex items-center gap-2 text-[9px] text-muted/80">
          <Users className="size-3" aria-hidden="true" />
          Population figures describe the study area broadly; they are not a
          measurement of residents inside the mapped hazard envelope.
        </div>
      </Reveal>
    </div>
  );
}
