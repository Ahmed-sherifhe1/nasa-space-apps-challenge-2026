import type { DeltaDataService } from "@/services/contracts";
import { demoDataService } from "@/services/demo";

/**
 * Single integration boundary for the data team.
 * Replace this binding with an HTTP adapter when verified endpoints land.
 */
export const dataService: DeltaDataService = demoDataService;

export const dataMode = dataService.mode;
