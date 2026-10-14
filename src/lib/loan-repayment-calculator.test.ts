import assert from "node:assert/strict";
import test from "node:test";
import { DurationUnit, InterestType } from "./loan-types";
import { calculateReducingBalanceRepayment } from "./loan-repayment-calculator";

test("calculates reducing-balance repayment for an annual rate over years", () => {
  const result = calculateReducingBalanceRepayment({
    principal: 6000000,
    annualInterestRate: 10,
    duration: 10,
    durationUnit: DurationUnit.YEARS,
    interestType: InterestType.REDUCING_BALANCE,
  });

  assert.equal(result.numberOfPayments, 120);
  assert.equal(result.monthlyPayment, 79290.44);
  assert.equal(result.totalRepayment, 9514852.8);
  assert.equal(result.totalInterest, 3514852.8);
});

test("calculates reducing-balance repayment for month duration without converting twice", () => {
  const result = calculateReducingBalanceRepayment({
    principal: 6000000,
    annualInterestRate: 10,
    duration: 120,
    durationUnit: DurationUnit.MONTHS,
    interestType: InterestType.REDUCING_BALANCE,
  });

  assert.equal(result.numberOfPayments, 120);
  assert.equal(result.monthlyPayment, 79290.44);
});

test("calculates repayment without interest when annual rate is zero", () => {
  const result = calculateReducingBalanceRepayment({
    principal: 120000,
    annualInterestRate: 0,
    duration: 1,
    durationUnit: DurationUnit.YEARS,
    interestType: InterestType.REDUCING_BALANCE,
  });

  assert.equal(result.monthlyPayment, 10000);
  assert.equal(result.totalRepayment, 120000);
  assert.equal(result.totalInterest, 0);
});
