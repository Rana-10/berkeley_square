import assert from "node:assert/strict";
import test from "node:test";
import { loanCalculationRequestSchema, loanInterestRuleWriteSchema, loanLtvRuleWriteSchema } from "./loan-calculation-validation";
import { DurationUnit } from "./loan-types";

test("public calculator request rejects client-provided authoritative financial fields", () => {
  const parsed = loanCalculationRequestSchema.safeParse({
    propertyValue: 10000000,
    requestedLoanAmount: 6000000,
    loanDuration: 10,
    durationUnit: DurationUnit.YEARS,
    interestRate: 1,
    ltvPercentage: 99,
  });

  assert.equal(parsed.success, false);
});

test("admin LTV rule schema rejects percentages above 100", () => {
  const parsed = loanLtvRuleWriteSchema.safeParse({
    minimumPropertyValue: 0,
    maximumPropertyValue: null,
    ltvPercentage: 101,
  });

  assert.equal(parsed.success, false);
});

test("admin interest rule schema accepts duration-specific reducing-balance rules", () => {
  const parsed = loanInterestRuleWriteSchema.safeParse({
    minimumLoanAmount: 1000000,
    maximumLoanAmount: 2500000,
    interestRate: 10,
    minimumDuration: 6,
    maximumDuration: 10,
    durationUnit: DurationUnit.YEARS,
  });

  assert.equal(parsed.success, true);
});
