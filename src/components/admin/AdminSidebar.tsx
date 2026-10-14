"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  Bell,
  Building2,
  ChevronRight,
  FileCheck,
  FileText,
  Globe,
  Home,
  Layers,
  LogOut,
  Percent,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BSQLogo } from "@/components/ui/BSQLogo";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { useTheme } from "@/components/theme/ThemeContext";

interface AdminSidebarProps {
  unreadNotifsCount?: number;
  pendingAppsCount?: number;
}

export function AdminSidebar({ unreadNotifsCount = 0, pendingAppsCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();

  if (pathname === "/admin/login") {
    return null;
  }

  const navigation = [
    {
      name: "Property Listings",
      href: "/admin/properties",
      icon: Building2,
      current: pathname.startsWith("/admin/properties"),
      badge: "CRUD"
    },
    {
      name: "Applications Desk",
      href: "/admin/applications",
      icon: FileCheck,
      current: pathname.startsWith("/admin/applications"),
      counter: pendingAppsCount > 0 ? pendingAppsCount : undefined
    },
    {
      name: "Loan Rules",
      href: "/admin/loan-rules",
      icon: Percent,
      current: pathname.startsWith("/admin/loan-rules"),
      badge: "LTV"
    }
  ];

  return (
    <aside suppressHydrationWarning className="sticky top-0 h-screen w-64 shrink-0 overflow-y-auto border-r border-theme-border bg-theme-surface p-5 flex flex-col justify-between select-none">
      <div>
        {/* Brand Header */}
        <div suppressHydrationWarning className="flex items-center gap-3 border-b border-theme-border pb-5">
          <BSQLogo variant="mark" theme={theme} size="md" />
          <div>
            <span className="font-display text-sm font-bold tracking-tight text-theme-primary block">
              Berkeley Square
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-legacy-red font-bold">
              Admin Deal Desk
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-6 space-y-1.5">
          <span className="px-3 text-[10px] font-mono uppercase tracking-widest text-theme-muted block mb-2">
            Management Portal
          </span>

          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all",
                  item.current
                    ? "bg-legacy-red text-white shadow-sm"
                    : "text-theme-muted hover:bg-theme-subtle hover:text-theme-primary"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} className={item.current ? "text-white" : "text-theme-muted"} />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="rounded-md border border-theme-border bg-theme-subtle px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-theme-secondary">
                    {item.badge}
                  </span>
                )}

                {item.counter !== undefined && (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-legacy-red font-mono text-[10px] font-bold text-white">
                    {item.counter}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Actions Card */}
        <div className="mt-8 rounded-2xl border border-theme-border bg-theme-page p-4 text-xs">
          <div className="flex items-center gap-2 text-legacy-red font-bold font-mono text-[11px] mb-2">
            <Sparkles size={13} />
            <span>Autonomous Control</span>
          </div>
          <p className="text-theme-muted text-[11px] leading-relaxed">
            Add or edit inventory without code changes. All mutations reflect live in real-time.
          </p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-theme-border pt-4 space-y-2">
        <Link
          href="/property"
          target="_blank"
          className="flex items-center justify-between rounded-xl border border-theme-border bg-theme-subtle px-3 py-2 text-xs font-medium text-theme-secondary hover:border-legacy-red hover:text-theme-primary transition-all"
        >
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-legacy-red" />
            <span>View Public Site</span>
          </div>
          <ArrowUpRight size={13} />
        </Link>
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
