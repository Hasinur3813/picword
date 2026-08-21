"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { IUser } from "@/types";
import { CATEGORIES } from "@/data/categories";

// ── Mock auth state (swap this with real auth later) ────────────────────────
const MOCK_USER: IUser | null = null;

export default function Navbar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // ── Scroll detection for backdrop blur ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Hover intent: open/close with a small delay to avoid flicker ─────────
  const handleCategoryEnter = () => {
    if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
    setIsCategoryOpen(true);
  };

  const handleCategoryLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => setIsCategoryOpen(false), 200);
  };

  const user = MOCK_USER;

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
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
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
                  {/* Header */}
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
                    >
                      View all →
                    </Link>
                  </div>

                  {/* Category Grid */}
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
          </div>

          {/* ── Auth Section (Desktop) ──────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted">{user.name}</span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
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
                  href="/signup"
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
          isMobileMenuOpen ? "max-h-[80vh] border-b border-border" : "max-h-0"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
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

              {/* Mobile theme + auth */}
              <div className="border-t border-border mt-2 pt-3 flex flex-col gap-3 px-2">
                <div className="flex items-center justify-between px-2 py-1">
                  <span className="text-sm text-muted">Theme</span>
                  <ThemeToggle />
                </div>
                {user ? (
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
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
                      href="/signup"
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
