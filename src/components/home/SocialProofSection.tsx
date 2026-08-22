import { Star, MessageSquare, Quote } from "lucide-react";
import Container from "@/components/ui/Container";

const TESTIMONIALS = [
  {
    name: "Rafiul Islam",
    role: "IELTS Candidate (Band 8.0)",
    avatar: "🧑‍🎓",
    badge: "IELTS Prep",
    quote:
      "The visual memory cards made abstract GRE/IELTS words finally stick. I went from confusing 'ephemeral' and 'evanescent' to using both naturally in my speaking and writing tasks.",
    stars: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Computer Science Student",
    avatar: "👩‍💻",
    badge: "Academic",
    quote:
      "Categorized learning paired with Bengali nuance definitions changed everything. The sound-alike AI mnemonics help me recall definitions within split-seconds during exams.",
    stars: 5,
  },
  {
    name: "Tanvir Ahmed",
    role: "Senior Software Engineer",
    avatar: "👨‍💼",
    badge: "Business English",
    quote:
      "Picword's SRS active recall system is superior to generic flashcards. Testing myself for just 5 minutes a day during my commute noticeably improved my workplace communication.",
    stars: 5,
  },
];

const METRICS = [
  { value: "500+", label: "Curated Visual Words", sub: "Regularly updated catalog" },
  { value: "15k+", label: "Daily Active Reviews", sub: "Spaced repetition sessions" },
  { value: "98%", label: "Long-Term Retention", sub: "Measured after 30 days" },
  { value: "4.9/5", label: "Learner Satisfaction", sub: "Across 2,400+ active learners" },
];

export default function SocialProofSection() {
  return (
    <section className="relative z-10 py-20 sm:py-28 bg-surface/40 border-y border-border/40 overflow-hidden">
      <Container size="xl">
        {/* Metric Ribbons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {METRICS.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl glass glow-effect p-6 sm:p-7 text-center flex flex-col items-center justify-center space-y-2 bg-elevated/60 border border-border/60"
            >
              <span
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {metric.value}
              </span>
              <span className="text-sm font-bold text-foreground">
                {metric.label}
              </span>
              <span className="text-xs text-muted">
                {metric.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm mb-3">
            <MessageSquare size={13} />
            <span>Learner Feedback</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Loved by <span className="gradient-text-glow">ambitious learners</span>
          </h2>
          <p className="text-muted text-sm sm:text-base mt-2">
            See how students and working professionals transform their English vocabulary.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl glass glow-effect p-8 flex flex-col justify-between space-y-6 bg-elevated/80 border border-glass-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.stars }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={20} className="text-primary-light/40" />
                </div>

                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.avatar}</span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary-light border border-primary/20 shrink-0">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
