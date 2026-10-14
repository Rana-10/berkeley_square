import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cookie, FileText, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy Notice & Data Protection",
  description: "Privacy Notice and Data Protection Policy for BERKELEY SQUARE CAPITAL (LONDON) LTD."
};

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#0E0E12] [html.light_&]:bg-[#F7F5F2] text-slate-200 [html.light_&]:text-[#222222]">
      <div className="container max-w-4xl px-4 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-white [html.light_&]:text-[#666460] [html.light_&]:hover:text-[#181818] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Homepage
        </Link>

        {/* Header */}
        <div className="border-b border-white/10 [html.light_&]:border-[#E4DFD4] pb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/40 [html.light_&]:bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/80 [html.light_&]:text-[#222222] backdrop-blur-md">
            <ShieldCheck size={14} className="text-legacy-red" /> UK GDPR & DPA 2018 Compliant
          </div>
          <h1 className="display text-3xl sm:text-4xl md:text-5xl text-white [html.light_&]:text-[#181818] font-bold leading-tight">
            Privacy Notice & Data Policy
          </h1>
          <p className="mt-4 text-sm font-mono text-slate-400 [html.light_&]:text-[#666460]">
            Last Updated: August 2026 · Effective for <span className="text-white [html.light_&]:text-[#181818] font-bold">{company.legalName}</span>
          </p>
        </div>

        {/* Policy Content */}
        <div className="mt-12 space-y-10 text-slate-300 [html.light_&]:text-[#3D3A36] text-sm leading-relaxed font-sans">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">01.</span> Introduction & Data Controller
            </h2>
            <p>
              This Privacy Notice explains how <strong className="text-white [html.light_&]:text-[#181818]">{company.legalName}</strong> (&ldquo;Berkeley Square Capital&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, stores, and protects personal data when you interact with our website (<a href="https://bsqcap.com/" className="text-legacy-red hover:underline font-mono">https://bsqcap.com/</a>), utilize our financial advisory services, submit loan applications, or communicate with our London Mayfair headquarters and international desks.
            </p>
            <p>
              We operate in full compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">02.</span> Contact Information
            </h2>
            <p>
              If you have any questions about this notice or how your personal information is handled, please contact our Data Governance Officer:
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 font-mono text-xs text-slate-300 space-y-1.5">
              <p><strong className="text-white [html.light_&]:text-[#181818]">Entity:</strong> {company.legalName}</p>
              <p><strong className="text-white [html.light_&]:text-[#181818]">Trading HQ:</strong> {company.tradingAddress}</p>
              <p><strong className="text-white [html.light_&]:text-[#181818]">Registered Address:</strong> {company.registeredAddress}</p>
              <p><strong className="text-white [html.light_&]:text-[#181818]">Email:</strong> <a href={`mailto:${company.email}`} className="text-legacy-red hover:underline">{company.email}</a></p>
              <p><strong className="text-white [html.light_&]:text-[#181818]">Telephone:</strong> <a href={`tel:${company.phone}`} className="text-legacy-red hover:underline">{company.phoneDisplay}</a></p>
              <p><strong className="text-white [html.light_&]:text-[#181818]">Official Domain:</strong> <a href="https://bsqcap.com/" className="text-legacy-red hover:underline">https://bsqcap.com/</a></p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">03.</span> Information We Collect
            </h2>
            <p>We may collect and process the following categories of personal data:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li><strong className="text-white [html.light_&]:text-[#181818]">Identity Data:</strong> Full legal name, title, date of birth, proof of identity (passport, driver&apos;s licence).</li>
              <li><strong className="text-white [html.light_&]:text-[#181818]">Contact Data:</strong> Residential address, corporate registered address, email address, and telephone numbers.</li>
              <li><strong className="text-white [html.light_&]:text-[#181818]">Financial & Property Data:</strong> Loan requirements, property valuations, asset/liability statements, proof of funds, source of wealth, and project specifications submitted via our 3-step loan application.</li>
              <li><strong className="text-white [html.light_&]:text-[#181818]">Technical & Usage Data:</strong> IP address, browser type, operating system, pages visited, and interaction telemetry collected via essential and analytics cookies.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">04.</span> Lawful Basis for Processing
            </h2>
            <p>We process your personal data under the following legal bases under UK GDPR Article 6:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li><strong className="text-white [html.light_&]:text-[#181818]">Contractual Necessity:</strong> To assess loan eligibility, formulate indicative term sheets, and coordinate transaction structuring requested by you.</li>
              <li><strong className="text-white [html.light_&]:text-[#181818]">Legal & Regulatory Compliance:</strong> To satisfy statutory anti-money laundering (AML), Know Your Customer (KYC), and counter-terrorist financing obligations.</li>
              <li><strong className="text-white [html.light_&]:text-[#181818]">Legitimate Interests:</strong> To operate, secure, and enhance our digital advisory platform and manage corporate communications.</li>
              <li><strong className="text-white [html.light_&]:text-[#181818]">Consent:</strong> Where you have explicitly opted in (e.g., non-essential cookies or direct marketing).</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">05.</span> How We Share Information
            </h2>
            <p>
              We treat all client financial affairs with absolute discretion. We do not sell or lease personal data. Personal information is only disclosed to trusted third parties when strictly necessary to execute your transaction:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>Authorized institutional lenders, debt funds, and private family offices reviewing your facility.</li>
              <li>RICS-qualified chartered surveyors and independent asset valuers.</li>
              <li>Solicitors, legal counsel, and title conveyance partners coordinating transaction closing.</li>
              <li>Regulatory authorities and statutory law enforcement bodies where mandated by UK law.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">06.</span> International Data Transfers
            </h2>
            <p>
              As a global advisory firm with partner desks in Dubai, Riyadh, Muscat, Athens, and Pakistan, personal data may occasionally be transferred cross-border. Where transfers occur outside the UK or European Economic Area (EEA), we enforce UK International Data Transfer Agreements (IDTAs) and Standard Contractual Clauses (SCCs) to guarantee equivalent data protection.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">07.</span> Data Security & Retention
            </h2>
            <p>
              We employ military-grade encryption (TLS 1.3 in transit and AES-256 at rest), strict role-based access governance, and continuous vulnerability monitoring.
            </p>
            <p>
              Personal and financial records related to lending transactions are retained for 6 years following completion of the engagement to comply with UK statutory limitation periods and financial regulations, after which data is securely destroyed.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="text-legacy-red">08.</span> Your Statutory Rights
            </h2>
            <p>Under UK data protection law, you have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
              <li>Request access to the personal data we hold about you (Subject Access Request).</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request erasure of personal data where retention is no longer legally mandated.</li>
              <li>Object to or restrict processing of your data under specific statutory grounds.</li>
              <li>Lodge a complaint with the UK Information Commissioner&apos;s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-legacy-red hover:underline">www.ico.org.uk</a>.</li>
            </ul>
          </section>

          {/* Section 9 (Verbatim from User Document) */}
          <section className="rounded-2xl border border-legacy-red/30 bg-gradient-to-br from-[#18080a]/90 via-[#10080a]/90 to-[#080808]/90 [html.light_&]:bg-none [html.light_&]:bg-white [html.light_&]:border-legacy-red/40 [html.light_&]:shadow-md p-6 md:p-8 space-y-3 shadow-lg">
            <h2 className="text-xl font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <Cookie size={18} className="text-legacy-red" />
              <span>9. Cookies</span>
            </h2>
            <p className="text-base text-slate-200 [html.light_&]:text-[#3D3A36] leading-relaxed">
              If you visit our website, we may use cookies to make it function properly and to understand how it&apos;s used. You can control cookies through your browser settings. For full details, see our separate Cookie Policy at <a href="https://bsqcap.com/" className="text-legacy-red font-mono font-bold hover:underline">https://bsqcap.com/</a>.
            </p>
            <div className="pt-2">
              <Link
                href="/cookies"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-legacy-red hover:underline"
              >
                View Detailed Cookie Policy &amp; Preferences &rarr;
              </Link>
            </div>
          </section>

          {/* Section 10 (Verbatim from User Document) */}
          <section className="rounded-2xl border border-white/15 [html.light_&]:border-[#E4DFD4] bg-white/[0.03] [html.light_&]:bg-white [html.light_&]:shadow-sm p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono flex items-center gap-2">
              <FileText size={18} className="text-legacy-red" />
              <span>10. Changes to this notice</span>
            </h2>
            <p className="text-base text-slate-200 [html.light_&]:text-[#3D3A36] leading-relaxed">
              We may update this notice from time to time to reflect changes in our practices or the law. The current version will always be available at <a href="https://bsqcap.com/" className="text-legacy-red font-mono font-bold hover:underline">https://bsqcap.com/</a> and the &apos;last updated&apos; date at the top will show when it was last revised.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
