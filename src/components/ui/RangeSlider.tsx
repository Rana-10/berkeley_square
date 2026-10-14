"use client";

import { cn } from "@/lib/utils";

type RangeSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  className?: string;
};

export function RangeSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format = (v) => String(v),
  className
}: RangeSliderProps) {
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="flex items-end justify-between gap-3">
        <span className="text-sm text-white/78 [html.light_&]:text-[#2A2927] font-medium">{label}</span>
        <span className="display text-2xl text-white [html.light_&]:text-[#121316] font-bold">{format(value)}</span>
      </div>
      <div className="relative pt-1">
        <div className="range-track">
          <div className="range-fill" style={{ width: `${percent}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-input focus-ring"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
      <div className="flex justify-between text-[11px] uppercase tracking-[0.14em] text-white/35 [html.light_&]:text-[#706D68]">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
