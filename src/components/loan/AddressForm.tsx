"use client";

import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import type { FieldErrors, FieldPath, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Field } from "@/components/loan/FormFields";
import { lookupPostcodeAddresses, type ResolvedAddressOption } from "@/lib/address-lookup";
import type { Address, LoanApplication } from "@/types/loan";

type AddressErrors = FieldErrors<Address> | FieldErrors<PropertyAssetLike> | undefined;
type PropertyAssetLike = { line1: string; line2: string; line3: string; town: string; county: string; postcode: string; country: string };

interface AddressFormProps {
  base: string;
  register: UseFormRegister<LoanApplication>;
  setValue?: UseFormSetValue<LoanApplication>;
  errors?: AddressErrors;
  title?: string;
  onCopyFromSecurity?: () => void;
  canCopyFromSecurity?: boolean;
}

export function AddressForm({
  base,
  register,
  setValue,
  errors,
  title,
  onCopyFromSecurity,
  canCopyFromSecurity
}: AddressFormProps) {
  const [lookupPostcode, setLookupPostcode] = useState("");
  const [foundAddresses, setFoundAddresses] = useState<ResolvedAddressOption[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const name = (field: string) => `${base}.${field}` as FieldPath<LoanApplication>;
  const message = (field: keyof Address) => errors?.[field]?.message as string | undefined;

  const performLookup = (postcode: string) => {
    const clean = postcode.trim();
    if (!clean || clean.length < 2) {
      setFoundAddresses([]);
      setHasSearched(false);
      return;
    }
    const results = lookupPostcodeAddresses(clean);
    setFoundAddresses(results);
    setHasSearched(true);
    setSelectedId("");
  };

  const handlePostcodeChange = (val: string) => {
    setLookupPostcode(val);
    if (val.trim().length >= 2) {
      performLookup(val);
    } else {
      setFoundAddresses([]);
      setHasSearched(false);
    }
  };

  const handleLookup = () => {
    performLookup(lookupPostcode);
  };

  const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenId = e.target.value;
    setSelectedId(chosenId);
    if (!chosenId) return;
    const item = foundAddresses.find((a) => a.id === chosenId);
    if (item && setValue) {
      setValue(name("line1"), item.address.line1, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue(name("line2"), "", { shouldValidate: true, shouldDirty: true });
      setValue(name("line3"), "", { shouldValidate: true, shouldDirty: true });
      setValue(name("town"), item.address.town, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue(name("county"), item.address.county, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue(name("postcode"), item.address.postcode, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setValue(name("country"), item.address.country, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
      setLookupPostcode(item.address.postcode);
    }
  };

  return (
    <div className="grid gap-5">
      {title ? (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-legacy-border pb-3">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          {canCopyFromSecurity && onCopyFromSecurity ? (
            <button
              type="button"
              onClick={onCopyFromSecurity}
              className="inline-flex items-center gap-1.5 rounded-lg border border-legacy-red/40 bg-legacy-red/10 px-3 py-1.5 text-xs font-semibold text-legacy-red transition hover:bg-legacy-red/20"
            >
              <MapPin size={13} /> Same as Security Address
            </button>
          ) : null}
        </div>
      ) : null}

      {/* Postcode Lookup & Street Address Dropdown Block */}
      <div className="rounded-xl border border-legacy-border bg-black/40 p-4">
        <label className="text-xs font-bold uppercase tracking-wider text-white/70">
          Postcode Address Finder
        </label>
        <div className="mt-2 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={lookupPostcode}
              onChange={(e) => handlePostcodeChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLookup();
                }
              }}
              placeholder="Enter UK postcode (e.g. W1J 6BD)"
              className="focus-ring min-h-11 w-full rounded-lg border border-legacy-border bg-black/50 px-3.5 text-sm text-white placeholder:text-white/30 uppercase"
            />
          </div>
          <button
            type="button"
            onClick={handleLookup}
            className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-legacy-red bg-legacy-red px-5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-legacy-red/80 active:scale-95 shrink-0"
          >
            <Search size={14} /> Find Address
          </button>
        </div>

        {/* Street Address Dropdown: displayed automatically when postcode matches */}
        {foundAddresses.length > 0 && (
          <div className="mt-3.5 grid gap-1.5 animate-in fade-in duration-200">
            <label className="text-xs font-semibold text-legacy-red flex items-center justify-between">
              <span>Select street address ({foundAddresses.length} available):</span>
              <span className="text-[11px] text-white/50 font-normal">Auto-populates fields below</span>
            </label>
            <select
              value={selectedId}
              onChange={handleSelectAddress}
              className="focus-ring min-h-11 rounded-lg border border-legacy-border bg-black/80 px-3 text-sm text-white"
            >
              <option value="">-- Choose street address from dropdown --</option>
              {foundAddresses.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {hasSearched && foundAddresses.length === 0 && lookupPostcode.trim().length >= 2 && (
          <p className="mt-2.5 text-xs text-amber-300">
            No exact street matches found. Please enter your address details below.
          </p>
        )}
      </div>

      {/* Address Form Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Address Line 1" name={name("line1")} register={register} error={message("line1")} placeholder="Building / House Number & Street" />
        <Field label="Address Line 2" name={name("line2")} register={register} required={false} placeholder="Apartment / Suite (optional)" />
        <Field label="Address Line 3" name={name("line3")} register={register} required={false} placeholder="Area (optional)" />
        <Field label="Town / City" name={name("town")} register={register} error={message("town")} placeholder="e.g. London" />
        <Field label="County" name={name("county")} register={register} required={false} placeholder="e.g. Greater London" />
        <Field label="Postcode" name={name("postcode")} register={register} error={message("postcode")} placeholder="e.g. W1J 6BD" />
        <Field label="Country" name={name("country")} register={register} error={message("country")} placeholder="United Kingdom" />
      </div>
    </div>
  );
}
