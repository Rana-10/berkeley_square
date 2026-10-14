"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileDown,
  FileText,
  Filter,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  PoundSterling,
  RotateCcw,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  X
} from "lucide-react";
import type { ApplicationNote, PropertyApplication } from "@/data/applications-store";
import { cn } from "@/lib/utils";

export function ApplicationsManager() {
  const [applications, setApplications] = useState<PropertyApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [inspectingApp, setInspectingApp] = useState<PropertyApplication | null>(null);
  const [statusChangeMsg, setStatusChangeMsg] = useState("");

  // New Note Input State
  const [newNoteText, setNewNoteText] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  async function fetchApplications() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.applications || []);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  // Update application status
  async function handleUpdateStatus(appId: string, newStatus: PropertyApplication["status"]) {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus })
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
        );
        if (inspectingApp && inspectingApp.id === appId) {
          setInspectingApp({ ...inspectingApp, status: newStatus });
        }
        setStatusChangeMsg(`Status updated to ${newStatus}`);
        setTimeout(() => setStatusChangeMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error updating application status:", err);
    }
  }

  // Add Internal Admin Deal Note
  async function handleAddNote(e: React.FormEvent) {
    e.preventDefault();
    if (!inspectingApp || !newNoteText.trim()) return;

    setIsSavingNote(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inspectingApp.id,
          note: newNoteText.trim(),
          author: "Mayfair Deal Desk Admin"
        })
      });

      if (res.ok) {
        const data = await res.json();
        const createdNote: ApplicationNote = data.note;

        const updatedNotes = [...(inspectingApp.internalNotes || []), createdNote];
        setInspectingApp({
          ...inspectingApp,
          internalNotes: updatedNotes
        });

        setApplications((prev) =>
          prev.map((a) =>
            a.id === inspectingApp.id ? { ...a, internalNotes: updatedNotes } : a
          )
        );

        setNewNoteText("");
        setStatusChangeMsg("Deal note added to candidate dossier.");
        setTimeout(() => setStatusChangeMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setIsSavingNote(false);
    }
  }

  // Export Applications to CSV
  function handleExportCSV() {
    if (applications.length === 0) return;

    const headers = [
      "Reference ID",
      "Submission Date",
      "Applicant Name",
      "Applicant Email",
      "Applicant Phone",
      "Applicant Type",
      "Property Title",
      "Property Reference",
      "Application Type",
      "Proposed Offer (£)",
      "Source of Funds",
      "Status"
    ];

    const rows = applications.map((a) => [
      `"${a.referenceId}"`,
      `"${new Date(a.submittedAt).toLocaleDateString()}"`,
      `"${a.applicantName.replace(/"/g, '""')}"`,
      `"${a.applicantEmail}"`,
      `"${a.applicantPhone}"`,
      `"${a.applicantType}"`,
      `"${a.propertyTitle.replace(/"/g, '""')}"`,
      `"${a.propertyRef}"`,
      `"${a.applicationType}"`,
      `"${Number(a.offerPrice || 0)}"`,
      `"${a.sourceOfFunds}"`,
      `"${a.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `BSQ_Property_Applications_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      if (statusFilter !== "All" && app.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = app.applicantName.toLowerCase().includes(q);
        const matchEmail = app.applicantEmail.toLowerCase().includes(q);
        const matchRef = app.referenceId.toLowerCase().includes(q);
        const matchProp = app.propertyTitle.toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchRef && !matchProp) return false;
      }
      return true;
    });
  }, [applications, statusFilter, searchQuery]);

  function getStatusBadge(status: PropertyApplication["status"]) {
    switch (status) {
      case "Pending":
        return "border-amber-500/40 bg-amber-500/10 text-amber-300";
      case "Under Review":
        return "border-blue-500/40 bg-blue-500/10 text-blue-300";
      case "Approved":
        return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";
      case "Declined":
        return "border-red-500/40 bg-red-500/10 text-red-300";
      default:
        return "border-white/10 bg-white/5 text-white";
    }
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="eyebrow">Candidate &amp; Offer Processing</span>
          <h2 className="display text-2xl font-bold text-white mt-1">
            Application &amp; Candidate Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track interested buyers/tenants, review attached KYC dossiers, append internal deal notes, and advance candidate compliance stages.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-legacy-red transition-all shadow-md"
          >
            <FileDown size={14} className="text-legacy-red" />
            <span>Export CSV</span>
          </button>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-slate-300">
            Total Dossiers: <strong className="text-white">{applications.length}</strong>
          </div>
        </div>
      </div>

      {statusChangeMsg && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span>{statusChangeMsg}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, email, property, or ref code..."
            className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-legacy-red"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {["All", "Pending", "Under Review", "Approved", "Declined"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                "rounded-xl px-3 py-1.5 text-xs font-semibold transition-all",
                statusFilter === status
                  ? "bg-white text-black font-bold shadow-md"
                  : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-white/[0.02] font-mono text-[10px] uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3.5">Reference &amp; Date</th>
                <th className="px-4 py-3.5">Candidate Profile</th>
                <th className="px-4 py-3.5">Target Property</th>
                <th className="px-4 py-3.5">Proposed Offer</th>
                <th className="px-4 py-3.5">KYC Files &amp; Notes</th>
                <th className="px-4 py-3.5">Compliance Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                  {/* Reference & Date */}
                  <td className="px-5 py-4 font-mono">
                    <span className="font-bold text-white text-xs block">
                      {app.referenceId}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(app.submittedAt).toLocaleDateString()}
                    </span>
                  </td>

                  {/* Candidate Profile */}
                  <td className="px-4 py-4">
                    <span className="font-bold text-white text-xs block">
                      {app.applicantName}
                    </span>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {app.applicantEmail}
                    </span>
                    <span className="text-[10px] text-legacy-red font-mono">
                      {app.applicantType} · {app.nationality || "UK"}
                    </span>
                  </td>

                  {/* Target Property */}
                  <td className="px-4 py-4">
                    <span className="font-bold text-white text-xs block truncate max-w-xs">
                      {app.propertyTitle}
                    </span>
                    <span className="text-[10.5px] text-slate-400 font-mono">
                      {app.propertyLocation}
                    </span>
                  </td>

                  {/* Offer Price */}
                  <td className="px-4 py-4 font-mono">
                    <span className="text-white font-bold text-xs block">
                      £{Number(app.offerPrice || 0).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {app.applicationType}
                    </span>
                  </td>

                  {/* KYC Files & Notes Indicator */}
                  <td className="px-4 py-4 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-slate-300 border border-white/10">
                        <FileCheck size={12} className="text-emerald-400" />
                        <span>{app.documents?.length || 0} docs</span>
                      </span>
                      {app.internalNotes && app.internalNotes.length > 0 && (
                        <span className="inline-flex items-center gap-1 rounded bg-blue-500/10 px-2 py-0.5 text-blue-300 border border-blue-500/20">
                          <MessageSquare size={11} />
                          <span>{app.internalNotes.length}</span>
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="px-4 py-4">
                    <select
                      value={app.status}
                      onChange={(e) => handleUpdateStatus(app.id, e.target.value as any)}
                      className={cn(
                        "rounded-lg border px-2 py-1 font-mono text-[10px] uppercase font-bold cursor-pointer transition-all bg-black",
                        getStatusBadge(app.status)
                      )}
                    >
                      <option value="Pending" className="bg-black text-amber-300">Pending</option>
                      <option value="Under Review" className="bg-black text-blue-300">Under Review</option>
                      <option value="Approved" className="bg-black text-emerald-300">Approved for Vendor</option>
                      <option value="Declined" className="bg-black text-red-300">Declined</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setInspectingApp(app)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold text-white hover:border-legacy-red hover:bg-legacy-red/20 transition-all shadow-sm"
                    >
                      <Eye size={13} />
                      <span>Inspect Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* COMPREHENSIVE CANDIDATE DOSSIER INSPECTION MODAL */}
      {inspectingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl border border-white/15 bg-[#0e0e14] p-6 sm:p-8 shadow-2xl space-y-6 text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-legacy-red font-bold uppercase">
                    {inspectingApp.referenceId}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-slate-300 uppercase">
                    {inspectingApp.applicationType}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mt-1">
                  Candidate: {inspectingApp.applicantName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingApp(null)}
                className="rounded-xl border border-white/10 p-2 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Target Property & Proposed Terms Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className="font-mono text-[10px] uppercase text-slate-400 block mb-1">Target Property Asset</span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white text-sm">{inspectingApp.propertyTitle}</h4>
                  <p className="font-mono text-slate-400 text-xs mt-0.5 flex items-center gap-1">
                    <MapPin size={12} className="text-legacy-red" />
                    <span>{inspectingApp.propertyLocation} ({inspectingApp.propertyRef})</span>
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-slate-400 uppercase block">Proposed Offer</span>
                  <span className="text-base font-bold text-white">
                    £{Number(inspectingApp.offerPrice || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              {inspectingApp.targetCompletionDate && (
                <div className="mt-3 pt-3 border-t border-white/10 font-mono text-[11px] text-slate-300">
                  Target Completion Date: <strong className="text-white">{inspectingApp.targetCompletionDate}</strong>
                </div>
              )}
            </div>

            {/* Candidate & Funding Breakdown Grid */}
            <div className="grid gap-4 sm:grid-cols-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              {/* Candidate Info */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase text-slate-400 block mb-2">Candidate Details</span>
                <p className="text-white font-bold text-sm">{inspectingApp.applicantName}</p>
                <p className="font-mono text-slate-300 flex items-center gap-1.5 mt-1">
                  <Mail size={12} className="text-slate-500" />
                  <span>{inspectingApp.applicantEmail}</span>
                </p>
                <p className="font-mono text-slate-300 flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-500" />
                  <span>{inspectingApp.applicantPhone}</span>
                </p>
                <p className="text-slate-400 text-[11px] mt-2">
                  Nationality: <strong className="text-slate-200">{inspectingApp.nationality || "United Kingdom"}</strong>
                </p>
                <p className="text-slate-400 text-[11px]">
                  Entity Type: <strong className="text-slate-200">{inspectingApp.applicantType}</strong>
                </p>
                {inspectingApp.currentAddress && (
                  <p className="text-slate-400 text-[10.5px] mt-1 italic">
                    Address: {inspectingApp.currentAddress}
                  </p>
                )}
              </div>

              {/* Funding & Wealth */}
              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                <span className="font-mono text-[10px] uppercase text-slate-400 block mb-2">Funding Verification</span>
                <p className="text-slate-300">
                  Source: <strong className="text-white">{inspectingApp.sourceOfFunds}</strong>
                </p>
                {inspectingApp.bankName && (
                  <p className="text-slate-300">
                    Bank / Custodian: <strong className="text-white">{inspectingApp.bankName}</strong>
                  </p>
                )}
                {inspectingApp.equityDeposit && (
                  <p className="text-slate-300 font-mono">
                    Equity Downpayment: <strong className="text-white">£{Number(inspectingApp.equityDeposit).toLocaleString()}</strong>
                  </p>
                )}
                {inspectingApp.solicitorInfo && (
                  <p className="text-slate-400 text-[11px] mt-2">
                    Solicitor Details: <strong className="text-slate-200">{inspectingApp.solicitorInfo}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* KYC Document Attachments */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <span className="font-mono text-[10.5px] uppercase text-slate-400 block mb-3 flex items-center justify-between">
                <span>Submitted KYC Documents ({inspectingApp.documents?.length || 0})</span>
                <span className="text-emerald-400 text-[10px]">AML Verification Ready</span>
              </span>

              {inspectingApp.documents && inspectingApp.documents.length > 0 ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  {inspectingApp.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 font-mono text-xs text-slate-200"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileCheck size={15} className="text-emerald-400 shrink-0" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">({doc.size})</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-3 text-center text-slate-500 font-mono text-xs">
                  No files attached
                </div>
              )}
            </div>

            {/* INTERNAL ADMIN NOTES & DEAL LOG */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <MessageSquare size={14} className="text-legacy-red" />
                <span className="font-sans text-xs font-bold text-white">Internal Deal Notes &amp; Activity Log</span>
              </div>

              {/* Notes List */}
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {inspectingApp.internalNotes && inspectingApp.internalNotes.length > 0 ? (
                  inspectingApp.internalNotes.map((n) => (
                    <div key={n.id} className="rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs">
                      <div className="flex items-center justify-between font-mono text-[9px] text-slate-400 mb-1">
                        <span className="text-legacy-red font-bold">{n.author}</span>
                        <span>{new Date(n.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{n.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-500 font-mono py-1">No internal notes added yet.</p>
                )}
              </div>

              {/* Add Note Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2 border-t border-white/5">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Add confidential deal note or underwriting feedback..."
                  className="focus-ring flex-1 rounded-xl border border-white/15 bg-black px-3 py-2 text-xs text-white placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={isSavingNote || !newNoteText.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-legacy-red px-4 py-2 text-xs font-bold text-white hover:bg-legacy-deepRed transition-colors disabled:opacity-40"
                >
                  <Send size={12} />
                  <span>Save Note</span>
                </button>
              </form>
            </div>

            {/* Compliance Status Selector & Fast Actions Footer */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400">Deal Stage:</span>
                <select
                  value={inspectingApp.status}
                  onChange={(e) => handleUpdateStatus(inspectingApp.id, e.target.value as any)}
                  className={cn(
                    "rounded-xl border px-3 py-1.5 font-mono text-xs font-bold bg-black",
                    getStatusBadge(inspectingApp.status)
                  )}
                >
                  <option value="Pending" className="bg-black text-amber-300">Pending Appraisal</option>
                  <option value="Under Review" className="bg-black text-blue-300">Under Review</option>
                  <option value="Approved" className="bg-black text-emerald-300">Approved for Vendor</option>
                  <option value="Declined" className="bg-black text-red-300">Declined</option>
                </select>
              </div>

              {/* Direct Contact triggers */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${inspectingApp.applicantPhone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                    inspectingApp.applicantName
                  )},%20regarding%20your%20application%20${inspectingApp.referenceId}%20for%20${encodeURIComponent(
                    inspectingApp.propertyTitle
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors shadow-md"
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Candidate</span>
                </a>

                <a
                  href={`mailto:${inspectingApp.applicantEmail}?subject=Berkeley%20Square%20Capital:%20Application%20${inspectingApp.referenceId}&body=Dear%20${encodeURIComponent(
                    inspectingApp.applicantName
                  )},%0A%0ARegarding%20your%20application%20for%20${encodeURIComponent(
                    inspectingApp.propertyTitle
                  )}...`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10 transition-colors"
                >
                  <Mail size={14} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
