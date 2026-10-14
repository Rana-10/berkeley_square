"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { QuickContactRail } from "@/components/layout/QuickContactRail";
import { PersistentGetFundedButton } from "@/components/layout/PersistentGetFundedButton";
import { AdvisoryChatbot } from "@/components/chat/AdvisoryChatbot";
import { CookieConsentBanner } from "@/components/layout/CookieConsentBanner";
import { ScrollEnergyProgress } from "@/components/animations/ScrollEnergyProgress";

export function PublicSiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const isExcludedPage = pathname === "/about" || pathname === "/construction";

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollEnergyProgress />
      <Header />
      <QuickContactRail />
      <PersistentGetFundedButton />
      <AdvisoryChatbot />
      <CookieConsentBanner />
      {children}
      {!isExcludedPage && <Footer />}
    </>
  );
}
