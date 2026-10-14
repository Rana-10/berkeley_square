import type { Metadata } from "next";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const metadata: Metadata = {
  title: "Deal Desk Admin Portal | Berkeley Square Capital",
  description: "Autonomous property listings management, application tracking, and investor underwriting portal."
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
