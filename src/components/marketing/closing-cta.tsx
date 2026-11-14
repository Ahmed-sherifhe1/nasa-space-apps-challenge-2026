import { ArrowUpRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line">
      <Image
        src="/images/tuvalu.jpg"
        alt="Aerial view of a low-lying Pacific atoll."
        fill
        sizes="100vw"
        className="object-cover object-center opacity-40 saturate-[0.55]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,16,32,0.98)_0%,rgba(8,16,32,0.9)_48%,rgba(8,16,32,0.68)_100%)]" />
      <div
        className="absolute inset-0 grid-lines opacity-35"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/[0.04] blur-[100px]"
        aria-hidden="true"
      />

      <div className="shell relative py-24 sm:py-32 lg:py-40">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            The decision is yours
          </div>
          <h2 className="display-title mt-7 max-w-5xl text-[clamp(2.8rem,7vw,7rem)] text-cloud">
            The future is not lost.
            <br />
            <span className="text-amber">Yet.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Explore what happened. Inspect what is exposed. Then build the
            defense you would choose — and see what the simulation says.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/app" size="lg" className="group justify-between sm:min-w-[200px]">
              Enter the platform
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </ButtonLink>
            <Link
              href="/app/last-100-years"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-control border border-cloud/20 bg-navy/30 px-6 text-sm font-semibold text-cloud backdrop-blur transition-colors hover:border-cloud/40 hover:bg-navy/55 sm:text-base"
            >
              Start the simulation
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="relative border-t border-line/60">
        <div className="shell flex flex-wrap items-center justify-between gap-3 py-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted/80">
          <span>31.2°E / 31.0°N / Nile Delta</span>
          <span>Earth observation → risk intelligence → decision</span>
          <span>Δ2100</span>
        </div>
      </div>
    </section>
  );
}
