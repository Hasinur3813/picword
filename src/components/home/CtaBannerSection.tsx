import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";

export default function CtaBannerSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28 overflow-hidden">
      <Container size="lg">
        <div className="relative overflow-hidden rounded-3xl glass glow-effect text-center px-6 py-14 sm:px-12 sm:py-20 border border-glass-border bg-elevated/90">
          {/* Ambient Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm">
              <Sparkles size={13} className="text-amber-300" />
              <span>Zero Friction • 100% Free To Explore</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Ready to expand your vocabulary with{" "}
              <span className="gradient-text">visual memory</span>?
            </h2>

            <p className="text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed">
              Join learners across the world building permanent fluency through visual
              flashcards, native Bengali nuances, and AI mnemonics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/words"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-white font-semibold transition-all hover:bg-primary-light hover:scale-105 glow-effect shadow-xl shadow-primary/30"
              >
                <BookOpen size={16} />
                <span>Start Learning Free</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/words?mode=recall"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full glass hover:bg-surface/80 text-foreground font-semibold transition-all hover:scale-105"
              >
                <span>Test Active Recall Mode</span>
              </Link>
            </div>

            {/* Micro guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Mobile & desktop optimized
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Spaced repetition algorithm
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
