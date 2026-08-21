"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { canSpeak, speakWord, stopSpeaking } from "@/lib/speak";

interface PronounceButtonProps {
  word: string;
  className?: string;
  /** Compact icon-only vs labeled */
  size?: "sm" | "md";
}

export default function PronounceButton({
  word,
  className = "",
  size = "sm",
}: PronounceButtonProps) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(canSpeak());
    return () => stopSpeaking();
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!supported) return;

    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
      return;
    }

    speakWord(word, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  const iconSize = size === "sm" ? 14 : 16;
  const pad = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!supported}
      className={`inline-flex items-center justify-center rounded-full transition-all focus-ring ${pad} ${
        speaking
          ? "bg-accent/25 text-accent-light animate-pulse"
          : "glass-sm text-white/90 hover:bg-accent/20 hover:text-accent-light"
      } ${!supported ? "opacity-40 cursor-not-allowed" : ""} ${className}`}
      aria-label={
        speaking ? `Stop pronunciation of ${word}` : `Pronounce ${word}`
      }
      aria-pressed={speaking}
      title={supported ? `Hear “${word}”` : "Speech not supported in this browser"}
    >
      {speaking ? (
        <VolumeX size={iconSize} strokeWidth={2.2} />
      ) : (
        <Volume2 size={iconSize} strokeWidth={2.2} />
      )}
    </button>
  );
}
