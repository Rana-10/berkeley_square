"use client";

import { useEffect, useState } from "react";
import { LoaderScreen } from "@/components/animations/LoaderScreen";

/** First-load preloader. Shows once per full page load, then fades out. */
export function SiteLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div suppressHydrationWarning className="site-loader" role="status" aria-label="Loading Berkeley Square Capital">
      <LoaderScreen />
    </div>
  );
}
