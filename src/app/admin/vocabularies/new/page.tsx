"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import type { VocabFormData } from "@/types";

const INITIAL_FORM: VocabFormData = {
  word: "",
  phonetic: "",
  partOfSpeech: "adjective",
  imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop",
  bengaliMeaning: "",
  englishMeaning: "",
  bengaliDetails: "",
  exampleSentence: "",
  exampleSentenceBengali: "",
  mnemonic: {
    analogy: "",
    bengaliAnalogy: "",
    visualPrompt: "",
  },
  difficulty: "intermediate",
  category: "daily-life",
};

export default function AddVocabularyPage() {
  const [form, setForm] = useState<VocabFormData>(INITIAL_FORM);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/vocabularies"
            className="p-2 rounded-xl border border-border text-muted hover:text-foreground hover-bg transition-colors focus-ring"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Create Vocabulary Item
            </h2>
            <p className="text-xs text-muted">
              Add terms with visual memory anchors, Bengali translations, and AI mnemonics.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-semibold animate-fade-in-up">
            <CheckCircle2 size={16} />
            <span>Vocabulary Saved Successfully!</span>
          </div>
        )}
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Core Terms & Category */}
        <div className="rounded-2xl glass border border-border/60 p-6 bg-elevated/50 space-y-5">
          <h3
            className="text-sm font-bold text-foreground uppercase tracking-wider text-primary-light"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            1. Core Term Definition
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Word *
              </label>
              <input
                type="text"
                required
                value={form.word}
                onChange={(e) => setForm({ ...form, word: e.target.value })}
                placeholder="e.g. Ephemeral"
                className="w-full h-10 px-3.5 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Phonetic Pronunciation
              </label>
              <input
                type="text"
                value={form.phonetic}
                onChange={(e) => setForm({ ...form, phonetic: e.target.value })}
                placeholder="e.g. /ɪˈfemərəl/"
                className="w-full h-10 px-3.5 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Part of Speech
              </label>
              <select
                value={form.partOfSpeech}
                onChange={(e) =>
                  setForm({
                    ...form,
                    partOfSpeech: e.target.value as VocabFormData["partOfSpeech"],
                  })
                }
                className="w-full h-10 px-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="noun">Noun</option>
                <option value="verb">Verb</option>
                <option value="adjective">Adjective</option>
                <option value="adverb">Adverb</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Category *
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full h-10 px-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Difficulty Level *
              </label>
              <select
                value={form.difficulty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    difficulty: e.target.value as VocabFormData["difficulty"],
                  })
                }
                className="w-full h-10 px-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Meanings & Bengali Nuances */}
        <div className="rounded-2xl glass border border-border/60 p-6 bg-elevated/50 space-y-5">
          <h3
            className="text-sm font-bold text-foreground uppercase tracking-wider text-cyan-400"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            2. Meanings & Bengali Translations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                Bengali Meaning (বাংলা অর্থ) *
              </label>
              <input
                type="text"
                required
                value={form.bengaliMeaning}
                onChange={(e) =>
                  setForm({ ...form, bengaliMeaning: e.target.value })
                }
                placeholder="e.g. ক্ষণস্থায়ী"
                className="w-full h-10 px-3.5 rounded-xl bg-surface/80 border border-border/80 text-xs text-cyan-300 font-semibold focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                English Meaning *
              </label>
              <input
                type="text"
                required
                value={form.englishMeaning}
                onChange={(e) =>
                  setForm({ ...form, englishMeaning: e.target.value })
                }
                placeholder="e.g. Lasting for a very short time"
                className="w-full h-10 px-3.5 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              Bengali Detail Explanation (বিস্তারিত ব্যাখ্যা)
            </label>
            <textarea
              rows={3}
              value={form.bengaliDetails}
              onChange={(e) =>
                setForm({ ...form, bengaliDetails: e.target.value })
              }
              placeholder="Provide context and nuanced Bengali explanation..."
              className="w-full p-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Section 3: Visual Image & AI Mnemonics */}
        <div className="rounded-2xl glass border border-border/60 p-6 bg-elevated/50 space-y-5">
          <h3
            className="text-sm font-bold text-foreground uppercase tracking-wider text-amber-400 flex items-center gap-2"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <Sparkles size={16} />
            <span>3. Visual Memory Anchor & AI Mnemonic</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            <div className="sm:col-span-8 space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">
                  Visual Image URL (Unsplash / Cloudinary) *
                </label>
                <div className="relative">
                  <ImageIcon
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="url"
                    required
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    placeholder="https://images.unsplash.com/..."
                    className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted mb-1">
                  Bengali AI Sound-Alike Mnemonic (মনে রাখার কৌশল)
                </label>
                <textarea
                  rows={2}
                  value={form.mnemonic?.bengaliAnalogy ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mnemonic: {
                        ...form.mnemonic,
                        bengaliAnalogy: e.target.value,
                      },
                    })
                  }
                  placeholder="e.g. ইফেমারাল মনে রাখুন 'মেঘের ভেলা' যা আকাশে কিছুক্ষণ ভেসে থেকেই মিলিয়ে যায়।"
                  className="w-full p-3 rounded-xl bg-surface/80 border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="sm:col-span-4 flex flex-col items-center">
              <span className="text-xs font-medium text-muted mb-1 self-start">
                Image Preview
              </span>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-surface shadow-md">
                <Image
                  src={form.imageUrl}
                  alt="Visual memory preview"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href="/admin/vocabularies"
            className="h-11 px-6 rounded-xl border border-border/80 text-xs font-semibold text-muted hover:text-foreground hover-bg transition-colors focus-ring flex items-center"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="h-11 px-8 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all hover:scale-105 shadow-lg shadow-primary/25 flex items-center gap-2 focus-ring"
          >
            <Save size={16} />
            <span>Save Vocabulary</span>
          </button>
        </div>
      </form>
    </div>
  );
}
