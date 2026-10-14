# Loan Calculation Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a database-driven property loan calculator with admin-managed LTV and interest rules.

**Architecture:** Keep the existing Next.js App Router backend shape. Put pure loan math and rule selection in focused `src/lib/loan-*` modules, persist configurable rules through raw Postgres repository helpers consistent with existing code, and expose public/admin APIs through `src/app/api`.

**Tech Stack:** Next.js 15 App Router, TypeScript, Zod, TypeORM entities, raw `pg` table helpers, Node test runner via `tsx` if available or TypeScript typecheck fallback.

**Spec:** User request pasted at `C:/Users/dania/.codex/attachments/04059bca-81b2-473b-b568-328f6e4cc9dc/pasted-text.txt`

## Global Constraints

- Do not hard-code interest rates, LTV percentages, amount ranges, or duration ranges in calculation logic.
- Use inclusive range boundaries consistently for rule create/update/search.
- Return clear business error codes such as `NO_APPLICABLE_LTV_RULE`, `NO_APPLICABLE_INTEREST_RULE`, and `REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV`.
- Never accept client-provided `interestRate`, `ltvPercentage`, `monthlyPayment`, `totalInterest`, `maximumLoanAmount`, or equivalent authoritative values.
- Admin mutation endpoints must use the existing `requireAdmin()` guard.
- Preserve existing approved loan/application data by storing calculation snapshots when creating calculated loan applications.
- Keep controllers/routes thin; business logic belongs in services and repositories.
- Do not introduce a second ORM.

---

### Task 1: Loan Domain Types, Money Helpers, and EMI Calculator

**Files:**
- Create: `src/lib/loan-types.ts`
- Create: `src/lib/loan-money.ts`
- Create: `src/lib/loan-repayment-calculator.ts`
- Test: `src/lib/loan-repayment-calculator.test.ts`

**Interfaces:**
- Produces: `DurationUnit`, `InterestType`, `RuleStatus`, `LoanBusinessErrorCode`, `LoanBusinessError`
- Produces: `toMoney(value: number | string): number`, `roundMoney(value: number): number`, `calculatePercentageAmount(amount: number, percentage: number): number`
- Produces: `calculateReducingBalanceRepayment(input): LoanRepaymentResult`

- [ ] Write failing EMI tests for 6,000,000 at 10% for 10 years, zero interest, and month/year duration conversion.
- [ ] Run `npm.cmd test -- src/lib/loan-repayment-calculator.test.ts` if a test script exists; otherwise add a minimal Node test runner script first.
- [ ] Implement the enums, money helpers, and reducing-balance EMI calculator with two-decimal rounding.
- [ ] Run the repayment tests and `npm.cmd run typecheck`.

### Task 2: Rule Validation and Selection

**Files:**
- Create: `src/lib/loan-rule-validation.ts`
- Create: `src/lib/loan-interest-rule-service.ts`
- Create: `src/lib/loan-ltv-rule-service.ts`
- Test: `src/lib/loan-rule-services.test.ts`

**Interfaces:**
- Consumes: domain types from Task 1
- Produces: `findApplicableLtvRule(propertyValue, rules)`
- Produces: `findApplicableInterestRule(requestedLoanAmount, loanDuration, durationUnit, rules)`
- Produces: `assertNoOverlappingLtvRule(candidate, existingRules, ignoreId?)`
- Produces: `assertNoOverlappingInterestRule(candidate, existingRules, ignoreId?)`

- [ ] Write failing tests for inclusive boundaries, duration boundaries, no-match errors, invalid percentages, invalid min/max ranges, and overlapping active rules.
- [ ] Run the tests and confirm failures are for missing services.
- [ ] Implement rule selection and validation against in-memory rules first.
- [ ] Run the rule tests and `npm.cmd run typecheck`.

### Task 3: Loan Calculation Orchestrator

**Files:**
- Create: `src/lib/loan-calculation-service.ts`
- Test: `src/lib/loan-calculation-service.test.ts`

