import { roundMoney } from "./loan-money";
import { DurationUnit, InterestType, LoanBusinessError, type LoanRepaymentInput } from "./loan-types";

export function durationToMonths(duration: number, durationUnit: DurationUnit) {
  return durationUnit === DurationUnit.YEARS ? duration * 12 : duration;
}

export function calculateReducingBalanceRepayment(input: LoanRepaymentInput) {
  if (input.interestType !== InterestType.REDUCING_BALANCE) {
    throw new LoanBusinessError("NO_APPLICABLE_INTEREST_RULE");
  }

  const numberOfPayments = durationToMonths(input.duration, input.durationUnit);
  if (input.principal <= 0) throw new LoanBusinessError("INVALID_LOAN_AMOUNT");
  if (numberOfPayments <= 0) throw new LoanBusinessError("INVALID_DURATION");
  if (input.annualInterestRate < 0) throw new LoanBusinessError("INVALID_INTEREST_RULE");

  if (input.annualInterestRate === 0) {
    const monthlyPayment = roundMoney(input.principal / numberOfPayments);
    const totalRepayment = roundMoney(monthlyPayment * numberOfPayments);
    return {
      numberOfPayments,
      monthlyPayment,
      totalRepayment,
      totalInterest: roundMoney(totalRepayment - input.principal),
    };
  }

  // EMI formula for reducing-balance loans:
  // P * r * (1+r)^n / ((1+r)^n - 1), where r is monthly rate and n is months.
  const monthlyRate = input.annualInterestRate / 12 / 100;
  const compoundFactor = Math.pow(1 + monthlyRate, numberOfPayments);
  const monthlyPayment = roundMoney(
    (input.principal * monthlyRate * compoundFactor) / (compoundFactor - 1),
  );
  const totalRepayment = roundMoney(monthlyPayment * numberOfPayments);

  return {
    numberOfPayments,
    monthlyPayment,
    totalRepayment,
    totalInterest: roundMoney(totalRepayment - input.principal),
  };
}
