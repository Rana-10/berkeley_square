import { calculatePercentageAmount } from "./loan-money";
import { findApplicableInterestRule } from "./loan-interest-rule-service";
import { findApplicableLtvRule } from "./loan-ltv-rule-service";
import { calculateReducingBalanceRepayment } from "./loan-repayment-calculator";
import {
  InterestType,
  LoanBusinessError,
  type DurationUnit,
  type LoanInterestRule,
  type LoanLtvRule,
} from "./loan-types";

export type LoanCalculationInput = {
  propertyValue: number;
  requestedLoanAmount: number;
  loanDuration: number;
  durationUnit: DurationUnit;
};

export type LoanCalculationDependencies = {
  ltvRules: LoanLtvRule[];
  interestRules: LoanInterestRule[];
};

type BaseLoanCalculationResponse = LoanCalculationInput & {
  eligible: boolean;
  maximumLoanAmount: number;
  ltvPercentage: number;
  ltvRuleId?: number;
};

export type EligibleLoanCalculationResponse = BaseLoanCalculationResponse & {
  eligible: true;
  interestRate: number;
  interestType: InterestType;
  interestRuleId?: number;
  numberOfPayments: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
};

export type IneligibleLoanCalculationResponse = BaseLoanCalculationResponse & {
  eligible: false;
  reason: "REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV";
};

export type LoanCalculationResponse =
  | EligibleLoanCalculationResponse
  | IneligibleLoanCalculationResponse;

function validateCalculationInput(input: LoanCalculationInput) {
  if (!Number.isFinite(input.propertyValue) || input.propertyValue <= 0) {
    throw new LoanBusinessError("INVALID_PROPERTY_VALUE");
  }
  if (!Number.isFinite(input.requestedLoanAmount) || input.requestedLoanAmount <= 0) {
    throw new LoanBusinessError("INVALID_LOAN_AMOUNT");
  }
  if (!Number.isFinite(input.loanDuration) || input.loanDuration <= 0) {
    throw new LoanBusinessError("INVALID_DURATION");
  }
}

export function calculateLoan(
  input: LoanCalculationInput,
  dependencies: LoanCalculationDependencies,
): LoanCalculationResponse {
  validateCalculationInput(input);

  const ltvRule = findApplicableLtvRule(input.propertyValue, dependencies.ltvRules);
  const maximumLoanAmount = calculatePercentageAmount(input.propertyValue, ltvRule.ltvPercentage);
  const baseResponse = {
    ...input,
    maximumLoanAmount,
    ltvPercentage: ltvRule.ltvPercentage,
    ltvRuleId: ltvRule.id,
  };

  if (input.requestedLoanAmount > maximumLoanAmount) {
    return {
      ...baseResponse,
      eligible: false,
      reason: "REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV",
    };
  }

  const interestRule = findApplicableInterestRule(
    input.requestedLoanAmount,
    input.loanDuration,
    input.durationUnit,
    dependencies.interestRules,
  );

  if (interestRule.interestType !== InterestType.REDUCING_BALANCE) {
    throw new LoanBusinessError("NO_APPLICABLE_INTEREST_RULE");
  }

  const repayment = calculateReducingBalanceRepayment({
    principal: input.requestedLoanAmount,
    annualInterestRate: interestRule.interestRate,
    duration: input.loanDuration,
    durationUnit: input.durationUnit,
    interestType: interestRule.interestType,
  });

  return {
    ...baseResponse,
    eligible: true,
    interestRate: interestRule.interestRate,
    interestType: interestRule.interestType,
    interestRuleId: interestRule.id,
    ...repayment,
  };
}
