import { randomUUID } from "crypto";
import { getPgPool } from "@/lib/postgres";
import type { LoanApplicationInput } from "@/lib/validation";

export type LoanApplicationRecord = {
  id: number;
  reference: string;
  status: string;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  net_amount: string | null;
  security_country: string | null;
  application_data: LoanApplicationInput;
  received_at: string;
};

function primaryApplicant(application: LoanApplicationInput) {
  return application.personalInformation;
}

function applicantName(application: LoanApplicationInput) {
  const applicant = primaryApplicant(application);
  return [applicant.firstName, applicant.lastName].filter(Boolean).join(" ") || null;
}

async function ensureLoanApplicationTable() {
  const pool = getPgPool();
  await pool.query(`
    create table if not exists loan_application (
      id serial primary key,
      reference varchar unique not null,
      status varchar not null default 'Pending',
      applicant_name varchar null,
      applicant_email varchar null,
      applicant_phone varchar null,
      net_amount varchar null,
      security_country varchar null,
      application_data jsonb not null,
      received_at timestamp not null default now()
    )
  `);
  await pool.query(`
    alter table loan_application
      add column if not exists property_value_snapshot numeric(14,2) null,
      add column if not exists requested_loan_amount_snapshot numeric(14,2) null,
      add column if not exists maximum_loan_amount_snapshot numeric(14,2) null,
      add column if not exists ltv_percentage_snapshot numeric(7,4) null,
      add column if not exists ltv_rule_id int null,
      add column if not exists interest_rate_snapshot numeric(7,4) null,
      add column if not exists interest_type_snapshot varchar null,
      add column if not exists interest_rule_id int null,
      add column if not exists loan_duration_snapshot int null,
      add column if not exists duration_unit_snapshot varchar null,
      add column if not exists number_of_payments_snapshot int null,
      add column if not exists monthly_payment_snapshot numeric(14,2) null,
      add column if not exists total_repayment_snapshot numeric(14,2) null,
      add column if not exists total_interest_snapshot numeric(14,2) null
  `);
  return pool;
}

export async function createLoanApplication(application: LoanApplicationInput) {
  const receivedAt = new Date();
  const reference = `BSQ-LOAN-${randomUUID().slice(0, 8).toUpperCase()}`;
  const applicant = primaryApplicant(application);
  const pool = await ensureLoanApplicationTable();

  await pool.query(
    `
      insert into loan_application (
        reference,
        status,
        applicant_name,
        applicant_email,
        applicant_phone,
        net_amount,
        security_country,
        application_data,
        received_at
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)
    `,
    [
      reference,
      "Pending",
      applicantName(application),
      applicant.email || null,
      applicant.phone || null,
      application.securityInformation.loanAmountRequired || null,
      application.securityInformation.address.country || null,
      JSON.stringify(application),
      receivedAt,
    ],
  );

  return {
    reference,
    receivedAt: receivedAt.toISOString(),
  };
}

export async function findLoanApplications() {
  const pool = await ensureLoanApplicationTable();
  const result = await pool.query<LoanApplicationRecord>(
    `
      select
        id,
        reference,
        status,
        applicant_name,
        applicant_email,
        applicant_phone,
        net_amount,
        security_country,
        application_data,
        received_at
      from loan_application
      order by received_at desc
    `,
  );

  return result.rows;
}

export async function findLoanApplicationById(id: number) {
  const pool = await ensureLoanApplicationTable();
  const result = await pool.query<LoanApplicationRecord>(
    `
      select
        id,
        reference,
        status,
        applicant_name,
        applicant_email,
        applicant_phone,
        net_amount,
        security_country,
        application_data,
        received_at
      from loan_application
      where id = $1
      limit 1
    `,
    [id],
  );

  const record = result.rows[0];
  if (!record) throw new Error("Loan application not found.");
  return record;
}

export async function deleteLoanApplicationByReference(reference: string) {
  const pool = await ensureLoanApplicationTable();
  const result = await pool.query(
    "delete from loan_application where reference = $1",
    [reference],
  );
  return result;
}

