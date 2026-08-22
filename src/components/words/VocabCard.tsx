"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Bookmark,
  BookmarkCheck,
  Maximize2,
  Sparkles,
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
  /**
   * "browse" (default) shows the word right away — good for scanning a grid.
   * "recall" hides the word behind the image until tapped, so the image
   * itself becomes the prompt learners test themselves against.
   */
  mode?: "browse" | "recall";
}

export default function VocabCard({
  vocab,
  saved,
  onToggleSave,
  index = 0,
  mode = "browse",
}: VocabCardProps) {
  const category = CATEGORIES.find((c) => c.slug === vocab.category);
  const id = vocab._id ?? vocab.word;
  const canFlip = mode === "recall";

  const [imgLoaded, setImgLoaded] = useState(false);
  const [revealed, setRevealed] = useState(!canFlip);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setRevealed(!canFlip);
  }, [canFlip]);

  // Pointer-follow tilt on the image only, so it feels like a physical
  // object you can turn in your hand rather than a flat photo.
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

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <>
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.28) }}
        className="group relative flex flex-col overflow-hidden rounded-2xl glass glow-effect transition-transform duration-300"
      >
        {/* Image — the actual learning content, so it gets the space and the polish */}
        <div
          ref={frameRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
          onClick={() => canFlip && setRevealed((r) => !r)}
          onKeyDown={(e) => {
            if (canFlip && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setRevealed((r) => !r);
            }
          }}
          role={canFlip ? "button" : undefined}
          tabIndex={canFlip ? 0 : undefined}
          aria-pressed={canFlip ? revealed : undefined}
          aria-label={
            canFlip
              ? revealed
                ? `Hide word for ${vocab.word}`
                : `Reveal word for ${vocab.word}`
              : undefined
          }
          style={{ perspective: 800 }}
          className={`relative aspect-[4/3] overflow-hidden bg-elevated focus-ring ${
            canFlip ? "cursor-pointer" : ""
          }`}
        >
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-elevated to-elevated/50" />
          )}

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

          {/* High-legibility dark gradient scrim so text is sharp & crisp regardless of image brightness or site theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 via-45% to-transparent pointer-events-none" />

          {category && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-md">
              <span aria-hidden>{category.icon}</span>
              {category.name}
            </span>
          )}

          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setZoomed(true);
              }}
              className="p-2 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 hover:bg-black/70 hover:scale-105 transition-all focus-ring shadow-md"
              aria-label={`View larger image for ${vocab.word}`}
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
              aria-label={
                saved
                  ? `Remove ${vocab.word} from learn later`
                  : `Save ${vocab.word} to learn later`
              }
              aria-pressed={saved}
            >
              {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {revealed ? (
              <motion.div
                key="revealed"
                initial={canFlip ? { opacity: 0, y: 10 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-0 inset-x-0 p-4 pt-10"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
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
                    className="text-xs font-medium text-white/80 mt-1 tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                    lang="en"
                    aria-label={`Pronounced ${vocab.phonetic}`}
                  >
                    {vocab.phonetic}
                  </p>
                )}

                {vocab.bengaliMeaning && (
                  <p className="text-sm font-semibold text-cyan-300 mt-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
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
                className="absolute bottom-3 inset-x-0 flex justify-center"
              >
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full text-white bg-black/50 backdrop-blur-md border border-white/20 shadow-md">
                  <Sparkles size={12} className="text-amber-300" />
                  Tap to reveal the word
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Body */}
        <AnimatePresence initial={false}>
          {revealed && (
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

                {vocab.bengaliDetails && (
                  <div className="p-2.5 rounded-xl bg-surface/60 border border-border/50 text-xs text-foreground/85 leading-relaxed">
                    <span className="font-semibold text-primary block mb-0.5 text-[11px] uppercase tracking-wide">বিবরণ ও ব্যবহার:</span>
                    {vocab.bengaliDetails}
                  </div>
                )}

                {vocab.exampleSentence && (
                  <div className="text-xs border-l-2 border-primary/50 pl-2.5 py-0.5 space-y-0.5">
                    <p className="italic text-foreground/90">
                      &ldquo;{vocab.exampleSentence}&rdquo;
                    </p>
                    {vocab.exampleSentenceBengali && (
                      <p className="text-muted not-italic text-[11px]">
                        {vocab.exampleSentenceBengali}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center pt-1">
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
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.article>

      {/* Full-size preview — for words where the detail in the image is the point */}
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
              exit={{ scale: 0.94, opacity: 0 }}
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