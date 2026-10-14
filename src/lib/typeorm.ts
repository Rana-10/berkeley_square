import "reflect-metadata";
import { DataSource } from "typeorm";
import {
  AdminUser,
  Appointment,
  Application,
  LoanApplicationEntity,
  LoanInterestRuleEntity,
  LoanLtvRuleEntity,
  Property,
  PropertyLocation,
  PropertyMedia,
} from "@/schema";

const globalForTypeOrm = globalThis as typeof globalThis & {
  propertyDataSource?: DataSource;
  propertyDataSourceVersion?: string;
};

const propertyDataSourceVersion = "property-platform-v4";

export function getPropertyDataSource() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (globalForTypeOrm.propertyDataSourceVersion !== propertyDataSourceVersion) {
    globalForTypeOrm.propertyDataSource = undefined;
  }

  if (!globalForTypeOrm.propertyDataSource) {
    globalForTypeOrm.propertyDataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      extra: {
        connectionTimeoutMillis: 5000,
      },
      entities: [
        AdminUser,
        Appointment,
        Property,
        PropertyMedia,
        PropertyLocation,
        Application,
        LoanApplicationEntity,
        LoanInterestRuleEntity,
        LoanLtvRuleEntity,
      ],
      synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
    });
    globalForTypeOrm.propertyDataSourceVersion = propertyDataSourceVersion;
  }

  return globalForTypeOrm.propertyDataSource;
}

export async function initializePropertyDataSource() {
  const dataSource = getPropertyDataSource();
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  if (!dataSource.hasMetadata(Property)) {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
    globalForTypeOrm.propertyDataSource = undefined;
    globalForTypeOrm.propertyDataSourceVersion = undefined;
    const refreshedDataSource = getPropertyDataSource();
    await refreshedDataSource.initialize();
    return refreshedDataSource;
  }

  return dataSource;
}
