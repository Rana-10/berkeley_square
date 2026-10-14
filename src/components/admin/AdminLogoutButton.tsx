"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminLogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-theme-border px-3 py-2 text-xs font-bold uppercase text-theme-primary transition hover:border-legacy-red"
    >
      <LogOut size={14} />
      Logout
    </button>
  );
}
