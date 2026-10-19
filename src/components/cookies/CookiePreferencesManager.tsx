"use client";

import { useEffect, useState } from "react";
import { Check, CheckCircle2, Cookie, RotateCcw, ShieldAlert, ShieldCheck, SlidersHorizontal, Sparkles } from "lucide-react";

const STORAGE_KEY = "bsc_cookie_consent_v1";

type ConsentStatus = "all" | "essential" | "none";

export function CookiePreferencesManager() {
  const [status, setStatus] = useState<ConsentStatus>("none");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    function readConsent() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "all") setStatus("all");
        else if (saved === "essential") setStatus("essential");
        else setStatus("none");
      } catch {
        setStatus("none");
      }
    }

    readConsent();

    const handleUpdate = () => readConsent();
    window.addEventListener("bsc_cookie_consent_updated", handleUpdate);
    return () => window.removeEventListener("bsc_cookie_consent_updated", handleUpdate);
  }, []);

  function handleSave(choice: "all" | "essential") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      setStatus(choice);
      window.dispatchEvent(new CustomEvent("bsc_cookie_consent_updated", { detail: choice }));
      setFeedback(
        choice === "all"
          ? "All cookies enabled. Your preferences have been saved."
          : "Non-essential cookies disabled. Only strictly necessary cookies remain active."
      );
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback("Unable to access browser storage. Please check browser settings.");
      setTimeout(() => setFeedback(null), 4000);
    }
  }

  function handleReset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setStatus("none");
      window.dispatchEvent(new CustomEvent("bsc_cookie_consent_updated", { detail: "reset" }));
      window.dispatchEvent(new CustomEvent("bsc_open_cookie_preferences"));
      setFeedback("Cookie preferences reset. The consent banner has been reopened.");
      setTimeout(() => setFeedback(null), 4000);
    } catch {
      setFeedback("Unable to reset browser storage.");
      setTimeout(() => setFeedback(null), 4000);
    }
  }

  function handleOpenBanner() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bsc_open_cookie_preferences"));
    }
  }

  return (
    <div className="rounded-none border border-white/15 [html.light_&]:border-[#D8D3C8] bg-black/60 [html.light_&]:bg-[#FAF7F1] p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 [html.light_&]:border-[#DDD7CA]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-none bg-legacy-red/15 text-legacy-red border border-legacy-red/30">
              <SlidersHorizontal size={16} />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white [html.light_&]:text-[#181818] tracking-tight">
              Interactive Cookie Manager
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-400 [html.light_&]:text-[#666460]">
            Review or modify your privacy consent preferences for this browser in real time.
          </p>
        </div>

        {/* Current Status Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-medium text-slate-400 [html.light_&]:text-[#666460]">Current Status:</span>
          {status === "all" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 [html.light_&]:text-emerald-700">
              <CheckCircle2 size={13} /> All Accepted
            </span>
          ) : status === "essential" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 [html.light_&]:text-amber-700">
              <ShieldCheck size={13} /> Essential Only
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 [html.light_&]:text-[#4A4844] [html.light_&]:border-[#D8D3C8] [html.light_&]:bg-[#F6F2EA]">
              <ShieldAlert size={13} /> Not Set (Default)
            </span>
          )}
        </div>
      </div>

      {/* Action Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => handleSave("all")}
          className={`inline-flex items-center gap-2 rounded-none px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] ${
            status === "all"
              ? "bg-emerald-600 text-white ring-2 ring-emerald-400/50"
              : "bg-legacy-red text-white hover:brightness-110"
          }`}
        >
          <Check size={14} />
          {status === "all" ? "All Cookies Active" : "Accept All Cookies"}
        </button>

        <button
          type="button"
          onClick={() => handleSave("essential")}
          className={`inline-flex items-center gap-2 rounded-none border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.98] ${
            status === "essential"
              ? "border-amber-500/50 bg-amber-500/15 text-amber-300 [html.light_&]:text-amber-800 ring-2 ring-amber-400/40"
              : "border-white/15 [html.light_&]:border-[#D8D3C8] bg-white/5 [html.light_&]:bg-[#F6F2EA] text-slate-200 [html.light_&]:text-[#222222] hover:bg-white/10 [html.light_&]:hover:bg-[#EAE5DC]"
          }`}
        >
          <ShieldCheck size={14} />
          {status === "essential" ? "Essential Only Active" : "Reject Non-Essential"}
        </button>

        <button
          type="button"
          onClick={handleOpenBanner}
          className="inline-flex items-center gap-2 rounded-none border border-white/10 [html.light_&]:border-[#D8D3C8] bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 [html.light_&]:text-[#55524E] hover:text-white [html.light_&]:hover:text-black hover:bg-white/5 [html.light_&]:hover:bg-black/5 transition-all"
        >
          <Cookie size={14} className="text-legacy-red" />
          Open Quick Banner
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-none border border-white/10 [html.light_&]:border-[#D8D3C8] bg-transparent px-3 py-2.5 text-xs font-mono font-medium text-slate-400 [html.light_&]:text-[#666460] hover:text-white [html.light_&]:hover:text-black hover:bg-white/5 transition-all ml-auto"
          title="Reset your consent choices"
        >
          <RotateCcw size={13} />
          <span>Reset Choices</span>
        </button>
      </div>

      {/* Real-time Feedback Banner */}
      {feedback && (
        <div className="mt-4 rounded-none border border-emerald-500/30 bg-emerald-500/10 [html.light_&]:border-emerald-600/20 [html.light_&]:bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-300 [html.light_&]:text-emerald-800 flex items-center gap-2 transition-all">
          <Sparkles size={14} className="text-emerald-400 [html.light_&]:text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}
    </div>
  );
}
