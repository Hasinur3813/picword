"use client";

import { useMemo, useState } from "react";
import { Filter, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import FilterSidebar from "@/components/words/FilterSidebar";
import VocabCard from "@/components/words/VocabCard";
import { VOCABULARIES } from "@/data/vocabularies";
import { CATEGORIES } from "@/data/categories";
import { useSavedWords } from "@/hooks/useSavedWords";
import type { VocabFilters } from "@/types";

const DEFAULT_FILTERS: VocabFilters = {
  search: "",
  categories: [],
  difficulty: "all",
  letter: "all",
  savedOnly: false,
  sort: "az",
};

const DIFFICULTY_ORDER = { beginner: 0, intermediate: 1, advanced: 2 } as const;

function filterVocabularies(
  filters: VocabFilters,
  savedIds: Set<string>
) {
  const q = filters.search.trim().toLowerCase();

  let list = VOCABULARIES.filter((v) => {
    const id = v._id ?? v.word;

    if (filters.savedOnly && !savedIds.has(id)) return false;

    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(v.category)
    ) {
      return false;
    }

    if (
      filters.difficulty !== "all" &&
      v.difficulty !== filters.difficulty
    ) {
      return false;
    }

    if (
      filters.letter !== "all" &&
      !v.word.toUpperCase().startsWith(filters.letter)
    ) {
      return false;
    }

    if (q) {
      const haystack = [
        v.word,
        v.bengaliMeaning,
        v.englishMeaningBengali ?? "",
        v.bengaliDetails ?? "",
        v.description,
        v.englishMeaning,
        v.exampleSentence,
        v.exampleSentenceBengali ?? "",
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });

  list = [...list].sort((a, b) => {
    switch (filters.sort) {
      case "za":
        return b.word.localeCompare(a.word);
      case "recent":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "difficulty": {
        const da = a.difficulty ? DIFFICULTY_ORDER[a.difficulty] : 99;
        const db = b.difficulty ? DIFFICULTY_ORDER[b.difficulty] : 99;
        if (da !== db) return da - db;
        return a.word.localeCompare(b.word);
      }
      case "az":
      default:
        return a.word.localeCompare(b.word);
    }
  });

  return list;
}

export default function WordsBrowser() {
  const [filters, setFilters] = useState<VocabFilters>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { saved, savedCount, isSaved, toggleSave } = useSavedWords();

  const results = useMemo(
    () => filterVocabularies(filters, saved),
    [filters, saved]
  );

  const activeChips = filters.categories
    .map((slug) => {
      const cat = CATEGORIES.find((c) => c.slug === slug);
      return cat ? { slug, name: cat.name } : null;
    })
    .filter((c): c is { slug: string; name: string } => c !== null);

  const removeCategory = (slug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== slug),
    }));
  };

  return (
    <div className="relative flex-1">
      {/* Soft ambient — calm study atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-0 right-1/4 w-[420px] h-[420px] bg-primary/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-0 w-[320px] h-[320px] bg-accent/6 rounded-full blur-[120px]" />
      </div>

      <Container size="xl" className="relative z-10 pt-24 sm:pt-28 pb-16">
        {/* Page intro — one calm job: orient the learner */}
        <header className="mb-8 sm:mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-accent-light glass-sm px-3 py-1.5 rounded-full mb-4">
            <Sparkles size={12} />
            Word library
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Browse words{" "}
            <span className="gradient-text">without noise</span>
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Filter by category and level, save what you want to revisit, and
            stay with one clear card at a time.
          </p>
        </header>

        <div className="flex gap-8 items-start">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            resultCount={results.length}
            savedCount={savedCount}
            open={mobileFiltersOpen}
            onClose={() => setMobileFiltersOpen(false)}
          />

          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 h-10 px-4 rounded-xl glass text-sm font-medium focus-ring"
              >
                <Filter size={16} />
                Filters
                {(filters.categories.length > 0 ||
                  filters.difficulty !== "all" ||
                  filters.letter !== "all" ||
                  filters.savedOnly) && (
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                    {[
                      filters.categories.length,
                      filters.difficulty !== "all" ? 1 : 0,
                      filters.letter !== "all" ? 1 : 0,
                      filters.savedOnly ? 1 : 0,
                    ].reduce((a, b) => a + b, 0)}
                  </span>
                )}
              </button>

              <p className="text-sm text-muted">
                Showing{" "}
                <span className="text-foreground font-semibold tabular-nums">
                  {results.length}
                </span>{" "}
                of {VOCABULARIES.length}
              </p>

              {/* Active chips */}
              <div className="flex flex-wrap gap-1.5 ml-auto">
                {filters.savedOnly && (
                  <Chip
                    label="Learn later"
                    onRemove={() =>
                      setFilters((f) => ({ ...f, savedOnly: false }))
                    }
                  />
                )}
                {filters.difficulty !== "all" && (
                  <Chip
                    label={filters.difficulty}
                    onRemove={() =>
                      setFilters((f) => ({ ...f, difficulty: "all" }))
                    }
                  />
                )}
                {filters.letter !== "all" && (
                  <Chip
                    label={`Starts with ${filters.letter}`}
                    onRemove={() =>
                      setFilters((f) => ({ ...f, letter: "all" }))
                    }
                  />
                )}
                {activeChips.map((chip) => (
                  <Chip
                    key={chip.slug}
                    label={chip.name}
                    onRemove={() => removeCategory(chip.slug)}
                  />
                ))}
              </div>
            </div>

            {/* Grid */}
            <AnimatePresence mode="popLayout">
              {results.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {results.map((vocab, i) => {
                    const id = vocab._id ?? vocab.word;
                    return (
                      <VocabCard
                        key={id}
                        vocab={vocab}
                        saved={isSaved(id)}
                        onToggleSave={toggleSave}
                        index={i}
                        mode="browse"
                      />
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl px-8 py-16 text-center"
                >
                  <p
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    No words in this focus
                  </p>
                  <p className="text-sm text-muted max-w-sm mx-auto mb-6">
                    Try clearing a filter or switching categories — your library
                    is still here when you are ready.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
                    className="inline-flex h-10 px-5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors focus-ring"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Chip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex items-center gap-1.5 text-xs capitalize px-2.5 py-1 rounded-full glass-sm text-muted hover:text-foreground transition-colors focus-ring"
    >
      {label}
      <span className="text-muted/80" aria-hidden>
        ×
      </span>
    </button>
  );
}
