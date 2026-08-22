"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, BookOpen, Layers } from "lucide-react";
import Container from "@/components/ui/Container";
import VocabCard from "@/components/VocabCard";
import { VOCABULARIES } from "@/data/vocabularies";
import { useSavedWords } from "@/hooks/useSavedWords";

const HERO_STATS = [
  { label: "Visual Words", value: "500+" },
  { label: "Curated Categories", value: "12" },
  { label: "Memory Retention", value: "98%" },
];

export default function HeroSection() {
  const { isSaved, toggleSave } = useSavedWords();
  const demoWord = VOCABULARIES[0]; // "Ephemeral"
  const demoId = demoWord._id ?? demoWord.word;

  return (
    <section className="relative z-10 pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase text-accent-light glass-sm animate-fade-in-up">
              <Sparkles size={13} className="text-amber-300" />
              <span>Next-Gen Visual Vocabulary Learning</span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] animate-fade-in-up"
              style={{ fontFamily: "var(--font-space-grotesk)", animationDelay: "0.1s" }}
            >
              Master words visually with{" "}
              <span className="gradient-text">AI Memory Anchors</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-base sm:text-lg text-muted max-w-xl leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Say goodbye to tedious rote memorization. Each word is paired with
              vivid imagery, Bengali nuance definitions, and sound-alike AI
              mnemonics designed to stick forever.
            </p>

            {/* Action Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/words"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-white font-semibold transition-all hover:bg-primary-light hover:scale-105 glow-effect shadow-lg shadow-primary/25"
              >
                <BookOpen size={16} />
                <span>Explore Word Library</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/words?mode=recall"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full glass hover:bg-surface/80 text-foreground font-semibold transition-all hover:scale-105"
              >
                <Layers size={16} className="text-primary-light" />
                <span>Active Recall Practice</span>
              </Link>
            </div>

            {/* Stats Counter Ribbon */}
            <div
              className="grid grid-cols-3 gap-6 sm:gap-10 pt-8 border-t border-border/50 w-full animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span
                    className="text-2xl sm:text-3xl font-bold gradient-text"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Live Interactive VocabCard Preview */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Ambient Backlight for Card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/15 to-emerald-500/10 rounded-3xl blur-2xl pointer-events-none" />

            <div className="w-full max-w-sm sm:max-w-md relative z-10">
              {/* Card Hint Badge */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-medium text-muted flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Interactive Flashcard
                </span>
                <span className="text-[11px] text-accent-light">
                  Tap to deep-dive
                </span>
              </div>

              {/* Render Full Featured VocabCard */}
              <VocabCard
                vocab={demoWord}
                saved={isSaved(demoId)}
                onToggleSave={toggleSave}
                index={0}
                mode="browse"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
