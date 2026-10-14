import { LoanBusinessError, RuleStatus, type LoanLtvRule } from "./loan-types";
import { isActive, ltvRulesOverlap, validateLtvRule } from "./loan-rule-validation";

export function findApplicableLtvRule(propertyValue: number, rules: LoanLtvRule[]) {
  const rule = rules.find((candidate) => {
    if (!isActive(candidate.status)) return false;
    const maximum = candidate.maximumPropertyValue ?? Number.POSITIVE_INFINITY;
    return propertyValue >= candidate.minimumPropertyValue && propertyValue <= maximum;
  });

  if (!rule) throw new LoanBusinessError("NO_APPLICABLE_LTV_RULE");
  return rule;
}

export function assertNoOverlappingLtvRule(
  candidate: LoanLtvRule,
  existingRules: LoanLtvRule[],
  ignoreId?: number,
) {
  validateLtvRule(candidate);
  if (candidate.status !== RuleStatus.ACTIVE) return;

  const overlappingRule = existingRules.find((existing) => {
    if (ignoreId !== undefined && existing.id === ignoreId) return false;
    return isActive(existing.status) && ltvRulesOverlap(candidate, existing);
  });

  if (overlappingRule) throw new LoanBusinessError("OVERLAPPING_LTV_RULE");
}
