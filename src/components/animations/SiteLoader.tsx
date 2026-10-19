"use client";

import { useEffect, useState } from "react";
import { LoaderScreen } from "@/components/animations/LoaderScreen";

/** Brief brand splash on the first visit of a session only; repeat page loads go straight to the content. */
export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try { window.sessionStorage.setItem("bsq_loader_seen", "1"); } catch {}
    const timer = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div suppressHydrationWarning className="site-loader" role="status" aria-label="Loading Berkeley Square Capital">
      <LoaderScreen />
    </div>
  );
}
