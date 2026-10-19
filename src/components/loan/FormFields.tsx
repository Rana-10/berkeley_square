"use client";

import type { Control, FieldPath, FieldValues, UseFormRegister } from "react-hook-form";
import { useController } from "react-hook-form";
import type { LoanApplication } from "@/types/loan";
import { cn } from "@/lib/utils";

type Register = UseFormRegister<LoanApplication>;
type Name = FieldPath<LoanApplication>;

export function Field({
  label,
  name,
  register,
  type = "text",
  required = false,
  error,
  placeholder,
  prefix,
  max,
  min,
  maxLabel
}: {
  label: string;
  name: Name;
  register: Register;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  prefix?: string;
  max?: number | string;
  min?: number | string;
  maxLabel?: string;
}) {
  return (
    <label className="grid gap-2 text-sm sm:text-base text-white/90 [html.light_&]:text-[#121316] font-semibold">
      <span className="flex items-center justify-between">
        <span>
          {label}
          {required ? <span className="text-legacy-red"> *</span> : null}
        </span>
        {maxLabel ? (
          <span className="text-xs font-mono text-white/50 [html.light_&]:text-[#706D68]">
            Max: {maxLabel}
          </span>
        ) : null}
      </span>
      <div className="relative flex items-center">
        {prefix ? (
          <span className="pointer-events-none absolute left-3.5 text-sm font-semibold text-white/50 [html.light_&]:text-[#706D68]">
            {prefix}
          </span>
        ) : null}
        <input
          {...register(name)}
          type={type}
          max={max}
          min={min}
          placeholder={placeholder}
          className={cn(
            "focus-ring min-h-12 w-full rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 text-base text-[#181818] transition-colors duration-200 placeholder:text-[#9E9B94] focus:border-legacy-red",
            prefix && "pl-6"
          )}
          aria-invalid={Boolean(error)}
        />
      </div>
      {error ? <span className="text-sm font-normal text-red-400">{error}</span> : null}
    </label>
  );
}

export function CurrencyField({
  label,
  name,
  register,
  required = false,
  error,
  placeholder = "e.g. 500,000",
  maxLabel
}: {
  label: string;
  name: Name;
  register: Register;
  required?: boolean;
  error?: string;
  placeholder?: string;
  maxLabel?: string;
}) {
  return (
    <label className="grid gap-2 text-sm sm:text-base text-white/90 [html.light_&]:text-[#121316] font-semibold">
      <span className="flex items-center justify-between">
        <span>
          {label}
          {required ? <span className="text-legacy-red"> *</span> : null}
        </span>
        {maxLabel ? (
          <span className="text-xs font-mono text-white/50 [html.light_&]:text-[#706D68]">
            Max: {maxLabel}
          </span>
        ) : null}
      </span>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 flex h-7 w-7 items-center justify-center font-mono text-sm font-bold text-legacy-red">
          £
        </span>
        <input
          {...register(name)}
          type="text"
          placeholder={placeholder}
          className="focus-ring min-h-12 w-full rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 text-base text-[#181818] transition-colors duration-200 placeholder:text-[#9E9B94] focus:border-legacy-red"
          aria-invalid={Boolean(error)}
        />
      </div>
      {error ? <span className="text-sm font-normal text-red-400">{error}</span> : null}
    </label>
  );
}

