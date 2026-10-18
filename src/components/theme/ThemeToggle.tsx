"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      role="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      suppressHydrationWarning
      className={cn(
        "group focus-ring relative flex h-8 sm:h-9 items-center gap-1.5 rounded-full border px-2 sm:px-2.5 transition-all duration-300 select-none",
        isDark
          ? "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10 text-white/90"
          : "border-[#C6D3C0] bg-white hover:bg-[#F4F7F0] hover:border-[#181818]/25 text-[#181818] shadow-sm",
        className
      )}
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        {mounted ? (
          <motion.div
            key={theme}
            initial={{ scale: 0.6, rotate: -30, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex items-center justify-center"
          >
            {isDark ? (
              <Moon size={14} className="text-legacy-red" />
            ) : (
              <Sun size={14} className="text-[#e1122d]" />
            )}
          </motion.div>
        ) : (
          <Moon size={14} className="text-legacy-red" />
        )}
      </div>

      <span
        suppressHydrationWarning
        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hidden sm:inline"
      >
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
