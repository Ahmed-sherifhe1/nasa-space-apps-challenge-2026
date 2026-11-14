import { ArrowUpRight, BadgeCheck, ScanLine, Split } from "lucide-react";
import Link from "next/link";
import { Topographic } from "@/components/brand/topographic";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    icon: BadgeCheck,
    number: "01",
    title: "Provenance is visible",
    body: "Observed, modelled, projected and illustrative data are labelled wherever they appear. Source, period and limitations travel with the number.",
  },
  {
    icon: ScanLine,
    number: "02",
    title: "Uncertainty is part of the story",
    body: "Future scenarios are planning envelopes, not certainties. The interface makes assumptions readable instead of hiding them behind drama.",
  },
  {
    icon: Split,
    number: "03",
    title: "Two experiences, one truth",
    body: "The editorial website and the intelligence application have separate layouts and jobs. They share the same evidence standards and brand language.",
  },
];

export function MethodologySection() {
  return (
    <section className="relative overflow-hidden bg-cloud py-24 text-navy lg:py-32">
      <Topographic
        className="absolute -right-40 -top-40 h-[760px] w-[820px] opacity-80"
        color="#081020"
        opacity={0.1}
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-navy/10"
        aria-hidden="true"
      />
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#06758c]">
              04 / Scientific integrity
            </p>
            <h2 className="display-title max-w-xl text-4xl text-navy sm:text-5xl lg:text-[58px]">
              Scientific first.
              <br />
              <span className="text-[#5b6d82]">Cinematic second.</span>
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-[#4f6177]">
              A dramatic interface is not a substitute for a defensible number.
              DELTA 2100 is designed around transparency: clear provenance,
              visible uncertainty and a strict separation between evidence and
              play.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-control border border-navy/15 bg-white/55 px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-navy/30 hover:bg-white"
            >
              Read the full methodology
              <ArrowUpRight
                className="size-4 text-[#06758c] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          <div className="space-y-0 border-t border-navy/15">
            {principles.map((principle, index) => (
              <Reveal key={principle.number} delay={index * 0.08}>
                <div className="group grid grid-cols-[36px_1fr] gap-4 border-b border-navy/15 py-6 sm:grid-cols-[52px_40px_1fr] sm:gap-5 sm:py-7">
                  <span className="font-mono text-[10px] tracking-[0.14em] text-[#718296]">
                    {principle.number}
                  </span>
                  <principle.icon
                    className="hidden size-5 text-[#06758c] sm:block"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-navy sm:text-xl">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#53657b]">
                      {principle.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col justify-between gap-5 border-t border-navy/15 pt-8 sm:flex-row sm:items-end">
            <p className="max-w-2xl font-display text-2xl font-medium leading-tight tracking-[-0.025em] text-navy sm:text-3xl">
              A platform should not pretend to know the future.
              <br />
              It should make the choices clearer.
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#718296]">
              DELTA 2100 / Evidence standard v1.0
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
