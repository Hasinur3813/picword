// ============================================================================
// Picword — Centralized Shared Domain Type Definitions
// Shared Domain Models ONLY (Imported via @/types)
// Local component types must be co-located inside component files.
// ============================================================================

import type { VocabDifficulty } from "./vocab";

// --- Category Domain Types ---
export * from "./category";

// --- Vocabulary Domain Types ---
export * from "./vocab";

// --- Browse Filter Types ---

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
  mode: "browse" | "recall";
}

// --- API Domain Types ---

/** Standardized API error response */
export interface ApiError {
  success: false;
  error: string;
  code?: string;
}

/** Union type for all API responses */
export type ApiResponse<T> =
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

// --- Admin Domain Types ---
export * from "./admin";

// --- User & Auth Domain Types ---

export type UserRole = "user" | "admin";

/** User domain entity */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// --- Theme Domain Types ---

/** Supported theme modes */
export type Theme = "dark" | "light";
