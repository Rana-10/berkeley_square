import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "loan_application" })
export class LoanApplicationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  reference!: string;

  @Column({ type: "varchar", default: "Pending" })
  status!: string;

  @Column({ type: "varchar", nullable: true })
  applicant_name!: string | null;

  @Column({ type: "varchar", nullable: true })
  applicant_email!: string | null;

  @Column({ type: "varchar", nullable: true })
  applicant_phone!: string | null;

  @Column({ type: "varchar", nullable: true })
  net_amount!: string | null;

  @Column({ type: "varchar", nullable: true })
  security_country!: string | null;

  @Column({ type: "jsonb" })
  application_data!: Record<string, unknown>;

  @Column({ type: "numeric", precision: 14, scale: 2, nullable: true })
  property_value_snapshot!: string | null;

  @Column({ type: "numeric", precision: 14, scale: 2, nullable: true })
  requested_loan_amount_snapshot!: string | null;

  @Column({ type: "numeric", precision: 14, scale: 2, nullable: true })
  maximum_loan_amount_snapshot!: string | null;

  @Column({ type: "numeric", precision: 7, scale: 4, nullable: true })
  ltv_percentage_snapshot!: string | null;

  @Column({ type: "int", nullable: true })
  ltv_rule_id!: number | null;

  @Column({ type: "numeric", precision: 7, scale: 4, nullable: true })
  interest_rate_snapshot!: string | null;

  @Column({ type: "varchar", nullable: true })
  interest_type_snapshot!: string | null;

  @Column({ type: "int", nullable: true })
  interest_rule_id!: number | null;

  @Column({ type: "int", nullable: true })
  loan_duration_snapshot!: number | null;

  @Column({ type: "varchar", nullable: true })
  duration_unit_snapshot!: string | null;

  @Column({ type: "int", nullable: true })
  number_of_payments_snapshot!: number | null;

  @Column({ type: "numeric", precision: 14, scale: 2, nullable: true })
  monthly_payment_snapshot!: string | null;

  @Column({ type: "numeric", precision: 14, scale: 2, nullable: true })
  total_repayment_snapshot!: string | null;

  @Column({ type: "numeric", precision: 14, scale: 2, nullable: true })
  total_interest_snapshot!: string | null;

  @CreateDateColumn({ type: "timestamp" })
  received_at!: Date;
}
