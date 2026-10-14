"use client";

import { usePathname } from "next/navigation";
import { AdvisoryChatbot } from "@/components/chat/AdvisoryChatbot";
import { Footer } from "@/components/layout/Footer";
import { PersistentGetFundedButton } from "@/components/layout/PersistentGetFundedButton";

export function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isExcludedPage = pathname === "/about" || pathname === "/construction";

  if (isAdmin) return null;

  return (
    <>
      <PersistentGetFundedButton />
      <AdvisoryChatbot />
      {!isExcludedPage && <Footer />}
    </>
  );
}
