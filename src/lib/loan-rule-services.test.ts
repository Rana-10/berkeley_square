import assert from "node:assert/strict";
import test from "node:test";
import { DurationUnit, InterestType, LoanBusinessError, RuleStatus, type LoanInterestRule, type LoanLtvRule } from "./loan-types";
import {
  assertNoOverlappingInterestRule,
  findApplicableInterestRule,
} from "./loan-interest-rule-service";
import {
  assertNoOverlappingLtvRule,
  findApplicableLtvRule,
} from "./loan-ltv-rule-service";

const ltvRules: LoanLtvRule[] = [
  { id: 1, minimumPropertyValue: 0, maximumPropertyValue: 5000000, ltvPercentage: 60, status: RuleStatus.ACTIVE },
  { id: 2, minimumPropertyValue: 5000001, maximumPropertyValue: 10000000, ltvPercentage: 70, status: RuleStatus.ACTIVE },
  { id: 3, minimumPropertyValue: 10000001, maximumPropertyValue: null, ltvPercentage: 75, status: RuleStatus.ACTIVE },
];

const interestRules: LoanInterestRule[] = [
  {
    id: 1,
    minimumLoanAmount: 1000000,
    maximumLoanAmount: 2500000,
    interestRate: 9,
    interestType: InterestType.REDUCING_BALANCE,
    minimumDuration: 1,
    maximumDuration: 5,
    durationUnit: DurationUnit.YEARS,
    status: RuleStatus.ACTIVE,
  },
  {
    id: 2,
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

test("finds LTV rules with inclusive range boundaries", () => {
  assert.equal(findApplicableLtvRule(5000000, ltvRules).id, 1);
  assert.equal(findApplicableLtvRule(5000001, ltvRules).id, 2);
  assert.equal(findApplicableLtvRule(10000001, ltvRules).id, 3);
});

test("finds interest rules by loan amount and duration boundaries", () => {
  assert.equal(findApplicableInterestRule(1000000, 5, DurationUnit.YEARS, interestRules).interestRate, 9);
  assert.equal(findApplicableInterestRule(2500000, 6, DurationUnit.YEARS, interestRules).interestRate, 10);
  assert.equal(findApplicableInterestRule(1000000, 10, DurationUnit.YEARS, interestRules).interestRate, 10);
});

test("throws clear business errors when no active rule matches", () => {
  assert.throws(() => findApplicableLtvRule(1, []), { code: "NO_APPLICABLE_LTV_RULE" });
  assert.throws(
    () => findApplicableInterestRule(999999, 5, DurationUnit.YEARS, interestRules),
    { code: "NO_APPLICABLE_INTEREST_RULE" },
  );
});

test("rejects invalid rule configuration values", () => {
  assert.throws(
    () => assertNoOverlappingLtvRule({ minimumPropertyValue: 100, maximumPropertyValue: 50, ltvPercentage: 70, status: RuleStatus.ACTIVE }, []),
    { code: "INVALID_LTV_RULE" },
  );
  assert.throws(
    () => assertNoOverlappingLtvRule({ minimumPropertyValue: 0, maximumPropertyValue: 50, ltvPercentage: 101, status: RuleStatus.ACTIVE }, []),
    { code: "INVALID_LTV_RULE" },
  );
  assert.throws(
    () => assertNoOverlappingInterestRule({ ...interestRules[0], interestRate: -1 }, []),
    { code: "INVALID_INTEREST_RULE" },
  );
});

test("rejects overlapping active rules and ignores inactive rules", () => {
  assert.throws(
    () => assertNoOverlappingLtvRule({ minimumPropertyValue: 4000000, maximumPropertyValue: 6000000, ltvPercentage: 65, status: RuleStatus.ACTIVE }, ltvRules),
    { code: "OVERLAPPING_LTV_RULE" },
  );
  assert.throws(
    () => assertNoOverlappingInterestRule({ ...interestRules[0], id: 99, minimumDuration: 4, maximumDuration: 7 }, interestRules),
    { code: "OVERLAPPING_INTEREST_RULE" },
  );
  assert.doesNotThrow(() =>
    assertNoOverlappingLtvRule(
      { minimumPropertyValue: 4000000, maximumPropertyValue: 6000000, ltvPercentage: 65, status: RuleStatus.INACTIVE },
      ltvRules,
    ),
  );
});

test("business errors expose stable codes", () => {
  const error = new LoanBusinessError("INVALID_DURATION");
  assert.equal(error.code, "INVALID_DURATION");
});
