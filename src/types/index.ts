// ============================================================================
// Picword — Centralized Type Definitions
// All TypeScript types are maintained here and imported via @/types
// ============================================================================

// --- Category Types ---

/** A vocabulary category (e.g. "Daily Life", "Academic", "Business") */
export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  wordCount?: number;
  createdAt: Date;
}

// --- Vocabulary Types ---

/** Learning difficulty for progressive browsing */
export type VocabDifficulty = "beginner" | "intermediate" | "advanced";

/** Core vocabulary card data shape, mirrors the Mongoose schema */
export interface IVocabulary {
  _id?: string;
  word: string;
  /** IPA pronunciation, e.g. /ɪˈfemərəl/ */
  phonetic?: string;
  description: string;
  englishMeaning: string;
  bengaliMeaning: string;
  exampleSentence: string;
  synonyms: string[];
  antonyms: string[];
  imageUrl: string;
  cloudinaryPublicId?: string;
  /** Category slug (e.g. "daily-life") */
  category: string;
  difficulty?: VocabDifficulty;
  createdAt: Date;
}

/** Browse-page sort options */
export type VocabSortOption = "az" | "za" | "recent" | "difficulty";

/** Active filters on the words browse page */
export interface VocabFilters {
  search: string;
  categories: string[];
  difficulty: VocabDifficulty | "all";
  letter: string | "all";
  savedOnly: boolean;
  sort: VocabSortOption;
}

// --- API Types ---

/** Standardized API error response */
export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

/** Union type for all API responses */
export type ApiResponse<T = IVocabulary> =
  | { success: true; data: T }
  | ApiError;

/** Paginated list response */
export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// --- Auth Types ---

/** User object for auth state */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
}

// --- Theme Types ---

/** Supported theme modes */
export type Theme = 'dark' | 'light';

// --- UI Types ---

/** Container component size variants */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/** Common component props with optional className */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}
