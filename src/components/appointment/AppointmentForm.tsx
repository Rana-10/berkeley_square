"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldPath } from "react-hook-form";
import { useState } from "react";
import { CalendarCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { appointmentService, type Appointment, type AppointmentResult } from "@/lib/appointment-service";
import { appointmentSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

const serviceOptions = [
  "Finance",
  "Property",
  "Construction",
  "General consultation"
];

type Name = FieldPath<Appointment>;

function Field({ label, name, register, type = "text", error }: { label: string; name: Name; register: ReturnType<typeof useForm<Appointment>>["register"]; type?: string; error?: string }) {
  return (
    <label className="grid gap-2 text-sm sm:text-base font-semibold text-white/90 [html.light_&]:text-[#121316]">
      <span>{label}<span className="text-legacy-red"> *</span></span>
      <input
        {...register(name)}
        type={type}
        className="focus-ring min-h-12 rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 text-base text-[#181818] placeholder:text-[#9E9B94] transition-colors focus:border-legacy-red"
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="text-sm font-normal text-red-400">{error}</span> : null}
    </label>
  );
}

export function AppointmentForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AppointmentResult | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Appointment>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", email: "", phone: "", service: "" }
  });

  async function onSubmit(values: Appointment) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await appointmentService.submitAppointment(values);
      setResult(res);
      reset();
    } catch (submitError) {
      setError(
        submitError instanceof DOMException && submitError.name === "AbortError"
          ? "The appointment request timed out. Please check that the database is running and try again."
          : "We could not send your appointment request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="border-y border-[#181818]/70 py-10">
        <CheckCircle2 size={32} className="text-legacy-red" />
        <h2 className="display mt-4 text-2xl text-white [html.light_&]:text-[#121316] font-bold">Request received</h2>
        <p className="mt-3 text-base leading-6 text-white/70 [html.light_&]:text-[#555d6b]">
          Thank you — we have received your appointment request
          <span className="mx-1 font-mono text-white [html.light_&]:text-[#121316] font-bold">{result.reference}</span>
          and will be in touch shortly to confirm a time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8 border-t border-[#181818]/70 pt-8">
      <Field label="Full name" name="name" register={register} error={errors.name?.message} />
      <Field label="Email" name="email" type="email" register={register} error={errors.email?.message} />
      <Field label="Phone number" name="phone" type="tel" register={register} error={errors.phone?.message} />

      <label className="grid gap-2 text-sm sm:text-base font-semibold text-white/90 [html.light_&]:text-[#121316]">
        <span>Service<span className="text-legacy-red"> *</span></span>
        <select
          {...register("service")}
          className={cn(
            "focus-ring min-h-12 rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 text-base text-[#181818] placeholder:text-[#9E9B94] transition-colors focus:border-legacy-red",
            !errors.service ? "" : "border-red-400"
          )}
        >
          <option value="">Select a service</option>
          {serviceOptions.map((option) => (
            <option key={option} value={option} className="bg-white text-black dark:bg-[#121316] dark:text-white">
              {option}
            </option>
          ))}
        </select>
        {errors.service ? <span className="text-sm font-normal text-red-400">{errors.service.message}</span> : null}
      </label>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <Button type="submit" disabled={submitting} className="w-full justify-center py-4">
        {submitting ? "Sending…" : "Book Appointment"} <CalendarCheck size={18} />
      </Button>
    </form>
  );
}
