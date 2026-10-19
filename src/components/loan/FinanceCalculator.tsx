"use client";

import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { RangeSlider } from "@/components/ui/RangeSlider";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

const termOptions = [3, 6, 9, 12, 18, 24];

type LoanCalculationResponse = {
  eligible: boolean;
  propertyValue: number;
  requestedLoanAmount: number;
  maximumLoanAmount: number;
  ltvPercentage: number;
  interestRate?: number;
  interestType?: string;
  loanDuration: number;
  durationUnit: "MONTHS" | "YEARS";
  numberOfPayments?: number;
  monthlyPayment?: number;
  totalRepayment?: number;
  totalInterest?: number;
  reason?: string;
};

function LtvRing({ ltv }: { ltv: number }) {
  const reduceMotion = useReducedMotion();
  const spring = useSpring(ltv, { stiffness: 90, damping: 18, mass: 0.6 });
  const rounded = useTransform(spring, (value) => Math.round(value));
  const circumference = 2 * Math.PI * 54;
  const dashOffset = useTransform(spring, (value) => circumference - (Math.min(value, 100) / 100) * circumference);

  useEffect(() => {
    spring.set(ltv);
  }, [ltv, spring]);

  return (
    <div className="relative mx-auto grid h-40 w-40 place-items-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" className="text-white/[0.08] [html.light_&]:text-black/10" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#C43A31"
          strokeWidth="8"
          strokeLinecap="butt"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: reduceMotion ? circumference - (Math.min(ltv, 100) / 100) * circumference : dashOffset }}
        />
      </svg>
      <div className="text-center">
        {reduceMotion ? (
          <p className="display text-5xl text-legacy-red">{ltv}</p>
        ) : (
          <motion.p className="display text-5xl text-legacy-red">{rounded}</motion.p>
        )}
        <p className="text-xs uppercase tracking-[0.18em] text-white/45 [html.light_&]:text-[#706D68]">LTV %</p>
      </div>
    </div>
  );
}

export function FinanceCalculator() {
  const [loan, setLoan] = useState(250000);
  const [value, setValue] = useState(400000);
  const [term, setTerm] = useState(12);
  const [calculation, setCalculation] = useState<LoanCalculationResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const displayedLtv = calculation?.ltvPercentage ?? (value > 0 ? Math.round((loan / value) * 100) : 0);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setIsCalculating(true);
      setCalculationError(null);

      try {
        const response = await fetch("/api/loans/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            propertyValue: value,
            requestedLoanAmount: loan,
            loanDuration: term,
            durationUnit: "MONTHS",
          }),
          signal: controller.signal,
        });
        const payload = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(payload?.code ?? payload?.error ?? "Unable to calculate this loan.");
        }

        setCalculation(payload);
      } catch (error) {
        if (controller.signal.aborted) return;
        setCalculation(null);
        setCalculationError(error instanceof Error ? error.message : "Unable to calculate this loan.");
      } finally {
        if (!controller.signal.aborted) {
          setIsCalculating(false);
        }
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [loan, value, term]);

  return (
    <Reveal className="text-theme-primary">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_.85fr]">
        <div className="grid gap-8">
          <RangeSlider
            label="Loan amount"
            value={loan}
            min={100000}
            max={2000000}
            step={10000}
            onChange={setLoan}
            format={formatCurrency}
          />
          <RangeSlider
            label="Property value"
            value={value}
            min={75000}
            max={4000000}
            step={25000}
            onChange={setValue}
            format={formatCurrency}
          />

          <div className="grid gap-3">
            <span className="text-sm text-white/78 [html.light_&]:text-[#2A2927] font-medium">Term (months)</span>
            <div className="flex flex-wrap gap-2">
              {termOptions.map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setTerm(months)}
                  className={`focus-ring min-h-11 border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                    term === months
                      ? "border-[#112A22] bg-[#112A22] text-white"
                      : "border-[#181818]/30 bg-transparent text-[#181818] hover:border-[#112A22]"
                  }`}
                >
                  {months} mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#181818]/70 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <p className="text-sm text-white/60 [html.light_&]:text-[#555d6b] font-medium">Indicative loan-to-value</p>
          <div className="mt-4">
            <LtvRing ltv={displayedLtv} />
          </div>

          <div className="mt-6 h-1 overflow-hidden bg-[#181818]/15">
            <motion.div
              className="h-full bg-legacy-red"
              animate={{ width: `${Math.min(displayedLtv, 100)}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>

          <dl className="mt-6 grid gap-3 text-sm">
            <div className="flex justify-between border-b border-white/10 [html.light_&]:border-black/10 pb-3">
              <dt className="text-white/55 [html.light_&]:text-[#706D68]">Loan required</dt>
              <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{formatCurrency(loan)}</dd>
            </div>
            <div className="flex justify-between border-b border-white/10 [html.light_&]:border-black/10 pb-3">
              <dt className="text-white/55 [html.light_&]:text-[#706D68]">Property value</dt>
              <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{formatCurrency(value)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/55 [html.light_&]:text-[#706D68]">Proposed term</dt>
              <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{term} months</dd>
            </div>
            <div className="flex justify-between border-t border-white/10 [html.light_&]:border-black/10 pt-3">
              <dt className="text-white/55 [html.light_&]:text-[#706D68]">Interest rate</dt>
              <dd className="font-semibold text-white [html.light_&]:text-[#121316]">
                {calculation?.eligible && calculation.interestRate !== undefined
                  ? `${calculation.interestRate}%`
                  : isCalculating
                    ? "Checking"
                    : "Not available"}
              </dd>
            </div>
            {calculation && (
              <>
                <div className="flex justify-between">
                  <dt className="text-white/55 [html.light_&]:text-[#706D68]">Maximum loan</dt>
                  <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{formatCurrency(calculation.maximumLoanAmount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-white/55 [html.light_&]:text-[#706D68]">Eligibility</dt>
                  <dd className={`font-semibold ${calculation.eligible ? "text-emerald-400 [html.light_&]:text-emerald-600" : "text-legacy-red"}`}>
                    {calculation.eligible ? "Eligible" : "Not eligible"}
                  </dd>
                </div>
                {calculation.eligible && (
                  <>
                    <div className="flex justify-between">
                      <dt className="text-white/55 [html.light_&]:text-[#706D68]">Monthly payment</dt>
                      <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{formatCurrency(calculation.monthlyPayment ?? 0)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/55 [html.light_&]:text-[#706D68]">Total repayment</dt>
                      <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{formatCurrency(calculation.totalRepayment ?? 0)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/55 [html.light_&]:text-[#706D68]">Total interest</dt>
                      <dd className="font-semibold text-white [html.light_&]:text-[#121316]">{formatCurrency(calculation.totalInterest ?? 0)}</dd>
                    </div>
                  </>
                )}
              </>
            )}
          </dl>
          <div className="mt-5 min-h-5 text-xs text-white/50 [html.light_&]:text-[#706D68]">
            {isCalculating && "Calculating with current lending rules..."}
            {!isCalculating && calculationError && (
              <span className="text-legacy-red">
                {calculationError === "NO_APPLICABLE_LTV_RULE" || calculationError === "NO_APPLICABLE_INTEREST_RULE"
                  ? "Calculator rules are not configured yet."
                  : calculationError}
              </span>
            )}
            {!isCalculating && calculation?.reason === "REQUESTED_LOAN_EXCEEDS_MAXIMUM_LTV" && (
              <span className="text-legacy-red">Requested loan exceeds the configured maximum LTV.</span>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
