import { z } from "zod";
import { appointmentSchema } from "@/lib/validation";

export type Appointment = z.infer<typeof appointmentSchema>;

export type AppointmentResult = {
  reference: string;
  receivedAt: string;
};

export const appointmentService = {
  async submitAppointment(appointment: Appointment): Promise<AppointmentResult> {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to send appointment request");
      }

      return response.json();
    } finally {
      window.clearTimeout(timeout);
    }
  }
};
