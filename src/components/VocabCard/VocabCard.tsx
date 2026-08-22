"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  BookmarkCheck,
  Maximize2,
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import PronounceButton from "@/components/words/PronounceButton";
import VocabModal from "./VocabModal";
import type { SRSRating } from "./VocabSRSAction";
import type { IVocabulary, VocabDifficulty } from "@/types";

const DIFFICULTY_LABEL: Record<VocabDifficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

interface VocabCardFrontProps {
  vocab: IVocabulary;
  saved: boolean;
  onToggleSave: (id: string) => void;
  mode?: "browse" | "recall";
  isRevealed: boolean;
  onToggleReveal: () => void;
  onOpenModal: () => void;
  onOpenZoom: () => void;
}

function VocabCardFront({
  vocab,
  saved,
  onToggleSave,
  mode = "browse",
  isRevealed,
  onToggleReveal,
  onOpenModal,
  onOpenZoom,
}: VocabCardFrontProps) {
  const category = CATEGORIES.find((c) => c.slug === vocab.category);
  const id = vocab._id ?? vocab.word;
  const canFlip = mode === "recall";

  const [imgLoaded, setImgLoaded] = useState(false);

  // Pointer-follow tilt on the image
  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  }

  function resetTilt() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={() => canFlip && onToggleReveal()}
      onKeyDown={(e) => {
        if (canFlip && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onToggleReveal();
        }
      }}
      role={canFlip ? "button" : undefined}
      tabIndex={canFlip ? 0 : undefined}
      aria-pressed={canFlip ? isRevealed : undefined}
      style={{ perspective: 800 }}
      className={`relative aspect-[4/3] overflow-hidden bg-elevated focus-ring ${
        canFlip ? "cursor-pointer" : ""
      }`}
    >
      {/* Skeleton loading pulse */}
      {!imgLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-elevated to-elevated/50" />
      )}

      {/* Tiltable Background Image */}
      <motion.div
        style={{ rotateX: springX, rotateY: springY, scale: 1.04 }}
        className="absolute inset-0"
      >
        <Image
          src={vocab.imageUrl}
          alt={`Visual memory for ${vocab.word}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImgLoaded(true)}
          className={`object-cover transition-all duration-500 group-hover:scale-[1.05] ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>

      {/* High-legibility dark gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-45% to-transparent pointer-events-none" />

      {/* Top Action Bar */}
      {category && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-md z-10">
          <span aria-hidden>{category.icon}</span>
          {category.name}
        </span>
      )}

      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenZoom();
          }}
          className="p-2 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 hover:scale-105 transition-all focus-ring shadow-md"
          aria-label={`View larger image for ${vocab.word}`}
          title="Zoom image"
        >
          <Maximize2 size={15} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(id);
          }}
          className={`p-2 rounded-full transition-all focus-ring shadow-md ${
            saved
              ? "bg-primary text-white shadow-primary/40 ring-2 ring-primary/30 hover:scale-105"
              : "text-white bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 hover:scale-105"
          }`}
          aria-label={saved ? `Remove ${vocab.word} from saved` : `Save ${vocab.word}`}
          title={saved ? "Saved" : "Save for later"}
        >
          {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {/* Bottom Action Bar (Revealed vs Recall Hidden) */}
      <AnimatePresence mode="wait">
        {isRevealed ? (
          <motion.div
            key="revealed"
            initial={canFlip ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 inset-x-0 p-4 pt-10 flex flex-col gap-1 z-10"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <h3
                  className="text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {vocab.word}
                </h3>
                <PronounceButton word={vocab.word} className="shrink-0" />
              </div>

             
            </div>

            {vocab.phonetic && (
              <p
                className="text-xs font-medium text-white/80 tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                lang="en"
              >
                {vocab.phonetic}
              </p>
            )}

            {vocab.bengaliMeaning && (
              <p className="text-sm font-semibold text-cyan-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {vocab.bengaliMeaning}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-3 inset-x-0 flex justify-center z-10"
          >
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-md">
              <Sparkles size={12} className="text-amber-300" />
              Tap to reveal the word
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export interface VocabCardProps {
  vocab: IVocabulary;
  saved: boolean;
  onToggleSave: (id: string) => void;
  index?: number;
  mode?: "browse" | "recall";
  onSrsRate?: (id: string, rating: SRSRating) => void;
}

export default function VocabCard({
  vocab,
  saved,
  onToggleSave,
  index = 0,
  mode = "browse",
  onSrsRate,
}: VocabCardProps) {
  const canFlip = mode === "recall";

  const [isRevealed, setIsRevealed] = useState(!canFlip);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setIsRevealed(!canFlip);
  }, [canFlip]);

  // Image zoom escape key listener & scroll lock
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [zoomed]);

  const handleSrsRate = (rating: SRSRating) => {
    if (onSrsRate && vocab._id) {
      onSrsRate(vocab._id, rating);
    }
  };

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
        className="group relative flex flex-col overflow-hidden rounded-2xl glass glow-effect transition-transform duration-300"
      >
        {/* Front Card Element */}
        <VocabCardFront
          vocab={vocab}
          saved={saved}
          onToggleSave={onToggleSave}
          mode={mode}
          isRevealed={isRevealed}
          onToggleReveal={() => setIsRevealed((r) => !r)}
          onOpenModal={() => setIsModalOpen(true)}
          onOpenZoom={() => setZoomed(true)}
        />

        {/* Card Body */}
        <AnimatePresence initial={false}>
          {isRevealed && (
            <motion.div
              initial={canFlip ? { height: 0, opacity: 0 } : false}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2.5 p-4 pt-3">
                {vocab.englishMeaning && (
                  <div>
                    <p className="text-xs font-semibold text-foreground/90">
                      {vocab.englishMeaning}
                    </p>
                    {vocab.englishMeaningBengali && (
                      <p className="text-xs text-muted mt-0.5 font-medium">
                        {vocab.englishMeaningBengali}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  {vocab.difficulty ? (
                    <span
                      className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md border ${
                        vocab.difficulty === "beginner"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                          : vocab.difficulty === "intermediate"
                            ? "bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30"
                            : "bg-purple-500/10 text-purple-800 dark:text-purple-300 border-purple-500/30"
                      }`}
                    >
                      {DIFFICULTY_LABEL[vocab.difficulty]}
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-light hover:text-primary transition-colors focus-ring"
                  >
                    <span>Deep Dive</span>
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>

      {/* AI-Powered Detail Modal Popup */}
      <VocabModal
        vocab={vocab}
        isOpen={isModalOpen}
        saved={saved}
        onToggleSave={onToggleSave}
        onClose={() => setIsModalOpen(false)}
        onSrsRate={handleSrsRate}
      />

      {/* Image Lightbox Preview */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden bg-elevated shadow-2xl border border-border"
            >
              <Image
                src={vocab.imageUrl}
                alt={`Visual memory for ${vocab.word}`}
                fill
                sizes="90vw"
                className="object-contain"
              />
              <button
                type="button"
                onClick={() => setZoomed(false)}
                className="absolute top-3 right-3 p-2 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 transition-all focus-ring shadow-md"
                aria-label="Close image preview"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center">
                <p className="text-white font-semibold drop-shadow-md text-lg">
                  {vocab.word}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function VocabCardSkeleton({ index = 0 }: { index?: number }) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-2xl glass glow-effect border border-border/50 bg-elevated/40 animate-pulse"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Front Image Area Skeleton */}
      <div className="relative aspect-[4/3] bg-surface/80 overflow-hidden flex flex-col justify-between p-4">
        {/* Top bar skeletons */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 rounded-full bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <div className="w-8 h-8 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Shimmer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent pointer-events-none" />

        {/* Bottom Title & Meaning Skeletons */}
        <div className="relative z-10 space-y-2">
          <div className="h-7 w-36 rounded-lg bg-white/15" />
          <div className="h-4 w-24 rounded-md bg-cyan-400/20" />
        </div>
      </div>

      {/* Card Body Skeleton */}
      <div className="flex flex-col gap-3 p-4 pt-3 bg-surface/30">
        <div className="space-y-1.5">
          <div className="h-4 w-full rounded bg-white/10" />
          <div className="h-3.5 w-3/4 rounded bg-white/5" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-16 rounded-md bg-white/10" />
          <div className="h-4 w-20 rounded bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
