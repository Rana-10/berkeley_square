import { getPgPool } from "./postgres";
import { assertNoOverlappingInterestRule } from "./loan-interest-rule-service";
import { assertNoOverlappingLtvRule } from "./loan-ltv-rule-service";
import { DurationUnit, InterestType, RuleStatus, type LoanInterestRule, type LoanLtvRule } from "./loan-types";
import type { LoanInterestRuleWriteInput, LoanLtvRuleWriteInput } from "./loan-calculation-validation";

type InterestRuleRow = {
  id: number;
  minimum_loan_amount: string;
  maximum_loan_amount: string | null;
  interest_rate: string;
  interest_type: InterestType;
  minimum_duration: number;
  maximum_duration: number | null;
  duration_unit: DurationUnit;
  status: RuleStatus;
  created_at: string;
  updated_at: string;
};

type LtvRuleRow = {
  id: number;
  minimum_property_value: string;
  maximum_property_value: string | null;
  ltv_percentage: string;
  status: RuleStatus;
  created_at: string;
  updated_at: string;
};

export type SerializedLoanInterestRule = LoanInterestRule & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type SerializedLoanLtvRule = LoanLtvRule & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

function serializeInterestRule(row: InterestRuleRow): SerializedLoanInterestRule {
  return {
    id: row.id,
    minimumLoanAmount: Number(row.minimum_loan_amount),
    maximumLoanAmount: row.maximum_loan_amount === null ? null : Number(row.maximum_loan_amount),
    interestRate: Number(row.interest_rate),
    interestType: row.interest_type,
    minimumDuration: row.minimum_duration,
    maximumDuration: row.maximum_duration,
    durationUnit: row.duration_unit,
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

function serializeLtvRule(row: LtvRuleRow): SerializedLoanLtvRule {
  return {
    id: row.id,
    minimumPropertyValue: Number(row.minimum_property_value),
    maximumPropertyValue: row.maximum_property_value === null ? null : Number(row.maximum_property_value),
    ltvPercentage: Number(row.ltv_percentage),
    status: row.status,
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
  };
}

export async function ensureLoanRuleTables() {
  const pool = getPgPool();
  await pool.query(`
    create table if not exists loan_interest_rules (
      id serial primary key,
      minimum_loan_amount numeric(14,2) not null check (minimum_loan_amount >= 0),
      maximum_loan_amount numeric(14,2) null check (maximum_loan_amount is null or maximum_loan_amount >= minimum_loan_amount),
      interest_rate numeric(7,4) not null check (interest_rate >= 0),
      interest_type varchar not null default 'REDUCING_BALANCE',
      minimum_duration int not null check (minimum_duration > 0),
      maximum_duration int null check (maximum_duration is null or maximum_duration >= minimum_duration),
      duration_unit varchar not null,
      status varchar not null default 'ACTIVE',
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )
  `);
  await pool.query(`
    create index if not exists loan_interest_rules_active_lookup_idx
    on loan_interest_rules (status, duration_unit, minimum_loan_amount, maximum_loan_amount, minimum_duration, maximum_duration)
  `);
  await pool.query(`
    create table if not exists loan_ltv_rules (
      id serial primary key,
      minimum_property_value numeric(14,2) not null check (minimum_property_value >= 0),
      maximum_property_value numeric(14,2) null check (maximum_property_value is null or maximum_property_value >= minimum_property_value),
      ltv_percentage numeric(7,4) not null check (ltv_percentage > 0 and ltv_percentage <= 100),
      status varchar not null default 'ACTIVE',
      created_at timestamp not null default now(),
      updated_at timestamp not null default now()
    )
  `);
  await pool.query(`
    create index if not exists loan_ltv_rules_active_lookup_idx
    on loan_ltv_rules (status, minimum_property_value, maximum_property_value)
  `);
  return pool;
}

export async function listInterestRules(status?: RuleStatus) {
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<InterestRuleRow>(
    `
      select * from loan_interest_rules
      where (
        ($1::varchar is null and status <> 'ARCHIVED')
        or status = $1
      )
      order by minimum_loan_amount asc, minimum_duration asc, id asc
    `,
    [status ?? null],
  );
  return result.rows.map(serializeInterestRule);
}

export async function listLtvRules(status?: RuleStatus) {
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<LtvRuleRow>(
    `
      select * from loan_ltv_rules
      where (
        ($1::varchar is null and status <> 'ARCHIVED')
        or status = $1
      )
      order by minimum_property_value asc, id asc
    `,
    [status ?? null],
  );
  return result.rows.map(serializeLtvRule);
}

export async function findInterestRuleById(id: number) {
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<InterestRuleRow>("select * from loan_interest_rules where id = $1 limit 1", [id]);
  const row = result.rows[0];
  if (!row) throw new Error("Loan interest rule not found.");
  return serializeInterestRule(row);
}

export async function findLtvRuleById(id: number) {
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<LtvRuleRow>("select * from loan_ltv_rules where id = $1 limit 1", [id]);
  const row = result.rows[0];
  if (!row) throw new Error("Loan LTV rule not found.");
  return serializeLtvRule(row);
}

export async function createInterestRule(input: LoanInterestRuleWriteInput) {
  const existingRules = await listInterestRules();
  assertNoOverlappingInterestRule(input, existingRules);
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<InterestRuleRow>(
    `
      insert into loan_interest_rules (
        minimum_loan_amount, maximum_loan_amount, interest_rate, interest_type,
        minimum_duration, maximum_duration, duration_unit, status
      )
      values ($1,$2,$3,$4,$5,$6,$7,$8)
      returning *
    `,
    [
      input.minimumLoanAmount,
      input.maximumLoanAmount,
      input.interestRate,
      input.interestType,
      input.minimumDuration,
      input.maximumDuration,
      input.durationUnit,
      input.status,
    ],
  );
  return serializeInterestRule(result.rows[0]);
}

export async function createLtvRule(input: LoanLtvRuleWriteInput) {
  const existingRules = await listLtvRules();
  assertNoOverlappingLtvRule(input, existingRules);
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<LtvRuleRow>(
    `
      insert into loan_ltv_rules (minimum_property_value, maximum_property_value, ltv_percentage, status)
      values ($1,$2,$3,$4)
      returning *
    `,
    [input.minimumPropertyValue, input.maximumPropertyValue, input.ltvPercentage, input.status],
  );
  return serializeLtvRule(result.rows[0]);
}

export async function updateInterestRule(id: number, input: LoanInterestRuleWriteInput) {
  const existingRules = await listInterestRules();
  assertNoOverlappingInterestRule({ ...input, id }, existingRules, id);
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<InterestRuleRow>(
    `
      update loan_interest_rules
      set minimum_loan_amount=$2, maximum_loan_amount=$3, interest_rate=$4, interest_type=$5,
          minimum_duration=$6, maximum_duration=$7, duration_unit=$8, status=$9, updated_at=now()
      where id=$1
      returning *
    `,
    [id, input.minimumLoanAmount, input.maximumLoanAmount, input.interestRate, input.interestType, input.minimumDuration, input.maximumDuration, input.durationUnit, input.status],
  );
  if (!result.rows[0]) throw new Error("Loan interest rule not found.");
  return serializeInterestRule(result.rows[0]);
}

export async function updateLtvRule(id: number, input: LoanLtvRuleWriteInput) {
  const existingRules = await listLtvRules();
  assertNoOverlappingLtvRule({ ...input, id }, existingRules, id);
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<LtvRuleRow>(
    `
      update loan_ltv_rules
      set minimum_property_value=$2, maximum_property_value=$3, ltv_percentage=$4, status=$5, updated_at=now()
      where id=$1
      returning *
    `,
    [id, input.minimumPropertyValue, input.maximumPropertyValue, input.ltvPercentage, input.status],
  );
  if (!result.rows[0]) throw new Error("Loan LTV rule not found.");
  return serializeLtvRule(result.rows[0]);
}

export async function updateInterestRuleStatus(id: number, status: RuleStatus) {
  const current = await findInterestRuleById(id);
  if (status === RuleStatus.ACTIVE) {
    const existingRules = await listInterestRules();
    assertNoOverlappingInterestRule({ ...current, status }, existingRules, id);
  }
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<InterestRuleRow>(
    "update loan_interest_rules set status=$2, updated_at=now() where id=$1 returning *",
    [id, status],
  );
  return serializeInterestRule(result.rows[0]);
}

export async function updateLtvRuleStatus(id: number, status: RuleStatus) {
  const current = await findLtvRuleById(id);
  if (status === RuleStatus.ACTIVE) {
    const existingRules = await listLtvRules();
    assertNoOverlappingLtvRule({ ...current, status }, existingRules, id);
  }
  const pool = await ensureLoanRuleTables();
  const result = await pool.query<LtvRuleRow>(
    "update loan_ltv_rules set status=$2, updated_at=now() where id=$1 returning *",
    [id, status],
  );
  return serializeLtvRule(result.rows[0]);
}
