"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Edit3, LoaderCircle, Percent, RotateCcw, Save, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type RuleStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
type DurationUnit = "MONTHS" | "YEARS";
type InterestType = "REDUCING_BALANCE" | "FLAT_RATE";

type LtvRule = {
  id: number;
  minimumPropertyValue: number;
  maximumPropertyValue: number | null;
  ltvPercentage: number;
  status: RuleStatus;
};

type InterestRule = {
  id: number;
  minimumLoanAmount: number;
  maximumLoanAmount: number | null;
  interestRate: number;
  interestType: InterestType;
  minimumDuration: number;
  maximumDuration: number | null;
  durationUnit: DurationUnit;
  status: RuleStatus;
};

type Tab = "ltv" | "interest";

const emptyLtvForm = {
  minimumPropertyValue: "0",
  maximumPropertyValue: "",
  ltvPercentage: "70",
  status: "ACTIVE" as RuleStatus,
};

const emptyInterestForm = {
  minimumLoanAmount: "50000",
  maximumLoanAmount: "",
  interestRate: "10",
  interestType: "REDUCING_BALANCE" as InterestType,
  minimumDuration: "1",
  maximumDuration: "",
  durationUnit: "MONTHS" as DurationUnit,
  status: "ACTIVE" as RuleStatus,
};

const formatCurrency = (value: number | null) =>
  value === null
    ? "No cap"
    : new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(value);

function statusClass(status: RuleStatus) {
  switch (status) {
    case "ACTIVE":
      return "border-emerald-300 bg-emerald-50 text-emerald-700";
    case "INACTIVE":
      return "border-amber-300 bg-amber-50 text-amber-700";
    default:
      return "border-theme-border bg-theme-subtle text-theme-muted";
  }
}

function numericOrNull(value: string) {
  return value.trim() === "" ? null : Number(value);
}

