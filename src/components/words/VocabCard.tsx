"use client";

import Image from "next/image";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import PronounceButton from "@/components/words/PronounceButton";
import type { IVocabulary, VocabDifficulty } from "@/types";

const DIFFICULTY_LABEL: Record<VocabDifficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface VocabCardProps {
  vocab: IVocabulary;
  saved: boolean;
  onToggleSave: (id: string) => void;
  index?: number;
}

export default function VocabCard({
  vocab,
  saved,
  onToggleSave,
  index = 0,
}: VocabCardProps) {
  const category = CATEGORIES.find((c) => c.slug === vocab.category);
  const id = vocab._id ?? vocab.word;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
      className="group relative flex flex-col overflow-hidden rounded-2xl glass glow-effect transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
        <Image
          src={vocab.imageUrl}
          alt={`Visual memory for ${vocab.word}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        {/* Category chip */}
        {category && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full glass-sm text-foreground">
            <span aria-hidden>{category.icon}</span>
            {category.name}
          </span>
        )}

        {/* Save */}
        <button
          type="button"
          onClick={() => onToggleSave(id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all focus-ring ${
            saved
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "glass-sm text-foreground hover:bg-primary/20"
          }`}
          aria-label={saved ? `Remove ${vocab.word} from learn later` : `Save ${vocab.word} to learn later`}
          aria-pressed={saved}
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>

        {/* Word overlay on image */}
        <div className="absolute bottom-0 inset-x-0 p-4 pt-8">
          <div className="flex items-start gap-2">
            <h3
              className="text-2xl font-bold tracking-tight text-white drop-shadow-sm"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {vocab.word}
            </h3>
            <PronounceButton word={vocab.word} className="mt-1 shrink-0" />
          </div>

          {vocab.phonetic && (
            <p
              className="text-xs text-white/70 mt-1 tracking-wide"
              lang="en"
              aria-label={`Pronounced ${vocab.phonetic}`}
            >
              {vocab.phonetic}
            </p>
          )}

          <p className="text-sm font-medium text-accent-light mt-1">
            {vocab.bengaliMeaning}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 pt-3 gap-3">
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {vocab.description}
        </p>

        <div className="mt-auto flex items-center pt-1">
          {vocab.difficulty ? (
            <span
              className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md ${
                vocab.difficulty === "beginner"
                  ? "bg-success/15 text-success"
                  : vocab.difficulty === "intermediate"
                    ? "bg-warning/15 text-warning"
                    : "bg-primary/15 text-primary-light"
              }`}
            >
              {DIFFICULTY_LABEL[vocab.difficulty]}
            </span>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
