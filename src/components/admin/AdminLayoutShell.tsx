"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-theme-page text-theme-primary font-sans selection:bg-legacy-red selection:text-white" suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-theme-page text-theme-primary font-sans selection:bg-legacy-red selection:text-white" suppressHydrationWarning>
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden" suppressHydrationWarning>
        <main className="flex-1 overflow-y-auto p-6 sm:p-8" suppressHydrationWarning>
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
