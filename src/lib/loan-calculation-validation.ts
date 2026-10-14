import { z } from "zod";
import { DurationUnit, InterestType, RuleStatus } from "./loan-types";

const positiveNumber = (label: string) => z.coerce.number().finite(`${label} must be numeric`).positive(`${label} must be greater than 0`);
const nonNegativeNumber = (label: string) => z.coerce.number().finite(`${label} must be numeric`).nonnegative(`${label} cannot be negative`);

export const loanCalculationRequestSchema = z.object({
  propertyValue: positiveNumber("Property value").max(500_000_000, "Property value cannot exceed £500,000,000"),
  requestedLoanAmount: positiveNumber("Requested loan amount").max(100_000_000, "Requested loan amount cannot exceed £100,000,000"),
  loanDuration: positiveNumber("Loan duration").max(120, "Loan duration cannot exceed 120"),
  durationUnit: z.nativeEnum(DurationUnit),
}).strict();

export const loanInterestRuleWriteSchema = z.object({
  minimumLoanAmount: nonNegativeNumber("Minimum loan amount").max(500_000_000, "Minimum loan amount cannot exceed £500,000,000"),
  maximumLoanAmount: z.coerce.number().finite().nonnegative().max(500_000_000, "Maximum loan amount cannot exceed £500,000,000").nullable().optional().default(null),
  interestRate: nonNegativeNumber("Interest rate").max(100, "Interest rate cannot exceed 100%"),
  interestType: z.nativeEnum(InterestType).default(InterestType.REDUCING_BALANCE),
  minimumDuration: positiveNumber("Minimum duration").max(120, "Minimum duration cannot exceed 120"),
  maximumDuration: z.coerce.number().finite().positive().max(120, "Maximum duration cannot exceed 120").nullable().optional().default(null),
  durationUnit: z.nativeEnum(DurationUnit),
  status: z.nativeEnum(RuleStatus).default(RuleStatus.ACTIVE),
}).strict();

export const loanLtvRuleWriteSchema = z.object({
  minimumPropertyValue: nonNegativeNumber("Minimum property value").max(500_000_000, "Minimum property value cannot exceed £500,000,000"),
  maximumPropertyValue: z.coerce.number().finite().nonnegative().max(500_000_000, "Maximum property value cannot exceed £500,000,000").nullable().optional().default(null),
  ltvPercentage: positiveNumber("LTV percentage").max(100, "LTV percentage cannot exceed 100"),
  status: z.nativeEnum(RuleStatus).default(RuleStatus.ACTIVE),
}).strict();

export const loanRuleStatusSchema = z.object({
  status: z.nativeEnum(RuleStatus),
}).strict();

export type LoanCalculationRequest = z.infer<typeof loanCalculationRequestSchema>;
export type LoanInterestRuleWriteInput = z.infer<typeof loanInterestRuleWriteSchema>;
export type LoanLtvRuleWriteInput = z.infer<typeof loanLtvRuleWriteSchema>;
