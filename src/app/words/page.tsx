import type { Metadata } from "next";
import WordsBrowser from "@/components/words/WordsBrowser";

export const metadata: Metadata = {
  title: "Browse Words — Picword",
  description:
    "Explore curated vocabulary by category, difficulty, and letter. Save words to learn later with visual memory cards.",
};

export default function WordsPage() {
  return (
    <main className="flex-1 flex flex-col">
      <WordsBrowser />
    </main>
  );
}
