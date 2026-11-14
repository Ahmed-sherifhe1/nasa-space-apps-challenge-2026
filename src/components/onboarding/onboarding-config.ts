export type OnboardingStep = {
  id: string;
  title: string;
  explanation: string;
  target: string;
};

export const dashboardSteps: OnboardingStep[] = [
  {
    id: "dashboard-overview",
    title: "Mission Control Dashboard",
    explanation:
      "This is the application's main dashboard. It gives you a quick system status and provides navigation to all major modules.",
    target: ".flex.flex-col.justify-between.gap-5.lg:flex-row.lg:items-end",
  },
  {
    id: "dashboard-nav-sidebar",
    title: "Sidebar Navigation",
    explanation:
      "The persistent sidebar gives you one‑click access to Mission Control, The Past, Risk Intelligence, and Last 100 Years.",
    target: "aside.fixed.left-0",
  },
  {
    id: "dashboard-module-cards",
    title: "Module Cards",
    explanation:
      "The three column grid contains the core modules: The Past archive, Risk Intelligence globe, and the Last 100 Years simulation.",
    target: ".grid.gap-4.xl:grid-cols-[1.4fr_0.6fr]",
  },
  {
    id: "dashboard-system-integrity",
    title: "System Integrity Panel",
    explanation:
      "Displays the current data status (demo, modelled, etc.) and confirms the application is running in demonstration mode.",
    target: ".relative.flex.flex-col.gap-5.lg:flex-row.lg:items-end",
  },
];

export const pastSteps: OnboardingStep[] = [
  {
    id: "past-archive-featured",
    title: "Featured Case Study Card",
    explanation:
      "The top card highlights a featured case study. It shows the status badge, region label, period, and hero image.",
    target: ".group.relative.overflow-hidden.rounded-panel.border.border-line.bg-intelligence",
  },
  {
    id: "past-archive-grid",
    title: "Case Archive Grid",
    explanation:
      "Below the featured card is a grid of all nine case study tiles.",
    target: ".PastArchive",
  },
  {
    id: "past-search-filter",
    title: "Search, Filter & Sort",
    explanation:
      "Use the search input to find cases by name. The filter control lets you narrow by status or region.",
    target: ".tag-row",
  },
  {
    id: "past-case-detail-open",
    title: "Open a Case Study",
    explanation:
      "Clicking a case card or 'Read the case file' opens the detailed page at /app/past/[slug].",
    target: ".case-study-page",
  },
];

export const riskIntelligenceSteps: OnboardingStep[] = [
  {
    id: "risk-intelligence-header",
    title: "Risk Intelligence Overview",
    explanation:
      "The globe and watchlist panel give you a planetary view of the five highest‑risk regions.",
    target: ".header.grid.grid-cols.lg\:grid-cols-2",
  },
  {
    id: "risk-globe",
    title: "Interactive Globe",
    explanation:
      "The central orthographic globe displays region markers. Dragging rotates the view.",
    target: ".RiskGlobe",
  },
  {
    id: "risk-watchlist",
    title: "Region Watchlist",
    explanation:
      "The vertical list on the right shows each region with its short name, country, and risk score.",
    target: ".RiskWatchlist",
  },
  {
    id: "risk-indicator-cards",
    title: "Indicator Feed Cards",
    explanation:
      "Three colored cards below the globe show Observed, Projected, and Illustrative data metrics.",
    target: ".IndicatorFeed",
  },
];

export const regionalSteps: OnboardingStep[] = [
  {
    id: "regional-breadcrumb",
    title: "Breadcrumb & Back Navigation",
    explanation:
      "Every regional dashboard includes a breadcrumb trail that lets you return to the watchlist.",
    target: ".breadcrumb",
  },
  {
    id: "regional-header",
    title: "Regional Header",
    explanation:
      "The top of a regional page shows the region name, country, coordinates, and risk score.",
    target: ".regional-header",
  },
  {
    id: "regional-indicator-grid",
    title: "Indicator Grid",
    explanation:
      "A responsive grid of individual indicator cards displaying label, value, unit, and trend.",
    target: ".IndicatorGrid",
  },
  {
    id: "regional-scenario-explorer",
    title: "Scenario Explorer",
    explanation:
      "Three future pathway cards (Low, Intermediate, High) showing projected sea‑level rise and exposed population.",
    target: ".ScenarioExplorer",
  },
  {
    id: "regional-future-narrative",
    title: "Future Narrative Accordion",
    explanation:
      "Six accordion panels explain what the scenario looks like, why it matters, who is vulnerable, potential consequences, interventions, and uncertainty.",
    target: ".FutureNarrative",
  },
];

export const last100Steps: OnboardingStep[] = [
  {
    id: "last100-launch-stage",
    title: "Simulation Launch Stage",
    explanation:
      "The objective is to select a region and begin the briefing. A grid of region cards shows each region's country, exposed population, and annual damage figure.",
    target: ".RegionGrid",
  },
  {
    id: "last100-warning-stage",
    title: "Warning Stage",
    explanation:
      "A scenario description with threat signals and a horizon gauge. This stage presents the imminent risk before you enter the stress test.",
    target: ".WarningStage",
  },
  {
    id: "last100-disaster-stage",
    title: "Disaster Stage",
    explanation:
      "Hazard indices (storm surge, rainfall flooding, coastal erosion, land subsidence) are shown as large numeric values with progress bars. You have $100 M budget to allocate.",
    target: ".DisasterStage",
  },
  {
    id: "last100-decision-stage",
    title: "Decision Stage",
    explanation:
      "Range sliders let you allocate the $100 M across coastal barriers, mangrove restoration, drainage systems, and groundwater management. Lock your portfolio once you've spent at least $10 M.",
    target: ".DecisionStage",
  },
  {
    id: "last100-consequences-stage",
    title: "Consequences Stage",
    explanation:
      "A score gauge, land‑protected/people‑protected/damage‑avoided metrics, stacked contribution bars, and a narrative. Your choices determine the final outcome and residual exposure in 2100.",
    target: ".ConsequencesStage",
  },
  {
    id: "last100-legacy-stage",
    title: "Legacy Stage",
    explanation:
      "The final record shows what the model supports and cannot tell you. A ledger table lists land protected, people protected, damage avoided, and residual exposure.",
    target: ".LegacyStage",
  },
];