export function LoanRulesManager() {
  const [activeTab, setActiveTab] = useState<Tab>("ltv");
  const [ltvRules, setLtvRules] = useState<LtvRule[]>([]);
  const [interestRules, setInterestRules] = useState<InterestRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingLtvId, setEditingLtvId] = useState<number | null>(null);
  const [editingInterestId, setEditingInterestId] = useState<number | null>(null);
  const [ltvForm, setLtvForm] = useState(emptyLtvForm);
  const [interestForm, setInterestForm] = useState(emptyInterestForm);
  const [isSavingLtv, setIsSavingLtv] = useState(false);
  const [isSavingInterest, setIsSavingInterest] = useState(false);

  async function fetchRules() {
    setIsLoading(true);
    setError("");
    try {
      const [ltvResponse, interestResponse] = await Promise.all([
        fetch("/api/admin/loan-ltv-rules"),
        fetch("/api/admin/loan-interest-rules"),
      ]);

      if (!ltvResponse.ok || !interestResponse.ok) {
        throw new Error("Unable to load loan rules.");
      }

      setLtvRules(await ltvResponse.json());
      setInterestRules(await interestResponse.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load loan rules.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchRules();
  }, []);

  function flash(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3500);
  }

  function showError(text: string) {
    setError(text);
    window.setTimeout(() => setError(""), 5000);
  }

  function editLtv(rule: LtvRule) {
    setEditingLtvId(rule.id);
    setLtvForm({
      minimumPropertyValue: String(rule.minimumPropertyValue),
      maximumPropertyValue: rule.maximumPropertyValue === null ? "" : String(rule.maximumPropertyValue),
      ltvPercentage: String(rule.ltvPercentage),
      status: rule.status,
    });
  }

  function editInterest(rule: InterestRule) {
    setEditingInterestId(rule.id);
    setInterestForm({
      minimumLoanAmount: String(rule.minimumLoanAmount),
      maximumLoanAmount: rule.maximumLoanAmount === null ? "" : String(rule.maximumLoanAmount),
      interestRate: String(rule.interestRate),
      interestType: rule.interestType,
      minimumDuration: String(rule.minimumDuration),
      maximumDuration: rule.maximumDuration === null ? "" : String(rule.maximumDuration),
      durationUnit: rule.durationUnit,
      status: rule.status,
    });
  }

  async function saveLtvRule(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      minimumPropertyValue: Number(ltvForm.minimumPropertyValue),
      maximumPropertyValue: numericOrNull(ltvForm.maximumPropertyValue),
      ltvPercentage: Number(ltvForm.ltvPercentage),
      status: ltvForm.status,
    };
    const endpoint = editingLtvId ? `/api/admin/loan-ltv-rules/${editingLtvId}` : "/api/admin/loan-ltv-rules";
    const method = editingLtvId ? "PATCH" : "POST";

    setIsSavingLtv(true);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.code ?? data?.error ?? "Unable to save LTV rule.");
      setLtvForm(emptyLtvForm);
      setEditingLtvId(null);
      await fetchRules();
      flash(editingLtvId ? "LTV rule updated." : "LTV rule created.");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Unable to save LTV rule.");
    } finally {
      setIsSavingLtv(false);
    }
  }

  async function saveInterestRule(event: React.FormEvent) {
    event.preventDefault();
    const payload = {
      minimumLoanAmount: Number(interestForm.minimumLoanAmount),
      maximumLoanAmount: numericOrNull(interestForm.maximumLoanAmount),
      interestRate: Number(interestForm.interestRate),
      interestType: interestForm.interestType,
      minimumDuration: Number(interestForm.minimumDuration),
      maximumDuration: numericOrNull(interestForm.maximumDuration),
      durationUnit: interestForm.durationUnit,
      status: interestForm.status,
    };
    const endpoint = editingInterestId ? `/api/admin/loan-interest-rules/${editingInterestId}` : "/api/admin/loan-interest-rules";
    const method = editingInterestId ? "PATCH" : "POST";

    setIsSavingInterest(true);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.code ?? data?.error ?? "Unable to save interest rule.");
      setInterestForm(emptyInterestForm);
      setEditingInterestId(null);
      await fetchRules();
      flash(editingInterestId ? "Interest rule updated." : "Interest rule created.");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Unable to save interest rule.");
    } finally {
      setIsSavingInterest(false);
    }
  }

  async function archiveRule(kind: Tab, id: number) {
    const endpoint = kind === "ltv" ? `/api/admin/loan-ltv-rules/${id}` : `/api/admin/loan-interest-rules/${id}`;
    try {
      const response = await fetch(endpoint, { method: "DELETE" });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw new Error(data?.code ?? data?.error ?? "Unable to archive rule.");
      if (kind === "ltv") {
        setLtvRules((rules) => rules.filter((rule) => rule.id !== id));
      } else {
        setInterestRules((rules) => rules.filter((rule) => rule.id !== id));
      }
      await fetchRules();
      flash("Rule deleted.");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Unable to archive rule.");
    }
  }

  const activeCounts = useMemo(() => ({
    ltv: ltvRules.filter((rule) => rule.status === "ACTIVE").length,
    interest: interestRules.filter((rule) => rule.status === "ACTIVE").length,
  }), [ltvRules, interestRules]);

  return (
    <div className="space-y-6 select-none">
      <div className="flex flex-col gap-4 border-b border-theme-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">Loan Policy Controls</span>
          <h2 className="display mt-1 text-2xl font-bold text-theme-primary">Calculator Rules Manager</h2>
          <p className="mt-1 text-xs text-theme-muted">
            Configure LTV bands and duration-based interest rules used by the public finance calculator.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchRules}
          className="inline-flex items-center gap-2 rounded-2xl border border-theme-border bg-theme-subtle px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-theme-primary transition-all hover:border-legacy-red hover:bg-theme-border"
        >
          <RotateCcw size={14} className="text-legacy-red" />
          <span>Refresh Rules</span>
        </button>
      </div>

      {message && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 p-3 text-xs font-mono text-emerald-700">
          <CheckCircle2 size={15} />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-3 text-xs font-mono text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-2 rounded-2xl border border-theme-border bg-theme-surface p-2">
        {[
          { id: "ltv" as Tab, label: "LTV Rules", count: activeCounts.ltv },
          { id: "interest" as Tab, label: "Interest Rules", count: activeCounts.interest },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all",
              activeTab === tab.id
                ? "bg-legacy-red text-white shadow-sm"
                : "border border-theme-border bg-theme-subtle text-theme-muted hover:text-theme-primary",
            )}
          >
            <Percent size={14} />
            <span>{tab.label}</span>
            <span className="rounded-md bg-black/10 px-1.5 py-0.5 font-mono text-[10px]">{tab.count} active</span>
          </button>
        ))}
      </div>

      {activeTab === "ltv" ? (
        <section className="grid gap-5 xl:grid-cols-[360px_1fr]">
          <form onSubmit={saveLtvRule} className="rounded-3xl border border-theme-border bg-theme-surface p-5 text-xs shadow-theme-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-theme-primary">{editingLtvId ? "Edit LTV Rule" : "Create LTV Rule"}</h3>
              {editingLtvId && (
                <button type="button" onClick={() => { setEditingLtvId(null); setLtvForm(emptyLtvForm); }} className="rounded-xl border border-theme-border p-2 text-theme-muted hover:text-theme-primary">
                  <X size={14} />
                </button>
              )}
            </div>
            <RuleInput label="Minimum property value" value={ltvForm.minimumPropertyValue} max="500000000" onChange={(value) => setLtvForm((prev) => ({ ...prev, minimumPropertyValue: value }))} />
            <RuleInput label="Maximum property value" value={ltvForm.maximumPropertyValue} max="500000000" placeholder="No cap" onChange={(value) => setLtvForm((prev) => ({ ...prev, maximumPropertyValue: value }))} />
            <RuleInput label="LTV percentage" value={ltvForm.ltvPercentage} max="100" onChange={(value) => setLtvForm((prev) => ({ ...prev, ltvPercentage: value }))} />
            <RuleSelect label="Status" value={ltvForm.status} options={["ACTIVE", "INACTIVE", "ARCHIVED"]} onChange={(value) => setLtvForm((prev) => ({ ...prev, status: value as RuleStatus }))} />
            <SaveButton isSaving={isSavingLtv} label={editingLtvId ? "Save LTV Rule" : "Add LTV Rule"} />
          </form>

          <RulesTable
            columns={["Property Value Range", "LTV", "Status", "Actions"]}
            isLoading={isLoading}
            emptyLabel="No LTV rules configured."
          >
            {ltvRules.map((rule) => (
              <tr key={rule.id} className="border-b border-theme-border-subtle last:border-0">
                <td className="px-4 py-4 font-mono text-theme-primary">{formatCurrency(rule.minimumPropertyValue)} - {formatCurrency(rule.maximumPropertyValue)}</td>
                <td className="px-4 py-4 font-mono text-theme-primary">{rule.ltvPercentage}%</td>
                <td className="px-4 py-4"><StatusBadge status={rule.status} /></td>
                <td className="px-4 py-4 text-right"><RuleActions onEdit={() => editLtv(rule)} onArchive={() => archiveRule("ltv", rule.id)} /></td>
              </tr>
            ))}
          </RulesTable>
        </section>
      ) : (
        <section className="grid gap-5 xl:grid-cols-[420px_1fr]">
          <form onSubmit={saveInterestRule} className="rounded-3xl border border-theme-border bg-theme-surface p-5 text-xs shadow-theme-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-theme-primary">{editingInterestId ? "Edit Interest Rule" : "Create Interest Rule"}</h3>
              {editingInterestId && (
                <button type="button" onClick={() => { setEditingInterestId(null); setInterestForm(emptyInterestForm); }} className="rounded-xl border border-theme-border p-2 text-theme-muted hover:text-theme-primary">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <RuleInput label="Minimum loan" value={interestForm.minimumLoanAmount} max="500000000" onChange={(value) => setInterestForm((prev) => ({ ...prev, minimumLoanAmount: value }))} />
              <RuleInput label="Maximum loan" value={interestForm.maximumLoanAmount} max="500000000" placeholder="No cap" onChange={(value) => setInterestForm((prev) => ({ ...prev, maximumLoanAmount: value }))} />
              <RuleInput label="Minimum duration" value={interestForm.minimumDuration} max="120" onChange={(value) => setInterestForm((prev) => ({ ...prev, minimumDuration: value }))} />
              <RuleInput label="Maximum duration" value={interestForm.maximumDuration} max="120" placeholder="No cap" onChange={(value) => setInterestForm((prev) => ({ ...prev, maximumDuration: value }))} />
              <RuleInput label="Interest rate" value={interestForm.interestRate} max="100" onChange={(value) => setInterestForm((prev) => ({ ...prev, interestRate: value }))} />
              <RuleSelect label="Duration unit" value={interestForm.durationUnit} options={["MONTHS", "YEARS"]} onChange={(value) => setInterestForm((prev) => ({ ...prev, durationUnit: value as DurationUnit }))} />
              <RuleSelect label="Interest type" value={interestForm.interestType} options={["REDUCING_BALANCE", "FLAT_RATE"]} onChange={(value) => setInterestForm((prev) => ({ ...prev, interestType: value as InterestType }))} />
              <RuleSelect label="Status" value={interestForm.status} options={["ACTIVE", "INACTIVE", "ARCHIVED"]} onChange={(value) => setInterestForm((prev) => ({ ...prev, status: value as RuleStatus }))} />
            </div>
            <SaveButton isSaving={isSavingInterest} label={editingInterestId ? "Save Interest Rule" : "Add Interest Rule"} />
          </form>

          <RulesTable
            columns={["Loan Amount Range", "Duration", "Interest Rate", "Interest Type", "Status", "Actions"]}
            isLoading={isLoading}
            emptyLabel="No interest rules configured."
          >
            {interestRules.map((rule) => (
              <tr key={rule.id} className="border-b border-theme-border-subtle last:border-0">
                <td className="px-4 py-4 font-mono text-theme-primary">{formatCurrency(rule.minimumLoanAmount)} - {formatCurrency(rule.maximumLoanAmount)}</td>
                <td className="px-4 py-4 font-mono text-theme-primary">{rule.minimumDuration} - {rule.maximumDuration ?? "No cap"} {rule.durationUnit.toLowerCase()}</td>
                <td className="px-4 py-4 font-mono text-theme-primary">{rule.interestRate}%</td>
                <td className="px-4 py-4 font-mono text-theme-secondary">{rule.interestType.replace("_", " ")}</td>
                <td className="px-4 py-4"><StatusBadge status={rule.status} /></td>
                <td className="px-4 py-4 text-right"><RuleActions onEdit={() => editInterest(rule)} onArchive={() => archiveRule("interest", rule.id)} /></td>
              </tr>
            ))}
          </RulesTable>
        </section>
      )}
    </div>
  );
}

