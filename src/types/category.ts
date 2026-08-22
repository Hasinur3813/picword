// ============================================================================
// Picword — Category Core Type Definitions
// Shared Domain Models ONLY
// ============================================================================

/** A vocabulary category domain model */
export interface ICategory {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  wordCount?: number;
  createdAt?: Date;
}
