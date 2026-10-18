"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Edit3, FileText, Home, LockKeyhole, User } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { defaultApplication } from "@/components/loan/defaults";
import { CurrencyField, Field, SelectField, TextArea } from "@/components/loan/FormFields";
import { Button } from "@/components/ui/Button";
import { loanApplicationService, type SubmissionResult } from "@/lib/loan-application-service";
import { cn } from "@/lib/utils";
import { loanApplicationSchema } from "@/lib/validation";
import type { LoanApplication } from "@/types/loan";

const steps = ["Personal information", "Security information", "Review & submit"] as const;

const stepMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
};

export function LoanWizard() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  const form = useForm<LoanApplication>({
    resolver: zodResolver(loanApplicationSchema),
    mode: "onBlur",
    defaultValues: defaultApplication
  });
  const { register, control, handleSubmit, setValue, formState: { errors } } = form;

  const watchedValues = useWatch({ control });
  const transactionType = watchedValues?.securityInformation?.transactionType;
  const confirmation = watchedValues?.declaration?.confirmation;
  const personalInfo = watchedValues?.personalInformation;
  const securityInfo = watchedValues?.securityInformation;

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function next() {
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function onSubmit(data: LoanApplication) {
    if (step < steps.length - 1) {
      next();
      return;
    }

    setSubmitting(true);
    try {
      const response = await loanApplicationService.submitApplication(data);
      setResult(response);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl border-y border-[#181818]/70 py-12"
      >
        <CheckCircle2 className="h-10 w-10 text-legacy-red" />
        <h1 className="mt-5 text-3xl font-semibold">Application Submitted</h1>
        <p className="mt-3 text-legacy-muted">Thank you. Your application has been successfully received.</p>
        <p className="mt-5 border border-legacy-border bg-black/30 p-3 text-sm text-white/70">Reference: {result.reference}</p>
      </motion.div>
    );
  }

  const applicantFullName = [personalInfo?.firstName, personalInfo?.lastName].filter(Boolean).join(" ");
  const formattedAddress = [
    securityInfo?.address?.line1,
    securityInfo?.address?.town,
    securityInfo?.address?.postcode,
    securityInfo?.address?.country
  ].filter(Boolean).join(", ");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && step < steps.length - 1) {
          e.preventDefault();
          next();
        }
      }}
      className="mx-auto grid max-w-4xl gap-6"
    >
      <div className="border-t border-[#181818]/70 pt-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center text-legacy-red">
              {step === 0 ? <User size={24} /> : step === 1 ? <Home size={24} /> : <FileText size={24} />}
            </div>
            <div>
              <p className="eyebrow">Loan application · Step {step + 1} of {steps.length}</p>
              <h1 className="display mt-2 text-3xl text-white [html.light_&]:text-[#121316] font-bold">{steps[step]}</h1>
            </div>
          </div>
          <p className="text-sm text-legacy-muted [html.light_&]:text-[#555d6b]">About 2-3 minutes</p>
        </div>

        <div className="mt-5 h-0.5 overflow-hidden bg-[#181818]/15">
          <motion.div
            className="h-0.5 bg-legacy-red"
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </div>
        <p className="mt-4 flex items-center gap-2 text-xs text-white/52 [html.light_&]:text-[#706D68]">
          <LockKeyhole size={14} className="text-legacy-red" /> Only essential details are requested at this stage.
        </p>
      </div>

      <section className="py-2">
        <AnimatePresence mode="wait">
          <motion.div key={step} {...stepMotion}>
            {step === 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="First name"
                  name="personalInformation.firstName"
                  register={register}
                  required={false}
                  error={errors.personalInformation?.firstName?.message}
                />
                <Field
                  label="Last name"
                  name="personalInformation.lastName"
                  register={register}
                  required={false}
                  error={errors.personalInformation?.lastName?.message}
                />
                <Field
                  label="Email address"
                  name="personalInformation.email"
                  register={register}
                  required={false}
                  type="email"
                  error={errors.personalInformation?.email?.message}
                  placeholder="name@example.com"
                />
                <Field
                  label="Phone number"
                  name="personalInformation.phone"
                  register={register}
                  required={false}
                  error={errors.personalInformation?.phone?.message}
                  placeholder="+44 7..."
                />
                <p className="md:col-span-2 text-xs text-legacy-muted">
                  Please provide at least an email address or phone number so we can respond.
                </p>
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-5">
                <div className="grid gap-3 border-t border-[#181818]/25 py-4">
                  <span className="text-sm text-white/78 [html.light_&]:text-[#2A2927] font-medium">Is this connected to a purchase or refinance?</span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(["Purchase", "Refinance"] as const).map((option) => {
                      const isSelected = transactionType === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setValue("securityInformation.transactionType", option, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                          className={cn(
                            "rounded-none border px-4 py-3 text-left text-sm font-semibold transition",
                            isSelected
                              ? "border-legacy-red bg-legacy-red text-white"
                              : "border-legacy-border bg-black/50 text-white/70 hover:border-white/20 hover:text-white [html.light_&]:bg-white [html.light_&]:border-[#C6D3C0] [html.light_&]:text-[#2A2927] [html.light_&]:hover:bg-black/[0.04]"
                          )}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {errors.securityInformation?.transactionType?.message ? (
                    <span className="text-sm text-red-400">{errors.securityInformation.transactionType.message}</span>
                  ) : null}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Property address"
                    name="securityInformation.address.line1"
                    register={register}
                    required={false}
                    error={errors.securityInformation?.address?.line1?.message}
                    placeholder="Address line 1"
                  />
                  <Field
                    label="Town / city"
                    name="securityInformation.address.town"
                    register={register}
                    required={false}
                    error={errors.securityInformation?.address?.town?.message}
                  />
                  <Field
                    label="Postcode"
                    name="securityInformation.address.postcode"
                    register={register}
                    required={false}
                    error={errors.securityInformation?.address?.postcode?.message}
                  />
                  <Field
                    label="Country"
                    name="securityInformation.address.country"
                    register={register}
                    required={false}
                    error={errors.securityInformation?.address?.country?.message}
                  />
                  <Field
                    label="Address line 2"
                    name="securityInformation.address.line2"
                    register={register}
                    required={false}
                  />
                  <Field
                    label="County / state"
                    name="securityInformation.address.county"
                    register={register}
                    required={false}
                  />
                  <CurrencyField
                    label="Estimated property value"
                    name="securityInformation.estimatedValue"
                    register={register}
                    required={false}
                    error={errors.securityInformation?.estimatedValue?.message}
                    maxLabel="£500,000,000"
                  />
                  <CurrencyField
                    label="Loan amount required"
                    name="securityInformation.loanAmountRequired"
                    register={register}
                    required={false}
                    error={errors.securityInformation?.loanAmountRequired?.message}
                    maxLabel="£100,000,000"
                  />
                  <SelectField
                    label="Property use"
                    name="securityInformation.propertyUse"
                    register={register}
                    required={false}
                    options={["Residential", "Buy-to-let", "Commercial", "Mixed-use", "Development"]}
                    error={errors.securityInformation?.propertyUse?.message}
                  />
                  <SelectField
                    label="Repayment method"
                    name="securityInformation.repaymentMethod"
                    register={register}
                    required={false}
                    options={["Retain", "Service", "Other"]}
                    error={errors.securityInformation?.repaymentMethod?.message}
                  />
                  {transactionType === "Purchase" ? (
                    <CurrencyField
                      label="Purchase price"
                      name="securityInformation.purchasePrice"
                      register={register}
                      required={false}
                      error={errors.securityInformation?.purchasePrice?.message}
                      maxLabel="£500,000,000"
                    />
                  ) : (
                    <CurrencyField
                      label="Current mortgage balance"
                      name="securityInformation.currentMortgageBalance"
                      register={register}
                      required={false}
                      error={errors.securityInformation?.currentMortgageBalance?.message}
                      maxLabel="£500,000,000"
                    />
                  )}
                  <div className="md:col-span-2">
                    <TextArea
                      label="Notes"
                      name="securityInformation.notes"
                      register={register}
                      required={false}
                      placeholder="Anything important about the property, timing, or transaction."
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6">
                <div className="text-sm leading-6 text-legacy-muted [html.light_&]:text-[#555d6b] border-t border-[#181818]/25 py-4">
                  Please review your application summary below. Click &quot;Submit Application&quot; when ready, or use &quot;Edit&quot; to update any details.
                </div>

                {/* Structured Review Panels */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Personal Information Review Card */}
                  <div className="border-t border-[#181818]/25 py-4">
                    <div className="flex items-center justify-between border-b border-white/10 [html.light_&]:border-black/10 pb-3 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white [html.light_&]:text-[#121316]">
                        <User size={14} className="text-legacy-red" />
                        <span>Personal Details</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-legacy-red hover:underline"
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                    </div>
                    <dl className="space-y-2 text-xs">
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Applicant Name</dt>
                        <dd className="font-semibold text-white [html.light_&]:text-[#121316] mt-0.5">{applicantFullName || "Not provided"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Email Address</dt>
                        <dd className="font-mono text-white [html.light_&]:text-[#121316] mt-0.5">{personalInfo?.email || "Not provided"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Phone Number</dt>
                        <dd className="font-mono text-white [html.light_&]:text-[#121316] mt-0.5">{personalInfo?.phone || "Not provided"}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Security & Finance Review Card */}
                  <div className="border-t border-[#181818]/25 py-4">
                    <div className="flex items-center justify-between border-b border-white/10 [html.light_&]:border-black/10 pb-3 mb-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white [html.light_&]:text-[#121316]">
                        <Home size={14} className="text-legacy-red" />
                        <span>Security & Finance</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-legacy-red hover:underline"
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                    </div>
                    <dl className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Transaction Type</dt>
                        <dd className="font-semibold text-white [html.light_&]:text-[#121316] mt-0.5">{transactionType || "Not specified"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Property Use</dt>
                        <dd className="font-semibold text-white [html.light_&]:text-[#121316] mt-0.5">{securityInfo?.propertyUse || "Not specified"}</dd>
                      </div>
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Estimated Value</dt>
                        <dd className="font-mono font-bold text-white [html.light_&]:text-[#121316] mt-0.5">
                          {securityInfo?.estimatedValue ? `£${securityInfo.estimatedValue}` : "Not specified"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Loan Required</dt>
                        <dd className="font-mono font-bold text-legacy-red mt-0.5">
                          {securityInfo?.loanAmountRequired ? `£${securityInfo.loanAmountRequired}` : "Not specified"}
                        </dd>
                      </div>
                      {securityInfo?.repaymentMethod && (
                        <div>
                          <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Repayment Method</dt>
                          <dd className="font-semibold text-white [html.light_&]:text-[#121316] mt-0.5">{securityInfo.repaymentMethod}</dd>
                        </div>
                      )}
                      {formattedAddress && (
                        <div className="col-span-2">
                          <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Property Address</dt>
                          <dd className="text-slate-200 [html.light_&]:text-[#2A2927] mt-0.5">{formattedAddress}</dd>
                        </div>
                      )}
                      {securityInfo?.notes && (
                        <div className="col-span-2">
                          <dt className="text-slate-400 [html.light_&]:text-[#706D68]">Notes</dt>
                          <dd className="text-slate-300 [html.light_&]:text-[#555d6b] mt-0.5 italic">{securityInfo.notes}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>

                {/* Declaration Fields */}
                <div className="space-y-4 pt-2">
                  <Field
                    label="Submitted by"
                    name="declaration.submittedBy"
                    register={register}
                    required={false}
                    error={errors.declaration?.submittedBy?.message}
                    placeholder="Your full name"
                  />
                  <label className="flex items-start gap-3 text-sm text-white/78 [html.light_&]:text-[#2A2927] cursor-pointer transition-colors border-t border-[#181818]/25 py-4">
                    <input
                      type="checkbox"
                      checked={Boolean(confirmation)}
                      onChange={(event) => setValue("declaration.confirmation", event.target.checked, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
                      className="mt-1 h-4 w-4 accent-legacy-red"
                    />
                    <span>I confirm the information provided is accurate to the best of my knowledge.</span>
                  </label>
                  {errors.declaration?.confirmation?.message ? (
                    <span className="text-sm text-red-400">{errors.declaration.confirmation.message}</span>
                  ) : null}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="flex flex-col justify-between gap-3 border-t border-legacy-border [html.light_&]:border-[#C6D3C0] pt-6 sm:flex-row">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(current - 1, 0))}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black bg-black px-6 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-200 hover:bg-neutral-900 active:scale-[0.98] [html.light_&]:bg-[#121316] [html.light_&]:text-white [html.light_&]:border-[#121316] [html.light_&]:hover:bg-neutral-800"
          >
            <ArrowLeft size={18} /> Back
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
        {step < steps.length - 1 ? (
          <Button type="button" onClick={next}>
            Continue <ArrowRight size={18} />
          </Button>
        ) : (
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Application"}
          </Button>
        )}
      </div>
    </form>
  );
}
