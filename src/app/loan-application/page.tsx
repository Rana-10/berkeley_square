import type { Metadata } from "next";
import { PageHero } from "@/components/editorial/PageHero";
import { LoanWizard } from "@/components/loan/LoanWizard";

export const metadata: Metadata = {
  title: "Loan Application",
  description: "Short loan enquiry form for personal and security property details."
};

export default function LoanApplicationPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Loan application"
        title="A shorter, simpler loan enquiry."
        intro="Share your personal details and the security property connected to a purchase or refinance."
      />
      <section className="container py-16 md:py-20">
        <LoanWizard />
      </section>
    </main>
  );
}
