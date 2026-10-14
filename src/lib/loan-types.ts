export enum DurationUnit {
  MONTHS = "MONTHS",
  YEARS = "YEARS",
}

export enum InterestType {
  REDUCING_BALANCE = "REDUCING_BALANCE",
  FLAT_RATE = "FLAT_RATE",
}

export enum RuleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  ARCHIVED = "ARCHIVED",
}

export type LoanBusinessErrorCode =
  | "INVALID_PROPERTY_VALUE"
  | "INVALID_LOAN_AMOUNT"
  | "INVALID_DURATION"
  | "NO_APPLICABLE_LTV_RULE"
  | "NO_APPLICABLE_INTEREST_RULE"
  | "REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV"
  | "INVALID_INTEREST_RULE"
  | "INVALID_LTV_RULE"
  | "OVERLAPPING_INTEREST_RULE"
  | "OVERLAPPING_LTV_RULE";

export class LoanBusinessError extends Error {
  constructor(
    public readonly code: LoanBusinessErrorCode,
    message = code,
  ) {
    super(message);
    this.name = "LoanBusinessError";
  }
}

export type LoanRepaymentInput = {
  principal: number;
  annualInterestRate: number;
  duration: number;
  durationUnit: DurationUnit;
  interestType: InterestType;
};

export type LoanRepaymentResult = {
  numberOfPayments: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
};

export type LoanInterestRule = {
  id?: number;
  minimumLoanAmount: number;
  maximumLoanAmount: number | null;
  interestRate: number;
  interestType: InterestType;
  minimumDuration: number;
  maximumDuration: number | null;
  durationUnit: DurationUnit;
  status: RuleStatus;
};

export type LoanLtvRule = {
  id?: number;
  minimumPropertyValue: number;
  maximumPropertyValue: number | null;
  ltvPercentage: number;
  status: RuleStatus;
};
