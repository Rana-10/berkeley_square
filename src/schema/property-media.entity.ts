import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Property } from "./property.entity";
import { PropertyMediaType } from "./property.enums";

@Entity({ name: "property_media" })
export class PropertyMedia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "property_id", type: "int" })
  property_id!: number;

  @ManyToOne(() => Property, (property) => property.media, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "property_id" })
  property!: Property;

  @Column({ type: "varchar" })
  file_url!: string;

  @Column({ type: "enum", enum: PropertyMediaType })
  type!: PropertyMediaType;

  @Column({ type: "int" })
  display_order!: number;
}