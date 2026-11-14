"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleAlert,
  Crosshair,
  Droplets,
  Gauge,
  LockKeyhole,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShieldHalf,
  Trees,
  Users,
  Wallet,
  Waves,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { RiskBadge } from "@/components/brand/risk-badge";
import { Topographic } from "@/components/brand/topographic";
import { Button, buttonStyles } from "@/components/ui/button";
import {
  SIMULATION_BUDGET,
  getSimulationRegion,
  simulationRegions,
  simulationStrategies,
} from "@/data/simulation";
import { remainingBudget, totalAllocated } from "@/features/simulation/model";
import type {
  SimulationResult,
  SimulationStrategy,
} from "@/types";
import { useSimulationStore } from "@/store/simulation-store";
import {
  cn,
  formatMillions,
  formatNumber,
  formatUsd,
  riskSurface,
} from "@/lib/utils";

const strategyIcons = {
  "coastal-barriers": ShieldHalf,
  "mangrove-restoration": Trees,
  "drainage-systems": Droplets,
  "groundwater-management": Waves,
} as const;

const outcomeColor: Record<SimulationResult["outcomeTone"], string> = {
  Low: "#35B86B",
  Moderate: "#F5C542",
  High: "#F97316",
  Critical: "#EF4444",
};

const stageMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

