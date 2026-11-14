"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { buttonStyles } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/app/past", label: "The Past" },
  { href: "/app/risk-intelligence", label: "Risk Intelligence" },
  { href: "/app/last-100-years", label: "Last 100 Years" },
  { href: "/about", label: "Methodology" },
];

export function MarketingHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line glass-toolbar"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-[74px] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="DELTA 2100 home"
          className="shrink-0 rounded-sm focus-visible:outline-cyan"
        >
          <BrandLogo priority />
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-control px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:text-cloud",
                      active && "text-cloud",
                    )}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan" />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/app"
            className={buttonStyles({
              variant: "primary",
              size: "sm",
              className: "group",
            })}
          >
            Enter platform
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-control border border-line bg-navy/60 text-cloud lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-navy/95 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="shell py-5">
              <ul className="divide-y divide-line/70">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 text-lg font-medium text-cloud"
                    >
                      {link.label}
                      <ArrowUpRight className="size-4 text-cyan" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className={buttonStyles({
                  size: "lg",
                  className: "mt-5 w-full justify-between",
                })}
              >
                Enter the platform
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
