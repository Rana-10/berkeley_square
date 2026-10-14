export function toMoney(value: number | string) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) {
    throw new Error("Invalid money value.");
  }
  return numeric;
}

export function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculatePercentageAmount(amount: number, percentage: number) {
  return roundMoney(amount * (percentage / 100));
}
