"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LoaderScreen } from "@/components/animations/LoaderScreen";

const SHOW_AFTER_MS = 250; // fast navigations never show the overlay at all
const MIN_VISIBLE_MS = 350; // once shown, stay long enough not to flicker
const FAILSAFE_MS = 6000;

/**
 * Covers the page with the brand loader while navigating between pages.
 * It starts on a click on an internal link (or back/forward) and ends once the new route has rendered.
 */
export function RouteTransition() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const startedAt = useRef(0);
  const currentPath = useRef(pathname);
  const hideTimer = useRef<number | undefined>(undefined);
  const failsafe = useRef<number | undefined>(undefined);
  const showTimer = useRef<number | undefined>(undefined);

  // Start: internal link click, or browser back/forward.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const start = () => {
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(showTimer.current);
      // Only reveal the overlay if the new page is slow to arrive.
      showTimer.current = window.setTimeout(() => {
        startedAt.current = performance.now();
        setVisible(true);
      }, SHOW_AFTER_MS);
      window.clearTimeout(failsafe.current);
      failsafe.current = window.setTimeout(() => {
        window.clearTimeout(showTimer.current);
        setVisible(false);
      }, FAILSAFE_MS);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page or hash jump
      if (url.pathname.startsWith("/admin") || window.location.pathname.startsWith("/admin")) return;
      start();
    };

    const onPopState = () => {
      if (window.location.pathname !== currentPath.current) start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(failsafe.current);
    };
  }, []);

  // End: the new route has rendered.
  useEffect(() => {
    currentPath.current = pathname;
    window.clearTimeout(showTimer.current);
    if (!visible) return;
    const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - startedAt.current));
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      window.clearTimeout(failsafe.current);
      setVisible(false);
    }, remaining);
    return () => window.clearTimeout(hideTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden={!visible}
      className={
        "fixed inset-0 z-[95] grid place-items-center bg-[#F3EEE4] transition-[opacity,visibility] duration-300 ease-out " +
        (visible ? "visible opacity-100" : "invisible pointer-events-none opacity-0")
      }
    >
      {visible ? <LoaderScreen /> : null}
    </div>
  );
}
