export const HOURS_ANCHORS = [
  [100_000, 120],
  [250_000, 120],
  [500_000, 160],
  [750_000, 220],
  [1_000_000, 250],
  [3_000_000, 320],
  [7_000_000, 420],
  [15_000_000, 520],
  [20_000_000, 520],
] as const;

export const WORKLOAD_WEIGHTS = [40, 25, 35, 50, 25, 35, 40] as const;

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));

export const estimateFounderHours = (roundSize: number) => {
  const value = clamp(roundSize, HOURS_ANCHORS[0][0], HOURS_ANCHORS.at(-1)![0]);
  const upperIndex = HOURS_ANCHORS.findIndex(([amount]) => amount >= value);
  if (upperIndex <= 0) return HOURS_ANCHORS[0][1];

  const [lowerAmount, lowerHours] = HOURS_ANCHORS[upperIndex - 1];
  const [upperAmount, upperHours] = HOURS_ANCHORS[upperIndex];
  const progress = (value - lowerAmount) / (upperAmount - lowerAmount);
  return Math.round(lowerHours + (upperHours - lowerHours) * progress);
};

export const getSupportMonths = (roundSize: number) => {
  if (roundSize <= 500_000) return 1;
  if (roundSize <= 2_000_000) return 2;
  if (roundSize <= 7_000_000) return 3;
  return 4;
};

export const allocateWorkloadHours = (totalHours: number) => {
  const exact = WORKLOAD_WEIGHTS.map((weight) => (totalHours * weight) / 250);
  const allocated = exact.map(Math.floor);
  const remaining = totalHours - allocated.reduce((sum, value) => sum + value, 0);
  const remainderOrder = exact
    .map((value, index) => ({ index, remainder: value - allocated[index] }))
    .sort((a, b) => b.remainder - a.remainder);

  for (let index = 0; index < remaining; index += 1) {
    allocated[remainderOrder[index % remainderOrder.length].index] += 1;
  }

  return allocated;
};

export const calculateFundraisingWaste = (hourlyValue: number, roundSize: number) => {
  const founderHours = estimateFounderHours(roundSize);
  const founderTimeCost = founderHours * clamp(hourlyValue, 0, 1_000);
  const lostGrowth = founderTimeCost * 1.5;
  const supportMonths = getSupportMonths(roundSize);
  const foundterraCost = 5_000 + 1_000 * supportMonths;
  const advisorCost = roundSize * 0.05;
  const diyWaste = founderTimeCost + lostGrowth;

  return {
    founderHours,
    founderTimeCost,
    lostGrowth,
    supportMonths,
    foundterraCost,
    advisorCost,
    diyWaste,
    savingsVsDiy: Math.max(0, diyWaste - foundterraCost),
    savingsVsAdvisor: Math.max(0, advisorCost - foundterraCost),
    workloadHours: allocateWorkloadHours(founderHours),
  };
};
