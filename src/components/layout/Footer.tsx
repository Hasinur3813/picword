import Link from "next/link";
import Container from "@/components/ui/Container";
import { CATEGORIES } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/80 backdrop-blur-xl z-10">
      <Container size="xl" className="py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span
                className="text-2xl font-bold gradient-text"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Picword
              </span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Master English vocabulary visually through curated categories,
              Bengali definitions, AI mnemonics, and active recall practice.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted px-3 py-1 rounded-full glass-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Spaced Repetition Engine Active
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4
              className="text-xs font-semibold uppercase tracking-wider text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/words"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Word Library
                </Link>
              </li>
              <li>
                <Link
                  href="/words?mode=recall"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Active Recall Mode
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Learning Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div className="space-y-3">
            <h4
              className="text-xs font-semibold uppercase tracking-wider text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/words?category=${cat.slug}`}
                    className="text-muted hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Features */}
          <div className="space-y-3">
            <h4
              className="text-xs font-semibold uppercase tracking-wider text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Methodology
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>Visual Memory Anchors</li>
              <li>AI Mnemonic Hooks</li>
              <li>Bengali Nuance Context</li>
              <li>Spaced Repetition (SRS)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Picword. Visual Vocabulary Learning.</p>
          <div className="flex items-center gap-6">
            <span>Built for IELTS, GRE & Fluent Communication</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
