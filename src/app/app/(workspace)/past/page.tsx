import type { Metadata } from "next";
import { ArrowDownRight, ArrowUpRight, Archive, BookOpen, ScanLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DataStatusBadge } from "@/components/brand/data-status";
import { PastArchive } from "@/components/past/past-archive";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { dataService } from "@/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Past",
  description: "Documented cases of coastal erosion, subsidence and water-driven disappearance.",
};

const statusTone = {
  Disappeared: "border-critical/35 bg-critical/10 text-critical",
  "Partially disappeared": "border-high/35 bg-high/10 text-high",
  "Severely damaged": "border-high/35 bg-high/10 text-high",
  "Under threat": "border-moderate/35 bg-moderate/10 text-moderate",
} as const;

export default async function PastPage() {
  const cases = await dataService.cases.list();
  const featured = cases[0];

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="eyebrow">The Past / Case archive</p>
              <DataStatusBadge status="demo" />
            </div>
            <h1 className="display-title mt-4 text-4xl text-cloud sm:text-5xl">
              What the water took.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Five places where the coast moved, the land sank or the water
              never came back. Each file separates documented evidence from
              illustrative reconstruction.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/25 bg-cyan/[0.06] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em] text-cyan">
              <ScanLine className="size-3" aria-hidden="true" />
              Documented imagery
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em] text-muted">
              <BookOpen className="size-3" aria-hidden="true" />
              Source notes
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="flex items-start gap-3 rounded-card border border-amber/20 bg-amber/[0.045] px-4 py-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-amber/25 bg-amber/10 text-amber">
            <Archive className="size-3" aria-hidden="true" />
          </span>
          <p className="text-[11px] leading-relaxed text-muted">
            <span className="font-medium text-amber">Read the label before the image.</span>{" "}
            Some comparisons are matched satellite records. Others are
            illustrative reconstructions that visualise reported change. The
            distinction is stated on every case file — never inferred from the
            layout.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <article className="group relative overflow-hidden rounded-panel border border-line bg-intelligence">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <Link
              href={`/app/past/${featured.slug}`}
              className="relative min-h-[260px] overflow-hidden bg-panel sm:min-h-[340px]"
            >
              <Image
                src={featured.heroImage}
                alt={featured.impactImageAlt}
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover opacity-85 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-navy/20 lg:bg-gradient-to-r lg:from-navy/35 lg:via-transparent lg:to-intelligence" />
              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em] backdrop-blur",
                    statusTone[featured.status],
                  )}
                >
                  {featured.status}
                </span>
                <span className="inline-flex rounded-full border border-white/15 bg-navy/55 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em] text-cloud/80 backdrop-blur">
                  Featured case
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-cyan">
                  {featured.category} / {featured.period}
                </p>
                <p className="mt-1 text-xs text-cloud/70">{featured.heroCredit}</p>
              </div>
            </Link>

            <div className="flex flex-col p-5 sm:p-7 lg:p-9">
              <p className="mono-label text-[9px]">Case 01 / {featured.regionLabel}</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.035em] text-cloud">
                {featured.name}
              </h2>
              <p className="mt-1 text-xs text-muted">{featured.country}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{featured.summary}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {featured.impactStats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="rounded-control border border-line bg-navy/35 p-3">
                    <p className="font-mono text-xl tracking-[-0.04em] text-cloud">{stat.value}</p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
                <span className="font-mono text-[8px] uppercase tracking-[0.11em] text-muted/80">
                  {featured.comparisonType === "documented" ? "Documented comparison" : "Illustrative comparison"}
                </span>
                <ButtonLink href={`/app/past/${featured.slug}`} variant="secondary" size="sm">
                  Read the case file
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </article>
      </Reveal>

      <PastArchive cases={cases} />

      <Reveal>
        <div className="flex flex-col justify-between gap-5 rounded-panel border border-line bg-intelligence/40 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-start gap-3">
            <ArrowDownRight className="mt-0.5 size-5 shrink-0 text-cyan" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-cloud">The past is not a prediction.</p>
              <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
                These cases show mechanisms — subsidence, sediment starvation,
                diversion, exposure — not a guaranteed future for any region.
              </p>
            </div>
          </div>
          <ButtonLink href="/app/risk-intelligence" variant="dark" size="sm" className="shrink-0">
            Compare with current risk
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
