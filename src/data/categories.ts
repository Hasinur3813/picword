import type { ICategory } from "@/types";

/** Shared category catalog — single source for navbar, filters, and pages */
export const CATEGORIES: Omit<ICategory, "createdAt">[] = [
  {
    name: "Daily Life",
    slug: "daily-life",
    icon: "🏠",
    wordCount: 45,
    description: "Essential words for everyday conversations",
  },
  {
    name: "Academic",
    slug: "academic",
    icon: "🎓",
    wordCount: 62,
    description: "Words commonly used in academic writing",
  },
  {
    name: "Business",
    slug: "business",
    icon: "💼",
    wordCount: 38,
    description: "Professional vocabulary for the workplace",
  },
  {
    name: "Technology",
    slug: "technology",
    icon: "💻",
    wordCount: 51,
    description: "Modern tech and digital terminology",
  },
  {
    name: "Emotions",
    slug: "emotions",
    icon: "💭",
    wordCount: 34,
    description: "Express feelings with precision",
  },
  {
    name: "Nature",
    slug: "nature",
    icon: "🌿",
    wordCount: 29,
    description: "Words describing the natural world",
  },
  {
    name: "Travel",
    slug: "travel",
    icon: "✈️",
    wordCount: 41,
    description: "Navigate the world with confidence",
  },
  {
    name: "Health",
    slug: "health",
    icon: "🩺",
    wordCount: 36,
    description: "Medical and wellness terminology",
  },
];