export function TextArea({
  label,
  name,
  register,
  required = false,
  error,
  placeholder
}: {
  label: string;
  name: Name;
  register: Register;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm sm:text-base text-white/90 [html.light_&]:text-[#121316] font-semibold">
      <span>
        {label}
        {required ? <span className="text-legacy-red"> *</span> : null}
      </span>
      <textarea
        {...register(name)}
        rows={4}
        placeholder={placeholder}
        className="focus-ring min-h-28 rounded-none border border-white/15 bg-black/40 px-4 py-3 text-base text-white transition-colors duration-200 placeholder:text-white/40 [html.light_&]:bg-[#FAF7F1] [html.light_&]:border-[#DDD7CA] [html.light_&]:text-[#121316] [html.light_&]:placeholder:text-[#9E9B94]"
        aria-invalid={Boolean(error)}
      />
      {error ? <span className="text-sm font-normal text-red-400">{error}</span> : null}
    </label>
  );
}

export function SelectField({
  label,
  name,
  register,
  options,
  error,
  required = false
}: {
  label: string;
  name: Name;
  register: Register;
  options: string[] | { label: string; value: string }[];
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm sm:text-base text-white/90 [html.light_&]:text-[#121316] font-semibold">
      <span>
        {label}
        {required ? <span className="text-legacy-red"> *</span> : null}
      </span>
      <select
        {...register(name)}
        className="focus-ring min-h-12 rounded-none border border-white/15 bg-black/80 px-4 text-base text-white transition-colors duration-200 [html.light_&]:bg-[#FAF7F1] [html.light_&]:border-[#DDD7CA] [html.light_&]:text-[#121316]"
        aria-invalid={Boolean(error)}
      >
        <option value="">Select option</option>
        {options.map((option) => {
          const optValue = typeof option === "string" ? option : option.value;
          const optLabel = typeof option === "string" ? option : option.label;
          return (
            <option key={optValue} value={optValue} className="bg-[#FAF7F1] text-black dark:bg-[#121316] dark:text-white">
              {optLabel}
            </option>
          );
        })}
      </select>
      {error ? <span className="text-sm font-normal text-red-400">{error}</span> : null}
    </label>
  );
}

export function YesNoField<TFieldValues extends FieldValues = LoanApplication>({
  label,
  name,
  control,
  register,
  setValue,
  value: manualValue,
  error,
  required = false
}: {
  label: string;
  name: any;
  control?: Control<TFieldValues>;
  register?: Register;
  setValue?: (name: any, value: any, options?: any) => void;
  value?: string;
  error?: string;
  required?: boolean;
}) {
  if (control) {
    return (
      <ControlledYesNoField
        label={label}
        name={name}
        control={control}
        setValue={setValue}
        error={error}
        required={required}
      />
    );
  }

  return (
    <YesNoFieldView
      label={label}
      currentValue={manualValue}
      onSelect={(val) => setValue?.(name, val, { shouldValidate: true, shouldDirty: true, shouldTouch: true })}
      error={error}
      required={required}
    />
  );
}

function ControlledYesNoField<TFieldValues extends FieldValues = LoanApplication>({
  label,
  name,
  control,
  setValue,
  error,
  required
}: {
  label: string;
  name: any;
  control: Control<TFieldValues>;
  setValue?: (name: any, value: any, options?: any) => void;
  error?: string;
  required: boolean;
}) {
  const { field } = useController({
    name,
    control
  });

  return (
    <YesNoFieldView
      label={label}
      currentValue={field.value}
      onSelect={(val) => {
        field.onChange(val);
        setValue?.(name, val, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      }}
      error={error}
      required={required}
    />
  );
}

function YesNoFieldView({
  label,
  currentValue,
  onSelect,
  error,
  required
}: {
  label: string;
  currentValue?: string;
  onSelect: (value: "yes" | "no") => void;
  error?: string;
  required: boolean;
}) {

  return (
    <fieldset className="grid gap-2.5">
      <legend className="text-sm text-white/78 [html.light_&]:text-[#2A2927] font-medium">
        {label}
        {required ? <span className="text-legacy-red"> *</span> : null}
      </legend>
      <div className="flex gap-2.5" role="radiogroup" aria-label={label}>
        {(["yes", "no"] as const).map((val) => {
          const isSelected = currentValue === val;
          return (
            <button
              key={val}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(val)}
              className={cn(
                "group relative flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2.5 rounded-none border px-4 text-sm font-semibold capitalize transition-all duration-200 select-none",
                isSelected
                  ? "border-legacy-red bg-legacy-red text-white"
                  : "border-legacy-border bg-black/40 text-white/70 hover:border-white/20 hover:bg-white/[0.04] hover:text-white [html.light_&]:bg-[#F6F2EA] [html.light_&]:border-[#DDD7CA] [html.light_&]:text-[#2A2927] [html.light_&]:hover:bg-black/[0.04]",
                "focus:outline-none focus:ring-2 focus:ring-legacy-red"
              )}
            >
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded-full border border-white/30 transition-all duration-200 [html.light_&]:border-black/30",
                  isSelected ? "border-white bg-[#FAF7F1]" : "group-hover:border-white/60"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-legacy-red transition-opacity duration-200",
                    isSelected ? "opacity-100" : "opacity-0"
                  )}
                />
              </span>
              <span>{val === "yes" ? "Yes" : "No"}</span>
            </button>
          );
        })}
      </div>
      {error ? <span className="text-sm text-red-400">{error}</span> : null}
    </fieldset>
  );
}

export function CheckboxGroup({
  label,
  name,
  register,
  options,
  error
}: {
  label: string;
  name: Name;
  register: Register;
  options: string[];
  error?: string;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="text-sm text-white/78 [html.light_&]:text-[#2A2927] font-medium">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "flex min-h-12 cursor-pointer items-center gap-3 rounded-none border border-legacy-border bg-black/34 px-4 text-sm text-white/76 transition-all duration-200 [html.light_&]:bg-[#FAF7F1] [html.light_&]:border-[#DDD7CA] [html.light_&]:text-[#2A2927]",
              "hover:border-white/20 hover:text-white [html.light_&]:hover:border-slate-400",
              "has-[:checked]:border-legacy-red/60 has-[:checked]:bg-legacy-red/10 has-[:checked]:text-white [html.light_&]:has-[:checked]:text-[#121316]"
            )}
          >
            <input
              {...register(name)}
              type="checkbox"
              value={option}
              className="h-4 w-4 accent-legacy-red"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {error ? <span className="text-sm text-red-400">{error}</span> : null}
    </fieldset>
  );
}
