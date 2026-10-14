import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "appointment" })
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  reference!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "varchar" })
  service!: string;

  @CreateDateColumn({ type: "timestamp" })
  received_at!: Date;
}