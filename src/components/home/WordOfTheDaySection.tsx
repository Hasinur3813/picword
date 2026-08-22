"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Calendar, Bookmark, BookmarkCheck, ExternalLink, Lightbulb } from "lucide-react";
import Container from "@/components/ui/Container";
import PronounceButton from "@/components/words/PronounceButton";
import VocabModal from "@/components/VocabCard/VocabModal";
import { VOCABULARIES } from "@/data/vocabularies";
import { useSavedWords } from "@/hooks/useSavedWords";

export default function WordOfTheDaySection() {
  const { isSaved, toggleSave } = useSavedWords();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pick Word of the Day (e.g. index 1: "Resilient")
  const wordOfTheDay = VOCABULARIES[1] ?? VOCABULARIES[0];
  const id = wordOfTheDay._id ?? wordOfTheDay.word;
  const saved = isSaved(id);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(new Date());

  return (
    <section className="relative z-10 py-16 sm:py-24 border-y border-border/40 bg-surface/30">
      <Container size="xl">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm mb-3">
            <Calendar size={13} />
            <span>{formattedDate} — Word of the Day</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Learn something <span className="gradient-text-glow">new daily</span>
          </h2>
          <p className="text-muted text-sm sm:text-base max-w-lg mt-2">
            Build a consistent habit with one rich vocabulary insight every day.
          </p>
        </div>

        {/* Featured Word Banner Card */}
        <div className="relative rounded-3xl glass glow-effect overflow-hidden bg-elevated/80 border border-glass-border p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Image Column */}
            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border">
              <Image
                src={wordOfTheDay.imageUrl}
                alt={`Visual anchor for ${wordOfTheDay.word}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/80 backdrop-blur-md">
                  {wordOfTheDay.category}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              {/* Header Title & Pronounce */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {wordOfTheDay.word}
                    </h3>
                    <PronounceButton word={wordOfTheDay.word} size="md" />
                    {wordOfTheDay.difficulty && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {wordOfTheDay.difficulty}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted mt-1" lang="en">
                    {wordOfTheDay.phonetic}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSave(id)}
                  className={`p-3 rounded-2xl transition-all focus-ring shadow-md ${
                    saved
                      ? "bg-primary text-white shadow-primary/30"
                      : "glass-sm text-foreground hover:bg-primary/20"
                  }`}
                  aria-label={saved ? "Saved" : "Save for later"}
                  title={saved ? "Saved in Learn Later" : "Save word"}
                >
                  {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                </button>
              </div>

              {/* Bengali & English Meanings */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-surface/60 border border-border/60">
                <p className="text-base sm:text-lg font-semibold text-cyan-300">
                  {wordOfTheDay.bengaliMeaning}
                </p>
                <p className="text-sm text-foreground/90 font-medium">
                  {wordOfTheDay.englishMeaning}
                </p>
              </div>

              {/* Example Sentence */}
              {wordOfTheDay.exampleSentence && (
                <div className="border-l-2 border-primary/60 pl-4 py-1 space-y-1">
                  <p className="text-sm italic text-foreground/90">
                    &ldquo;{wordOfTheDay.exampleSentence}&rdquo;
                  </p>
                  {wordOfTheDay.exampleSentenceBengali && (
                    <p className="text-xs text-muted">
                      {wordOfTheDay.exampleSentenceBengali}
                    </p>
                  )}
                </div>
              )}

              {/* AI Mnemonic Teaser */}
              {wordOfTheDay.mnemonic?.bengaliAnalogy && (
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs flex items-start gap-2.5 text-foreground/90">
                  <Lightbulb size={16} className="text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-primary-light block mb-0.5">
                      AI মনে রাখার কৌশল:
                    </span>
                    <span>{wordOfTheDay.mnemonic.bengaliAnalogy}</span>
                  </div>
                </div>
              )}

              {/* Deep Dive Action */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  {wordOfTheDay.synonyms?.slice(0, 3).map((syn) => (
                    <span
                      key={syn}
                      className="text-xs px-2.5 py-1 rounded-lg glass-sm text-muted"
                    >
                      {syn}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all hover:scale-105 shadow-md focus-ring"
                >
                  <Sparkles size={14} />
                  <span>Deep Dive Insights</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Modal Popup */}
      <VocabModal
        vocab={wordOfTheDay}
        isOpen={isModalOpen}
        saved={saved}
        onToggleSave={toggleSave}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
