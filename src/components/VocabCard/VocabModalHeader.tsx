"use client";

import { Bookmark, BookmarkCheck, X } from "lucide-react";
import PronounceButton from "@/components/words/PronounceButton";
import type { IVocabulary } from "@/types";

interface VocabModalHeaderProps {
  vocab: IVocabulary;
  saved: boolean;
  onToggleSave: (id: string) => void;
  onClose: () => void;
}

export default function VocabModalHeader({
  vocab,
  saved,
  onToggleSave,
  onClose,
}: VocabModalHeaderProps) {
  const id = vocab._id ?? vocab.word;

  return (
    <div className="flex items-start justify-between gap-3 sm:gap-4 p-3.5 sm:p-5 pb-3 sm:pb-4 border-b border-border bg-surface/50 shrink-0">
      <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {vocab.word}
          </h2>

          <PronounceButton word={vocab.word} size="md" className="shrink-0" />

          {vocab.partOfSpeech && (
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-primary/15 text-primary-light border border-primary/20">
              {vocab.partOfSpeech}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs sm:text-sm">
          {vocab.phonetic && (
            <span className="text-muted font-medium tracking-wide" lang="en">
              {vocab.phonetic}
            </span>
          )}

          {vocab.phonetic && vocab.bengaliMeaning && (
            <span className="text-muted/40">•</span>
          )}

          {vocab.bengaliMeaning && (
            <span className="font-semibold text-cyan-400 dark:text-cyan-300">
              {vocab.bengaliMeaning}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={() => onToggleSave(id)}
          className={`p-2 sm:p-2.5 rounded-xl transition-all focus-ring ${
            saved
              ? "bg-primary text-white shadow-lg shadow-primary/30"
              : "glass-sm text-foreground hover:bg-primary/20"
          }`}
          aria-label={saved ? `Remove ${vocab.word} from saved` : `Save ${vocab.word}`}
          title={saved ? "Saved in Learn Later" : "Save for later"}
        >
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-xl glass-sm text-muted hover:text-foreground hover:bg-surface transition-colors focus-ring"
          aria-label="Close details modal"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
