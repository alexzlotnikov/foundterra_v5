import assert from "node:assert/strict";
import test from "node:test";
import {
  allocateWorkloadHours,
  calculateFundraisingWaste,
  clamp,
  estimateFounderHours,
  getSupportMonths,
} from "./fundraisingCalculator.ts";

test("interpolates founder hours through every anchor", () => {
  assert.equal(estimateFounderHours(100_000), 120);
  assert.equal(estimateFounderHours(625_000), 190);
  assert.equal(estimateFounderHours(1_000_000), 250);
  assert.equal(estimateFounderHours(20_000_000), 520);
});

test("applies support-month thresholds", () => {
  assert.equal(getSupportMonths(500_000), 1);
  assert.equal(getSupportMonths(500_001), 2);
  assert.equal(getSupportMonths(2_000_001), 3);
  assert.equal(getSupportMonths(7_000_001), 4);
});

test("calculates the approved default scenario and 5% advisor fee", () => {
  const result = calculateFundraisingWaste(100, 1_000_000);
  assert.equal(result.founderHours, 250);
  assert.equal(result.founderTimeCost, 25_000);
  assert.equal(result.lostGrowth, 37_500);
  assert.equal(result.foundterraCost, 7_000);
  assert.equal(result.advisorCost, 50_000);
  assert.equal(result.savingsVsDiy, 55_500);
  assert.equal(result.savingsVsAdvisor, 43_000);
});

test("clamps invalid input and reconciles workload totals", () => {
  assert.equal(clamp(Number.NaN, 0, 1_000), 0);
  assert.equal(clamp(1_500, 0, 1_000), 1_000);
  for (const total of [120, 190, 250, 421, 520]) {
    assert.equal(allocateWorkloadHours(total).reduce((sum, value) => sum + value, 0), total);
  }
});
