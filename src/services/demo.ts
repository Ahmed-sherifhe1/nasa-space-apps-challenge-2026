import { caseStudies } from "@/data/case-studies";
import { regions } from "@/data/regions";
import type { DeltaDataService } from "@/services/contracts";

function clone<T>(value: T): T {
  return structuredClone(value);
}

export const demoDataService: DeltaDataService = {
  mode: "demo",
  cases: {
    list: async () => clone(caseStudies),
    getBySlug: async (slug) =>
      clone(caseStudies.find((study) => study.slug === slug) ?? null),
  },
  risk: {
    listRegions: async () => clone(regions),
    getRegion: async (id) =>
      clone(regions.find((region) => region.id === id) ?? null),
  },
};
