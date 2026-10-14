import type { LoanApplication } from "@/types/loan";

export type SubmissionResult = {
  reference: string;
  receivedAt: string;
};

export const loanApplicationService = {
  async submitApplication(application: LoanApplication): Promise<SubmissionResult> {
    const response = await fetch("/api/loan-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application)
    });

    if (!response.ok) {
      throw new Error("Failed to send loan application");
    }

    return response.json();
  },
  async saveDraft(): Promise<{ saved: boolean }> {
    return { saved: true };
  },
  async uploadDocument(): Promise<{ uploaded: boolean }> {
    return { uploaded: true };
  },
  async getApplicationStatus(reference: string): Promise<{ reference: string; status: "received" }> {
    return { reference, status: "received" };
  }
};
