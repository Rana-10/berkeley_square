import { LoanBusinessError, RuleStatus, type DurationUnit, type LoanInterestRule } from "./loan-types";
import { interestRulesOverlap, isActive, validateInterestRule } from "./loan-rule-validation";

export function findApplicableInterestRule(
  requestedLoanAmount: number,
  loanDuration: number,
  durationUnit: DurationUnit,
  rules: LoanInterestRule[],
) {
  const rule = rules.find((candidate) => {
    if (!isActive(candidate.status)) return false;
    if (candidate.durationUnit !== durationUnit) return false;
    const maximumLoanAmount = candidate.maximumLoanAmount ?? Number.POSITIVE_INFINITY;
    const maximumDuration = candidate.maximumDuration ?? Number.POSITIVE_INFINITY;
    return requestedLoanAmount >= candidate.minimumLoanAmount
      && requestedLoanAmount <= maximumLoanAmount
      && loanDuration >= candidate.minimumDuration
      && loanDuration <= maximumDuration;
  });

  if (!rule) throw new LoanBusinessError("NO_APPLICABLE_INTEREST_RULE");
  return rule;
}

export function assertNoOverlappingInterestRule(
  candidate: LoanInterestRule,
  existingRules: LoanInterestRule[],
  ignoreId?: number,
) {
  validateInterestRule(candidate);
  if (candidate.status !== RuleStatus.ACTIVE) return;

  const overlappingRule = existingRules.find((existing) => {
    if (ignoreId !== undefined && existing.id === ignoreId) return false;
    return isActive(existing.status) && interestRulesOverlap(candidate, existing);
  });

  if (overlappingRule) throw new LoanBusinessError("OVERLAPPING_INTEREST_RULE");
}
