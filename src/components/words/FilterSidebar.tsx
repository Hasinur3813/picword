"use client";

import { Search, Bookmark, RotateCcw, X } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import type { VocabDifficulty, VocabFilters, VocabSortOption } from "@/types";

const DIFFICULTIES: { value: VocabDifficulty | "all"; label: string }[] = [
  { value: "all", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const SORT_OPTIONS: { value: VocabSortOption; label: string }[] = [
  { value: "az", label: "A → Z" },
  { value: "za", label: "Z → A" },
  { value: "recent", label: "Newest" },
  { value: "difficulty", label: "By level" },
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface FilterSidebarProps {
  filters: VocabFilters;
  onChange: (next: VocabFilters) => void;
  onReset: () => void;
  resultCount: number;
  savedCount: number;
  /** Mobile drawer open state */
  open?: boolean;
  onClose?: () => void;
}

function hasActiveFilters(filters: VocabFilters) {
  return (
    filters.search.trim() !== "" ||
    filters.categories.length > 0 ||
    filters.difficulty !== "all" ||
    filters.letter !== "all" ||
    filters.savedOnly ||
    filters.sort !== "az"
  );
}

export default function FilterSidebar({
  filters,
  onChange,
  onReset,
  resultCount,
  savedCount,
  open = true,
  onClose,
}: FilterSidebarProps) {
  const toggleCategory = (slug: string) => {
    const exists = filters.categories.includes(slug);
    onChange({
      ...filters,
      categories: exists
        ? filters.categories.filter((c) => c !== slug)
        : [...filters.categories, slug],
    });
  };

  const panel = (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
        <div>
          <h2
            className="text-lg font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Focus filters
          </h2>
          <p className="text-xs text-muted mt-1">
            {resultCount} word{resultCount === 1 ? "" : "s"} ready to learn
          </p>
        </div>
        <div className="flex items-center gap-1">
          {hasActiveFilters(filters) && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground px-2.5 py-1.5 rounded-lg hover-bg transition-colors focus-ring"
              aria-label="Reset filters"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover-bg text-muted hover:text-foreground focus-ring"
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <label className="relative block mb-4 shrink-0">
        <span className="sr-only">Search words</span>
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search word or বাংলা…"
          className="w-full h-11 pl-10 pr-3 rounded-xl bg-elevated border border-border text-sm text-foreground placeholder:text-muted focus-ring outline-none transition-colors"
        />
      </label>

      <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pr-2 -mr-1.5 custom-scrollbar">
        {/* Saved */}
        <section>
          <button
            type="button"
            onClick={() =>
              onChange({ ...filters, savedOnly: !filters.savedOnly })
            }
            className={`w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl border transition-all focus-ring ${
              filters.savedOnly
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border bg-elevated/50 text-muted hover:text-foreground hover-bg"
            }`}
          >
            <span className="flex items-center gap-2.5 text-sm font-medium">
              <Bookmark
                size={16}
                className={filters.savedOnly ? "text-primary-light fill-primary/30" : ""}
              />
              Learn later
            </span>
            <span className="text-xs tabular-nums subtle-bg px-2 py-0.5 rounded-full">
              {savedCount}
            </span>
          </button>
        </section>

        {/* Categories */}
        <section>
          <h3
            className="text-xs font-semibold uppercase tracking-wider text-muted mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Categories
          </h3>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => {
              const active = filters.categories.includes(cat.slug);
              return (
                <li key={cat.slug}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.slug)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all focus-ring ${
                      active
                        ? "bg-primary/15 text-foreground border border-primary/30"
                        : "text-muted hover:text-foreground hover-bg border border-transparent"
                    }`}
                  >
                    <span className="text-lg leading-none" aria-hidden>
                      {cat.icon}
                    </span>
                    <span className="flex-1 text-sm font-medium truncate">
                      {cat.name}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        active
                          ? "bg-primary border-primary"
                          : "border-border"
                      }`}
                      aria-hidden
                    >
                      {active && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6.5L5 9L9.5 3.5"
                            stroke="white"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Difficulty */}
        <section>
          <h3
            className="text-xs font-semibold uppercase tracking-wider text-muted mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Difficulty
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {DIFFICULTIES.map((d) => {
              const active = filters.difficulty === d.value;
              return (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => onChange({ ...filters, difficulty: d.value })}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all focus-ring ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "glass-sm text-muted hover:text-foreground"
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Alphabet */}
        <section>
          <h3
            className="text-xs font-semibold uppercase tracking-wider text-muted mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Starts with
          </h3>
          <div className="grid grid-cols-7 gap-1">
            <button
              type="button"
              onClick={() => onChange({ ...filters, letter: "all" })}
              className={`col-span-7 h-8 rounded-lg text-xs font-medium transition-all focus-ring mb-1 ${
                filters.letter === "all"
                  ? "bg-accent/20 text-accent-light border border-accent/30"
                  : "text-muted hover-bg border border-transparent"
              }`}
            >
              Any letter
            </button>
            {LETTERS.map((letter) => {
              const active = filters.letter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...filters,
                      letter: active ? "all" : letter,
                    })
                  }
                  className={`h-8 rounded-lg text-xs font-semibold transition-all focus-ring ${
                    active
                      ? "bg-primary text-white"
                      : "text-muted hover:text-foreground hover-bg"
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </section>

        {/* Sort */}
        <section className="pb-2">
          <h3
            className="text-xs font-semibold uppercase tracking-wider text-muted mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Sort by
          </h3>
          <div className="grid grid-cols-2 gap-1.5">
            {SORT_OPTIONS.map((opt) => {
              const active = filters.sort === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange({ ...filters, sort: opt.value })}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-all focus-ring ${
                    active
                      ? "bg-elevated border border-primary/40 text-foreground"
                      : "border border-border text-muted hover:text-foreground hover-bg"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );

  /* Desktop always visible; mobile as overlay drawer */
  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-[285px] shrink-0 sticky top-24 self-start z-20">
        <div className="glass rounded-2xl p-5 max-h-[calc(100dvh-7.5rem)] flex flex-col min-h-0 shadow-lg">
          {panel}
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Dismiss filters"
        />
        <div
          className={`absolute inset-y-0 left-0 w-[min(100%,320px)] bg-surface border-r border-border p-5 shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {panel}
        </div>
      </div>
    </>
  );
}
