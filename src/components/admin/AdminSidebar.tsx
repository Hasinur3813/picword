"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FolderTree,
  Users,
  Settings,
  ArrowLeft,
  PlusCircle,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/admin",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/vocabularies",
    label: "Vocabularies",
    icon: BookOpen,
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: FolderTree,
  },
  {
    href: "/admin/users",
    label: "Learners & Stats",
    icon: Users,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface/90 border-r border-border flex flex-col justify-between shrink-0 h-screen sticky top-0 backdrop-blur-xl z-30">
      <div className="p-5 space-y-6">
        {/* Admin Brand Logo */}
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span
              className="text-xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Picword
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary-light border border-primary/20">
              Admin
            </span>
          </Link>
        </div>

        {/* Primary Action Button */}
        <Link
          href="/admin/vocabularies/new"
          className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all hover:scale-[1.02] shadow-md focus-ring"
        >
          <PlusCircle size={15} />
          <span>Add New Vocabulary</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all focus-ring ${
                  isActive
                    ? "bg-primary/15 text-primary-light border border-primary/25 shadow-sm"
                    : "text-muted hover:text-foreground hover-bg border border-transparent"
                }`}
              >
                <Icon size={16} className={isActive ? "text-primary-light" : ""} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Back Link */}
      <div className="p-4 border-t border-border/60 bg-elevated/40 space-y-3">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs space-y-1">
          <div className="flex items-center gap-1.5 text-primary-light font-semibold">
            <Sparkles size={13} />
            <span>Admin Control Active</span>
          </div>
          <p className="text-[11px] text-muted">
            Manage word catalog, AI prompts, and analytics.
          </p>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-border/80 text-xs font-medium text-muted hover:text-foreground hover-bg transition-colors focus-ring"
        >
          <ArrowLeft size={14} />
          <span>Exit to Learner App</span>
        </Link>
      </div>
    </aside>
  );
}
