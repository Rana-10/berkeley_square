"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Interactive extras are fetched only once the browser is idle, so they never compete with first paint,
// hydration or the first scroll.
const AdvisoryChatbot = dynamic(() => import("@/components/chat/AdvisoryChatbot").then((m) => m.AdvisoryChatbot), { ssr: false });
const CookieConsentBanner = dynamic(() => import("@/components/layout/CookieConsentBanner").then((m) => m.CookieConsentBanner), { ssr: false });

export function LazyWidgets() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) {
      const id = idle(() => setReady(true), { timeout: 4000 });
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Consent is shown straight away; only the chat widget waits for idle. */}
      <CookieConsentBanner />
      {ready && <AdvisoryChatbot />}
    </>
  );
}
