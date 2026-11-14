"use client";

import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import type { SimulationStage } from "@/store/simulation-store";
import { useSimulationStore } from "@/store/simulation-store";
import { cn } from "@/lib/utils";

const stages: { id: SimulationStage; label: string }[] = [
  { id: "launch", label: "Briefing" },
  { id: "warning", label: "Threat" },
  { id: "disaster", label: "Event" },
  { id: "decision", label: "Allocate" },
  { id: "consequences", label: "Outcome" },
  { id: "legacy", label: "Legacy" },
];

export function SimulationHeader() {
  const stage = useSimulationStore((state) => state.stage);
  const reset = useSimulationStore((state) => state.reset);
  const currentIndex = stages.findIndex((item) => item.id === stage);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <Link href="/app" aria-label="Back to mission control" className="shrink-0 rounded-sm">
            <BrandLogo compact className="sm:hidden" />
            <BrandLogo className="hidden sm:block" />
          </Link>
          <span className="hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
          <div className="min-w-0">
            <p className="truncate font-mono text-[8px] uppercase tracking-[0.14em] text-amber">
              Last 100 Years
            </p>
            <p className="truncate text-[11px] font-medium text-cloud">
              {stages[currentIndex]?.label ?? "Briefing"}
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div
            role="progressbar"
            aria-label="Simulation stage"
            aria-valuemin={1}
            aria-valuemax={6}
            aria-valuenow={currentIndex + 1}
            aria-valuetext={`Stage ${currentIndex + 1} of 6, ${stages[currentIndex]?.label}`}
            className="flex items-center gap-1.5"
          >
            {stages.map((item, index) => (
              <span
                key={item.id}
                title={item.label}
                className={cn(
                  "h-1 rounded-full transition-[width,background-color] duration-300",
                  index === currentIndex
                    ? "w-7 bg-amber"
                    : index < currentIndex
                      ? "w-4 bg-amber/45"
                      : "w-4 bg-line",
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted">
            {String(currentIndex + 1).padStart(2, "0")} / 06
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-amber/25 bg-amber/[0.07] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.11em] text-amber sm:inline-flex">
            Illustrative model
          </span>
          <button
            type="button"
            onClick={reset}
            className="hidden h-9 items-center gap-1.5 rounded-control border border-line px-3 text-[10px] text-muted transition-colors hover:border-muted/50 hover:text-cloud sm:inline-flex"
          >
            <RotateCcw className="size-3" aria-hidden="true" />
            Restart
          </button>
          <Link
            href="/app"
            aria-label="Back to mission control console"
            className="inline-flex h-9 items-center gap-1.5 rounded-control border border-line px-3 text-[10px] text-muted transition-colors hover:border-cyan/35 hover:text-cloud"
          >
            <ArrowLeft className="size-3" aria-hidden="true" />
            <span className="hidden sm:inline">Console</span>
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />
    </header>
  );
}
