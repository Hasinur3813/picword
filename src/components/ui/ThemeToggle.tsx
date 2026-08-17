"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative cursor-pointer w-16 h-8 rounded-full p-1 transition-colors duration-500 focus-ring overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #1e1e3a, #2d2b55)"
          : "linear-gradient(135deg, #60a5fa, #fbbf24)",
        boxShadow: isDark
          ? "inset 0 2px 4px rgba(0,0,0,0.4)"
          : "inset 0 2px 4px rgba(0,0,0,0.1)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Stars (dark mode only) */}
      <AnimatePresence>
        {isDark && (
          <>
            <motion.span
              className="absolute w-0.5 h-0.5 rounded-full bg-white/70"
              style={{ top: "20%", left: "60%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <motion.span
              className="absolute w-0.5 h-0.5 rounded-full bg-white/60"
              style={{ top: "55%", left: "72%" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.3, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.3 }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Clouds (light mode only) */}
      <AnimatePresence>
        {!isDark && (
          <motion.span
            className="absolute w-3 h-1.5 rounded-full bg-white/50"
            style={{ top: "60%", left: "58%" }}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Sliding knob with icon */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full shadow-md flex items-center justify-center"
        style={{
          background: isDark
            ? "linear-gradient(135deg, #2d2b55, #0c0c1d)"
            : "linear-gradient(135deg, #ffffff, #fff7e0)",
          boxShadow: isDark
            ? "0 0 10px rgba(124, 58, 237, 0.5), 0 2px 4px rgba(0,0,0,0.3)"
            : "0 0 10px rgba(255, 200, 0, 0.5), 0 2px 4px rgba(0,0,0,0.15)",
        }}
        animate={{ x: isDark ? 0 : 32, rotate: isDark ? 0 : 180 }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 28,
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Moon size={13} strokeWidth={2} className="text-indigo-200" fill="currentColor" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              <Sun size={13} strokeWidth={2} className="text-amber-500" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}