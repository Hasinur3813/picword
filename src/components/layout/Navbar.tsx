"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  User,
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  ChevronDown,
  BookOpen,
  Sparkles,
} from "lucide-react";

import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { CATEGORIES } from "@/data/categories";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // ── Scroll detection for backdrop blur ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Close menus on outside click ──────────────────────────────────────────
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Hover intent for Categories ───────────────────────────────────────────
  const handleCategoryEnter = () => {
    if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
    setIsCategoryOpen(true);
  };

  const handleCategoryLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => setIsCategoryOpen(false), 200);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    toast.info("You have been signed out.");
    router.push("/login");
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background backdrop-blur-md border-b border-border/40"
      }`}
    >
      <Container size="xl">
        <nav className="flex items-center justify-between h-16 sm:h-18">
          {/* ── Logo ───────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="text-xl sm:text-2xl font-bold gradient-text"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Picword
            </span>
          </Link>

          {/* ── Desktop Navigation ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover-bg"
            >
              Home
            </Link>

            <Link
              href="/words"
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover-bg"
            >
              Words
            </Link>

            {/* Categories with hover mega-menu */}
            <div
              ref={categoryRef}
              className="relative"
              onMouseEnter={handleCategoryEnter}
              onMouseLeave={handleCategoryLeave}
            >
              <button
                className="flex items-center gap-1.5 px-4 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover-bg"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
              >
                Categories
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ── Category Mega Menu ──────────────────────────────── */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-250 ${
                  isCategoryOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="w-[540px] bg-surface rounded-2xl border border-border p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h3
                      className="text-sm font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      Browse Categories
                    </h3>
                    <Link
                      href="/categories"
                      className="text-xs text-accent hover:text-accent-light transition-colors"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      View all →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover-bg transition-all duration-200"
                        onClick={() => setIsCategoryOpen(false)}
                      >
                        <span className="text-2xl mt-0.5 group-hover/item:scale-110 transition-transform duration-200">
                          {cat.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground group-hover/item:text-accent-light transition-colors">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-muted subtle-bg px-1.5 py-0.5 rounded-full">
                              {cat.wordCount}
                            </span>
                          </div>
                          <p className="text-xs text-muted mt-0.5 leading-relaxed truncate">
                            {cat.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover-bg"
            >
              Dashboard
            </Link>

            {/* Admin Panel Quick Link for Admin users */}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors"
              >
                <ShieldCheck size={14} />
                <span>Admin Panel</span>
              </Link>
            )}
          </div>

          {/* ── Auth Section (Desktop) ──────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <div ref={userMenuRef} className="relative">
                {/* User Dropdown Trigger */}
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full hover-bg border border-border/60 transition-all group focus-ring"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white shadow-sm overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-semibold text-foreground max-w-[110px] truncate leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-muted capitalize">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown
                    size={13}
                    className={`text-muted transition-transform duration-200 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-surface border border-border/80 p-2 shadow-2xl backdrop-blur-xl z-50 animate-fadeIn space-y-1">
                    {/* User Info Header */}
                    <div className="p-2.5 border-b border-border/60 mb-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-foreground truncate">
                          {user.name}
                        </p>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            user.role === "admin"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted hover:text-foreground hover-bg rounded-xl transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard size={14} className="text-primary-light" />
                      <span>Learner Dashboard</span>
                    </Link>

                    <Link
                      href="/words"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-muted hover:text-foreground hover-bg rounded-xl transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <BookOpen size={14} className="text-accent" />
                      <span>Vocabulary Catalog</span>
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors font-medium"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <ShieldCheck size={14} />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="border-t border-border/60 my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-error hover:bg-error/10 rounded-xl transition-colors font-medium text-left"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-muted hover:text-foreground transition-colors rounded-lg hover-bg"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center h-9 px-5 text-sm font-medium text-white bg-primary rounded-full transition-all hover:bg-primary-light hover:scale-105 glow-effect"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ────────────────────────────────────── */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover-bg transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-foreground mt-1 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
          </button>
        </nav>
      </Container>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[85vh] border-b border-border" : "max-h-0"
        }`}
      >
        <div className="bg-surface border-t border-border backdrop-blur-xl">
          <Container size="xl" className="py-4">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="px-4 py-3 text-sm text-muted hover:text-foreground hover-bg rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                href="/words"
                className="px-4 py-3 text-sm text-muted hover:text-foreground hover-bg rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Words
              </Link>

              {/* Mobile categories accordion */}
              <button
                className="flex items-center justify-between px-4 py-3 text-sm text-muted hover:text-foreground hover-bg rounded-xl transition-colors"
                onClick={() => setIsCategoryOpen((prev) => !prev)}
              >
                Categories
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mobile category list */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isCategoryOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="pl-4 pb-2 grid grid-cols-2 gap-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted hover:text-foreground hover-bg rounded-lg transition-colors"
                      onClick={() => {
                        setIsCategoryOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard"
                className="px-4 py-3 text-sm text-muted hover:text-foreground hover-bg rounded-xl transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>

              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShieldCheck size={16} />
                  <span>Admin Console</span>
                </Link>
              )}

              {/* Mobile theme + auth */}
              <div className="border-t border-border mt-2 pt-3 flex flex-col gap-3 px-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-sm text-muted">Theme</span>
                  <ThemeToggle />
                </div>

                {isAuthenticated && user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-elevated/70 rounded-xl border border-border/60">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-white">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          user.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {user.name}
                          </p>
                          <span className="text-[10px] uppercase font-bold text-accent">
                            {user.role}
                          </span>
                        </div>
                        <p className="text-xs text-muted truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full py-2.5 text-xs text-error font-semibold bg-error/10 hover:bg-error/20 border border-error/20 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      className="flex-1 text-center py-2.5 text-sm text-muted border border-border rounded-xl hover-bg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/register"
                      className="flex-1 text-center py-2.5 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-light transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
