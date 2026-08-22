import { Eye, Brain, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";

const METHOD_STEPS = [
  {
    step: "01",
    icon: Eye,
    title: "Visual Anchor Acquisition",
    desc: "Your brain processes imagery 60,000x faster than plain text. Each word connects to an evocative visual scene.",
    color: "from-primary/20 to-purple-500/10",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  {
    step: "02",
    icon: Brain,
    title: "AI Mnemonic & Native Nuance",
    desc: "Sound-alike phonetic hooks and Bengali cultural analogies anchor the meaning in your native cognitive framework.",
    color: "from-cyan-500/20 to-sky-500/10",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    step: "03",
    icon: RefreshCw,
    title: "Spaced Repetition (SRS)",
    desc: "Active recall flashcard grading automatically calculates ideal review intervals right before you forget.",
    color: "from-emerald-500/20 to-teal-500/10",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28 overflow-hidden">
      <Container size="xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm mb-4">
            <Sparkles size={14} className="text-amber-300" />
            <span>Scientifically Backed Cognitive System</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            How the <span className="gradient-text">Picword SRS System</span> works
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            A 3-step memory pipeline engineered to transition words from short-term
            recognition into permanent long-term active vocabulary.
          </p>
        </div>

        {/* 3 Step Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {METHOD_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-3xl glass glow-effect p-8 flex flex-col justify-between space-y-6 bg-elevated/70 border border-glass-border hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold gradient-text" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {item.step}
                    </span>
                    <div className={`p-3 rounded-2xl border ${item.badgeColor}`}>
                      <Icon size={22} />
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold tracking-tight text-foreground mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-medium text-foreground/80">
                  <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                  <span>
                    {idx === 0
                      ? "High-contrast visual memory"
                      : idx === 1
                        ? "Phonetic & conceptual retention"
                        : "Interval decay prevention"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
