import { ArrowUpRight, Waves } from "lucide-react";
import Link from "next/link";
import { DataStatusBadge } from "@/components/brand/data-status";
import { RiskBadge } from "@/components/brand/risk-badge";
import { Topographic } from "@/components/brand/topographic";
import { Reveal } from "@/components/ui/reveal";
import { regions } from "@/data/regions";

const nile = regions[0];

export function MissionSection() {
  return (
    <section
      id="evidence"
      className="relative overflow-hidden border-t border-line/70 py-24 lg:py-32"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent"
        aria-hidden="true"
      />
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow mb-5">01 / The mission</p>
          <h2 className="display-title max-w-xl text-4xl text-cloud sm:text-5xl lg:text-[58px]">
            The coast is not a line.
            <br />
            <span className="text-muted">It is a living system.</span>
          </h2>
          <div className="mt-7 max-w-xl space-y-4 text-pretty text-base leading-relaxed text-muted">
            <p>
              Deltas, estuaries and low islands concentrate people, food systems
              and infrastructure on some of the most dynamic ground on Earth.
              When water, land motion and human decisions converge, risk becomes
              a pattern — not a single event.
            </p>
            <p>
              DELTA 2100 connects documented loss with regional indicators and
              transparent projections. The goal is not to dramatise the future.
              It is to make the evidence legible enough to act on.
            </p>
          </div>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-cloud transition-colors hover:text-cyan"
          >
            Read the methodology
            <ArrowUpRight
              className="size-4 text-cyan transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="panel-surface relative overflow-hidden">
            <Topographic
              className="absolute inset-0 h-full w-full"
              opacity={0.1}
            />
            <div className="relative border-b border-line px-5 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full border border-cyan/25 bg-cyan/10 text-cyan">
                    <Waves className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                      Signal panel
                    </p>
                    <p className="text-sm font-semibold text-cloud">
                      Nile Delta / Egypt
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DataStatusBadge status="illustrative" />
                  <RiskBadge level={nile.riskLevel} />
                </div>
              </div>
            </div>

            <div className="relative grid gap-0 sm:grid-cols-[1.35fr_0.65fr]">
              <div className="border-b border-line p-5 sm:border-b-0 sm:border-r sm:p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="mono-label text-[9px]">Relative sea level</p>
                    <p className="mt-1 font-mono text-4xl tracking-[-0.06em] text-cloud">
                      +4.8
                      <span className="ml-1.5 text-xs tracking-normal text-muted">
                        mm/yr
                      </span>
                    </p>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-high">
                    Rising
                  </span>
                </div>

                <div className="mt-7">
                  <svg
                    viewBox="0 0 420 150"
                    className="h-auto w-full"
                    role="img"
                    aria-label="Illustrative sea-level trend for the Nile Delta from 2000 to 2025."
                  >
                    <defs>
                      <linearGradient id="mission-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00B8D9" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00B8D9" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <g stroke="#263B58" strokeWidth="0.7" strokeDasharray="2 5">
                      <path d="M38 18H410" />
                      <path d="M38 58H410" />
                      <path d="M38 98H410" />
                      <path d="M38 138H410" />
                    </g>
                    <g fill="#9AAAC0" fontSize="8" fontFamily="IBM Plex Mono, monospace">
                      <text x="6" y="21">60</text>
                      <text x="6" y="61">40</text>
                      <text x="6" y="101">20</text>
                      <text x="6" y="141">0</text>
                      <text x="38" y="150">2000</text>
                      <text x="190" y="150">2012</text>
                      <text x="378" y="150">2025</text>
                    </g>
                    <path
                      d="M38 134C75 130 93 120 119 116C146 111 161 102 190 96C219 90 232 81 258 74C286 66 305 54 333 47C359 40 383 26 410 18V138H38Z"
                      fill="url(#mission-area)"
                    />
                    <path
                      d="M38 134C75 130 93 120 119 116C146 111 161 102 190 96C219 90 232 81 258 74C286 66 305 54 333 47C359 40 383 26 410 18"
                      fill="none"
                      stroke="#00B8D9"
                      strokeWidth="1.7"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle cx="410" cy="18" r="3.5" fill="#081020" stroke="#00B8D9" strokeWidth="2" />
                    <line x1="410" y1="18" x2="410" y2="138" stroke="#00B8D9" strokeOpacity="0.22" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-line sm:grid-cols-1 sm:divide-x-0 sm:divide-y">
                <div className="p-5">
                  <p className="mono-label text-[9px]">Subsidence</p>
                  <p className="mt-1.5 font-mono text-2xl tracking-tight text-cloud">
                    6.2
                    <span className="ml-1 text-[10px] text-muted">mm/yr</span>
                  </p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full w-[78%] rounded-full bg-critical" />
                  </div>
                  <p className="mt-2 font-mono text-[9px] text-critical">
                    Critical
                  </p>
                </div>
                <div className="p-5">
                  <p className="mono-label text-[9px]">Low land</p>
                  <p className="mt-1.5 font-mono text-2xl tracking-tight text-cloud">
                    1,840
                    <span className="ml-1 text-[10px] text-muted">km²</span>
                  </p>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
                    <div className="h-full w-[64%] rounded-full bg-high" />
                  </div>
                  <p className="mt-2 font-mono text-[9px] text-high">Expanding</p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-line bg-navy/40 px-5 py-3 sm:px-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.11em] text-muted/80">
                Source: demonstration adapter
              </p>
              <p className="text-[11px] text-muted">
                Values are illustrative, not verified measurements.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
