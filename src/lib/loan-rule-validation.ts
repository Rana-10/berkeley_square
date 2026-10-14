import { LoanBusinessError, RuleStatus } from "./loan-types";
import type { LoanInterestRule, LoanLtvRule } from "./loan-types";

type Range = {
  min: number;
  max: number | null;
};

function rangeMax(max: number | null) {
  return max ?? Number.POSITIVE_INFINITY;
}

export function rangesOverlap(a: Range, b: Range) {
  return a.min <= rangeMax(b.max) && b.min <= rangeMax(a.max);
}

export function isActive(status: RuleStatus) {
  return status === RuleStatus.ACTIVE;
}

export function validateLtvRule(rule: LoanLtvRule) {
  if (rule.minimumPropertyValue < 0) throw new LoanBusinessError("INVALID_LTV_RULE");
  if (rule.maximumPropertyValue !== null && rule.minimumPropertyValue > rule.maximumPropertyValue) {
    throw new LoanBusinessError("INVALID_LTV_RULE");
  }
  if (rule.ltvPercentage <= 0 || rule.ltvPercentage > 100) {
    throw new LoanBusinessError("INVALID_LTV_RULE");
  }
}

export function validateInterestRule(rule: LoanInterestRule) {
  if (rule.minimumLoanAmount < 0) throw new LoanBusinessError("INVALID_INTEREST_RULE");
  if (rule.maximumLoanAmount !== null && rule.minimumLoanAmount > rule.maximumLoanAmount) {
    throw new LoanBusinessError("INVALID_INTEREST_RULE");
  }
  if (rule.interestRate < 0) throw new LoanBusinessError("INVALID_INTEREST_RULE");
  if (rule.minimumDuration <= 0) throw new LoanBusinessError("INVALID_INTEREST_RULE");
  if (rule.maximumDuration !== null && rule.minimumDuration > rule.maximumDuration) {
    throw new LoanBusinessError("INVALID_INTEREST_RULE");
  }
}

export function ltvRulesOverlap(a: LoanLtvRule, b: LoanLtvRule) {
  return rangesOverlap(
    { min: a.minimumPropertyValue, max: a.maximumPropertyValue },
    { min: b.minimumPropertyValue, max: b.maximumPropertyValue },
  );
}

export function interestRulesOverlap(a: LoanInterestRule, b: LoanInterestRule) {
  if (a.durationUnit !== b.durationUnit) return false;
  return rangesOverlap(
    { min: a.minimumLoanAmount, max: a.maximumLoanAmount },
    { min: b.minimumLoanAmount, max: b.maximumLoanAmount },
  ) && rangesOverlap(
    { min: a.minimumDuration, max: a.maximumDuration },
    { min: b.minimumDuration, max: b.maximumDuration },
  );
}
