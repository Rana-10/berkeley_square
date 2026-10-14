import { initializePropertyDataSource } from "@/lib/typeorm";
import { Application, ApplicationStatus } from "@/schema";
import type { ApplicationInput } from "@/lib/application-validation";

export async function createApplication(input: ApplicationInput) {
  const dataSource = await initializePropertyDataSource();
  const repository = dataSource.getRepository(Application);
  const application = repository.create({
    ...input,
    status: ApplicationStatus.PENDING,
    message_from_applicant: input.message_from_applicant || null,
    guest_document_upload_urls: input.guest_document_upload_urls ?? null,
  });

  return repository.save(application);
}

export async function findApplications() {
  const dataSource = await initializePropertyDataSource();
  return dataSource.getRepository(Application).find({
    relations: { property: true },
    order: { submitted_at: "DESC" },
  });
}

export async function findApplicationById(id: number) {
  const dataSource = await initializePropertyDataSource();
  const application = await dataSource.getRepository(Application).findOne({
    relations: { property: true },
    where: { id },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return application;
}

export async function updateApplicationStatus(id: number, status: ApplicationStatus) {
  const dataSource = await initializePropertyDataSource();
  const repository = dataSource.getRepository(Application);
  const application = await repository.findOne({ where: { id } });

  if (!application) {
    throw new Error("Application not found");
  }

  application.status = status;
  return repository.save(application);
}
