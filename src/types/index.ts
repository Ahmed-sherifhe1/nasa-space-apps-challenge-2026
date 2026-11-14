export type RiskLevel = "Low" | "Moderate" | "High" | "Critical";

export type DataStatus =
  | "observed"
  | "modelled"
  | "projected"
  | "illustrative"
  | "demo";

export type ThreatCategory =
  | "Sea-level rise"
  | "Coastal flooding"
  | "Coastal erosion"
  | "Land subsidence"
  | "Tidal flooding"
  | "Water-driven displacement"
  | "Salinisation";

export interface SourceRef {
  label: string;
  provider: string;
  url?: string;
  note?: string;
}

export interface Indicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendDirection: "up" | "down" | "steady";
  status: DataStatus;
  source: string;
  updated: string;
  description: string;
  sparkline: number[];
  risk: RiskLevel;
}

export interface TrendSeries {
  label: string;
  unit: string;
  years: number[];
  values: number[];
  status: DataStatus;
  source: string;
  note: string;
}

export interface FutureScenario {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  slr2100M: number;
  exposedLandPct: number;
  exposedPopulation: number;
  assumption: string;
  status: "projected";
}

export interface FutureNarrative {
  look: string;
  why: string;
  vulnerable: string;
  consequences: string;
  interventions: string;
  uncertainty: string;
}

export interface Region {
  id: string;
  name: string;
  shortName: string;
  country: string;
  coordinates: { lon: number; lat: number };
  image: string;
  imageAlt: string;
  imageCredit: string;
  imageSourceUrl: string;
  riskLevel: RiskLevel;
  riskScore: number;
  population: string;
  areaLabel: string;
  headline: string;
  summary: string;
  context: string;
  threats: ThreatCategory[];
  indicators: Indicator[];
  historical: TrendSeries[];
  scenarios: FutureScenario[];
  futureNarrative: FutureNarrative;
  sources: SourceRef[];
  isDemo: boolean;
}

export interface ComparisonImage {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  name: string;
  country: string;
  regionLabel: string;
  category: ThreatCategory;
  status: "Disappeared" | "Partially disappeared" | "Severely damaged" | "Under threat";
  period: string;
  summary: string;
  heroImage: string;
  heroCredit: string;
  heroSourceUrl: string;
  before: ComparisonImage;
  after: ComparisonImage;
  comparisonType: "documented" | "illustrative";
  comparisonNote: string;
  intro: string;
  story: string[];
  timeline: { year: string; title: string; body: string }[];
  causes: { title: string; body: string }[];
  evidence: string[];
  impactStats: { value: string; label: string; note: string }[];
  impactNarrative: string;
  impactImage: string;
  impactImageAlt: string;
  impactImageCredit: string;
  sources: SourceRef[];
  isDemo: boolean;
}

export type SimulationStrategyId =
  | "coastal-barriers"
  | "mangrove-restoration"
  | "drainage-systems"
  | "groundwater-management";

export interface SimulationStrategy {
  id: SimulationStrategyId;
  name: string;
  shortName: string;
  description: string;
  tradeoff: string;
  color: string;
  defaultAllocation: number;
  primaryHazard: string;
}

export interface SimulationRegion {
  id: string;
  name: string;
  country: string;
  image: string;
  imageAlt: string;
  coordinates: string;
  baseline: {
    exposedLand: number;
    exposedPopulation: number;
    agriculturalLand: number;
    annualDamage: number;
    surgeExposure: number;
    rainfallExposure: number;
    erosionPressure: number;
    subsidencePressure: number;
  };
  briefing: string;
  threatSignals: { label: string; value: string; detail: string }[];
  scenario: string;
}

export interface SimulationAllocation {
  "coastal-barriers": number;
  "mangrove-restoration": number;
  "drainage-systems": number;
  "groundwater-management": number;
}

export interface StrategyContribution {
  strategyId: SimulationStrategyId;
  name: string;
  allocated: number;
  protectedLand: number;
  protectedPeople: number;
  protectedAgriculture: number;
  damageAvoided: number;
}

export interface SimulationResult {
  outcome: "Protected" | "Partially protected" | "Insufficient protection";
  outcomeTone: RiskLevel;
  score: number;
  exposureBefore: number;
  exposureAfter: number;
  landProtected: number;
  peopleProtected: number;
  agricultureProtected: number;
  damageAvoided: number;
  residualDamage: number;
  residualPopulationExposed: number;
  riskReductionPct: number;
  mostEffectiveStrategy: string;
  weakestLink: string;
  contributions: StrategyContribution[];
  narrative: string[];
  assumptions: string[];
  allocation: SimulationAllocation;
  spent: number;
}
