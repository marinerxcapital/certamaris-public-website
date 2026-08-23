import assert from "node:assert/strict";
import test from "node:test";
import {
  calculatePricingEstimate,
  formatUsd,
  parsePricingSearchParams,
  serializePricingSearchParams,
  validatePricingState,
} from "./pricing-calculator.ts";

test("zero vessels is invalid and normalizes to the minimum estimator scope", () => {
  const estimate = calculatePricingEstimate({ totalFleetVessels: 0, contractedVessels: 0 });
  assert.equal(estimate.validation.valid, false);
  assert.equal(estimate.state.totalFleetVessels, 1);
  assert.equal(estimate.state.contractedVessels, 1);
});

test("minimum permitted fleet size applies the Core five-vessel billing minimum", () => {
  const estimate = calculatePricingEstimate({ totalFleetVessels: 1, contractedVessels: 1 });
  assert.equal(estimate.tier.id, "core");
  assert.equal(estimate.billedVessels, 5);
  assert.equal(estimate.annualTotalUsd, 30000);
});

test("contracted equals total uses the matching package tier", () => {
  const estimate = calculatePricingEstimate({ totalFleetVessels: 12, contractedVessels: 12 });
  assert.equal(estimate.tier.id, "assurance");
  assert.equal(estimate.billedVessels, 12);
  assert.equal(estimate.annualTotalUsd, 60000);
});

test("contracted can be lower than total fleet", () => {
  const estimate = calculatePricingEstimate({ totalFleetVessels: 24, contractedVessels: 12 });
  assert.equal(estimate.validation.valid, true);
  assert.equal(estimate.tier.id, "assurance");
  assert.equal(estimate.annualTotalUsd, 60000);
});

test("contracted greater than total is invalid", () => {
  const validation = validatePricingState({ totalFleetVessels: 8, contractedVessels: 9 });
  assert.equal(validation.valid, false);
  assert.match(validation.errors.join(" "), /cannot exceed/);
});

test("remote QA option adds 6000 per contracted vessel", () => {
  const estimate = calculatePricingEstimate({
    totalFleetVessels: 8,
    contractedVessels: 5,
    remoteQaReports: true,
  });
  assert.equal(estimate.remoteQaAnnualUsd, 30000);
  assert.equal(estimate.annualTotalUsd, 60000);
});

test("on-board option adds 15000 per contracted vessel and leaves travel outside the estimate", () => {
  const estimate = calculatePricingEstimate({
    totalFleetVessels: 8,
    contractedVessels: 5,
    onboardAssessments: true,
  });
  assert.equal(estimate.onboardAnnualUsd, 75000);
  assert.equal(estimate.annualTotalUsd, 105000);
});

test("both optional services stack deterministically", () => {
  const estimate = calculatePricingEstimate({
    totalFleetVessels: 25,
    contractedVessels: 25,
    remoteQaReports: true,
    onboardAssessments: true,
  });
  assert.equal(estimate.tier.id, "enterprise");
  assert.equal(estimate.annualTotalUsd, 633000);
});

test("query-param hydration restores valid state", () => {
  const state = parsePricingSearchParams(new URLSearchParams("fleet=24&contracted=12&remoteQa=1&onboard=0"));
  assert.deepEqual(state, {
    totalFleetVessels: 24,
    contractedVessels: 12,
    remoteQaReports: true,
    onboardAssessments: false,
  });
});

test("malformed query params are sanitized", () => {
  const state = parsePricingSearchParams(new URLSearchParams("fleet=-2&contracted=9999&remoteQa=yes&onboard=no"));
  assert.deepEqual(state, {
    totalFleetVessels: 1,
    contractedVessels: 1,
    remoteQaReports: true,
    onboardAssessments: false,
  });
});

test("serialization is human-readable and omits false toggles", () => {
  const params = serializePricingSearchParams({
    totalFleetVessels: 24,
    contractedVessels: 12,
    remoteQaReports: true,
    onboardAssessments: false,
  });
  assert.equal(params.toString(), "fleet=24&contracted=12&remoteQa=1");
});

test("decimal currency formatting rounds to whole USD", () => {
  assert.equal(formatUsd(12345.67), "$12,346");
});
