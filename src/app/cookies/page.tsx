import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { company } from "@/data/company";
import { CookiePreferencesManager } from "@/components/cookies/CookiePreferencesManager";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy and browser preference controls for Berkeley Square Capital."
};

const cookieCategories = [
  {
    name: "Essential & Security Cookies",
    required: true,
    description:
      "Strictly necessary for the website to function properly, maintain secure SSL/TLS sessions, preserve loan application wizard state, and safeguard against cross-site scripting (CSRF). These cannot be disabled.",
    examples: ["bsc_session", "bsc_csrf_token", "bsc_cookie_consent_v1"]
  },
  {
    name: "Performance & Telemetry Cookies",
    required: false,
    description:
      "Allow us to measure visitor counts and traffic patterns across our advisory platforms to continually improve server speed, calculator responsiveness, and page navigation.",
    examples: ["_ga", "_gid", "bsc_perf_metrics"]
  },
  {
    name: "Functional & Preference Cookies",
    required: false,
    description:
      "Enable enhanced functionality such as remembering your loan calculator parameters, currency choices, and user interface preferences.",
    examples: ["bsc_calc_state", "bsc_theme_pref"]
  }
];

export default function CookiesPage() {
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
            <Cookie size={14} className="text-legacy-red" /> UK PECR &amp; GDPR Compliant
          </div>
          <h1 className="display text-3xl sm:text-4xl md:text-5xl text-white [html.light_&]:text-[#181818] font-bold leading-tight tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm font-mono text-slate-400 [html.light_&]:text-[#666460]">
            Last Updated: August 2026 · Official Notice for{" "}
            <span className="text-white [html.light_&]:text-[#181818] font-bold">{company.legalName}</span>
          </p>
        </div>

        {/* Interactive Manager */}
        <div className="mt-10">
          <CookiePreferencesManager />
        </div>

        {/* Overview & Content */}
        <div className="mt-12 space-y-10 text-slate-300 [html.light_&]:text-[#3D3A36] text-sm leading-relaxed font-sans">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono">
              About This Cookie Policy
            </h2>
            <p>
              When you visit the Berkeley Square Capital platform, we use cookies and related web tracking technologies to ensure secure operational functionality, facilitate client financing calculators, and understand advisory engagement patterns.
            </p>
            <p>
              Cookies are small, encrypted text files deposited on your browser or device. They allow our systems to recognize returning users, preserve security tokens across multi-step transaction forms, and guarantee seamless cross-device performance. You can manage or revoke cookie consent at any time using the interactive controls above or via your browser settings.
            </p>
          </section>

          {/* Categories Grid */}
          <section className="space-y-5 pt-4">
            <h2 className="text-xl font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono">
              Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              {cookieCategories.map((category) => (
                <div
                  key={category.name}
                  className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-white [html.light_&]:shadow-sm p-6 backdrop-blur-xl transition-all hover:border-white/20 [html.light_&]:hover:border-[#CFC9BC]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-bold text-base text-white [html.light_&]:text-[#181818] flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full bg-legacy-red shrink-0" />
                      {category.name}
                    </h3>
                    <span
                      className={`self-start sm:self-auto rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider border ${
                        category.required
                          ? "border-legacy-red/40 bg-legacy-red/10 text-legacy-red [html.light_&]:bg-legacy-red/10"
                          : "border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/60 [html.light_&]:bg-[#FAF8F5] text-slate-300 [html.light_&]:text-[#4A4844]"
                      }`}
                    >
                      {category.required ? "Strictly Necessary" : "Optional"}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300 [html.light_&]:text-[#4A4844]">
                    {category.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] text-slate-400 [html.light_&]:text-[#666460]">
                    <span className="text-white/60 [html.light_&]:text-[#666460]">Typical Cookies:</span>
                    {category.examples.map((ex) => (
                      <code
                        key={ex}
                        className="rounded bg-white/5 [html.light_&]:bg-[#ECE7DE] [html.light_&]:border [html.light_&]:border-[#D8D3C8] px-2.5 py-0.5 text-legacy-red font-semibold"
                      >
                        {ex}
                      </code>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Manage */}
          <section className="space-y-4 pt-4">
            <h2 className="text-xl font-bold text-white [html.light_&]:text-[#181818] uppercase tracking-wider font-mono">
              How to Control &amp; Delete Cookies
            </h2>
            <p>
              Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer. Please note that disabling essential cookies may impact the operation of our secure financial application forms.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-white p-4 text-xs font-mono">
                <span className="font-bold text-white [html.light_&]:text-[#181818] block mb-1">Google Chrome</span>
                <span className="text-slate-400 [html.light_&]:text-[#666460]">Settings &rarr; Privacy and security &rarr; Third-party cookies</span>
              </div>
              <div className="rounded-xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-white p-4 text-xs font-mono">
                <span className="font-bold text-white [html.light_&]:text-[#181818] block mb-1">Apple Safari</span>
                <span className="text-slate-400 [html.light_&]:text-[#666460]">Preferences &rarr; Privacy &rarr; Manage Website Data</span>
              </div>
              <div className="rounded-xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-white p-4 text-xs font-mono">
                <span className="font-bold text-white [html.light_&]:text-[#181818] block mb-1">Mozilla Firefox</span>
                <span className="text-slate-400 [html.light_&]:text-[#666460]">Settings &rarr; Privacy &amp; Security &rarr; Enhanced Tracking</span>
              </div>
              <div className="rounded-xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.02] [html.light_&]:bg-white p-4 text-xs font-mono">
                <span className="font-bold text-white [html.light_&]:text-[#181818] block mb-1">Microsoft Edge</span>
                <span className="text-slate-400 [html.light_&]:text-[#666460]">Settings &rarr; Cookies and site permissions</span>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="rounded-2xl border border-white/15 [html.light_&]:border-[#E4DFD4] bg-black/60 [html.light_&]:bg-white [html.light_&]:shadow-md p-6 sm:p-8 font-mono text-xs space-y-3 mt-10">
            <p className="text-white [html.light_&]:text-[#181818] font-bold uppercase text-sm">
              Questions Regarding Cookie Management &amp; Privacy?
            </p>
            <p className="text-slate-300 [html.light_&]:text-[#4A4844] leading-relaxed">
              Our Mayfair compliance desk is available to assist with data subject inquiries and telemetry policies. Contact us at{" "}
              <a href={`mailto:${company.email}`} className="text-legacy-red font-semibold hover:underline">
                {company.email}
              </a>{" "}
              or telephone{" "}
              <a href={`tel:${company.phone}`} className="text-legacy-red font-semibold hover:underline">
                {company.phoneDisplay}
              </a>.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400 [html.light_&]:text-[#666460]">
              <Link href="/privacy" className="hover:text-white [html.light_&]:hover:text-black underline">
                Read Privacy Notice &rarr;
              </Link>
              <Link href="/contact" className="hover:text-white [html.light_&]:hover:text-black underline">
                Contact Advisory Desk &rarr;
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
