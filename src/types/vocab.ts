// ============================================================================
// Picword — Vocabulary Core Type Definitions
// ============================================================================

export type VocabDifficulty = "beginner" | "intermediate" | "advanced";

export interface IAiMnemonic {
  visualPrompt?: string;
  analogy: string;
  bengaliAnalogy?: string;
}

export interface IExampleSentence {
  english: string;
  bengali: string;
  context?: "daily" | "academic" | "business";
}

export interface IVocabulary {
  _id: string;
  word: string;
  phonetic?: string;
  partOfSpeech?: "noun" | "verb" | "adjective" | "adverb";
  imageUrl: string;
  bengaliMeaning: string;
  englishMeaning: string;
  englishMeaningBengali?: string;
  description?: string;
  bengaliDetails?: string;
  exampleSentences?: IExampleSentence[];
  exampleSentence?: string;
  exampleSentenceBengali?: string;
  mnemonic?: IAiMnemonic;
  synonyms?: string[];
  antonyms?: string[];
  difficulty: VocabDifficulty;
  category: string;
  cloudinaryPublicId?: string;
  createdAt?: Date;
}
