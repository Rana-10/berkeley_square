import type { Metadata } from "next";
import { AppointmentForm } from "@/components/appointment/AppointmentForm";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Book an appointment with the Berkeley Square Capital team."
};

export default function AppointmentPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Book an appointment"
        title="Schedule a conversation with the team."
        intro="Share a few details and we will be in touch to confirm a time that suits you."
      />
      <section className="container py-16 md:py-20">
        <div className="mx-auto max-w-xl">
          <AppointmentForm />
        </div>
      </section>
    </main>
  );
}
