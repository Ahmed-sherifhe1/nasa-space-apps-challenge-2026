"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CircleAlert } from "lucide-react";
import { useState } from "react";
import type { FutureScenario } from "@/types";
import { cn, formatNumber } from "@/lib/utils";

export function ScenarioExplorer({ scenarios }: { scenarios: FutureScenario[] }) {
  const initial = scenarios.find((scenario) => scenario.id === "mid") ?? scenarios[0];
  const [selectedId, setSelectedId] = useState(initial.id);
  const selected = scenarios.find((scenario) => scenario.id === selectedId) ?? initial;
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-3">
        {scenarios.map((scenario) => {
          const active = scenario.id === selected.id;
          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => setSelectedId(scenario.id)}
              aria-pressed={active}
              className={cn(
                "rounded-card border p-3 text-left transition-colors",
                active
                  ? "border-cyan/45 bg-cyan/[0.07]"
                  : "border-line bg-navy/25 hover:border-muted/45",
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("font-mono text-[8px] uppercase tracking-[0.11em]", active ? "text-cyan" : "text-muted")}>
                  {scenario.shortLabel}
                </span>
                <span className={cn("size-1.5 rounded-full", active ? "bg-cyan" : "bg-line")} aria-hidden="true" />
              </div>
              <p className="mt-2 font-mono text-xl tracking-[-0.04em] text-cloud">
                {scenario.slr2100M.toFixed(2)} m
              </p>
              <p className="mt-0.5 text-[9px] text-muted">2100 sea-level planning value</p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="mt-3 rounded-card border border-line bg-intelligence/55 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-cloud">{selected.label}</p>
              <p className="mt-1 max-w-xl text-[10px] leading-relaxed text-muted">
                {selected.description}
              </p>
            </div>
            <span className="rounded-full border border-high/25 bg-high/[0.07] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.1em] text-high">
              Projected
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Exposed land</p>
              <p className="mt-1 font-mono text-lg text-cloud">{selected.exposedLandPct}%</p>
            </div>
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">Exposed people</p>
              <p className="mt-1 font-mono text-lg text-cloud">{formatNumber(selected.exposedPopulation)}</p>
            </div>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-high"
              style={{ width: `${Math.min(selected.exposedLandPct, 100)}%` }}
            />
          </div>

          <div className="mt-3 flex items-start gap-2 text-[9px] leading-relaxed text-muted">
            <CircleAlert className="mt-0.5 size-3 shrink-0 text-amber" aria-hidden="true" />
            {selected.assumption}
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-muted/65">
        Planning values only
        <ArrowUpRight className="size-2.5" aria-hidden="true" />
        Not a flood forecast
      </p>
    </div>
  );
}
