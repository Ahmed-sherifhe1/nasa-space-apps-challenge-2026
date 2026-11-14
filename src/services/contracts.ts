import type { CaseStudy, Region } from "@/types";

export interface CaseStudyService {
  list(): Promise<CaseStudy[]>;
  getBySlug(slug: string): Promise<CaseStudy | null>;
}

export interface RiskIntelligenceService {
  listRegions(): Promise<Region[]>;
  getRegion(id: string): Promise<Region | null>;
}

export interface DeltaDataService {
  cases: CaseStudyService;
  risk: RiskIntelligenceService;
  mode: "demo" | "api";
}
