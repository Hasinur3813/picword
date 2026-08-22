"use client";

import { useState } from "react";
import {
  BookOpen,
  Sparkles,
  Layers,
  Copy,
  Check,
  Bot,
  Lightbulb,
  Tag,
} from "lucide-react";
import type { IVocabulary } from "@/types";

interface VocabModalTabsProps {
  vocab: IVocabulary;
  onAiActionTrigger?: (action: string) => void;
}

type TabType = "usage" | "mnemonic" | "relations";

export default function VocabModalTabs({
  vocab,
  onAiActionTrigger,
}: VocabModalTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("usage");
  const [copiedTerm, setCopiedTerm] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTerm(text);
    setTimeout(() => setCopiedTerm(null), 1800);
  };

  const handleTriggerAi = (action: string) => {
    setAiLoading(true);
    if (onAiActionTrigger) onAiActionTrigger(action);
    setTimeout(() => setAiLoading(false), 1200);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      {/* Tabs Header (Scrollable horizontally on mobile screens) */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-border bg-surface/30 px-3 sm:px-5 pt-1.5 sm:pt-2 gap-1 sm:gap-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("usage")}
          className={`inline-flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition-all focus-ring whitespace-nowrap shrink-0 ${
            activeTab === "usage"
              ? "border-primary text-primary-light bg-primary/5 rounded-t-xl"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <BookOpen size={14} />
          Meaning & Usage
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mnemonic")}
          className={`inline-flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition-all focus-ring whitespace-nowrap shrink-0 ${
            activeTab === "mnemonic"
              ? "border-primary text-primary-light bg-primary/5 rounded-t-xl"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <Sparkles size={14} className="text-amber-400" />
          AI Mnemonic Hook
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("relations")}
          className={`inline-flex items-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-semibold border-b-2 transition-all focus-ring whitespace-nowrap shrink-0 ${
            activeTab === "relations"
              ? "border-primary text-primary-light bg-primary/5 rounded-t-xl"
              : "border-transparent text-muted hover:text-foreground"
          }`}
        >
          <Layers size={14} />
          Synonyms & Antonyms
        </button>
      </div>

      {/* Tab Body (Dynamic height flex-grow with internal smooth scroll) */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 custom-scrollbar space-y-4 sm:space-y-5">
        {/* TAB 1: Meaning & Usage */}
        {activeTab === "usage" && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Definitions Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-elevated/70 border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                  English Definition
                </span>
              </div>
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {vocab.englishMeaning}
              </p>
              {vocab.englishMeaningBengali && (
                <p className="text-xs text-cyan-400 dark:text-cyan-300 font-medium">
                  {vocab.englishMeaningBengali}
                </p>
              )}
            </div>

            {/* Detailed Usage Note in Bangla */}
            {(vocab.bengaliDetails || vocab.description) && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-border/60 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary-light flex items-center gap-1.5">
                  <Lightbulb size={13} />
                  বাংলা বিস্তারিত ব্যাখ্যা ও ব্যবহার বিধি
                </span>
                <p className="text-xs leading-relaxed text-foreground/90">
                  {vocab.bengaliDetails ?? vocab.description}
                </p>
              </div>
            )}

            {/* Context-Tagged Example Sentences */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Contextual Example Sentences
                </span>
                <button
                  type="button"
                  onClick={() => handleTriggerAi("explain_context")}
                  disabled={aiLoading}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary-light hover:text-primary glass-sm px-2.5 py-1 rounded-lg transition-colors focus-ring"
                >
                  <Bot size={13} />
                  {aiLoading ? "AI Generating..." : "Generate AI Context"}
                </button>
              </div>

              {vocab.exampleSentences && vocab.exampleSentences.length > 0 ? (
                <div className="space-y-2">
                  {vocab.exampleSentences.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-elevated/40 border border-border/40 space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-foreground italic">
                          &ldquo;{ex.english}&rdquo;
                        </p>
                        {ex.context && (
                          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary-light border border-primary/20 shrink-0">
                            {ex.context}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted">{ex.bengali}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-elevated/40 border border-border/40 space-y-1">
                  <p className="text-xs font-medium text-foreground italic">
                    &ldquo;{vocab.exampleSentence ?? "Practice using this word in daily sentences."}&rdquo;
                  </p>
                  {vocab.exampleSentenceBengali && (
                    <p className="text-[11px] text-muted">
                      {vocab.exampleSentenceBengali}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI Visual Mnemonic */}
        {activeTab === "mnemonic" && (
          <div className="space-y-4 animate-fade-in-up">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-surface to-accent/5 border border-primary/20 space-y-3">
              <div className="flex items-center gap-2 text-primary-light">
                <Sparkles size={16} />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  AI Sound-Alike & Visual Memory Trigger
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-foreground/80 block mb-0.5">
                    Memory Analogy Hook:
                  </span>
                  <p className="text-muted leading-relaxed">
                    {vocab.mnemonic?.analogy ??
                      `Associate "${vocab.word}" with a vivid visual scene. Imagine the feeling when something occurs in a brief, unforgettable flash.`}
                  </p>
                </div>

                {vocab.mnemonic?.bengaliAnalogy && (
                  <div className="pt-2 border-t border-border/40">
                    <span className="font-semibold text-cyan-400 block mb-0.5">
                      বাংলায় মনে রাখার কৌশল:
                    </span>
                    <p className="text-foreground/90 leading-relaxed">
                      {vocab.mnemonic.bengaliAnalogy}
                    </p>
                  </div>
                )}

                {vocab.mnemonic?.visualPrompt && (
                  <div className="pt-2 border-t border-border/40">
                    <span className="font-semibold text-amber-400 block mb-0.5">
                      Visual Prompt Anchor:
                    </span>
                    <p className="italic text-muted">
                      &ldquo;{vocab.mnemonic.visualPrompt}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-elevated/50 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Bot size={18} className="text-cyan-400 shrink-0" />
                <span className="text-xs text-muted">
                  Need a custom memory hook tailored to your interests?
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleTriggerAi("rebuild_mnemonic")}
                disabled={aiLoading}
                className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-light transition-all shrink-0 focus-ring"
              >
                {aiLoading ? "Building..." : "Generate AI Mnemonic"}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Relations (Synonyms & Antonyms) */}
        {activeTab === "relations" && (
          <div className="space-y-5 animate-fade-in-up">
            {/* Synonyms */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Tag size={13} className="text-emerald-400" />
                Synonyms (সমার্থক শব্দ)
              </span>
              {vocab.synonyms && vocab.synonyms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {vocab.synonyms.map((syn) => (
                    <button
                      key={syn}
                      type="button"
                      onClick={() => handleCopy(syn)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 text-xs font-medium hover:bg-emerald-500/20 transition-all focus-ring"
                      title="Click to copy"
                    >
                      <span>{syn}</span>
                      {copiedTerm === syn ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} className="opacity-60" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">No synonyms available.</p>
              )}
            </div>

            {/* Antonyms */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                <Tag size={13} className="text-red-400" />
                Antonyms (বিপরীতার্থক শব্দ)
              </span>
              {vocab.antonyms && vocab.antonyms.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {vocab.antonyms.map((ant) => (
                    <button
                      key={ant}
                      type="button"
                      onClick={() => handleCopy(ant)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-300 border border-red-500/20 text-xs font-medium hover:bg-red-500/20 transition-all focus-ring"
                      title="Click to copy"
                    >
                      <span>{ant}</span>
                      {copiedTerm === ant ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} className="opacity-60" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted">No antonyms listed.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
