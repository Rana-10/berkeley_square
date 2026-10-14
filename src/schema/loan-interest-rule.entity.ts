import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DurationUnit, InterestType, RuleStatus } from "@/lib/loan-types";

@Entity({ name: "loan_interest_rules" })
@Index(["status", "minimumLoanAmount", "maximumLoanAmount"])
export class LoanInterestRuleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "minimum_loan_amount", type: "numeric", precision: 14, scale: 2 })
  minimumLoanAmount!: string;

  @Column({ name: "maximum_loan_amount", type: "numeric", precision: 14, scale: 2, nullable: true })
  maximumLoanAmount!: string | null;

  @Column({ name: "interest_rate", type: "numeric", precision: 7, scale: 4 })
  interestRate!: string;

  @Column({ name: "interest_type", type: "varchar", default: InterestType.REDUCING_BALANCE })
  interestType!: InterestType;

  @Column({ name: "minimum_duration", type: "int" })
  minimumDuration!: number;

  @Column({ name: "maximum_duration", type: "int", nullable: true })
  maximumDuration!: number | null;

  @Column({ name: "duration_unit", type: "varchar" })
  durationUnit!: DurationUnit;

  @Column({ type: "varchar", default: RuleStatus.ACTIVE })
  status!: RuleStatus;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}