function StageHeading({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1
          id="stage-heading"
          tabIndex={-1}
          className="display-title mt-4 max-w-3xl text-4xl text-cloud outline-none sm:text-5xl lg:text-6xl"
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}

export function SimulationExperience() {
  const stage = useSimulationStore((state) => state.stage);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    const timer = window.setTimeout(() => {
      document.getElementById("stage-heading")?.focus({ preventScroll: true });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [stage, reduceMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage}
        initial={reduceMotion ? false : stageMotion.initial}
        animate={stageMotion.animate}
        exit={reduceMotion ? undefined : stageMotion.exit}
        transition={stageMotion.transition}
      >
        {stage === "launch" ? <LaunchStage /> : null}
        {stage === "warning" ? <WarningStage /> : null}
        {stage === "disaster" ? <DisasterStage /> : null}
        {stage === "decision" ? <DecisionStage /> : null}
        {stage === "consequences" ? <ConsequencesStage /> : null}
        {stage === "legacy" ? <LegacyStage /> : null}
      </motion.div>
    </AnimatePresence>
  );
}

function LaunchStage() {
  const regionId = useSimulationStore((state) => state.regionId);
  const chooseRegion = useSimulationStore((state) => state.chooseRegion);
  const start = useSimulationStore((state) => state.start);
  const selected = getSimulationRegion(regionId ?? "");

  return (
    <div className="space-y-8">
      <StageHeading
        eyebrow="Last 100 Years / Briefing"
        title="The last 100 years are a choice."
        description="You have one budget and one century. Choose a region, examine the pressure it is under, then allocate $100M across four adaptation strategies. The model is illustrative, deterministic and deliberately unable to buy absolute safety."
        aside={
          <div className="shrink-0 rounded-card border border-line bg-intelligence/55 p-4 lg:w-[270px]">
            <p className="mono-label text-[9px]">Simulation rules</p>
            <ul className="mt-3 space-y-2">
              {[
                "Fixed $100M budget",
                "Four intervention strategies",
                "Benefits diminish with saturation",
                "Residual risk never reaches zero",
              ].map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
                  <Check className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {simulationRegions.map((region, index) => {
          const active = region.id === regionId;
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => chooseRegion(region.id)}
              aria-pressed={active}
              className={cn(
                "group overflow-hidden rounded-panel border text-left transition-colors",
                active
                  ? "border-amber/55 bg-amber/[0.045]"
                  : "border-line bg-intelligence/45 hover:border-muted/55",
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-panel">
                <Image
                  src={region.image}
                  alt={region.imageAlt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className={cn(
                    "object-cover transition duration-700 group-hover:scale-[1.03]",
                    active ? "opacity-90" : "opacity-65 group-hover:opacity-85",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-navy/65 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-cloud backdrop-blur">
                  Region {String(index + 1).padStart(2, "0")}
                </span>
                {active ? (
                  <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full border border-amber/50 bg-amber text-navy">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-cloud/60">
                    {region.country} / {region.coordinates}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold tracking-tight text-cloud">
                    {region.name}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <p className="line-clamp-3 text-[11px] leading-relaxed text-muted">{region.briefing}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Exposed people</p>
                    <p className="mt-0.5 font-mono text-xs text-cloud">
                      {formatNumber(region.baseline.exposedPopulation)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Annual damage</p>
                    <p className="mt-0.5 font-mono text-xs text-cloud">
                      {formatUsd(region.baseline.annualDamage)}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-panel border border-line bg-intelligence/45 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-start gap-3">
          <Crosshair className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-cloud">
              {selected ? `${selected.name} selected.` : "Select a region to begin."}
            </p>
            <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-muted">
              Your allocation will be evaluated against storm surge, rainfall
              flooding, erosion and subsidence pressure. No random success roll.
            </p>
          </div>
        </div>
        <Button
          size="lg"
          onClick={start}
          disabled={!selected}
          className="shrink-0"
        >
          Begin the briefing
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <p className="flex items-start gap-2 text-[9px] leading-relaxed text-muted/80">
        <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
        Educational simulation only. Budgets, exposure values and intervention
        effects are illustrative and are not engineering or financial advice.
      </p>
    </div>
  );
}

function WarningStage() {
  const regionId = useSimulationStore((state) => state.regionId);
  const beginScenario = useSimulationStore((state) => state.beginScenario);
  const region = getSimulationRegion(regionId ?? "");

  if (!region) {
    return <InvalidStage message="No region has been selected." />;
  }

  return (
    <div className="space-y-8">
      <StageHeading
        eyebrow={`Last 100 Years / Threat brief / ${region.name}`}
        title="The water does not negotiate."
        description="The century starts with an inheritance: land that is already low, infrastructure that is already stressed and communities that cannot simply move the coastline."
      />

      <div className="relative overflow-hidden rounded-panel border border-line bg-panel">
        <Image
          src={region.image}
          alt={region.imageAlt}
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/35" />
        <div className="relative grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-amber">
              Threat brief / 2025—2100
            </p>
            <p className="mt-3 max-w-2xl font-display text-2xl font-medium leading-snug tracking-[-0.025em] text-cloud sm:text-3xl">
              {region.scenario}
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {region.threatSignals.map((signal) => (
                <div key={signal.label} className="border-l border-cyan/30 pl-3">
                  <p className="font-mono text-[8px] uppercase tracking-[0.11em] text-muted">{signal.label}</p>
                  <p className="mt-1 text-sm font-semibold text-cloud">{signal.value}</p>
                  <p className="mt-0.5 text-[9px] text-muted/80">{signal.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-white/10 bg-navy/55 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-muted">Horizon</span>
              <Gauge className="size-4 text-amber" aria-hidden="true" />
            </div>
            <p className="mt-3 font-mono text-4xl tracking-[-0.06em] text-cloud">2100</p>
            <p className="mt-2 text-[10px] leading-relaxed text-muted">
              The simulation compresses a century of compounding pressure into a
              single decision cycle.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { year: "2025", label: "Inherited exposure", body: "The starting shoreline, population and defenses are already fixed." },
          { year: "2050", label: "Compounding stress", body: "Higher water meets sinking land, aging drainage and stronger surge." },
          { year: "2075", label: "Adaptation window", body: "Each delayed dollar buys less protection and leaves more residual risk." },
          { year: "2100", label: "Stress test", body: "The portfolio is tested once against the full hazard stack." },
        ].map((item, index) => (
          <div key={item.year} className="rounded-card border border-line bg-intelligence/45 p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.08em] text-amber">{item.year}</span>
              <span className="font-mono text-[8px] text-muted/45">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <p className="mt-3 text-xs font-semibold text-cloud">{item.label}</p>
            <p className="mt-1.5 text-[10px] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
        <p className="max-w-xl text-[10px] leading-relaxed text-muted">
          The next screen is a stress snapshot, not a forecast of a specific
          storm or year. Your task is to decide where the defense budget goes.
        </p>
        <Button size="lg" onClick={beginScenario} className="shrink-0">
          Enter the stress test
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function DisasterStage() {
  const regionId = useSimulationStore((state) => state.regionId);
  const goToDecision = useSimulationStore((state) => state.goToDecision);
  const region = getSimulationRegion(regionId ?? "");

  if (!region) {
    return <InvalidStage message="No region has been selected." />;
  }

  const hazards = [
    {
      label: "Storm surge",
      value: Math.round(region.baseline.surgeExposure * 100),
      detail: "Surge pressure index",
      icon: Waves,
      color: "bg-critical",
    },
    {
      label: "Rainfall flooding",
      value: Math.round(region.baseline.rainfallExposure * 100),
      detail: "Drainage pressure index",
      icon: Droplets,
      color: "bg-high",
    },
    {
      label: "Coastal erosion",
      value: Math.round(region.baseline.erosionPressure * 100),
      detail: "Erosion pressure index",
      icon: Trees,
      color: "bg-high",
    },
    {
      label: "Land subsidence",
      value: Math.round(region.baseline.subsidencePressure * 100),
      detail: "Subsidence pressure index",
      icon: Gauge,
      color: "bg-critical",
    },
  ];

  return (
    <div className="space-y-8">
      <StageHeading
        eyebrow={`Last 100 Years / Stress test / ${region.name}`}
        title="The system is asking for a decision."
        description="The hazard stack is active. These are illustrative pressure indices, not a live emergency. Read what is bearing down on the region, then take command of the budget."
        aside={
          <div className="shrink-0 rounded-card border border-critical/25 bg-critical/[0.055] px-4 py-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-critical">Scenario live</p>
            <p className="mt-1 font-mono text-xl tracking-[-0.04em] text-cloud">T+ 75 years</p>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-3 sm:grid-cols-2">
          {hazards.map((hazard) => (
            <div key={hazard.label} className="rounded-card border border-line bg-intelligence/50 p-4">
              <div className="flex items-center justify-between">
                <hazard.icon className="size-4 text-amber" aria-hidden="true" />
                <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                  Illustrative
                </span>
              </div>
              <p className="mt-4 font-mono text-4xl tracking-[-0.06em] text-cloud">{hazard.value}</p>
              <p className="mt-1 text-xs font-medium text-cloud">{hazard.label}</p>
              <p className="text-[9px] text-muted">{hazard.detail} / 100</p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                <div className={`h-full rounded-full ${hazard.color}`} style={{ width: `${hazard.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col rounded-panel border border-line bg-intelligence/45 p-5">
          <div className="flex items-center justify-between">
            <p className="mono-label text-[9px]">Situation report</p>
            <Crosshair className="size-4 text-cyan" aria-hidden="true" />
          </div>
          <p className="mt-4 text-sm font-semibold text-cloud">{region.name}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted">{region.briefing}</p>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4">
            <div>
              <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Exposed land</dt>
              <dd className="mt-1 font-mono text-sm text-cloud">{formatNumber(region.baseline.exposedLand)} km²</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Exposed people</dt>
              <dd className="mt-1 font-mono text-sm text-cloud">{formatNumber(region.baseline.exposedPopulation)}</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Agriculture</dt>
              <dd className="mt-1 font-mono text-sm text-cloud">{formatNumber(region.baseline.agriculturalLand)} km²</dd>
            </div>
            <div>
              <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Annual damage</dt>
              <dd className="mt-1 font-mono text-sm text-cloud">{formatUsd(region.baseline.annualDamage)}</dd>
            </div>
          </dl>

          <Button onClick={goToDecision} size="lg" className="mt-8 w-full">
            Take command of $100M
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <p className="flex items-start gap-2 text-[9px] leading-relaxed text-muted/80">
        <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
        Pressure indices are derived from demonstration baselines. They are not
        observations of an active storm or a deterministic flood forecast.
      </p>
    </div>
  );
}

function DecisionStage() {
  const regionId = useSimulationStore((state) => state.regionId);
  const allocation = useSimulationStore((state) => state.allocation);
  const setAllocation = useSimulationStore((state) => state.setAllocation);
  const resetAllocation = useSimulationStore((state) => state.resetAllocation);
  const confirmAllocation = useSimulationStore((state) => state.confirmAllocation);
  const region = getSimulationRegion(regionId ?? "");

  const spent = totalAllocated(allocation);
  const remaining = remainingBudget(allocation);

  if (!region) {
    return <InvalidStage message="No region has been selected." />;
  }

  return (
    <div className="space-y-8">
      <StageHeading
        eyebrow={`Last 100 Years / Allocation / ${region.name}`}
        title="Allocate the defense budget."
        description="Every strategy attacks a different hazard. Every dollar moved away from one pathway leaves something else exposed. Concentrate your budget or balance it — then live with the residual risk."
        aside={
          <div className="shrink-0 rounded-card border border-line bg-intelligence/55 p-4 lg:w-[250px]">
            <p className="mono-label text-[9px]">Committed</p>
            <p className="mt-1 font-mono text-3xl tracking-[-0.05em] text-cloud">{formatMillions(spent)}</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">
              {formatMillions(remaining)} available
            </p>
            <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-line">
              {simulationStrategies.map((strategy) => (
                <span
                  key={strategy.id}
                  style={{
                    width: `${(allocation[strategy.id] / SIMULATION_BUDGET) * 100}%`,
                    backgroundColor: strategy.color,
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {simulationStrategies.map((strategy) => (
          <StrategyControl
            key={strategy.id}
            strategy={strategy}
            amount={allocation[strategy.id]}
            remaining={remaining}
            onChange={(amount) => setAllocation(strategy.id, amount)}
          />
        ))}
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-panel border border-line bg-intelligence/55 p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Wallet className="mt-0.5 size-5 shrink-0 text-amber" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-cloud">
              {remaining > 0
                ? `${formatMillions(remaining)} is still unallocated.`
                : "The full $100M is committed."}
            </p>
            <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-muted">
              {remaining > 0
                ? "You may proceed with unspent funds, but those dollars will not protect anyone in this simulation."
                : "To increase one strategy, reduce another. Unspent money is never automatically reallocated."}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="ghost" size="md" onClick={resetAllocation}>
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Default mix
          </Button>
          <Button
            size="lg"
            onClick={confirmAllocation}
            disabled={spent < 10_000_000}
          >
            <LockKeyhole className="size-4" aria-hidden="true" />
            Lock in portfolio
          </Button>
        </div>
      </div>

      <p className="flex items-start gap-2 text-[9px] leading-relaxed text-muted/80">
        <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
        The model rewards diversification but caps every benefit below 100%.
        There is no allocation that makes the region risk-free.
      </p>
    </div>
  );
}

function StrategyControl({
  strategy,
  amount,
  remaining,
  onChange,
}: {
  strategy: SimulationStrategy;
  amount: number;
  remaining: number;
  onChange: (amount: number) => void;
}) {
  const Icon = strategyIcons[strategy.id];
  const valueM = Math.round(amount / 1_000_000);
  const maxM = Math.round((amount + remaining) / 1_000_000);
  const pct = Math.round((amount / SIMULATION_BUDGET) * 100);

  return (
    <div className="rounded-panel border border-line bg-intelligence/45 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-control border"
            style={{
              borderColor: `${strategy.color}55`,
              backgroundColor: `${strategy.color}14`,
              color: strategy.color,
            }}
          >
            <Icon className="size-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-cloud">{strategy.name}</h2>
            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
              Primary hazard · {strategy.primaryHazard}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl tracking-[-0.04em] text-cloud">{formatMillions(amount)}</p>
          <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{pct}% of budget</p>
        </div>
      </div>

      <p className="mt-3 text-[10px] leading-relaxed text-muted">{strategy.description}</p>
      <p className="mt-2 text-[9px] leading-relaxed text-amber/75">{strategy.tradeoff}</p>

      <div className="mt-4">
        <label htmlFor={`allocation-${strategy.id}`} className="sr-only">
          Allocation for {strategy.name} in millions of dollars
        </label>
        <input
          id={`allocation-${strategy.id}`}
          type="range"
          min="0"
          max={Math.max(maxM, valueM, 1)}
          step="5"
          value={valueM}
          onChange={(event) => onChange(Number(event.target.value) * 1_000_000)}
          style={{ accentColor: strategy.color }}
          className="h-2 w-full cursor-pointer"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[8px] text-muted">$0M</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onChange(Math.max(0, amount - 5_000_000))}
              disabled={amount <= 0}
              aria-label={`Reduce ${strategy.name} allocation by $5M`}
              className="flex size-7 items-center justify-center rounded-control border border-line text-muted transition-colors hover:border-muted/60 hover:text-cloud disabled:opacity-30"
            >
              <Minus className="size-3" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onChange(Math.min(amount + 5_000_000, amount + remaining))}
              disabled={remaining < 5_000_000}
              aria-label={`Increase ${strategy.name} allocation by $5M`}
              className="flex size-7 items-center justify-center rounded-control border border-line text-muted transition-colors hover:border-muted/60 hover:text-cloud disabled:opacity-30"
            >
              <Plus className="size-3" aria-hidden="true" />
            </button>
          </div>
          <span className="font-mono text-[8px] text-muted">${maxM}M cap</span>
        </div>
      </div>
    </div>
  );
}

function ConsequencesStage() {
  const regionId = useSimulationStore((state) => state.regionId);
  const result = useSimulationStore((state) => state.result);
  const goToDecision = useSimulationStore((state) => state.goToDecision);
  const complete = useSimulationStore((state) => state.complete);
  const replay = useSimulationStore((state) => state.replay);
  const region = getSimulationRegion(regionId ?? "");

  if (!result || !region) {
    return <InvalidStage message="No simulation result is available." />;
  }

  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference * (1 - result.score / 100);
  const color = outcomeColor[result.outcomeTone];
  const maxContribution = Math.max(
    ...result.contributions.map((item) => item.protectedLand),
    1,
  );

  return (
    <div className="space-y-8">
      <StageHeading
        eyebrow={`Last 100 Years / Outcome / ${region.name}`}
        title="The result is not safety. It is the risk you chose to carry."
        description="The portfolio has been tested against the hazard stack. Read the protection gained, the exposure that remains and the weakest link in the defense."
        aside={<RiskBadge level={result.outcomeTone} label={result.outcome} />}
      />

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex items-center gap-5 rounded-panel border border-line bg-intelligence/50 p-5">
          <div className="relative size-[116px] shrink-0">
            <svg viewBox="0 0 112 112" className="size-full -rotate-90" role="img" aria-label={`Simulation score ${result.score} out of 100`}>
              <circle cx="56" cy="56" r="44" fill="none" stroke="#263B58" strokeWidth="7" />
              <circle
                cx="56"
                cy="56"
                r="44"
                fill="none"
                stroke={color}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl tracking-[-0.06em] text-cloud">{result.score}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Model score</span>
            </div>
          </div>
          <div>
            <span className={cn("inline-flex rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.1em]", riskSurface[result.outcomeTone])}>
              {result.outcome}
            </span>
            <p className="mt-3 text-sm font-semibold text-cloud">
              {result.riskReductionPct.toFixed(0)}% composite risk reduction
            </p>
            <p className="mt-1 text-[10px] leading-relaxed text-muted">
              {formatMillions(result.spent)} committed across four strategies.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {[
            { value: `${formatNumber(result.landProtected)} km²`, label: "Land protected", icon: ShieldCheck },
            { value: formatNumber(result.peopleProtected), label: "People protected", icon: Users },
            { value: formatUsd(result.damageAvoided), label: "Damage avoided / yr", icon: Wallet },
            { value: formatNumber(result.residualPopulationExposed), label: "Still exposed", icon: CircleAlert },
          ].map((stat) => (
            <div key={stat.label} className="rounded-card border border-line bg-intelligence/45 p-4">
              <stat.icon className="size-4 text-cyan" aria-hidden="true" />
              <p className="mt-4 font-mono text-lg tracking-[-0.04em] text-cloud">{stat.value}</p>
              <p className="mt-1 text-[8px] uppercase tracking-[0.09em] text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-panel border border-line bg-intelligence/45 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="mono-label text-[9px]">Portfolio performance</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-cloud">Who did the work</h2>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Land protected</span>
          </div>
          <div className="mt-5 space-y-4">
            {result.contributions.map((contribution) => {
              const strategy = simulationStrategies.find((item) => item.id === contribution.strategyId);
              return (
                <div key={contribution.strategyId}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-medium text-cloud">{contribution.name}</span>
                    <span className="font-mono text-[9px] text-muted">
                      {formatNumber(contribution.protectedLand)} km²
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.max(2, (contribution.protectedLand / maxContribution) * 100)}%`,
                        backgroundColor: strategy?.color ?? "#00B8D9",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid gap-3 border-t border-line pt-4 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Most effective</p>
              <p className="mt-1 text-xs font-semibold text-cloud">{result.mostEffectiveStrategy}</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Weakest link</p>
              <p className="mt-1 text-xs font-semibold text-amber">{result.weakestLink}</p>
            </div>
          </div>
        </div>

        <div className="rounded-panel border border-line bg-intelligence/45 p-5">
          <p className="mono-label text-[9px]">Assessment</p>
          <div className="mt-4 space-y-3">
            {result.narrative.map((paragraph) => (
              <p key={paragraph} className="text-[11px] leading-[1.8] text-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-5 rounded-control border border-line bg-navy/35 p-3">
            <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Residual annual damage</p>
            <p className="mt-1 font-mono text-lg text-cloud">{formatUsd(result.residualDamage)}</p>
            <p className="mt-1 text-[9px] leading-relaxed text-muted">
              No allocation in this model removes all damage or all exposure.
            </p>
          </div>
        </div>
      </div>

      <details className="group rounded-panel border border-line bg-intelligence/35 p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold text-cloud">
          Model assumptions and limits
          <span className="text-[9px] font-normal text-muted group-open:hidden">Show</span>
          <span className="hidden text-[9px] font-normal text-muted group-open:inline">Hide</span>
        </summary>
        <ul className="mt-4 space-y-2">
          {result.assumptions.map((assumption) => (
            <li key={assumption} className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
              <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
              {assumption}
            </li>
          ))}
        </ul>
      </details>

      <div className="flex flex-col justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="md" onClick={goToDecision}>
            Adjust portfolio
          </Button>
          <Button variant="ghost" size="md" onClick={replay}>
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Replay region
          </Button>
        </div>
        <Button size="lg" onClick={complete}>
          See the 2100 legacy
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}

function LegacyStage() {
  const regionId = useSimulationStore((state) => state.regionId);
  const result = useSimulationStore((state) => state.result);
  const reset = useSimulationStore((state) => state.reset);
  const region = getSimulationRegion(regionId ?? "");

  if (!result || !region) {
    return <InvalidStage message="No legacy record is available." />;
  }

  const legacyCopy =
    result.outcome === "Protected"
      ? "The portfolio bought the region time. More land stays above the tide, more people remain protected and a larger share of annual damage is avoided. But the defense is a maintenance obligation, not a permanent victory — the residual risk is still real."
      : result.outcome === "Partially protected"
        ? "The plan reduced harm without closing the gap. Some communities gained protection, while others remained in the residual exposure zone. The weakest hazard pathway still defines the limits of the defense."
        : "The allocation did not meet the scale of the pressure. Damage was reduced at the margin, but most of the region's exposure remained. The simulation does not end the story — it exposes what was left undone.";

  return (
    <div className="space-y-8">
      <StageHeading
        eyebrow={`Last 100 Years / Legacy / ${region.name}`}
        title="A century is judged by what remains."
        description="The final screen is not a win screen. It is a record of the trade-offs you made and the residual risk the region would carry into the next century."
        aside={<RiskBadge level={result.outcomeTone} label={result.outcome} />}
      />

      <div className="relative overflow-hidden rounded-panel border border-line bg-intelligence">
        <div className="absolute inset-0 opacity-25">
          <Image src={region.image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/30" />
        </div>
        <Topographic className="absolute inset-0 h-full w-full" opacity={0.16} />
        <div className="relative grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-amber">
              Final record / {region.name} / 2100
            </p>
            <p className="mt-3 max-w-2xl font-display text-2xl font-medium leading-snug tracking-[-0.025em] text-cloud sm:text-3xl">
              {legacyCopy}
            </p>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted">
              Model score <span className="font-mono text-cloud">{result.score}/100</span> ·
              Composite risk reduction{" "}
              <span className="font-mono text-cloud">{result.riskReductionPct.toFixed(0)}%</span> ·
              Weakest link <span className="text-amber">{result.weakestLink}</span>.
            </p>
          </div>
          <div className="rounded-card border border-white/10 bg-navy/60 p-5 backdrop-blur">
            <p className="mono-label text-[9px]">Legacy ledger</p>
            <dl className="mt-3 space-y-3">
              {[
                ["Land protected", `${formatNumber(result.landProtected)} km²`],
                ["People protected", formatNumber(result.peopleProtected)],
                ["Damage avoided", `${formatUsd(result.damageAvoided)} / yr`],
                ["Residual exposure", formatNumber(result.residualPopulationExposed)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 border-b border-line/70 pb-2.5 last:border-b-0 last:pb-0">
                  <dt className="text-[10px] text-muted">{label}</dt>
                  <dd className="font-mono text-[11px] text-cloud">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-panel border border-line bg-intelligence/45 p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-cyan" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-cloud">What the model supports</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {[
              "Comparing the relative reach of four adaptation strategies.",
              "Seeing that concentrated spending has diminishing returns.",
              "Identifying the hazard pathway left weakest by a portfolio.",
              "Testing whether a balanced mix changes the outcome category.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
                <Check className="mt-0.5 size-3 shrink-0 text-cyan" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-panel border border-amber/20 bg-amber/[0.04] p-5">
          <div className="flex items-center gap-2">
            <CircleAlert className="size-4 text-amber" aria-hidden="true" />
            <h2 className="text-sm font-semibold text-cloud">What it cannot tell you</h2>
          </div>
          <ul className="mt-4 space-y-2.5">
            {[
              "Whether a real project would work on a specific shoreline.",
              "How storm sequencing, maintenance failure or politics change outcomes.",
              "What an actual community would choose if it controlled the budget.",
              "Whether the residual risk is socially or ethically acceptable.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
                <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber/80" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
        <p className="max-w-xl text-[10px] leading-relaxed text-muted">
          The simulation is complete. Test another region, revisit the evidence
          or compare this outcome with the live risk watchlist.
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Button variant="ghost" size="md" onClick={reset}>
            <RotateCcw className="size-3.5" aria-hidden="true" />
            Test another region
          </Button>
          <Link href={`/app/risk-intelligence/${region.id}`} className={buttonStyles({ variant: "secondary", size: "md" })}>
            Revisit the region
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <p className="flex items-start gap-2 text-[9px] leading-relaxed text-muted/80">
        <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
        Simulation output is illustrative, deterministic and intended for
        education. It is not a climate projection, engineering design or
        decision-support tool for real investment.
      </p>
    </div>
  );
}

function InvalidStage({ message }: { message: string }) {
  const reset = useSimulationStore((state) => state.reset);
  return (
    <div className="flex min-h-[50svh] flex-col items-center justify-center text-center">
      <CircleAlert className="size-8 text-amber" aria-hidden="true" />
      <h1 id="stage-heading" tabIndex={-1} className="mt-4 font-display text-2xl font-semibold text-cloud outline-none">
        {message}
      </h1>
      <p className="mt-2 text-xs text-muted">Return to the briefing to select a region and rebuild the simulation state.</p>
      <Button className="mt-5" onClick={reset}>
        Return to briefing
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
