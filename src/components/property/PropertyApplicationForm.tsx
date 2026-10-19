"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { lookupPostcodeAddresses, type ResolvedAddressOption } from "@/lib/address-lookup";

type FormState = "idle" | "submitting" | "success" | "error";

export function PropertyApplicationForm({ propertyId }: { propertyId: number }) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState<ResolvedAddressOption[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");

  const handlePostcodeChange = (val: string) => {
    setPostcode(val);
    if (val.trim().length >= 2) {
      setAddresses(lookupPostcodeAddresses(val.trim()));
    } else {
      setAddresses([]);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    const form = event.currentTarget;
    let response: Response;
    try {
      response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: propertyId,
          guest_first_name: formData.get("guest_first_name"),
          guest_last_name: formData.get("guest_last_name"),
          guest_email: formData.get("guest_email"),
          guest_phone_number: formData.get("guest_phone_number"),
          guest_current_address: formData.get("guest_current_address"),
          message_from_applicant: formData.get("message_from_applicant"),
        }),
      });
    } catch {
      setFormState("error");
      setMessage("We could not reach the server. Please check your connection and try again.");
      return;
    }

    const body = (await response.json().catch(() => null)) as { error?: string } | null;

    if (!response.ok) {
      setFormState("error");
      setMessage(body?.error ?? "Unable to submit your application. Please try again, or contact us directly.");
      return;
    }

    form.reset();
    setPostcode("");
    setAddresses([]);
    setSelectedAddressId("");
    setCurrentAddress("");
    setFormState("success");
    setMessage("Application received. A member of the team will review it shortly.");
  }

  return (
    <form id="apply" onSubmit={handleSubmit} className="scroll-mt-40 border-t border-[#181818]/70 pt-6">
      <div className="mb-5">
        <p className="eyebrow">Online Application</p>
        <h2 className="display mt-2 text-3xl font-semibold text-[#181818]">Apply for this property</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Input name="guest_first_name" placeholder="First name" required />
        <Input name="guest_last_name" placeholder="Last name" required />
        <Input name="guest_email" placeholder="Email" required type="email" />
        <Input name="guest_phone_number" placeholder="Phone number" required />
      </div>

      <div className="mt-3 border-y border-[#181818]/15 py-3.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-white/70 [html.light_&]:text-[#2A2927]">
          Postcode Address Finder (Optional)
        </label>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            value={postcode}
            onChange={(e) => handlePostcodeChange(e.target.value)}
            placeholder="Enter postcode (e.g. W1J 6BD)"
            className="focus-ring flex-1 rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 py-2.5 text-sm text-[#181818] placeholder:text-[#9E9B94] uppercase focus:border-legacy-red"
          />
        </div>
        {addresses.length > 0 && (
          <div className="mt-2.5 grid gap-1 animate-in fade-in duration-200">
            <label className="text-xs font-semibold text-legacy-red">
              Select street address:
            </label>
            <select
              value={selectedAddressId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedAddressId(id);
                const found = addresses.find((a) => a.id === id);
                if (found) {
                  setCurrentAddress(`${found.address.line1}, ${found.address.town}, ${found.address.postcode}`);
                }
              }}
              className="focus-ring rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 py-2.5 text-sm text-[#181818]"
            >
              <option value="">-- Select street address from list --</option>
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <Textarea
        name="guest_current_address"
        value={currentAddress}
        onChange={(e) => setCurrentAddress(e.target.value)}
        placeholder="Current address"
        required
      />
      <Textarea name="message_from_applicant" placeholder="Message to landlord/admin" />

      {message && (
        <p className={formState === "error" ? "mt-4 text-sm text-legacy-red" : "mt-4 text-sm text-[#2F5D46]"}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="mt-6 inline-flex items-center gap-2 border border-[#112A22] bg-[#112A22] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-legacy-red hover:bg-legacy-red disabled:opacity-60"
      >
        <Send size={15} />
        {formState === "submitting" ? "Submitting" : "Submit application"}
      </button>
    </form>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="focus-ring rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 py-3 text-sm text-[#181818] placeholder:text-[#9E9B94] focus:border-legacy-red"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      rows={4}
      className="focus-ring mt-3 w-full rounded-none border-0 border-b border-[#181818]/50 bg-transparent px-0 py-3 text-sm text-[#181818] placeholder:text-[#9E9B94] focus:border-legacy-red"
    />
  );
}
