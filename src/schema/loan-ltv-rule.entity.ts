import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RuleStatus } from "@/lib/loan-types";

@Entity({ name: "loan_ltv_rules" })
@Index(["status", "minimumPropertyValue", "maximumPropertyValue"])
export class LoanLtvRuleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "minimum_property_value", type: "numeric", precision: 14, scale: 2 })
  minimumPropertyValue!: string;

  @Column({ name: "maximum_property_value", type: "numeric", precision: 14, scale: 2, nullable: true })
  maximumPropertyValue!: string | null;

  @Column({ name: "ltv_percentage", type: "numeric", precision: 7, scale: 4 })
  ltvPercentage!: string;

  @Column({ type: "varchar", default: RuleStatus.ACTIVE })
  status!: RuleStatus;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt!: Date;
}