**Interfaces:**
- Consumes: Task 1 repayment calculator and Task 2 rule services
- Produces: `calculateLoan(input, dependencies): LoanCalculationResponse`

- [ ] Write failing tests for eligible, ineligible by LTV, no LTV rule, no interest rule, and invalid input.
- [ ] Verify tests fail before implementation.
- [ ] Implement orchestration: validate input, resolve LTV, compute maximum loan, short-circuit ineligible loans, resolve interest rule, calculate repayment.
- [ ] Run calculation tests and `npm.cmd run typecheck`.

### Task 4: Database Entities and Repositories

**Files:**
- Create: `src/schema/loan-interest-rule.entity.ts`
- Create: `src/schema/loan-ltv-rule.entity.ts`
- Modify: `src/schema/loan-application.entity.ts`
- Modify: `src/schema/index.ts`
- Modify: `src/lib/typeorm.ts`
- Create: `src/lib/loan-rule-repository.ts`
- Modify: `src/lib/loan-application-repository.ts`

**Interfaces:**
- Produces: `ensureLoanRuleTables()`
- Produces CRUD functions for interest and LTV rules
- Produces snapshot persistence fields on loan applications

- [ ] Write repository tests if database test configuration exists; otherwise keep this task verified by typecheck and route-level behavior.
- [ ] Add TypeORM entities matching the raw SQL table definitions.
- [ ] Add raw SQL `create table if not exists` helpers, indexes, check constraints, and timestamp columns.
- [ ] Add nullable snapshot columns to `loan_application` via `alter table add column if not exists`.
- [ ] Run `npm.cmd run typecheck`.

### Task 5: Public Calculator API

**Files:**
- Create: `src/lib/loan-calculation-validation.ts`
- Create: `src/app/api/loans/calculate/route.ts`

**Interfaces:**
- Consumes: repositories and `calculateLoan`
- Produces: `POST /api/loans/calculate`

- [ ] Write failing route/service validation tests where practical; otherwise write validation tests around the Zod schema.
- [ ] Implement a Zod schema accepting only `propertyValue`, `requestedLoanAmount`, `loanDuration`, and `durationUnit`.
- [ ] Load active rules from the database and call the calculation orchestrator.
- [ ] Map business errors to clear JSON responses and HTTP statuses.
- [ ] Run relevant tests and `npm.cmd run typecheck`.

### Task 6: Admin Rule APIs

**Files:**
- Create: `src/app/api/admin/loan-interest-rules/route.ts`
- Create: `src/app/api/admin/loan-interest-rules/[id]/route.ts`
- Create: `src/app/api/admin/loan-interest-rules/[id]/status/route.ts`
- Create: `src/app/api/admin/loan-ltv-rules/route.ts`
- Create: `src/app/api/admin/loan-ltv-rules/[id]/route.ts`
- Create: `src/app/api/admin/loan-ltv-rules/[id]/status/route.ts`

**Interfaces:**
- Consumes: repository CRUD, Zod schemas, overlap validation
- Produces protected CRUD and status endpoints

- [ ] Write failing tests for schema validation and overlap validation through service functions.
- [ ] Implement admin routes using `requireAdmin()` before reads/mutations.
- [ ] Validate incoming DTOs with Zod.
- [ ] Check overlap before create/update/activation.
- [ ] Soft archive on `DELETE` by setting status to `ARCHIVED`.
- [ ] Run tests and `npm.cmd run typecheck`.

### Task 7: Documentation and Final Verification

**Files:**
- Create or modify: `docs/loan-calculation-engine.md`

**Interfaces:**
- Documents endpoints, request/response shapes, inclusive boundaries, snapshots, and formula.

- [ ] Document public and admin APIs.
- [ ] Document LTV and EMI formulas.
- [ ] Document rounding rules and business error codes.
- [ ] Run `npm.cmd run typecheck`.
- [ ] Run all configured tests.
- [ ] Report tests executed, pass/fail, and any unavailable verification.

