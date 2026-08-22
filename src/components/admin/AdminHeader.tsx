"use client";

import { usePathname } from "next/navigation";
import { ShieldCheck, Bell } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

export default function AdminHeader() {
  const pathname = usePathname();

  const getBreadcrumb = () => {
    if (pathname === "/admin") return "Overview Dashboard";
    if (pathname === "/admin/vocabularies") return "Vocabulary Catalog Management";
    if (pathname === "/admin/vocabularies/new") return "Add New Vocabulary";
    if (pathname === "/admin/categories") return "Category Matrix Management";
    if (pathname === "/admin/users") return "Learner Analytics & Users";
    if (pathname === "/admin/settings") return "System & AI Settings";
    return "Admin Control";
  };

  return (
    <header className="h-16 px-6 border-b border-border bg-surface/80 backdrop-blur-xl flex items-center justify-between sticky top-0 z-20">
      {/* Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/15 text-primary-light flex items-center justify-center border border-primary/20">
          <ShieldCheck size={18} />
        </div>
        <div>
          <h1
            className="text-base font-bold text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {getBreadcrumb()}
          </h1>
          <p className="text-[11px] text-muted">Management & Content Control</p>
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-2 rounded-xl border border-border/80 text-muted hover:text-foreground hover-bg transition-colors relative focus-ring"
          aria-label="Notifications"
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400" />
        </button>

        <ThemeToggle />

        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-xs flex items-center justify-center shadow-sm">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-foreground leading-tight">Admin User</p>
            <p className="text-[10px] text-emerald-400 font-medium">Superadmin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
