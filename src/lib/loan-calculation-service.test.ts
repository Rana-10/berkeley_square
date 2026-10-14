import assert from "node:assert/strict";
import test from "node:test";
import { calculateLoan } from "./loan-calculation-service";
import { DurationUnit, InterestType, RuleStatus } from "./loan-types";

const ltvRules = [
  { id: 7, minimumPropertyValue: 0, maximumPropertyValue: 10000000, ltvPercentage: 70, status: RuleStatus.ACTIVE },
];

const interestRules = [
  {
    id: 9,
    minimumLoanAmount: 1000000,
    maximumLoanAmount: 2500000,
    interestRate: 10,
    interestType: InterestType.REDUCING_BALANCE,
    minimumDuration: 6,
    maximumDuration: 10,
    durationUnit: DurationUnit.YEARS,
    status: RuleStatus.ACTIVE,
  },
];

test("calculates an eligible loan from database-driven LTV and interest rules", () => {
  const result = calculateLoan(
    { propertyValue: 3000000, requestedLoanAmount: 2000000, loanDuration: 10, durationUnit: DurationUnit.YEARS },
    { ltvRules, interestRules },
  );

  assert.equal(result.eligible, true);
  assert.equal(result.maximumLoanAmount, 2100000);
  assert.equal(result.ltvPercentage, 70);
  assert.equal(result.ltvRuleId, 7);
  assert.equal(result.interestRuleId, 9);
  assert.equal(result.interestRate, 10);
  assert.equal(result.monthlyPayment, 26430.15);
  assert.equal(result.totalInterest, 1171618);
});

test("returns an ineligible response without calculating repayment when LTV is exceeded", () => {
  const result = calculateLoan(
    { propertyValue: 2000000, requestedLoanAmount: 1500000, loanDuration: 10, durationUnit: DurationUnit.YEARS },
    { ltvRules, interestRules },
  );

  assert.equal(result.eligible, false);
  assert.equal(result.reason, "REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV");
  assert.equal(result.maximumLoanAmount, 1400000);
  assert.equal("monthlyPayment" in result, false);
});

test("throws clear errors for invalid input and missing rules", () => {
  assert.throws(
    () => calculateLoan({ propertyValue: 0, requestedLoanAmount: 1, loanDuration: 1, durationUnit: DurationUnit.YEARS }, { ltvRules, interestRules }),
    { code: "INVALID_PROPERTY_VALUE" },
  );
  assert.throws(
    () => calculateLoan({ propertyValue: 1, requestedLoanAmount: 1, loanDuration: 1, durationUnit: DurationUnit.YEARS }, { ltvRules: [], interestRules }),
    { code: "NO_APPLICABLE_LTV_RULE" },
  );
  assert.throws(
    () => calculateLoan({ propertyValue: 3000000, requestedLoanAmount: 2000000, loanDuration: 11, durationUnit: DurationUnit.YEARS }, { ltvRules, interestRules }),
    { code: "NO_APPLICABLE_INTEREST_RULE" },
  );
});
