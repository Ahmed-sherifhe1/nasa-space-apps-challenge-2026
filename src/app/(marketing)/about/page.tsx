import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  CircleAlert,
  Database,
  FlaskConical,
  Map,
} from "lucide-react";
import Link from "next/link";
import { DataStatusBadge } from "@/components/brand/data-status";
import { Topographic } from "@/components/brand/topographic";
import { Reveal } from "@/components/ui/reveal";
import { simulationAssumptions } from "@/features/simulation/model";

export const metadata: Metadata = {
  title: "About & Methodology",
  description:
    "How DELTA 2100 handles evidence, uncertainty, data provenance and the boundary between observed data and illustrative simulation.",
  alternates: { canonical: "/about" },
};

const dataDomains = [
  {
    label: "Historical case studies",
    status: "illustrative" as const,
    body: "Demonstration case files summarize public evidence. Verified historical content, final citations and approved image sets are pending from the data team.",
  },
  {
    label: "Regional risk indicators",
    status: "illustrative" as const,
    body: "Displayed metrics are clearly labelled demonstration values. The UI already reads through a typed service contract, so verified data can replace them without redesign.",
  },
  {
    label: "Future 2100 projections",
    status: "projected" as const,
    body: "Scenario values are illustrative planning envelopes inspired by IPCC-aligned pathways. They are not regional forecasts and are not suitable for engineering decisions.",
  },
  {
    label: "Last 100 Years simulation",
    status: "demo" as const,
    body: "The survival game uses a deterministic educational model with transparent, documented assumptions. Outputs are not predictions, guarantees or cost estimates.",
  },
];

