"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
        timer = setTimeout(() => setShow(true), 500);
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
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[90] border-t-2 border-legacy-red bg-[#1F4030] text-white shadow-[0_-12px_32px_rgba(0,0,0,0.18)] select-none"
          suppressHydrationWarning
        >
          <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-10">
            <p className="max-w-3xl text-sm leading-relaxed text-white/85">
              <span className="font-semibold text-white">We use cookies.</span> They keep the site working and help us understand how it is used. You can accept all cookies or keep only the essential ones. See our{" "}
              <Link href="/cookies" onClick={() => setShow(false)} className="underline decoration-white/50 underline-offset-2 transition-colors hover:text-[#E8B7A8]">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy" onClick={() => setShow(false)} className="underline decoration-white/50 underline-offset-2 transition-colors hover:text-[#E8B7A8]">
                Privacy Notice
              </Link>
              .
            </p>

            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleAccept}
                className="focus-ring border border-white bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#181818] transition-colors hover:border-[#E8B7A8] hover:bg-[#E8B7A8]"
              >
                Accept all
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="focus-ring border border-white/60 bg-transparent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#181818]"
              >
                Essential only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
