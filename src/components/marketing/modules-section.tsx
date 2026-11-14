import {
  Archive,
  ArrowUpRight,
  Globe2,
  ShieldHalf,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiskBadge } from "@/components/brand/risk-badge";
import { Reveal } from "@/components/ui/reveal";
import { simulationStrategies } from "@/data/simulation";
import { formatMillions } from "@/lib/utils";

const moduleMeta = [
  {
    number: "01",
    icon: Archive,
    label: "The Past",
    href: "/app/past",
    statement: "What the water has already taken.",
    description:
      "Documented cases of coastal and delta change — with before/after evidence, timelines and the human consequences behind the headline.",
    cta: "Enter the archive",
  },
  {
    number: "02",
    icon: Globe2,
    label: "Risk Intelligence",
    href: "/app/risk-intelligence",
    statement: "Where the risk lives now.",
    description:
      "Explore five predefined study regions on an interactive globe, then inspect exposure, subsidence, rainfall and future scenarios.",
    cta: "Open the globe",
  },
  {
    number: "03",
    icon: ShieldHalf,
    label: "Last 100 Years",
    href: "/app/last-100-years",
    statement: "What protection would you choose?",
    description:
      "Take command of a $100M adaptation budget and run a transparent, educational simulation of the trade-offs between protection strategies.",
    cta: "Begin the simulation",
  },
];

export function ModulesSection() {
  return (
    <section className="relative border-t border-line/70 py-24 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow mb-5">02 / Three ways in</p>
              <h2 className="display-title max-w-3xl text-4xl text-cloud sm:text-5xl lg:text-[58px]">
                Evidence for the past.
                <br />
                <span className="text-muted">Agency for what comes next.</span>
              </h2>
            </div>
            <p className="max-w-sm pb-1 text-sm leading-relaxed text-muted">
              One platform, three distinct lenses on water-driven change. Each
              module keeps observation, projection and simulation clearly
              separated.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {moduleMeta.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.08}>
              <Link
                href={item.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-intelligence/45 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan/45 hover:bg-intelligence/70"
              >
                <span className="absolute right-5 top-4 z-20 font-mono text-[10px] tracking-[0.14em] text-muted/80">
                  {item.number}
                </span>
                <div className="relative h-[230px] overflow-hidden border-b border-line">
                  {index === 0 ? <PastVisual /> : null}
                  {index === 1 ? <GlobeVisual /> : null}
                  {index === 2 ? <SimulationVisual /> : null}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2.5">
                    <item.icon
                      className="size-4 text-cyan"
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-lg font-semibold tracking-tight text-cloud">
                      {item.label}
                    </h3>
                  </div>
                  <p className="mt-4 font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-cloud">
                    {item.statement}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 border-t border-line/80 pt-4 text-xs font-semibold text-cloud transition-colors group-hover:text-cyan">
                    {item.cta}
                    <ArrowUpRight
                      className="size-3.5 text-cyan transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PastVisual() {
  return (
    <div className="absolute inset-0 grid grid-cols-2">
      <div className="relative overflow-hidden">
        <Image
          src="/images/aral-before.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 50vw, 240px"
          className="object-cover opacity-70 grayscale-[35%] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-navy/20" />
        <span className="absolute bottom-3 left-3 rounded-sm border border-cloud/20 bg-navy/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-cloud">
          Before · 1989
        </span>
      </div>
      <div className="relative overflow-hidden border-l border-line">
        <Image
          src="/images/aral-after.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 50vw, 240px"
          className="object-cover opacity-70 saturate-[0.65] transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-navy/20" />
        <span className="absolute bottom-3 right-3 rounded-sm border border-amber/30 bg-navy/70 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-amber">
          After · 2008
        </span>
      </div>
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="rounded-full border border-line bg-navy/80 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-muted backdrop-blur">
          Documented case
        </span>
        <span className="rounded-full border border-critical/30 bg-critical/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-critical backdrop-blur">
          Disappeared
        </span>
      </div>
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan/35" />
      <div className="absolute left-1/2 top-1/2 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan bg-navy" />
    </div>
  );
}

function GlobeVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-navy">
      <div
        className="absolute inset-0 dotted-field opacity-25"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 size-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20"
        aria-hidden="true"
      >
        <div className="absolute inset-[12%] rounded-full border border-line" />
        <div className="absolute inset-[28%] rounded-full border border-line/70" />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line/60" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line/60" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_35%,rgba(0,184,217,0.14),transparent_55%)]" />
        <span className="absolute left-[25%] top-[28%] size-2 rounded-full bg-critical shadow-[0_0_14px_rgba(239,68,68,0.8)]" />
        <span className="absolute left-[58%] top-[22%] size-1.5 rounded-full bg-high" />
        <span className="absolute left-[64%] top-[47%] size-1.5 rounded-full bg-critical" />
        <span className="absolute left-[72%] top-[62%] size-1.5 rounded-full bg-high" />
        <span className="absolute left-[60%] top-[73%] size-1.5 rounded-full bg-critical" />
        <span className="absolute left-[68%] top-[48%] size-5 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-cyan/30" />
      </div>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-line bg-navy/80 px-2.5 py-1 backdrop-blur">
        <span className="size-1.5 rounded-full bg-low" aria-hidden="true" />
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
          5 regions online
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-muted/80">
        <span>Orbital view</span>
        <span>Drag to rotate</span>
      </div>
      <RiskBadge level="Critical" className="absolute right-4 top-4 scale-90" />
    </div>
  );
}

function SimulationVisual() {
  const max = Math.max(...simulationStrategies.map((item) => item.defaultAllocation));
  return (
    <div className="absolute inset-0 bg-navy p-5">
      <div
        className="absolute inset-0 grid-lines opacity-30"
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted">
            Adaptation budget
          </p>
          <p className="mt-1 font-mono text-3xl tracking-[-0.06em] text-cloud">
            $100M
          </p>
        </div>
        <span className="border border-amber/30 bg-amber/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-amber">
          Simulation
        </span>
      </div>
      <div className="relative mt-5 space-y-3">
        {simulationStrategies.map((strategy) => (
          <div key={strategy.id}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em]">
              <span className="text-muted">{strategy.shortName}</span>
              <span className="text-cloud">{formatMillions(strategy.defaultAllocation)}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line/70">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(strategy.defaultAllocation / max) * 100}%`,
                  backgroundColor: strategy.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="absolute bottom-4 left-5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted/80">
        Illustrative values · not real cost estimates
      </p>
    </div>
  );
}
