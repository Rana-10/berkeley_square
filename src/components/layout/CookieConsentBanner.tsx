"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "bsc_cookie_consent_v1";

export function CookieConsentBanner() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        timer = setTimeout(() => setShow(true), 1500);
      }
    } catch {}

    const handleReopen = () => setShow(true);
    const handleUpdated = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail === "dismiss") {
        setShow(false);
      }
    };

    window.addEventListener("bsc_open_cookie_preferences", handleReopen);
    window.addEventListener("bsc_cookie_consent_updated", handleUpdated);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("bsc_open_cookie_preferences", handleReopen);
      window.removeEventListener("bsc_cookie_consent_updated", handleUpdated);
    };
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(STORAGE_KEY, "all");
      window.dispatchEvent(new CustomEvent("bsc_cookie_consent_updated", { detail: "all" }));
    } catch {}
    setShow(false);
  }

  function handleEssentialOnly() {
    try {
      localStorage.setItem(STORAGE_KEY, "essential");
      window.dispatchEvent(new CustomEvent("bsc_cookie_consent_updated", { detail: "essential" }));
    } catch {}
    setShow(false);
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-0 px-3 sm:bottom-6 sm:px-6 z-[90] pointer-events-none select-none font-sans"
          suppressHydrationWarning
        >
          <div className="pointer-events-auto mx-auto w-full max-w-3xl relative flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 rounded-2xl sm:rounded-full border border-white/15 bg-black/95 [html.light_&]:bg-white/95 [html.light_&]:border-[#E4DFD4] px-4 py-3 sm:px-6 sm:py-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(225,18,45,0.15)] [html.light_&]:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_0_20px_rgba(225,18,45,0.08)] backdrop-blur-2xl">
            {/* Left: Icon & Cookie Description */}
            <div className="flex items-center gap-3 text-left">
              <div className="grid h-8 w-8 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red shrink-0 shadow-[0_0_10px_rgba(225,18,45,0.3)]">
                <Cookie size={15} />
              </div>
              <p className="text-[11px] sm:text-xs text-slate-300 [html.light_&]:text-[#4A4844] leading-snug">
                We use cookies to make our platform function properly and analyze traffic. Control via browser settings. See our{" "}
                <Link href="/cookies" onClick={() => setShow(false)} className="text-legacy-red underline font-semibold hover:text-white [html.light_&]:hover:text-black transition-colors">
                  Cookie Policy
                </Link>{" "}
                &amp;{" "}
                <Link href="/privacy" onClick={() => setShow(false)} className="text-legacy-red underline font-semibold hover:text-white [html.light_&]:hover:text-black transition-colors">
                  Privacy Notice
                </Link>.
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 sm:flex-initial rounded-full bg-gradient-to-r from-legacy-deepRed to-legacy-red px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_0_12px_rgba(225,18,45,0.4)] transition-all hover:scale-105 active:scale-[0.98] whitespace-nowrap"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="flex-1 sm:flex-initial rounded-full border border-white/15 [html.light_&]:border-[#D8D3C8] bg-white/5 [html.light_&]:bg-[#F7F5F2] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-300 [html.light_&]:text-[#222222] transition-all hover:bg-white/10 [html.light_&]:hover:bg-[#ECE7DE] hover:text-white [html.light_&]:hover:text-black active:scale-[0.98] whitespace-nowrap"
              >
                Essential
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="grid h-7 w-7 place-items-center rounded-full text-slate-400 [html.light_&]:text-[#666460] hover:bg-white/10 [html.light_&]:hover:bg-black/5 hover:text-white [html.light_&]:hover:text-black transition-colors ml-1"
                aria-label="Dismiss cookie notice"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
