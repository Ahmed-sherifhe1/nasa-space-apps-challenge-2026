import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DataStatus, RiskLevel } from "@/types";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function formatMillions(value: number): string {
  const millions = value / 1_000_000;
  return `$${Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1)}M`;
}

export function formatUsd(value: number): string {
  if (Math.abs(value) >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(value >= 100_000_000 ? 0 : 1)}M`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number, maximumFractionDigits = 0): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

export const riskText: Record<RiskLevel, string> = {
  Low: "text-low",
  Moderate: "text-moderate",
  High: "text-high",
  Critical: "text-critical",
};

export const riskBg: Record<RiskLevel, string> = {
  Low: "bg-low",
  Moderate: "bg-moderate",
  High: "bg-high",
  Critical: "bg-critical",
};

export const riskBorder: Record<RiskLevel, string> = {
  Low: "border-low/30",
  Moderate: "border-moderate/30",
  High: "border-high/30",
  Critical: "border-critical/30",
};

export const riskSurface: Record<RiskLevel, string> = {
  Low: "bg-low/10 text-low",
  Moderate: "bg-moderate/10 text-moderate",
  High: "bg-high/10 text-high",
  Critical: "bg-critical/10 text-critical-soft",
};

export const statusLabel: Record<DataStatus, string> = {
  observed: "Observed",
  modelled: "Modelled",
  projected: "Projected",
  illustrative: "Illustrative",
  demo: "Demo",
};

export const statusTone: Record<DataStatus, string> = {
  observed: "border-cyan/30 bg-cyan/10 text-cyan",
  modelled: "border-moderate/30 bg-moderate/10 text-moderate",
  projected: "border-high/30 bg-high/10 text-high",
  illustrative: "border-line bg-white/[0.03] text-muted",
  demo: "border-line bg-white/[0.03] text-muted",
};

export function initials(value: string): string {
  return value
    .split(/[\s–-]+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
