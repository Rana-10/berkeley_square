import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Application } from "./application.entity";
import { PropertyLocation } from "./property-location.entity";
import { PropertyMedia } from "./property-media.entity";
import { PropertyStatus } from "./property.enums";

@Entity({ name: "property" })
export class Property {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  title!: string;

  @Column({ type: "decimal", precision: 15, scale: 2 })
  price!: string;

  @Column({ type: "varchar", default: "GBP" })
  currency!: string;

  @Column({ type: "enum", enum: PropertyStatus })
  status!: PropertyStatus;

  @Column({ type: "varchar", default: "Residential" })
  property_type!: string;

  @Column({ type: "int" })
  bedrooms!: number;

  @Column({ type: "int" })
  bathrooms!: number;

  @Column({ type: "double precision" })
  area!: number;

  @Column({ type: "text" })
  full_description!: string;

  @Column({ type: "jsonb", nullable: true })
  amenities!: string[] | null;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @OneToMany(() => PropertyMedia, (media) => media.property, { cascade: true })
  media!: PropertyMedia[];

  @OneToOne(() => PropertyLocation, (location) => location.property, {
    cascade: true,
  })
  location!: PropertyLocation;

  @OneToMany(() => Application, (application) => application.property)
  applications!: Application[];
}
