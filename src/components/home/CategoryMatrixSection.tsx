import Link from "next/link";
import { ArrowRight, Grid } from "lucide-react";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/data/categories";

export default function CategoryMatrixSection() {
  return (
    <section id="categories" className="relative z-10 py-20 sm:py-28 bg-surface/30 border-y border-border/40">
      <Container size="xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm mb-3">
              <Grid size={13} />
              <span>Curated Domains</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Browse by <span className="gradient-text-glow">Category Matrix</span>
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-lg mt-2">
              Structured pathways designed for exam preparation, workplace communication, and everyday fluency.
            </p>
          </div>

          <Link
            href="/words"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-primary transition-colors group"
          >
            <span>View all words library</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/words?category=${cat.slug}`}
              className="group rounded-3xl glass glow-effect p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 bg-elevated/70 flex flex-col justify-between"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200">
                    {cat.icon}
                  </span>
                  <span className="text-xs font-semibold text-muted subtle-bg px-3 py-1 rounded-full border border-border/40">
                    {cat.wordCount} words
                  </span>
                </div>

                <h3
                  className="text-lg font-bold text-foreground group-hover:text-primary-light transition-colors mb-1.5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {cat.name}
                </h3>

                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-light mt-5 pt-3 border-t border-border/40 group-hover:text-primary transition-colors">
                <span>Start Learning</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
