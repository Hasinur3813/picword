// ============================================================================
// Picword — Admin Panel Domain Type Definitions
// ============================================================================

import type { VocabDifficulty, IExampleSentence, IAiMnemonic } from "./vocab";

/** Overview dashboard metrics for admin */
export interface IAdminStats {
  totalWords: number;
  totalCategories: number;
  totalUsers: number;
  activeSrsSessions: number;
  totalReviewsToday: number;
  aiMnemonicsGenerated: number;
}

/** Form data payload for creating or updating a vocabulary item */
export interface VocabFormData {
  word: string;
  phonetic?: string;
  partOfSpeech?: "noun" | "verb" | "adjective" | "adverb";
  imageUrl: string;
  bengaliMeaning: string;
  englishMeaning: string;
  englishMeaningBengali?: string;
  description?: string;
  bengaliDetails?: string;
  exampleSentence?: string;
  exampleSentenceBengali?: string;
  exampleSentences?: IExampleSentence[];
  mnemonic?: IAiMnemonic;
  synonyms?: string[];
  antonyms?: string[];
  difficulty: VocabDifficulty;
  category: string;
}

/** Admin Vocabulary Table Filters */
export interface AdminVocabTableFilters {
  search: string;
  category: string | "all";
  difficulty: VocabDifficulty | "all";
  page: number;
  limit: number;
}
