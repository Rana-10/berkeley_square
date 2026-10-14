import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book an appointment with the Berkeley Square Capital team."
};

export default function AppointmentPage() {
  return (
    <main className="pt-32 [html.light_&]:bg-[#F7F5F2] min-h-screen">
      <section className="container pb-20">
        <SectionHeading
          eyebrow="Book an appointment"
          title="Schedule a conversation with the team."
          description="Share a few details and we will be in touch to confirm a time that suits you."
        />
        <div className="mx-auto max-w-xl">
          <AppointmentForm />
        </div>
      </section>
    </main>
  );
}