"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  CircleDot,
  Database,
  Globe2,
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldHalf,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BrandLogo } from "@/components/brand/brand-logo";
import { useAppShellStore } from "@/store/app-shell-store";
import { useOnboarding } from "@/components/onboarding/onboarding-provider";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/app",
    label: "Mission control",
    shortLabel: "Mission",
    icon: LayoutDashboard,
    number: "00",
  },
  {
    href: "/app/past",
    label: "The Past",
    shortLabel: "Past",
    icon: Archive,
    number: "01",
  },
  {
    href: "/app/risk-intelligence",
    label: "Risk Intelligence",
    shortLabel: "Risk",
    icon: Globe2,
    number: "02",
  },
  {
    href: "/app/last-100-years",
    label: "Last 100 Years",
    shortLabel: "Simulation",
    icon: ShieldHalf,
    number: "03",
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const collapsed = useAppShellStore((state) => state.collapsed);
  const mobileOpen = useAppShellStore((state) => state.mobileOpen);
  const toggleCollapsed = useAppShellStore((state) => state.toggleCollapsed);
  const setMobileOpen = useAppShellStore((state) => state.setMobileOpen);
  const reduceMotion = useReducedMotion();
  const { start } = useOnboarding();

  const active =
    navItems.find((item) =>
      item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href),
    ) ?? navItems[0];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, setMobileOpen]);

  return (
    <div className="min-h-[100svh] bg-navy">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-line bg-intelligence/72 backdrop-blur-xl transition-[width] duration-200 md:flex",
          collapsed ? "w-[72px]" : "w-[248px]",
        )}
      >
        <div
          className={cn(
            "flex h-[72px] shrink-0 items-center border-b border-line",
            collapsed ? "justify-center px-3" : "justify-between px-5",
          )}
        >
          <Link href="/app" aria-label="DELTA 2100 mission control" className="rounded-sm">
            <BrandLogo compact={collapsed} priority className={collapsed ? "" : "scale-[0.82] origin-left"} />
          </Link>
          {!collapsed ? (
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Collapse sidebar"
              className="flex size-8 items-center justify-center rounded-control border border-transparent text-muted transition-colors hover:border-line hover:bg-white/[0.04] hover:text-cloud"
            >
              <PanelLeftClose className="size-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>

        {collapsed ? (
          <div className="flex justify-center border-b border-line py-3">
            <button
              type="button"
              onClick={toggleCollapsed}
              aria-label="Expand sidebar"
              className="flex size-9 items-center justify-center rounded-control text-muted transition-colors hover:bg-white/[0.04] hover:text-cloud"
            >
              <PanelLeftOpen className="size-4" aria-hidden="true" />
            </button>
          </div>
        ) : null}

        <nav aria-label="Application navigation" className="flex-1 overflow-y-auto px-3 py-5">
          {!collapsed ? <p className="mono-label mb-3 px-2 text-[9px]">Modules</p> : null}
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/app"
                  ? pathname === "/app"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative flex min-h-11 items-center rounded-control border border-transparent transition-colors",
                      collapsed ? "justify-center px-2" : "gap-3 px-2.5",
                      isActive
                        ? "border-cyan/20 bg-cyan/[0.09] text-cloud"
                        : "text-muted hover:border-line hover:bg-white/[0.035] hover:text-cloud",
                    )}
                  >
                    {isActive ? (
                      <span
                        className="absolute -left-3 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-cyan"
                        aria-hidden="true"
                      />
                    ) : null}
                    <item.icon
                      className={cn(
                        "size-[18px] shrink-0",
                        isActive ? "text-cyan" : "text-muted group-hover:text-cloud",
                      )}
                      strokeWidth={1.65}
                      aria-hidden="true"
                    />
                    {!collapsed ? (
                      <>
                        <span className="flex-1 text-[13px] font-medium">
                          {item.label}
                        </span>
                        <span className="font-mono text-[9px] text-muted">
                          {item.number}
                        </span>
                      </>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help button at bottom of Sidebar, separated from navigation */}
        <div className="pb-2">
          {collapsed ? (
            <button
              onClick={start}
              className="w-full flex size-9 items-center justify-center rounded-control border border-line text-muted hover:bg-white/[0.035] hover:text-cloud transition-colors"
              title="Take a tour or replay instructions"
              aria-label="Take a tour or replay instructions"
            >
              <CircleDot className="size-[18px] shrink-0" aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={start}
              className="flex items-center gap-2 rounded-control border border-line px-3 hover:bg-white/[0.035] hover:text-cloud transition-colors"
              title="Take a tour or replay instructions"
              aria-label="Take a tour or replay instructions"
            >
              <CircleDot className="size-[18px] shrink-0" aria-hidden="true" />
              <span className="flex-1 text-[13px] font-medium">Help</span>
            </button>
          )}
        </div>

<div className={cn("shrink-0 border-t border-line p-3", collapsed && "px-2")}>
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              <span
                className="flex size-9 items-center justify-center rounded-control border border-line text-muted"
                title="Demo data active"
              >
                <Database className="size-4" aria-hidden="true" />
              </span>
              <Link
                href="/"
                title="Exit to website"
                className="flex size-9 items-center justify-center rounded-control text-muted transition-colors hover:bg-white/[0.04] hover:text-cloud"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <>
              <div className="rounded-control border border-line bg-navy/45 p-3">
                <div className="flex items-center gap-2">
                  <Database className="size-3.5 text-amber" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-amber">
                    Demo data
                  </span>
                </div>
                <p className="mt-1.5 text-[10px] leading-relaxed text-muted">
                  Verified datasets and API adapters pending.
                </p>
                <div className="mt-3 flex items-center justify-between px-1">
                  <Link
                    href="/about"
                    className="text-[11px] text-muted hover:text-cloud"
                  >
                    Methodology
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-cloud"
                  >
                    Exit
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>

      <div
        className={cn(
          "min-h-[100svh] transition-[padding] duration-200",
          collapsed ? "md:pl-[72px]" : "md:pl-[248px]",
        )}
      >
        <header className="glass-toolbar sticky top-0 z-30 flex h-[64px] items-center justify-between gap-4 border-b border-line px-4 sm:px-6 md:h-[72px] lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open application menu"
              aria-expanded={mobileOpen}
              className="flex size-10 shrink-0 items-center justify-center rounded-control border border-line bg-intelligence text-cloud md:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <span className="md:hidden">
              <BrandLogo compact priority />
            </span>
            <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-2 sm:flex">
              <Link href="/app" className="text-xs text-muted transition-colors hover:text-cloud">
                Platform
              </Link>
              <ChevronRight className="size-3 text-muted/40" aria-hidden="true" />
              <span className="truncate text-xs font-medium text-cloud">{active.label}</span>
            </nav>
            <span className="truncate font-display text-sm font-semibold text-cloud sm:hidden">
              {active.shortLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden items-center gap-2 sm:flex">
              <CircleDot className="size-3 text-low" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-muted">
                Uplink nominal
              </span>
            </div>
            <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
            <Link
              href="/"
              className="hidden items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-cloud lg:inline-flex"
            >
              Website
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </Link>
            <span className="rounded-full border border-amber/25 bg-amber/[0.07] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-amber">
              Demo data
            </span>
          </div>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
              aria-label="Close application menu"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={reduceMotion ? false : { x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex w-[min(88vw,320px)] flex-col border-r border-line bg-intelligence shadow-2xl"
              aria-label="Application menu"
            >
              <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
                <BrandLogo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-control border border-line text-cloud"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile application navigation" className="flex-1 px-4 py-5">
                <p className="mono-label mb-3 px-2 text-[9px]">Modules</p>
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/app"
                        ? pathname === "/app"
                        : pathname.startsWith(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "flex min-h-12 items-center gap-3 rounded-control px-3 text-sm font-medium",
                            isActive
                              ? "bg-cyan/[0.09] text-cloud"
                              : "text-muted hover:bg-white/[0.04] hover:text-cloud",
                          )}
                        >
                          <item.icon
                            className={cn("size-4", isActive && "text-cyan")}
                            strokeWidth={1.65}
                            aria-hidden="true"
                          />
                          {item.label}
                          <span className="ml-auto font-mono text-[9px] text-muted">
                            {item.number}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <div className="border-t border-line p-5">
                <div className="flex items-center gap-2">
                  <Database className="size-3.5 text-amber" aria-hidden="true" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-amber">
                    Demo data active
                  </span>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-muted">
                  Values are illustrative until verified datasets are connected.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                  <Link href="/about" className="text-xs text-muted hover:text-cloud">
                    Methodology
                  </Link>
                  <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-cloud">
                    Exit to website
                    <ArrowUpRight className="size-3" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
