"use client";

import { Sparkles, Brain, Flame, Zap, ShieldCheck, Star } from "lucide-react";

export default function AuthHeroVisual() {
  return (
    <div className="relative h-full w-full rounded-3xl p-8 lg:p-12 overflow-hidden flex flex-col justify-between border border-glass-border glass bg-gradient-to-br from-elevated/90 via-surface/80 to-background/90 shadow-2xl">
      {/* Background Ambient Glow Orbs */}
      <div
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-primary/20 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent/20 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header & Value Proposition */}
      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm border border-accent/20 shadow-sm">
          <Sparkles size={13} className="animate-pulse text-accent" />
          <span>Visual Memory Acceleration</span>
        </div>

        <h2
          className="text-3xl lg:text-4xl font-extrabold text-foreground leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Retain words <span className="gradient-text">3x faster</span> with Dual-Coding & FSRS.
        </h2>

        <p className="text-sm text-muted leading-relaxed max-w-md">
          Say goodbye to boring rote memorization. Master English vocabulary
          with vivid visual anchors, Bengali context, and personalized spaced repetition.
        </p>
      </div>

      {/* Centerpiece: Interactive Visual Vocabulary Teaser Card */}
      <div className="relative z-10 my-8">
        <div className="rounded-2xl glass glow-effect p-5 border border-primary/20 bg-elevated/70 shadow-xl transition-all duration-300 hover:scale-[1.02]">
          {/* Card Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌸</span>
              <div>
                <span className="text-base font-bold text-foreground">Ephemeral</span>
                <span className="text-xs text-muted ml-2 font-mono">/ɪˈfemərəl/</span>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Advanced • Nature
            </span>
          </div>

          {/* Bengali Meaning Highlight */}
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted block">Bengali Definition</span>
              <span className="text-base font-bold text-cyan-300">ক্ষণস্থায়ী (Lasting for a brief time)</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Brain size={16} />
            </div>
          </div>

          {/* AI Sound-Alike Mnemonic Anchor */}
          <div className="p-3 rounded-xl bg-surface/80 border border-border/70 text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Sparkles size={12} />
              <span>AI Visual Mnemonic Anchor</span>
            </div>
            <p className="text-muted leading-relaxed text-[11px]">
              Sounds like <strong className="text-foreground">E-Floral</strong> — like delicate cherry blossoms that vanish softly in the spring breeze.
            </p>
          </div>
        </div>

        {/* Floating Gamification Pills */}
        <div className="absolute -top-4 -right-2 sm:-right-4 rounded-full glass px-3.5 py-1.5 border border-amber-500/30 bg-surface/90 shadow-lg flex items-center gap-1.5 text-xs font-bold text-amber-400 animate-bounce duration-1000">
          <Flame size={14} className="text-amber-500" />
          <span>14-Day Streak</span>
        </div>

        <div className="absolute -bottom-4 -left-2 sm:-left-4 rounded-full glass px-3.5 py-1.5 border border-emerald-500/30 bg-surface/90 shadow-lg flex items-center gap-1.5 text-xs font-bold text-emerald-400">
          <Zap size={14} className="text-emerald-500" />
          <span>+25 XP Boost</span>
        </div>
      </div>

      {/* Bottom Social Proof & Trust Badges */}
      <div className="relative z-10 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar Stack */}
          <div className="flex -space-x-2">
            {["alex", "sam", "maya", "tariq"].map((name, i) => (
              <img
                key={name}
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${name}`}
                alt="Learner"
                className="w-7 h-7 rounded-full border-2 border-surface bg-elevated shadow-sm"
              />
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11} fill="currentColor" />
              ))}
            </div>
            <span className="text-[11px] text-muted font-medium">
              Join <strong>2,480+</strong> learners today
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted font-medium">
          <ShieldCheck size={15} className="text-emerald-400" />
          <span>Privacy Guaranteed</span>
        </div>
      </div>
    </div>
  );
}
