import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiskBadge } from "@/components/brand/risk-badge";
import { Reveal } from "@/components/ui/reveal";
import { regions } from "@/data/regions";

export function RegionsSection() {
  return (
    <section className="relative border-t border-line/70 bg-intelligence/25 py-24 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow mb-5">03 / Study regions</p>
              <h2 className="display-title max-w-3xl text-4xl text-cloud sm:text-5xl lg:text-[58px]">
                Five places.
                <br />
                <span className="text-muted">One shared pressure.</span>
              </h2>
            </div>
            <Link
              href="/app/risk-intelligence"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan"
            >
              Explore all regions
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 border-y border-line">
          {regions.map((region, index) => (
            <Reveal key={region.id} delay={index * 0.04}>
              <Link
                href={`/app/risk-intelligence/${region.id}`}
                className="group grid grid-cols-[36px_1fr_auto] items-center gap-4 border-b border-line px-1 py-4 transition-colors last:border-b-0 hover:bg-panel/35 sm:grid-cols-[44px_72px_1fr_auto] sm:gap-5 sm:px-3 lg:grid-cols-[52px_92px_1.1fr_1fr_auto] lg:px-5 lg:py-5"
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted/80">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative hidden h-[58px] overflow-hidden rounded-sm border border-line sm:block">
                  <Image
                    src={region.image}
                    alt=""
                    fill
                    sizes="92px"
                    className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/25" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-display text-base font-semibold tracking-tight text-cloud sm:text-lg">
                    {region.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
                    {region.country}
                  </p>
                </div>

                <p className="hidden max-w-md text-sm leading-relaxed text-muted lg:block">
                  {region.headline}
                </p>

                <div className="flex items-center gap-3">
                  <RiskBadge level={region.riskLevel} className="hidden sm:inline-flex" />
                  <span className="flex size-8 items-center justify-center rounded-full border border-line text-muted transition-colors group-hover:border-cyan/40 group-hover:text-cyan">
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-muted/80">
          Region profiles are demonstration content · risk labels are illustrative
          until verified datasets are connected.
        </p>
      </div>
    </section>
  );
}