const sources = [
  {
    name: "NASA Sea Level Change Portal",
    href: "https://sealevel.nasa.gov/",
    note: "Sea-level observations, projections and IPCC AR6 tooling.",
  },
  {
    name: "ESA Copernicus",
    href: "https://www.copernicus.eu/",
    note: "Sentinel Earth-observation imagery and derived products.",
  },
  {
    name: "IPCC Sixth Assessment Report",
    href: "https://www.ipcc.ch/report/ar6/",
    note: "Physical climate science, impacts, adaptation and scenario framing.",
  },
  {
    name: "NOAA Coastal Change Analysis Program",
    href: "https://coast.noaa.gov/",
    note: "Coastal land-cover and change data for the United States.",
  },
  {
    name: "USGS Coastal Louisiana",
    href: "https://www.usgs.gov/centers/wetland-and-aquatic-research-center/science/coastal-louisiana",
    note: "Land loss, subsidence and coastal restoration research.",
  },
  {
    name: "UNESCO World Heritage Centre",
    href: "https://whc.unesco.org/en/list/394/",
    note: "Venice and its lagoon heritage context.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-[150px] lg:pb-28 lg:pt-[184px]">
        <div className="absolute inset-0 grid-lines opacity-35" aria-hidden="true" />
        <Topographic className="absolute -right-20 -top-24 h-[720px] w-[760px] opacity-60" />
        <div className="shell relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-5">Project / Methodology / Transparency</p>
            <h1 className="display-title max-w-4xl text-[clamp(3rem,6vw,5.8rem)] text-cloud">
              Built to make risk
              <br />
              <span className="text-muted">legible.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              DELTA 2100 is an independent climate-risk intelligence concept.
              It connects documented coastal change, regional exposure and a
              transparent educational simulation in one brand — while keeping
              evidence and gameplay visibly separate.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="panel-surface p-5 sm:p-6">
              <p className="mono-label">Public promise</p>
              <p className="mt-3 font-display text-2xl font-medium leading-tight tracking-[-0.03em] text-cloud">
                Understand. Prepare. Protect.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Data clarity, scientific integrity and trust take priority over
                visual drama. Where the evidence is incomplete, the interface
                says so.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
                <DataStatusBadge status="observed" />
                <DataStatusBadge status="projected" />
                <DataStatusBadge status="illustrative" />
                <DataStatusBadge status="demo" />
              </div>
            </div>
          </Reveal>
        </div>

        <nav
          aria-label="On this page"
          className="shell relative mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
        >
          <a href="#methodology" className="hover:text-cloud">
            Methodology
          </a>
          <a href="#data" className="hover:text-cloud">
            Data status
          </a>
          <a href="#limits" className="hover:text-cloud">
            Limitations
          </a>
          <a href="#sources" className="hover:text-cloud">
            Sources
          </a>
        </nav>
      </section>

      <section
        id="methodology"
        className="scroll-mt-24 border-t border-line py-20 lg:py-28"
      >
        <div className="shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">01 / Approach</p>
            <h2 className="display-title text-4xl text-cloud sm:text-5xl">
              Evidence with a
              <br />
              <span className="text-muted">visible edge.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="space-y-6 text-pretty text-base leading-relaxed text-muted">
              <p>
                Climate risk is not one number. It is a relationship between a
                hazard, the exposure of people and assets, and the capacity to
                adapt. DELTA 2100 presents those relationships as separate,
                inspectable pieces instead of collapsing them into a single
                dramatic score.
              </p>
              <p>
                Each data element is designed to carry a name, value, unit,
                geography, time context, source and status. Where verified
                datasets are unavailable, the product shows clearly labelled
                demonstration values and exposes an isolated adapter boundary.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Database,
                    title: "Isolated data",
                    body: "Mock values live in one data layer behind typed service contracts.",
                  },
                  {
                    icon: Map,
                    title: "Geographic context",
                    body: "Maps carry legends, layer labels, units and an explicit provenance state.",
                  },
                  {
                    icon: FlaskConical,
                    title: "Model separation",
                    body: "Simulation logic is pure TypeScript, independent from React components.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-card border border-line bg-intelligence/40 p-4">
                    <item.icon className="size-4 text-cyan" aria-hidden="true" />
                    <h3 className="mt-3 text-sm font-semibold text-cloud">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="data" className="scroll-mt-24 border-t border-line bg-intelligence/30 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">02 / Data status</p>
            <h2 className="display-title max-w-3xl text-4xl text-cloud sm:text-5xl">
              What you are looking at.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
              This demonstration build does not contain verified regional
              datasets. The four data domains below are intentionally separated.
            </p>
          </Reveal>

          <div className="mt-10 overflow-hidden rounded-card border border-line">
            {dataDomains.map((domain) => (
              <div
                key={domain.label}
                className="grid gap-3 border-b border-line bg-navy/30 px-5 py-5 last:border-b-0 sm:grid-cols-[220px_120px_1fr] sm:items-start sm:gap-5 sm:px-6"
              >
                <h3 className="text-sm font-semibold text-cloud">{domain.label}</h3>
                <DataStatusBadge status={domain.status} className="w-fit" />
                <p className="text-sm leading-relaxed text-muted">{domain.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-card border border-amber/25 bg-amber/[0.06] p-4 text-sm leading-relaxed text-muted">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
            <p>
              When the verified data service is connected, values will be
              replaced at the adapter layer. The interface does not assume that
              demonstration values are real measurements.
            </p>
          </div>
        </div>
      </section>

      <section id="limits" className="scroll-mt-24 border-t border-line py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">03 / Limitations</p>
            <h2 className="display-title text-4xl text-cloud sm:text-5xl">
              What this is not.
            </h2>
            <div className="mt-7 space-y-4">
              {[
                "Not a real-time flood warning service.",
                "Not a substitute for engineering, insurance or emergency guidance.",
                "Not an official NASA, ESA, UN or government product.",
                "Not a verified historical archive until the data team approves final content.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 border-b border-line pb-4 text-sm text-muted">
                  <ArrowDownRight className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-card border border-line bg-intelligence/45 p-5 sm:p-7">
              <div className="flex items-center gap-2.5">
                <BookOpen className="size-4 text-cyan" aria-hidden="true" />
                <h3 className="font-display text-xl font-semibold text-cloud">
                  Simulation disclosure
                </h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                LAST 100 YEARS is an educational exercise. Its $100M budget,
                intervention categories and protection responses are
                illustrative. The model is deterministic and documented.
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                {simulationAssumptions.map((assumption) => (
                  <li key={assumption} className="flex gap-2.5 text-xs leading-relaxed text-muted">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    {assumption}
                  </li>
                ))}
              </ul>
              <Link
                href="/app/last-100-years"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cloud transition-colors hover:text-cyan"
              >
                Open the simulation
                <ArrowUpRight className="size-4 text-cyan transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sources" className="scroll-mt-24 border-t border-line bg-intelligence/30 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-5">04 / Sources & references</p>
            <h2 className="display-title max-w-3xl text-4xl text-cloud sm:text-5xl">
              Where the science lives.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
              The product is designed around open Earth-observation and climate
              science. Links below point to the authoritative providers; final
              dataset citations will be attached to each metric once verified.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sources.map((source) => (
              <a
                key={source.name}
                href={source.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group rounded-card border border-line bg-navy/35 p-5 transition-colors hover:border-cyan/40 hover:bg-panel/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-cloud">{source.name}</h3>
                  <ArrowUpRight className="size-4 shrink-0 text-cyan transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted">{source.note}</p>
              </a>
            ))}
          </div>

          <p className="mt-8 max-w-4xl border-t border-line pt-6 font-mono text-[10px] leading-relaxed tracking-wide text-muted/80">
            Image credits are displayed in each case file and region dashboard.
            Satellite and aerial imagery is used for illustrative context where
            noted. DELTA 2100 does not use NASA insignia and does not imply
            official endorsement. Brand logo asset in this build is a temporary
            placeholder pending the approved master artwork.
          </p>
        </div>
      </section>
    </>
  );
}
