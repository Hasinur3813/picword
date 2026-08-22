import Link from "next/link";
import {
  BookOpen,
  FolderTree,
  Users,
  Sparkles,
  Plus,
  ArrowRight,
  Brain,
  CheckCircle2,
} from "lucide-react";
import { VOCABULARIES } from "@/data/vocabularies";
import { CATEGORIES } from "@/data/categories";

export default function AdminOverviewPage() {
  const totalWords = VOCABULARIES.length;
  const totalCategories = CATEGORIES.length;
  const recentWords = VOCABULARIES.slice(0, 5);

  const stats = [
    {
      title: "Total Vocabularies",
      value: totalWords,
      sub: "Active visual words",
      icon: BookOpen,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      title: "Categories",
      value: totalCategories,
      sub: "Curated learning sets",
      icon: FolderTree,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
    {
      title: "AI Mnemonics",
      value: totalWords,
      sub: "Sound-alike anchors",
      icon: Sparkles,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Active Learners",
      value: "2,480",
      sub: "+12% this week",
      icon: Users,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="rounded-3xl glass glow-effect p-6 sm:p-8 bg-elevated/70 border border-glass-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm">
            <Brain size={13} />
            <span>Platform Overview</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Welcome to <span className="gradient-text">Picword Admin</span>
          </h2>
          <p className="text-sm text-muted max-w-xl">
            Control vocabulary catalog seed data, AI sound-alike mnemonics,
            categories, and learner performance metrics.
          </p>
        </div>

        <Link
          href="/admin/vocabularies/new"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-2xl bg-primary text-white text-xs font-semibold hover:bg-primary-light transition-all hover:scale-105 shadow-lg shadow-primary/25 shrink-0 focus-ring"
        >
          <Plus size={16} />
          <span>Add Vocabulary</span>
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-2xl glass glow-effect p-5 bg-elevated/60 border border-border/60 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">
                  {item.title}
                </span>
                <div className={`p-2 rounded-xl border ${item.color}`}>
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <span
                  className="text-3xl font-extrabold text-foreground"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.value}
                </span>
                <p className="text-xs text-muted mt-0.5">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Vocabularies Table & Category Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Left Column */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3
              className="text-lg font-bold text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Recently Added Vocabularies
            </h3>
            <Link
              href="/admin/vocabularies"
              className="text-xs font-semibold text-primary-light hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>Manage all ({totalWords})</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="rounded-2xl glass border border-border/60 overflow-hidden bg-elevated/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface/80 text-muted uppercase text-[10px] tracking-wider border-b border-border/60">
                  <tr>
                    <th className="py-3 px-4">Word</th>
                    <th className="py-3 px-4">Bengali Meaning</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Difficulty</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {recentWords.map((word) => (
                    <tr key={word._id} className="hover-bg transition-colors">
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        {word.word}
                        <span className="block text-[11px] font-normal text-muted">
                          {word.phonetic}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-cyan-300 font-medium">
                        {word.bengaliMeaning}
                      </td>
                      <td className="py-3.5 px-4 capitalize text-muted">
                        {word.category}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {word.difficulty}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/words?word=${word._id}`}
                          className="text-primary-light hover:underline font-medium"
                        >
                          Preview
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Category Distribution Right Column */}
        <div className="lg:col-span-4 space-y-4">
          <h3
            className="text-lg font-bold text-foreground"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Category Matrix Summary
          </h3>

          <div className="rounded-2xl glass border border-border/60 p-5 bg-elevated/50 space-y-3">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="flex items-center justify-between p-2.5 rounded-xl subtle-bg border border-border/40 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">{cat.icon}</span>
                  <span className="font-semibold text-foreground">{cat.name}</span>
                </div>
                <span className="text-[11px] font-medium text-muted">
                  {cat.wordCount} words
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
