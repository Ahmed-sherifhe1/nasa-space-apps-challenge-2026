import { ArrowDown, ArrowUpRight, CircleDot } from "lucide-react";
import Link from "next/link";
import { Topographic } from "@/components/brand/topographic";
import { HeroVisual } from "@/components/marketing/hero-visual";
import { buttonStyles } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const heroStats = [
  { value: "05", label: "Study regions" },
  { value: "03", label: "Ways to explore" },
  { value: "100", label: "Years of decisions" },
];

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden pb-0 pt-[118px]">
      <div
        className="absolute inset-0 grid-lines opacity-45"
        aria-hidden="true"
      />
      <div
        className="absolute right-[-140px] top-[-120px] h-[720px] w-[720px] rounded-full bg-cyan/[0.06] blur-[120px]"
        aria-hidden="true"
      />
      <Topographic className="absolute -right-24 top-24 h-[720px] w-[760px] opacity-70" />
      <div
        className="absolute inset-x-0 top-[74px] h-px bg-gradient-to-r from-transparent via-line to-transparent"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid items-center gap-16 pb-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10 lg:pb-24 xl:gap-16">
          <div className="relative z-10 max-w-3xl">
            <Reveal y={10}>
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-cyan/20 bg-cyan/[0.045] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cyan">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
                  </span>
                  Earth observation · Climate risk intelligence
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted/65">
                  Ref. Δ2100 / 001
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08} y={22}>
              <h1 className="display-title text-[clamp(3.05rem,6.7vw,6.5rem)] text-cloud">
                The last line
                <br />
                <span className="text-cloud/96">of defense</span>
                <span className="text-amber">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 max-w-xl border-l border-line pl-5 sm:ml-1">
                <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  Water is rewriting the map. DELTA 2100 turns Earth-observation
                  data into clear climate-risk intelligence — so you can study
                  what was lost, understand what is exposed, and decide what to
                  protect.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/app"
                  className={buttonStyles({
                    size: "lg",
                    className: "group justify-between sm:min-w-[190px]",
                  })}
                >
                  Enter the platform
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="#evidence"
                  className={buttonStyles({
                    variant: "secondary",
                    size: "lg",
                    className: "group",
                  })}
                >
                  Explore the evidence
                  <ArrowDown
                    className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-line border-y border-line/70">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="px-4 py-4 first:pl-0">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-mono text-xl tracking-[-0.04em] text-cloud sm:text-2xl">
                        {stat.value}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative z-0">
            <HeroVisual />
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-6 border-t border-line py-4">
          <div className="flex items-center gap-2 text-muted">
            <CircleDot className="size-3 text-low" aria-hidden="true" />
            <span className="font-mono text-[9px] uppercase tracking-[0.15em]">
              All systems nominal
            </span>
          </div>
          <div className="no-scrollbar hidden flex-1 overflow-hidden md:block">
            <div className="animate-ticker flex w-max gap-10 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-muted/45">
              {[0, 1].map((group) => (
                <span key={group} className="flex gap-10">
                  <span>Relative sea level</span>
                  <span>Land subsidence</span>
                  <span>Storm surge</span>
                  <span>Rainfall intensity</span>
                  <span>Coastal erosion</span>
                  <span>Salinisation</span>
                  <span>Adaptive capacity</span>
                </span>
              ))}
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted/80">
            Demonstration data
          </span>
        </div>
      </div>
    </section>
  );
}
