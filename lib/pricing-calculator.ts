export const PRICING_MIN_VESSELS = 1;
export const PRICING_MAX_VESSELS = 500;
export const PRICING_RANGE_MAX_VESSELS = 60;
export const REMOTE_QA_REPORT_USD = 6000;
export const ONBOARD_ASSESSMENT_USD = 15000;

export type PricingCalculatorTier = {
  id: "core" | "assurance" | "enterprise";
  name: string;
  maxVessels: number;
  platformFeeUsd: number;
  perVesselUsd: number;
  minVessels: number;
};

export const pricingCalculatorTiers: PricingCalculatorTier[] = [
  { id: "core", name: "Core", maxVessels: 9, platformFeeUsd: 15000, perVesselUsd: 3000, minVessels: 5 },
  { id: "assurance", name: "Assurance", maxVessels: 24, platformFeeUsd: 24000, perVesselUsd: 3000, minVessels: 10 },
  {
    id: "enterprise",
    name: "Enterprise",
    maxVessels: Number.POSITIVE_INFINITY,
    platformFeeUsd: 48000,
    perVesselUsd: 2400,
    minVessels: 25,
  },
];

export type PricingCalculatorState = {
  totalFleetVessels: number;
  contractedVessels: number;
  remoteQaReports: boolean;
  onboardAssessments: boolean;
};

export type PricingValidation = {
  valid: boolean;
  errors: string[];
};

export type PricingEstimate = {
  state: PricingCalculatorState;
  validation: PricingValidation;
  tier: PricingCalculatorTier;
  billedVessels: number;
  platformAnnualUsd: number;
  licenseAnnualUsd: number;
  remoteQaAnnualUsd: number;
  onboardAnnualUsd: number;
  annualTotalUsd: number;
};

export const DEFAULT_PRICING_STATE: PricingCalculatorState = {
  totalFleetVessels: 5,
  contractedVessels: 5,
  remoteQaReports: false,
  onboardAssessments: false,
};

function toWholeNumber(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string" && value.trim() !== "") return Number(value);
  return Number.NaN;
}

export function clampVesselCount(value: unknown): number {
  const number = toWholeNumber(value);
  if (!Number.isFinite(number)) return PRICING_MIN_VESSELS;
  return Math.max(PRICING_MIN_VESSELS, Math.min(PRICING_MAX_VESSELS, Math.round(number)));
}

function booleanFromQuery(value: string | null): boolean {
  return value === "1" || value === "true" || value === "yes";
}

export function normalizePricingState(input: Partial<PricingCalculatorState>): PricingCalculatorState {
  const totalFleetVessels = clampVesselCount(input.totalFleetVessels ?? DEFAULT_PRICING_STATE.totalFleetVessels);
  const contractedVessels = Math.min(
    totalFleetVessels,
    clampVesselCount(input.contractedVessels ?? totalFleetVessels)
  );

  return {
    totalFleetVessels,
    contractedVessels,
    remoteQaReports: Boolean(input.remoteQaReports),
    onboardAssessments: Boolean(input.onboardAssessments),
  };
}

export function validatePricingState(input: Partial<PricingCalculatorState>): PricingValidation {
  const errors: string[] = [];
  const total = toWholeNumber(input.totalFleetVessels);
  const contracted = toWholeNumber(input.contractedVessels);

  if (!Number.isFinite(total) || total < PRICING_MIN_VESSELS) {
    errors.push("Total fleet must include at least one vessel.");
  }
  if (Number.isFinite(total) && total > PRICING_MAX_VESSELS) {
    errors.push(`Total fleet cannot exceed ${PRICING_MAX_VESSELS} vessels in this public estimator.`);
  }
  if (!Number.isFinite(contracted) || contracted < PRICING_MIN_VESSELS) {
    errors.push("Contracted scope must include at least one vessel.");
  }
  if (Number.isFinite(contracted) && contracted > PRICING_MAX_VESSELS) {
    errors.push(`Contracted scope cannot exceed ${PRICING_MAX_VESSELS} vessels in this public estimator.`);
  }
  if (Number.isFinite(total) && Number.isFinite(contracted) && contracted > total) {
    errors.push("Contracted vessels cannot exceed the total fleet count.");
  }

  return { valid: errors.length === 0, errors };
}

export function tierForContractedVessels(contractedVessels: number): PricingCalculatorTier {
  return pricingCalculatorTiers.find((tier) => contractedVessels <= tier.maxVessels) ?? pricingCalculatorTiers[0];
}

export function calculatePricingEstimate(input: Partial<PricingCalculatorState>): PricingEstimate {
  const validation = validatePricingState(input);
  const state = normalizePricingState(input);
  const tier = tierForContractedVessels(state.contractedVessels);
  const billedVessels = Math.max(state.contractedVessels, tier.minVessels);
  const platformAnnualUsd = tier.platformFeeUsd;
  const licenseAnnualUsd = tier.perVesselUsd * billedVessels;
  const remoteQaAnnualUsd = state.remoteQaReports ? REMOTE_QA_REPORT_USD * state.contractedVessels : 0;
  const onboardAnnualUsd = state.onboardAssessments ? ONBOARD_ASSESSMENT_USD * state.contractedVessels : 0;

  return {
    state,
    validation,
    tier,
    billedVessels,
    platformAnnualUsd,
    licenseAnnualUsd,
    remoteQaAnnualUsd,
    onboardAnnualUsd,
    annualTotalUsd: platformAnnualUsd + licenseAnnualUsd + remoteQaAnnualUsd + onboardAnnualUsd,
  };
}

export function parsePricingSearchParams(params: URLSearchParams): PricingCalculatorState {
  return normalizePricingState({
    totalFleetVessels: params.get("fleet") ?? undefined,
    contractedVessels: params.get("contracted") ?? params.get("vessels") ?? undefined,
    remoteQaReports: booleanFromQuery(params.get("remoteQa")),
    onboardAssessments: booleanFromQuery(params.get("onboard")),
  } as Partial<PricingCalculatorState>);
}

export function serializePricingSearchParams(state: PricingCalculatorState): URLSearchParams {
  const normalized = normalizePricingState(state);
  const params = new URLSearchParams();
  params.set("fleet", String(normalized.totalFleetVessels));
  params.set("contracted", String(normalized.contractedVessels));
  if (normalized.remoteQaReports) params.set("remoteQa", "1");
  if (normalized.onboardAssessments) params.set("onboard", "1");
  return params;
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
