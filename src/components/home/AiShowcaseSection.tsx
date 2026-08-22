"use client";

import { useState } from "react";
import { Sparkles, Bot, Lightbulb, Check, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";

interface ContextSentence {
  type: "daily" | "academic" | "business";
  label: string;
  badge: string;
  sentence: string;
  bengali: string;
}

const CONTEXT_EXAMPLES: Record<string, ContextSentence[]> = {
  Ephemeral: [
    {
      type: "daily",
      label: "Daily Life",
      badge: "Everyday",
      sentence: "The morning rainbow was ephemeral, fading within minutes after the rain.",
      bengali: "সকালের রংধনুটি ক্ষণস্থায়ী ছিল, বৃষ্টির কিছুক্ষণ পরেই তা মিলিয়ে গেল।",
    },
    {
      type: "academic",
      label: "Academic & Research",
      badge: "IELTS / GRE",
      sentence: "Digital trends often have an ephemeral impact on cultural traditions.",
      bengali: "সাংস্কৃতিক ঐতিহ্যের ওপর ডিজিটাল ট্রেন্ডগুলোর প্রভাব প্রায়শই ক্ষণস্থায়ী হয়।",
    },
    {
      type: "business",
      label: "Business & Work",
      badge: "Corporate",
      sentence: "A viral spike in website traffic can be ephemeral without strong product retention.",
      bengali: "পণ্য ব্যবহারের স্থায়িত্ব না থাকলে ওয়েবসাইটের ভাইরাল ভিজিটর বৃদ্ধি ক্ষণস্থায়ী হতে পারে।",
    },
  ],
};

export default function AiShowcaseSection() {
  const [selectedWord] = useState("Ephemeral");
  const [activeContext, setActiveContext] = useState<"daily" | "academic" | "business">("academic");

  const currentSentences = CONTEXT_EXAMPLES[selectedWord] ?? CONTEXT_EXAMPLES["Ephemeral"];
  const activeExample = currentSentences.find((s) => s.type === activeContext) ?? currentSentences[0];

  return (
    <section className="relative z-10 py-20 sm:py-28 overflow-hidden">
      <Container size="xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm mb-4">
            <Bot size={14} className="text-cyan-400" />
            <span>AI-Powered Memory Technology</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            How AI creates <span className="gradient-text">unbreakable memory anchors</span>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Picword doesn't just give you a static dictionary. Our AI connects
            abstract English concepts to vivid Bengali analogies and multi-domain
            contexts.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Feature 1: Sound-Alike Mnemonic */}
          <div className="rounded-3xl glass glow-effect p-7 sm:p-8 flex flex-col justify-between space-y-6 bg-elevated/70 border border-glass-border">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 text-primary-light flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles size={24} />
              </div>
              <h3
                className="text-xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                1. Sound-Alike Mnemonics
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Connects foreign-sounding words with familiar phonetics and vivid mental imagery.
              </p>

              {/* Sample Hook Box */}
              <div className="p-4 rounded-2xl bg-surface/80 border border-border/80 text-xs space-y-1.5">
                <span className="font-semibold text-primary-light block">
                  Example Anchor:
                </span>
                <p className="text-foreground/90 italic">
                  &ldquo;Ephemeral sounds like &apos;E-Floral&apos; — blooming beautifully and vanishing overnight.&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <Check size={14} />
              <span>Cuts memorization time by 3x</span>
            </div>
          </div>

          {/* Feature 2: Native Bengali Nuance */}
          <div className="rounded-3xl glass glow-effect p-7 sm:p-8 flex flex-col justify-between space-y-6 bg-elevated/70 border border-glass-border">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Lightbulb size={24} />
              </div>
              <h3
                className="text-xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                2. Bengali Nuance Explanations
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Literal translation often fails. We bridge cultural nuances so you understand exact word usage.
              </p>

              {/* Sample Bangla Box */}
              <div className="p-4 rounded-2xl bg-surface/80 border border-border/80 text-xs space-y-1.5">
                <span className="font-semibold text-cyan-400 block">
                  বাংলা ব্যবহার বিধি:
                </span>
                <p className="text-foreground/90">
                  &ldquo;ইফেমারাল (Ephemeral) — মেঘের ভেলা বা বসন্তের ফুলের ক্ষণিকের রূপের মতো দ্রুত বিলীন হওয়া বোঝায়।&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
              <Check size={14} />
              <span>Native language conceptual mapping</span>
            </div>
          </div>

          {/* Feature 3: Dynamic Multi-Context Sentences */}
          <div className="rounded-3xl glass glow-effect p-7 sm:p-8 flex flex-col justify-between space-y-6 bg-elevated/70 border border-glass-border">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Bot size={24} />
              </div>
              <h3
                className="text-xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                3. Scenario-Specific Contexts
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Generate real sentences customized for IELTS writing, IELTS speaking, office emails, or daily chat.
              </p>

              {/* Interactive Scenario Switcher */}
              <div className="p-4 rounded-2xl bg-surface/80 border border-border/80 space-y-3">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-elevated border border-border">
                  {(["daily", "academic", "business"] as const).map((ctx) => (
                    <button
                      key={ctx}
                      type="button"
                      onClick={() => setActiveContext(ctx)}
                      className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all ${
                        activeContext === ctx
                          ? "bg-primary text-white shadow-sm"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>

                <div className="text-xs space-y-1">
                  <p className="italic text-foreground/90 font-medium">
                    &ldquo;{activeExample.sentence}&rdquo;
                  </p>
                  <p className="text-muted text-[11px]">{activeExample.bengali}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <Check size={14} />
              <span>Multi-domain context fluency</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
