# Loan Calculation Engine

The loan calculator is backend-authoritative. Clients submit only `propertyValue`, `requestedLoanAmount`, `loanDuration`, and `durationUnit`; LTV, interest rate, repayments, and eligibility are resolved from active database rules.

## Public API

`POST /api/loans/calculate`

Request:

```json
{
  "propertyValue": 10000000,
  "requestedLoanAmount": 6000000,
  "loanDuration": 10,
  "durationUnit": "YEARS"
}
```

The request schema is strict and rejects client-provided authoritative fields such as `interestRate`, `ltvPercentage`, `monthlyPayment`, and `maximumLoanAmount`.

Eligible responses include `maximumLoanAmount`, `ltvPercentage`, `interestRate`, `interestType`, `numberOfPayments`, `monthlyPayment`, `totalRepayment`, `totalInterest`, `ltvRuleId`, and `interestRuleId`.

Ineligible LTV responses return `eligible: false` and `reason: "REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV"` without calculating repayment.

## Admin APIs

All admin endpoints require the existing admin session cookie and `requireAdmin()` guard.

Interest rules:

- `GET /api/admin/loan-interest-rules?status=ACTIVE`
- `POST /api/admin/loan-interest-rules`
- `GET /api/admin/loan-interest-rules/:id`
- `PATCH /api/admin/loan-interest-rules/:id`
- `DELETE /api/admin/loan-interest-rules/:id`
- `PATCH /api/admin/loan-interest-rules/:id/status`

LTV rules:

- `GET /api/admin/loan-ltv-rules?status=ACTIVE`
- `POST /api/admin/loan-ltv-rules`
- `GET /api/admin/loan-ltv-rules/:id`
- `PATCH /api/admin/loan-ltv-rules/:id`
- `DELETE /api/admin/loan-ltv-rules/:id`
- `PATCH /api/admin/loan-ltv-rules/:id/status`

`DELETE` archives a rule by setting `status` to `ARCHIVED`.

## Rule Boundaries

All ranges are inclusive. A rule with `minimumLoanAmount = 1000000` and `maximumLoanAmount = 2500000` matches both `1000000` and `2500000`.

Open-ended maximum values are stored as `null` and treated as no upper bound.

Active rules cannot overlap:

- LTV overlap is checked by property value range.
- Interest overlap is checked by loan amount range plus duration range for the same `durationUnit`.

Inactive and archived rules do not block overlap.

## Calculation

LTV:

```text
maximumLoanAmount = propertyValue * (ltvPercentage / 100)
```

Reducing-balance EMI:

```text
monthlyRate = annualInterestRate / 12 / 100
monthlyPayment = P * r * (1+r)^n / ((1+r)^n - 1)
```

Where:

- `P` is the requested loan amount.
- `r` is the monthly interest rate.
- `n` is the number of monthly payments.

Rounding:

- `monthlyPayment`, `totalRepayment`, `totalInterest`, and `maximumLoanAmount` round to 2 decimals.
- Percentages are stored as numeric database values and converted to numbers at service boundaries.

## Business Errors

The calculation layer raises stable codes:

- `INVALID_PROPERTY_VALUE`
- `INVALID_LOAN_AMOUNT`
- `INVALID_DURATION`
- `NO_APPLICABLE_LTV_RULE`
- `NO_APPLICABLE_INTEREST_RULE`
- `REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV`
- `INVALID_INTEREST_RULE`
- `INVALID_LTV_RULE`
- `OVERLAPPING_INTEREST_RULE`
- `OVERLAPPING_LTV_RULE`

## Persistence

Rule tables:

- `loan_interest_rules`
- `loan_ltv_rules`

The existing `loan_application` table is extended with nullable calculation snapshot columns for property value, requested loan, maximum loan, LTV, interest, duration, payment count, monthly payment, total repayment, total interest, and rule IDs. These snapshots preserve historical calculations when administrators later change active rules.
