import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CircleAlert,
  FileText,
  Layers,
  MapPin,
  ScanLine,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DataStatusBadge } from "@/components/brand/data-status";
import { ComparisonSlider } from "@/components/past/comparison-slider";
import { Reveal } from "@/components/ui/reveal";
import { dataService } from "@/services";
import { cn } from "@/lib/utils";

interface CasePageProps {
  params: Promise<{ slug: string }>;
}

const statusTone = {
  Disappeared: "border-critical/35 bg-critical/10 text-critical",
  "Partially disappeared": "border-high/35 bg-high/10 text-high",
  "Severely damaged": "border-high/35 bg-high/10 text-high",
  "Under threat": "border-moderate/35 bg-moderate/10 text-moderate",
} as const;

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await dataService.cases.getBySlug(slug);
  if (!study) return { title: "Case not found" };
  return {
    title: study.name,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: CasePageProps) {
  const { slug } = await params;
  const [study, cases] = await Promise.all([
    dataService.cases.getBySlug(slug),
    dataService.cases.list(),
  ]);

  if (!study) notFound();

  const currentIndex = cases.findIndex((item) => item.slug === study.slug);
  const nextCase = cases[(currentIndex + 1) % cases.length];

  return (
    <div className="space-y-8">
      <Reveal>
        <Link
          href="/app/past"
          className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-cloud"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back to the archive
        </Link>
      </Reveal>

      <Reveal>
        <header className="grid gap-6 lg:grid-cols-[1fr_270px] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex rounded-full border px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em]",
                  statusTone[study.status],
                )}
              >
                {study.status}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                {study.category}
              </span>
              <DataStatusBadge status="demo" />
            </div>
            <h1 className="display-title mt-5 text-4xl text-cloud sm:text-6xl">
              {study.name}
            </h1>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.13em] text-muted">
              {study.country} / {study.regionLabel} / {study.period}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-cloud/75">
              {study.intro}
            </p>
          </div>

          <div className="rounded-card border border-line bg-intelligence/55 p-4">
            <p className="mono-label text-[9px]">File status</p>
            <dl className="mt-3 space-y-3">
              <div>
                <dt className="text-[9px] uppercase tracking-[0.1em] text-muted">Comparison</dt>
                <dd className="mt-0.5 text-xs font-medium text-cloud">
                  {study.comparisonType === "documented" ? "Documented images" : "Illustrative reconstruction"}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.1em] text-muted">Record type</dt>
                <dd className="mt-0.5 text-xs font-medium text-cloud">Demonstration case file</dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-[0.1em] text-muted">Sources</dt>
                <dd className="mt-0.5 text-xs font-medium text-cloud">{study.sources.length} reference entries</dd>
              </div>
            </dl>
          </div>
        </header>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="space-y-3">
          <ComparisonSlider
            before={study.before}
            after={study.after}
            illustrative={study.comparisonType === "illustrative"}
          />
          <div
            className={cn(
              "flex items-start gap-2.5 rounded-control border px-3.5 py-2.5",
              study.comparisonType === "documented"
                ? "border-cyan/20 bg-cyan/[0.045]"
                : "border-amber/25 bg-amber/[0.05]",
            )}
          >
            {study.comparisonType === "documented" ? (
              <ScanLine className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden="true" />
            ) : (
              <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" aria-hidden="true" />
            )}
            <p className="text-[10px] leading-relaxed text-muted">
              <span
                className={cn(
                  "font-semibold",
                  study.comparisonType === "documented" ? "text-cyan" : "text-amber",
                )}
              >
                {study.comparisonType === "documented"
                  ? "Documented comparison. "
                  : "Illustrative comparison. "}
              </span>
              {study.comparisonNote}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
        <div className="space-y-8">
          <Reveal>
            <section aria-labelledby="story-heading" className="rounded-panel border border-line bg-intelligence/40 p-5 sm:p-7">
              <p className="mono-label text-[9px]">The record</p>
              <h2 id="story-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight text-cloud">
                How the place changed
              </h2>
              <div className="mt-5 space-y-4">
                {study.story.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-[1.85] text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="timeline-heading">
              <div className="flex items-end justify-between border-b border-line pb-3">
                <div>
                  <p className="mono-label text-[9px]">Chronology</p>
                  <h2 id="timeline-heading" className="mt-1 font-display text-xl font-semibold text-cloud">
                    Turning points
                  </h2>
                </div>
                <CalendarDays className="size-4 text-cyan" aria-hidden="true" />
              </div>
              <ol className="mt-5">
                {study.timeline.map((event, index) => (
                  <li key={event.year + "-" + index} className="grid grid-cols-[72px_18px_1fr] gap-3 sm:grid-cols-[100px_20px_1fr] sm:gap-4">
                    <span className="pt-0.5 font-mono text-[10px] tracking-[0.05em] text-cyan">
                      {event.year}
                    </span>
                    <span className="relative flex justify-center" aria-hidden="true">
                      <span className="absolute inset-y-0 w-px bg-line" />
                      <span
                        className={cn(
                          "relative mt-1.5 size-2 rounded-full border-2 border-navy",
                          index === 0 ? "bg-cyan" : "bg-line",
                        )}
                      />
                    </span>
                    <div className="pb-6">
                      <h3 className="text-sm font-semibold text-cloud">{event.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{event.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="causes-heading">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div>
                  <p className="mono-label text-[9px]">Mechanisms</p>
                  <h2 id="causes-heading" className="mt-1 font-display text-xl font-semibold text-cloud">
                    Why it happened
                  </h2>
                </div>
                <Layers className="size-4 text-cyan" aria-hidden="true" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {study.causes.map((cause) => (
                  <div key={cause.title} className="rounded-card border border-line bg-intelligence/45 p-4">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-cloud">
                      {cause.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{cause.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="evidence-heading" className="rounded-card border border-cyan/20 bg-cyan/[0.035] p-5">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-cyan" aria-hidden="true" />
                <h2 id="evidence-heading" className="text-sm font-semibold text-cloud">
                  What supports the record
                </h2>
              </div>
              <ul className="mt-3 space-y-2.5">
                {study.evidence.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-muted">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="impact-heading">
              <p className="mono-label text-[9px]">Consequence</p>
              <h2 id="impact-heading" className="mt-1 font-display text-2xl font-semibold tracking-tight text-cloud">
                The human measure
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{study.impactNarrative}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {study.impactStats.map((stat) => (
                  <div key={stat.label} className="rounded-card border border-line bg-intelligence/50 p-4">
                    <p className="font-mono text-2xl tracking-[-0.05em] text-cloud">{stat.value}</p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-cyan">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-[10px] leading-relaxed text-muted">{stat.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <figure>
              <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-line">
                {study.impactImage && (
                  <Image
                    src={study.impactImage}
                    alt={study.impactImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    className="object-cover"
                  />
                )}
                {(!study.impactImage || study.impactImage === "") && (
                  <div
                    className="absolute inset-0 flex items-center justify-center text-muted/60"
                  >
                    No image available
                  </div>
                )}
              </div>
              <figcaption className="mt-2 flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
                <span>{study.impactImageCredit}</span>
                <span>{study.period}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[92px]">
          <Reveal>
            <div className="rounded-card border border-line bg-intelligence/55 p-4">
              <p className="mono-label text-[9px]">Case coordinates</p>
              <dl className="mt-3 space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Location</dt>
                    <dd className="mt-0.5 text-xs text-cloud">{study.country}</dd>
                    <dd className="text-[10px] text-muted">{study.regionLabel}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CalendarDays className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">period</dt>
                    <dd className="mt-0.5 text-xs text-cloud">{study.period}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CircleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" aria-hidden="true" />
                  <div>
                    <dt className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Primary classification</dt>
                    <dd className="mt-0.5 text-xs text-cloud">{study.category}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <div className="rounded-card border border-line bg-intelligence/55 p-4">
              <p className="mono-label text-[9px]">Sources</p>
              <ul className="mt-3 space-y-3">
                {study.sources.map((source) => (
                  <li key={source.label}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group block"
                      >
                        <span className="flex items-start justify-between gap-2 text-[11px] font-medium leading-snug text-cloud group-hover:text-cyan">
                          {source.label}
                          <ArrowUpRight className="mt-0.5 size-3 shrink-0 text-muted" aria-hidden="true" />
                        </span>
                        <span className="mt-0.5 block text-[9px] uppercase tracking-[0.08em] text-muted">
                          {source.provider}
                        </span>
                      </a>
                    ) : (
                      <>
                        <span className="text-[11px] font-medium text-cloud">{source.label}</span>
                        <span className="mt-0.5 block text-[9px] uppercase tracking-[0.08em] text-muted">
                          {source.provider}
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-3 text-[9px] leading-relaxed text-muted">
                Links open external sources. Figures in this demonstration case
                remain subject to verification.
              </p>
            </div>
          </Reveal>
        </aside>
      </div>

      <Reveal>
        <Link
          href={`/app/past/${nextCase.slug}`}
          className="group flex flex-col justify-between gap-4 rounded-panel border border-line bg-intelligence/45 p-5 transition-colors hover:border-cyan/35 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mono-label text-[9px]">Next case file</p>
            <p className="mt-1 font-display text-xl font-semibold text-cloud group-hover:text-cyan">
              {nextCase.name}
            </p>
            <p className="mt-1 text-[10px] text-muted">
              {nextCase.category} · {nextCase.country}
            </p>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-cyan transition-colors group-hover:border-cyan/40">
            <ArrowRight className="size-4" aria-hidden="true" />
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
