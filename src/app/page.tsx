import type { Metadata } from "next";
import {
  HeroSection,
  WordOfTheDaySection,
  AiShowcaseSection,
  CategoryMatrixSection,
  HowItWorksSection,
  SocialProofSection,
  CtaBannerSection,
} from "@/components/home";
import Footer from "@/components/layout/Footer";

// Enable ISR (Incremental Static Regeneration) revalidating every 1 hour (3600 seconds)
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Picword — Master English Vocabulary with Visual Learning & AI",
  description:
    "Master English vocabulary visually with AI-powered memory anchors, Bengali nuance definitions, and spaced repetition (SRS) practice for IELTS, GRE, and daily fluency.",
  openGraph: {
    title: "Picword — Visual English Vocabulary Learning Platform",
    description:
      "Say goodbye to rote memorization. Learn vocabulary with visual memory anchors, AI sound-alike mnemonics, and spaced repetition.",
    url: "https://picword.app",
    siteName: "Picword",
    type: "website",
  },
  alternates: {
    canonical: "https://picword.app",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Picword",
    url: "https://picword.app",
    description:
      "Master English vocabulary visually through curated categories, Bengali definitions, AI mnemonics, and interactive flashcards.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://picword.app/words?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="flex-1 flex flex-col relative overflow-hidden">
      {/* Schema.org WebSite JSON-LD for Search Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero Unit with live interactive VocabCard */}
      <HeroSection />

      {/* 2. Word of the Day for immediate learning value */}
      <WordOfTheDaySection />

      {/* 3. Interactive AI Showcase for Mnemonics & Scenario Contexts */}
      <AiShowcaseSection />

      {/* 4. Category Matrix for structured exploration */}
      <CategoryMatrixSection />

      {/* 5. How It Works (Visual Memory & SRS System) */}
      <HowItWorksSection />

      {/* 6. Social Proof & Community Stats */}
      <SocialProofSection />

      {/* 7. Final Conversion CTA Banner */}
      <CtaBannerSection />

      {/* Global Footer Navigation */}
      <Footer />
    </main>
  );
}