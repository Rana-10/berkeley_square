"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <>
      <Footer />
    </>
  );
}
