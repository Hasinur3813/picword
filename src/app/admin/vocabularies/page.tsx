"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Trash2, Edit3, Eye, Sparkles } from "lucide-react";
import { VOCABULARIES } from "@/data/vocabularies";
import { CATEGORIES } from "@/data/categories";
import type { VocabDifficulty } from "@/types";

export default function AdminVocabulariesPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<VocabDifficulty | "all">("all");

  const filteredWords = VOCABULARIES.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(search.toLowerCase()) ||
      item.bengaliMeaning.includes(search) ||
      item.englishMeaning.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const matchesDifficulty =
      difficultyFilter === "all" || item.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Vocabulary Catalog Management
          </h2>
          <p className="text-xs text-muted">
            Manage word terms, visual images, Bengali definitions, and AI mnemonics ({filteredWords.length} words listed).
          </p>
        </div>

        <Link
          href="/admin/vocabularies/new"
          className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all hover:scale-105 shadow-md shrink-0 focus-ring"
        >
          <Plus size={15} />
          <span>Add New Vocabulary</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl glass border border-border/60 bg-elevated/50 flex flex-col sm:flex-row items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search word, Bengali or English meaning..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-48">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full h-10 px-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="w-full sm:w-40">
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as VocabDifficulty | "all")}
            className="w-full h-10 px-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl glass border border-border/60 overflow-hidden bg-elevated/50 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/80 text-muted uppercase text-[10px] tracking-wider border-b border-border/60">
              <tr>
                <th className="py-3.5 px-4">Word & Phonetic</th>
                <th className="py-3.5 px-4">Bengali Meaning</th>
                <th className="py-3.5 px-4">English Meaning</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Level</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredWords.length > 0 ? (
                filteredWords.map((word) => (
                  <tr key={word._id} className="hover-bg transition-colors">
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      <div className="flex items-center gap-2">
                        <span>{word.word}</span>
                        {word.mnemonic?.bengaliAnalogy && (
                          <Sparkles size={13} className="text-amber-400" title="Has AI Mnemonic" />
                        )}
                      </div>
                      <span className="block text-[11px] font-normal text-muted">
                        {word.phonetic}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">
                      {word.bengaliMeaning}
                    </td>
                    <td className="py-3.5 px-4 text-foreground/90 max-w-xs truncate">
                      {word.englishMeaning}
                    </td>
                    <td className="py-3.5 px-4 capitalize text-muted">
                      {word.category}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {word.difficulty}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/words?word=${word._id}`}
                          className="p-1.5 rounded-lg text-muted hover:text-foreground hover-bg transition-colors"
                          title="Preview in Catalog"
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-primary-light hover:text-primary hover-bg transition-colors"
                          title="Edit Vocabulary"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover-bg transition-colors"
                          title="Delete Vocabulary"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    No vocabulary items match your current filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
