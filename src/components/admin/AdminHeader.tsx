"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  CheckCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  Mail,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  User,
  X
} from "lucide-react";
import type { AdminNotification } from "@/data/applications-store";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AdminHeader({ title = "Deal Desk Overview", subtitle = "Berkeley Square Capital Management Console" }: AdminHeaderProps) {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fetch live notifications
  async function fetchNotifs() {
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (err) {
      console.error("Error fetching admin notifications:", err);
    }
  }

  useEffect(() => {
    fetchNotifs();
    // Poll every 15 seconds for live notifications
    const interval = setInterval(fetchNotifs, 15000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark all notifications as read
  async function handleMarkAllAsRead() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/notifications", { method: "PUT" });
      if (res.ok) {
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      }
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <header className="h-16 border-b border-white/10 bg-[#08080c]/90 px-6 backdrop-blur-xl flex items-center justify-between select-none relative z-30">
      {/* Title & Status */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="font-sans text-sm font-bold text-white leading-none flex items-center gap-2">
            <span>{title}</span>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-emerald-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Server
            </span>
          </h1>
          <p className="font-mono text-[10px] text-slate-400 mt-1">{subtitle}</p>
        </div>
      </div>

      {/* Right Tools: Notification Bell & Admin Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-white/5 text-slate-300 hover:border-legacy-red hover:bg-white/10 hover:text-white transition-all"
            aria-label="Admin Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-legacy-red font-mono text-[9px] font-bold text-white shadow-[0_0_8px_#e1122d] animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-white/15 bg-[#0c0c12] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(225,18,45,0.15)] backdrop-blur-2xl z-50">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-legacy-red" />
                  <span className="font-sans text-xs font-bold text-white">Instant Notifications</span>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-legacy-red px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                      {unreadCount} New
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    disabled={isLoading}
                    className="flex items-center gap-1 font-mono text-[10px] text-slate-400 hover:text-white transition-colors"
                  >
                    <CheckCheck size={12} />
                    <span>Mark all read</span>
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="mt-3 max-h-80 overflow-y-auto space-y-2 pr-1">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <Link
                      key={notif.id}
                      href={notif.link || "/admin/applications"}
                      onClick={() => setShowDropdown(false)}
                      className={cn(
                        "block rounded-xl border p-3 text-xs transition-all",
                        notif.isRead
                          ? "border-white/5 bg-white/[0.02] text-slate-400 hover:bg-white/5 hover:text-white"
                          : "border-legacy-red/40 bg-legacy-red/10 text-slate-200 shadow-[0_0_12px_rgba(225,18,45,0.15)]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-sans font-bold text-white text-xs line-clamp-1">
                          {notif.title}
                        </span>
                        {!notif.isRead && (
                          <span className="h-2 w-2 rounded-full bg-legacy-red shrink-0 shadow-[0_0_6px_#e1122d]" />
                        )}
                      </div>
                      <p className="mt-1 text-[11px] leading-relaxed text-slate-300 line-clamp-2">
                        {notif.message}
                      </p>
                      <span className="mt-2 block font-mono text-[9px] text-slate-500">
                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} · {new Date(notif.timestamp).toLocaleDateString()}
                      </span>
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500 font-mono">
                    No notifications right now
                  </div>
                )}
              </div>

              {/* Footer action */}
              <div className="mt-3 border-t border-white/10 pt-2 text-center">
                <Link
                  href="/admin/applications"
                  onClick={() => setShowDropdown(false)}
                  className="font-mono text-[11px] font-bold text-legacy-red hover:underline block"
                >
                  View All Received Applications &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Admin Desk Badge */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-300">
          <div className="grid h-6 w-6 place-items-center rounded-lg bg-legacy-red/20 text-legacy-red font-bold">
            M
          </div>
          <span className="font-medium text-white hidden sm:inline">Mayfair Admin</span>
        </div>
      </div>
    </header>
  );
}
