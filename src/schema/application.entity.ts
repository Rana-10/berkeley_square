import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Property } from "./property.entity";
import { ApplicationStatus } from "./property.enums";

@Entity({ name: "application" })
export class Application {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "property_id", type: "int" })
  property_id!: number;

  @ManyToOne(() => Property, (property) => property.applications, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "property_id" })
  property!: Property;

  @Column({ type: "enum", enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status!: ApplicationStatus;

  @Column({ type: "text", nullable: true })
  message_from_applicant!: string | null;

  @CreateDateColumn({ type: "timestamp" })
  submitted_at!: Date;

  @Column({ type: "varchar", nullable: true })
  confirmation_email_id!: string | null;

  @Column({ type: "varchar" })
  guest_first_name!: string;

  @Column({ type: "varchar" })
  guest_last_name!: string;

  @Column({ type: "varchar" })
  guest_email!: string;

  @Column({ type: "varchar" })
  guest_phone_number!: string;

  @Column({ type: "text" })
  guest_current_address!: string;

  @Column({ type: "jsonb", nullable: true })
  guest_document_upload_urls!: string[] | null;
}