function RuleInput({ label, value, onChange, placeholder, max }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; max?: string }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block font-mono text-[10px] uppercase text-theme-muted">{label}</span>
      <input
        type="number"
        min="0"
        max={max}
        step="0.01"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-xl border border-theme-border bg-theme-page px-3 py-2 text-xs font-mono text-theme-primary placeholder:text-theme-muted focus:border-legacy-red"
      />
    </label>
  );
}

function RuleSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="mb-3 block">
      <span className="mb-1 block font-mono text-[10px] uppercase text-theme-muted">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="focus-ring w-full rounded-xl border border-theme-border bg-theme-page px-3 py-2 text-xs font-mono text-theme-primary focus:border-legacy-red"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-theme-surface text-theme-primary">{option}</option>
        ))}
      </select>
    </label>
  );
}

function SaveButton({ isSaving, label }: { isSaving: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={isSaving}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-legacy-red px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-legacy-deepRed disabled:cursor-wait disabled:opacity-70"
    >
      {isSaving ? <LoaderCircle size={14} className="animate-spin" /> : <Save size={14} />}
      <span>{isSaving ? "Saving..." : label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: RuleStatus }) {
  return <span className={cn("rounded-lg border px-2 py-1 font-mono text-[10px] font-bold uppercase", statusClass(status))}>{status}</span>;
}

function RuleActions({ onEdit, onArchive }: { onEdit: () => void; onArchive: () => void }) {
  return (
    <div className="flex justify-end gap-2">
      <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 rounded-xl border border-theme-border bg-theme-subtle px-3 py-2 text-xs font-bold text-theme-secondary hover:border-legacy-red hover:text-theme-primary" title="Edit rule">
        <Edit3 size={14} />
        <span>Edit</span>
      </button>
      <button type="button" onClick={onArchive} className="inline-flex items-center gap-1.5 rounded-xl border border-theme-border bg-theme-subtle px-3 py-2 text-xs font-bold text-theme-secondary hover:border-red-500 hover:text-theme-primary" title="Archive rule">
        <Trash2 size={14} />
        <span>Delete</span>
      </button>
    </div>
  );
}

function RulesTable({
  children,
  columns,
  isLoading,
  emptyLabel,
}: {
  children: React.ReactNode;
  columns: string[];
  isLoading: boolean;
  emptyLabel: string;
}) {
  const hasRows = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <div className="overflow-hidden rounded-3xl border border-theme-border bg-theme-surface shadow-theme-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-theme-border bg-theme-page font-mono text-[10px] uppercase text-theme-muted">
            <tr>
              {columns.map((column) => (
                <th key={column} className={cn("px-4 py-3.5", column === "Actions" && "text-right")}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-theme-muted">Loading rules...</td></tr>
            ) : hasRows ? (
              children
            ) : (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-theme-muted">{emptyLabel}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
