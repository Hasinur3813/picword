import type { Metadata } from "next";
import WordsBrowser from "@/components/words/WordsBrowser";
import { VOCABULARIES } from "@/data/vocabularies";

// Enable Incremental Static Regeneration (ISR) revalidating every 30 minutes
export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Visual English Vocabulary Browser & Dictionary | Picword",
  description:
    "Explore English vocabulary with visual memory cards, Bengali meanings, AI mnemonics, and spaced repetition practice. Filter by level, category, or search instantly.",
  keywords: [
    "English vocabulary",
    "Bengali meaning",
    "Visual dictionary",
    "IELTS words",
    "AI mnemonics",
    "Picword",
  ],
  openGraph: {
    title: "Visual English Vocabulary Browser | Picword Dictionary",
    description:
      "Master English vocabulary visually with AI-powered memory anchors, Bengali translations, and audio pronunciations.",
    type: "website",
    url: "https://picword.app/words",
  },
  alternates: {
    canonical: "https://picword.app/words",
  },
};

export default function WordsPage() {
  // Schema.org JSON-LD for rich dictionary indexing in search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Picword Visual Vocabulary Catalog",
    description:
      "Comprehensive visual vocabulary list featuring English terms with Bengali definitions and mnemonics.",
    hasDefinedTerm: VOCABULARIES.map((v) => ({
      "@type": "DefinedTerm",
      name: v.word,
      description: v.englishMeaning,
      termCode: v._id || v.word,
      image: v.imageUrl,
      inDefinedTermSet: "Picword Visual Dictionary",
    })),
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Search Engine Rich Snippet JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WordsBrowser />
    </main>
  );
}
