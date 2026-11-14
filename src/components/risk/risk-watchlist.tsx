"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { RiskBadge } from "@/components/brand/risk-badge";
import type { Region, RiskLevel } from "@/types";
import { cn, riskText } from "@/lib/utils";

type RiskFilter = RiskLevel | "All";
type SortMode = "risk" | "name";

function MiniTrend({ values, color }: { values: number[]; color: string }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 92 + 2;
      const y = 22 - ((value - min) / span) * 18;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 96 26" className="h-6 w-24" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const trendColor: Record<RiskLevel, string> = {
  Critical: "#EF4444",
  High: "#F97316",
  Moderate: "#F5C542",
  Low: "#35B86B",
};

export function RiskWatchlist({ regions }: { regions: Region[] }) {
  const [query, setQuery] = useState("");
  const [risk, setRisk] = useState<RiskFilter>("All");
  const [sort, setSort] = useState<SortMode>("risk");
  const deferredQuery = useDeferredValue(query);
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    return regions
      .filter((region) => {
        const riskMatch = risk === "All" || region.riskLevel === risk;
        const queryMatch =
          normalized.length === 0 ||
          [region.name, region.country, region.headline, ...region.threats]
            .join(" ")
            .toLowerCase()
            .includes(normalized);
        return riskMatch && queryMatch;
      })
      .sort((a, b) =>
        sort === "risk"
          ? b.riskScore - a.riskScore
          : a.shortName.localeCompare(b.shortName),
      );
  }, [deferredQuery, regions, risk, sort]);

  const hasFilters = query.length > 0 || risk !== "All" || sort !== "risk";

  return (
    <section aria-labelledby="watchlist-heading">
      <div className="flex flex-col justify-between gap-4 border-t border-line pt-6 lg:flex-row lg:items-end">
        <div>
          <p className="mono-label text-[9px]">Regional watchlist</p>
          <h2 id="watchlist-heading" className="mt-2 font-display text-2xl font-semibold tracking-tight text-cloud">
            Five study areas
          </h2>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative block">
            <span className="sr-only">Search the regional watchlist</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="watchlist-search"
              name="watchlist-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search region, country, threat…"
              className="h-10 w-full rounded-control border border-line bg-intelligence pl-9 pr-9 text-xs text-cloud placeholder:text-muted/80 focus:border-cyan/60 focus:outline-none sm:w-[280px]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-muted hover:text-cloud"
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            ) : null}
          </label>
          <label className="relative block">
            <span className="sr-only">Sort regions</span>
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <select
              id="watchlist-sort"
              name="watchlist-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortMode)}
              className="h-10 w-full appearance-none rounded-control border border-line bg-intelligence pl-9 pr-8 text-xs text-cloud focus:border-cyan/60 focus:outline-none sm:w-[190px]"
            >
              <option value="risk">Highest risk first</option>
              <option value="name">Name A–Z</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[8px] text-muted" aria-hidden="true">
              ▼
            </span>
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(["All", "Critical", "High"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setRisk(level)}
              aria-pressed={risk === level}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors",
                risk === level
                  ? "border-cyan/45 bg-cyan/10 text-cyan"
                  : "border-line text-muted hover:border-muted/60 hover:text-cloud",
              )}
            >
              {level === "All" ? "All regions" : `${level} risk`}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted" aria-live="polite">
            {filtered.length} shown
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setRisk("All");
                setSort("risk");
              }}
              className="text-[10px] text-muted transition-colors hover:text-cloud"
            >
              Reset
            </button>
          ) : null}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div layout className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((region, index) => {
              const primary = region.indicators[0];
              const secondary = region.indicators[1];
              return (
                <motion.article
                  layout
                  key={region.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3, delay: reduceMotion ? 0 : index * 0.03 }}
                  className="group overflow-hidden rounded-card border border-line bg-intelligence/45 transition-colors hover:border-cyan/35"
                >
                  <Link href={`/app/risk-intelligence/${region.id}`} className="flex h-full flex-col">
                    <div className="relative aspect-[16/9] overflow-hidden bg-panel">
                      <Image
                        src={region.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover opacity-75 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
                      <div className="absolute left-3 top-3">
                        <RiskBadge level={region.riskLevel} />
                      </div>
                      <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-navy/70 px-2.5 py-1 font-mono text-[9px] text-cloud backdrop-blur">
                        Score {region.riskScore}
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-cloud/65">
                          {region.country} / {region.areaLabel}
                        </p>
                        <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-cloud">
                          {region.shortName}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-4">
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted">{region.headline}</p>

                      <div className="mt-4 space-y-2">
                        {[primary, secondary].map((indicator) => (
                          <div key={indicator.id} className="flex items-center justify-between gap-3 border-t border-line/60 pt-2">
                            <div className="min-w-0">
                              <p className="truncate text-[10px] text-muted">{indicator.label}</p>
                              <p className={cn("mt-0.5 font-mono text-xs", riskText[indicator.risk])}>
                                {indicator.value} <span className="text-[8px] text-muted">{indicator.unit}</span>
                              </p>
                            </div>
                            <MiniTrend values={indicator.sparkline} color={trendColor[indicator.risk]} />
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {region.threats.slice(0, 3).map((threat) => (
                          <span key={threat} className="rounded-full border border-line px-2 py-0.5 text-[8px] text-muted">
                            {threat}
                          </span>
                        ))}
                      </div>

                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[10px] font-semibold text-cyan">
                        Open region intelligence
                        <ArrowUpRight className="size-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 rounded-card border border-dashed border-line px-6 py-14 text-center"
          >
            <p className="font-display text-lg font-semibold text-cloud">No region matches those filters.</p>
            <p className="mt-2 text-xs text-muted">Reset the watchlist to see all five study areas.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
