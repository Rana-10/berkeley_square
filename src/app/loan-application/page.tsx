import type { Metadata } from "next";
import { LoanWizard } from "@/components/loan/LoanWizard";
import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata: Metadata = {
  title: "Loan Application",
  description: "Short loan enquiry form for personal and security property details."
};

export default function LoanApplicationPage() {
  return (
    <main className="pt-32 [html.light_&]:bg-[#F7F5F2] min-h-screen">
      <section className="container pb-20">
        <SectionHeading
          eyebrow="Loan application"
          title="A shorter, simpler loan enquiry."
          description="Share your personal details and the security property connected to a purchase or refinance."
        />
        <LoanWizard />
      </section>
    </main>
  );
}
