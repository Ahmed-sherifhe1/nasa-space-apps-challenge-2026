"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import type { CaseStudy, ThreatCategory } from "@/types";
import { cn } from "@/lib/utils";

const statusTone: Record<CaseStudy["status"], string> = {
  Disappeared: "border-critical/35 bg-critical/10 text-critical",
  "Partially disappeared": "border-high/35 bg-high/10 text-high",
  "Severely damaged": "border-high/35 bg-high/10 text-high",
  "Under threat": "border-moderate/35 bg-moderate/10 text-moderate",
};

const categories: Array<ThreatCategory | "All"> = [
  "All",
  "Sea-level rise",
  "Coastal erosion",
  "Land subsidence",
  "Tidal flooding",
  "Water-driven displacement",
];

export function PastArchive({ cases }: { cases: CaseStudy[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ThreatCategory | "All">("All");
  const [status, setStatus] = useState<CaseStudy["status"] | "All">("All");
  const deferredQuery = useDeferredValue(query);
  const reduceMotion = useReducedMotion();

  const statuses = useMemo(
    () => Array.from(new Set(cases.map((study) => study.status))),
    [cases],
  );

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return cases.filter((study) => {
      const categoryMatch = category === "All" || study.category === category;
      const statusMatch = status === "All" || study.status === status;
      const queryMatch =
        normalized.length === 0 ||
        [study.name, study.country, study.summary, study.category]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      return categoryMatch && statusMatch && queryMatch;
    });
  }, [cases, category, status, deferredQuery]);

  const hasFilters = query.length > 0 || category !== "All" || status !== "All";

  return (
    <section aria-labelledby="archive-heading">
      <div className="flex flex-col justify-between gap-4 border-t border-line pt-6 lg:flex-row lg:items-end">
        <div>
          <p className="mono-label text-[9px]">Archive index</p>
          <h2 id="archive-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight text-cloud">
            Five documented places
          </h2>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block">
            <span className="sr-only">Search the case archive</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="archive-search"
              name="archive-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search place, country, threat…"
              className="h-10 w-full rounded-control border border-line bg-intelligence pl-9 pr-9 text-xs text-cloud placeholder:text-muted/80 focus:border-cyan/60 focus:outline-none sm:w-[260px]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded text-muted hover:text-cloud"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </label>
          <label className="relative block">
            <span className="sr-only">Filter by status</span>
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <select
              id="archive-status"
              name="archive-status"
              value={status}
              onChange={(event) => setStatus(event.target.value as CaseStudy["status"] | "All")}
              className="h-10 w-full appearance-none rounded-control border border-line bg-intelligence pl-9 pr-8 text-xs text-cloud focus:border-cyan/60 focus:outline-none sm:w-[190px]"
            >
              <option value="All">All statuses</option>
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-muted" aria-hidden="true">
              ▼
            </span>
          </label>
        </div>
      </div>

      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors",
              category === item
                ? "border-cyan/45 bg-cyan/10 text-cyan"
                : "border-line text-muted hover:border-muted/60 hover:text-cloud",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-b border-line pb-2">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "case" : "cases"}
        </p>
        {hasFilters ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setStatus("All");
            }}
            className="text-[10px] text-muted transition-colors hover:text-cloud"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div layout className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((study, index) => (
              <motion.article
                layout
                key={study.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: reduceMotion ? 0 : index * 0.03 }}
                className="group overflow-hidden rounded-card border border-line bg-intelligence/45 transition-colors hover:border-cyan/35"
              >
                <Link href={`/app/past/${study.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-panel">
                    <Image
                      src={study.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent" />
                    <span
                      className={cn(
                        "absolute left-3 top-3 inline-flex rounded-full border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.11em] backdrop-blur",
                        statusTone[study.status],
                      )}
                    >
                      {study.status}
                    </span>
                    <span className="absolute bottom-3 left-3 font-mono text-[8px] uppercase tracking-[0.13em] text-cloud/75">
                      {study.period}
                    </span>
                    <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/20 bg-navy/70 text-cloud backdrop-blur">
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-cyan">
                      {study.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-cloud">
                      {study.name}
                    </h3>
                    <p className="mt-0.5 text-[10px] text-muted">
                      {study.country} · {study.regionLabel}
                    </p>
                    <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">
                      {study.summary}
                    </p>
                    <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-cyan">
                      Open case file
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-card border border-dashed border-line px-6 py-14 text-center"
          >
            <p className="font-display text-lg font-semibold text-cloud">No case matches those filters.</p>
            <p className="mt-2 text-xs text-muted">Try a broader threat category or reset the archive.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
