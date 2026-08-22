"use client";

import { useState } from "react";
import { CheckCircle2, RotateCcw, Flame, Sparkles } from "lucide-react";

export type SRSRating = "again" | "hard" | "good" | "easy";

interface VocabSRSActionProps {
  onRate?: (rating: SRSRating) => void;
  className?: string;
}

const SRS_OPTIONS: {
  id: SRSRating;
  label: string;
  sub: string;
  icon: typeof RotateCcw;
  styles: string;
}[] = [
  {
    id: "again",
    label: "Again",
    sub: "< 1 min",
    icon: RotateCcw,
    styles:
      "border-red-500/30 text-red-500 hover:bg-red-500/15 focus:ring-red-500",
  },
  {
    id: "hard",
    label: "Hard",
    sub: "12 hrs",
    icon: Flame,
    styles:
      "border-amber-500/30 text-amber-500 hover:bg-amber-500/15 focus:ring-amber-500",
  },
  {
    id: "good",
    label: "Good",
    sub: "2 days",
    icon: CheckCircle2,
    styles:
      "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/15 focus:ring-emerald-500",
  },
  {
    id: "easy",
    label: "Easy",
    sub: "4 days",
    icon: Sparkles,
    styles:
      "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/15 focus:ring-cyan-500",
  },
];

export default function VocabSRSAction({
  onRate,
  className = "",
}: VocabSRSActionProps) {
  const [selectedRating, setSelectedRating] = useState<SRSRating | null>(null);

  const handleSelect = (rating: SRSRating) => {
    setSelectedRating(rating);
    if (onRate) onRate(rating);
  };

  return (
    <div
      className={`border-t border-border bg-surface/80 backdrop-blur-md p-3 sm:p-4 flex flex-col gap-2 rounded-b-2xl sm:rounded-b-3xl shrink-0 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted flex items-center gap-1.5">
          <Sparkles size={12} className="text-primary-light" />
          Spaced Repetition Self-Rating
        </span>
        {selectedRating && (
          <span className="text-xs font-medium text-success capitalize">
            Rated: {selectedRating}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {SRS_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedRating === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-semibold transition-all focus-ring ${
                opt.styles
              } ${isSelected ? "ring-2 scale-[1.02] bg-elevated shadow-md" : "bg-elevated/40"}`}
              aria-label={`Grade recall as ${opt.label}`}
            >
              <div className="flex items-center gap-1">
                <Icon size={13} />
                <span>{opt.label}</span>
              </div>
              <span className="text-[10px] text-muted font-normal mt-0.5">
                {opt.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
