import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Mission control", href: "/app" },
      { label: "The Past", href: "/app/past" },
      { label: "Risk Intelligence", href: "/app/risk-intelligence" },
      { label: "Last 100 Years", href: "/app/last-100-years" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About DELTA 2100", href: "/about" },
      { label: "Methodology", href: "/about#methodology" },
      { label: "Data transparency", href: "/about#data" },
      { label: "Sources & credits", href: "/about#sources" },
    ],
  },
];

const dataLinks = [
  { label: "NASA Sea Level Change", href: "https://sealevel.nasa.gov/" },
  { label: "ESA Copernicus", href: "https://www.copernicus.eu/" },
  { label: "IPCC AR6", href: "https://www.ipcc.ch/report/ar6/" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-line bg-intelligence/55">
      <div className="shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              A climate-risk intelligence platform for understanding water-driven
              change — and exploring the choices that remain.
            </p>
            <p className="mt-6 font-display text-2xl font-semibold leading-none tracking-[-0.03em] text-cloud">
              The future is not lost. Yet.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mono-label mb-5">{column.title}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-cloud"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mono-label mb-5">Data references</h2>
            <ul className="space-y-3">
              {dataLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-cloud"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3 text-cyan/70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-xs font-mono text-[10px] leading-relaxed tracking-wide text-muted/80">
              Dataset attributions are shown inside each module. DELTA 2100 is an
              independent climate-information project and does not imply NASA or
              ESA endorsement.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs leading-relaxed text-muted sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {new Date().getFullYear()} DELTA 2100. Demonstration build — climate
            values are illustrative until verified datasets are connected.
          </p>
          <p className="max-w-xl sm:text-right">
            Simulation outputs are educational estimates, not real-world
            guarantees. Always consult authoritative scientific and engineering
            sources.
          </p>
        </div>
      </div>
    </footer>
  );
}
