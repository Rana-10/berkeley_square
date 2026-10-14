import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Property } from "./property.entity";

@Entity({ name: "property_location" })
export class PropertyLocation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "property_id", type: "int", unique: true })
  property_id!: number;

  @OneToOne(() => Property, (property) => property.location, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "property_id" })
  property!: Property;

  @Column({ type: "varchar" })
  address_line_1!: string;

  @Column({ type: "varchar" })
  city!: string;

  @Column({ type: "varchar" })
  state_province!: string;

  @Column({ type: "varchar" })
  postal_code!: string;

  @Column({ type: "varchar" })
  country!: string;

  @Column({ type: "double precision", nullable: true })
  latitude!: number | null;

  @Column({ type: "double precision", nullable: true })
  longitude!: number | null;
}