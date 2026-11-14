"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Crosshair } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { regions } from "@/data/regions";
import { cn } from "@/lib/utils";

const markers = [
  { id: "mississippi-delta", label: "Mississippi", top: "27%", left: "18%" },
  { id: "venice", label: "Venice", top: "17%", left: "55%" },
  { id: "nile-delta", label: "Nile Delta", top: "41%", left: "62%" },
  { id: "ganges-brahmaputra", label: "Ganges", top: "59%", left: "73%" },
  { id: "maldives", label: "Maldives", top: "74%", left: "66%" },
];

export function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[590px]"
    >
      <div
        className="absolute -inset-16 rounded-full bg-cyan/[0.055] blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative aspect-square w-full">
        <div
          className="absolute inset-[2%] rounded-full border border-line/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[5.5%] rounded-full border border-dashed border-cyan/15"
          aria-hidden="true"
        />

        <div className="absolute inset-[9%] overflow-hidden rounded-full border border-cyan/25 shadow-[inset_0_0_80px_rgba(0,184,217,0.12),0_30px_100px_rgba(0,0,0,0.55)]">
          <Image
            src="/images/nile-hero.jpg"
            alt="Illustrative Earth-observation view of the Nile Delta and Mediterranean."
            fill
            priority
            loading="eager"
            sizes="(max-width: 768px) 90vw, 520px"
            className="scale-[1.08] object-cover opacity-80 saturate-[0.7]"
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_45%_38%,transparent_0%,rgba(8,16,32,0.1)_48%,rgba(8,16,32,0.88)_100%)]"
            aria-hidden="true"
          />
          <div
            className="radar-rings absolute inset-0 opacity-90"
            aria-hidden="true"
          />
          <div
            className="animate-scan absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-cyan/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy to-transparent" />

          <div className="absolute inset-x-0 top-[33%] h-px bg-cyan/20" />
          <div className="absolute inset-x-0 top-[66%] h-px bg-cyan/10" />
          <div className="absolute inset-y-0 left-[33%] w-px bg-cyan/10" />
          <div className="absolute inset-y-0 left-[66%] w-px bg-cyan/10" />

          {markers.map((marker, index) => {
            const region = regions.find((item) => item.id === marker.id);
            const critical = region?.riskLevel === "Critical";
            return (
              <Link
                key={marker.id}
                href={`/app/risk-intelligence/${marker.id}`}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ top: marker.top, left: marker.left }}
                aria-label={`Open ${region?.name ?? marker.label} risk dashboard`}
              >
                <span
                  className={cn(
                    "relative block size-3 rounded-full border-2 border-navy shadow-[0_0_0_1px_rgba(248,250,252,0.35)]",
                    critical ? "bg-critical" : "bg-high",
                  )}
                >
                  <span
                    className={cn(
                      "animate-pulse-ring absolute inset-0 rounded-full",
                      critical ? "bg-critical/50" : "bg-high/50",
                    )}
                    style={{ animationDelay: `${index * 0.55}s` }}
                    aria-hidden="true"
                  />
                </span>
                <span className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded border border-line bg-navy/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-cloud opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
                  {region?.shortName ?? marker.label}
                  <ArrowUpRight className="size-2.5 text-cyan" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        <div
          className="absolute inset-[6.2%] rounded-full border border-cyan/10"
          aria-hidden="true"
        />
        <div className="absolute -right-1 top-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted/80 [writing-mode:vertical-rl]">
          Orbital observation / 2026
        </div>
        <div className="absolute -left-2 bottom-5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted/80 [writing-mode:vertical-rl]">
          31.2°E · 31.0°N
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -left-2 top-[12%] z-30 hidden w-[176px] border border-line bg-intelligence/90 p-3.5 shadow-2xl backdrop-blur-md md:block xl:-left-14"
      >
        <div className="flex items-center justify-between">
          <span className="mono-label text-[9px]">Active regions</span>
          <span className="size-1.5 rounded-full bg-low" aria-hidden="true" />
        </div>
        <p className="mt-2 font-mono text-3xl leading-none tracking-tight text-cloud">
          05
        </p>
        <div className="mt-3 flex items-center gap-1" aria-hidden="true">
          {regions.map((region) => (
            <span
              key={region.id}
              className={cn(
                "h-1 flex-1 rounded-full",
                region.riskLevel === "Critical" ? "bg-critical" : "bg-high",
              )}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
          Predefined study areas
        </p>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-2 right-0 z-30 hidden w-[220px] border border-line bg-intelligence/90 p-4 shadow-2xl backdrop-blur-md sm:block xl:-right-10"
      >
        <div className="flex items-center gap-2 text-cyan">
          <Crosshair className="size-3.5" aria-hidden="true" />
          <span className="font-mono text-[9px] uppercase tracking-[0.15em]">
            Signal · Nile Delta
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xl tracking-tight text-cloud">+4.8</p>
            <p className="font-mono text-[9px] uppercase tracking-wide text-muted">
              mm / yr
            </p>
          </div>
          <svg
            viewBox="0 0 80 32"
            className="h-8 w-20 text-cyan"
            aria-hidden="true"
          >
            <path
              d="M2 28L10 25L18 26L26 21L34 22L42 17L50 18L58 12L66 14L78 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <p className="mt-2 border-t border-line/70 pt-2 font-mono text-[9px] leading-relaxed text-muted">
          Illustrative signal · not a verified measurement
        </p>
      </motion.div>
    </motion.div>
  );
}
