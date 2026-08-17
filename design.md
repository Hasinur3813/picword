Product Requirements Document (PRD)
1. Executive Summary
Project Name: Vocai

Core Mission: Single-input AI-driven vocabulary mastery platform. A user submits a single English word; the system automatically generates definitions, translations, context sentences, synonyms/antonyms, and visual memory anchors.

2. Tech Stack & Architecture
Frontend / Framework: Next.js (App Router, React 19, Tailwind CSS, Framer Motion)

Backend / API: Next.js Route Handlers + Google Antigravity SDK

Database: MongoDB via Mongoose ORM

Media Storage: Cloudinary 

Agentic Automation: Google Antigravity (Agent Orchestration for Structured Content Parsing & Tool Execution)

3. Comprehensive Project Structure
Plaintext
vocai/
├── public/
│   ├── assets/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── generate/route.ts       # Antigravity agent execution endpoint
│   │   │   └── vocabularies/route.ts  # CRUD endpoints for vocabulary cards
│   │   ├── dashboard/page.tsx          # Saved Vocabularies & Review System
│   │   ├── layout.tsx                  # Root Layout (Theme, Toast, Navigation)
│   │   └── page.tsx                    # Interactive High-Engagement Landing Page
│   ├── components/
│   │   ├── 3d/
│   │   │   └── FloatingWordsCanvas.tsx# Three.js / Canvas Interactive Visuals
│   │   ├── cards/
│   │   │   └── VocabCard.tsx           # Flip-card design for learning
│   │   ├── ui/
│   │   │   ├── SearchInput.tsx        # Hero interactive input
│   │   │   ├── ParticleBackground.tsx # Interactive background shader
│   │   │   └── SkeletonLoader.tsx
│   ├── lib/
│   │   ├── antigravity.ts              # Google Antigravity SDK Instance
│   │   ├── cloudinary.ts               # Cloudinary API handler
│   │   └── mongodb.ts                  # Mongoose Connection Cache
│   ├── models/
│   │   └── Vocabulary.ts               # Mongoose Data Schema
│   └── types/
│       └── index.ts                    # TypeScript Type Definitions
├── .env.local
├── tailwind.config.ts
└── package.json
4. Database Schema (Mongoose Model)
TypeScript
// src/models/Vocabulary.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IVocabulary extends Document {
  word: string;
  description: string;
  englishMeaning: string;
  bengaliMeaning: string;
  exampleSentence: string;
  synonyms: string[];
  antonyms: string[];
  imageUrl: string;
  cloudinaryPublicId: string;
  createdAt: Date;
}

const VocabularySchema: Schema = new Schema({
  word: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  englishMeaning: { type: String, required: true },
  bengaliMeaning: { type: String, required: true },
  exampleSentence: { type: String, required: true },
  synonyms: [{ type: String }],
  antonyms: [{ type: String }],
  imageUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Vocabulary || mongoose.model<IVocabulary>('Vocabulary', VocabularySchema);
5. UI/UX & Page Specifications
Page 1: Landing Page (/ - Highly Attractive UI/UX)
Hero Section:

Visual Accent: Particle canvas background with subtle float motion.

Interactive Element: Central glowing glassmorphism input bar with an glowing animated border gradient.

CTA: “Enter a word and let AI build your memory card.”

Real-time Generation Pipeline Showcase:

As the user enters a word, a live step-by-step progress component renders using Framer Motion animations (e.g., Querying LLM Engine → Generating Contextual Visual → Syncing to Cloudinary).

Interactive Live Preview Card:

Displays the newly generated card immediately below the input bar with 3D hover effects, glassmorphic blur, and flip animation to reveal the Bengali meaning, context, and image anchor.

Explore Gallery:

Grid of trending/recently generated vocabulary cards featuring lazy-loaded Cloudinary images.

Page 2: Dashboard (/dashboard)
Saved word library with filtering options (Alphabetical, Recent, Memorized Status).

Flashcard review mode using interactive 3D card flips.

6. Execution Workflow (The Antigravity Pipeline)
Plaintext
User Input ("Ethereal")
       │
       ▼
Next.js Server API (/api/generate)
       │
       ├──► Google Antigravity Agent Execution
       │    ├── Structured Text Prompting -> (Description, Meaning EN/BN, Sentences, Synonyms/Antonyms)
       │    └── Image Generation Tool Execution
       │
       ├──► Cloudinary SDK (Upload generated image bytes -> Get permanent URL)
       │
       ├──► Mongoose / MongoDB (Persist unified payload)
       │
       ▼
Client receives full payload & renders animated VocabCard
7. Next Steps for Implementation
Initialize App: Create Next.js project with Tailwind CSS & Framer Motion.

Environment Setup: Configure .env.local for MongoDB URI, Cloudinary Credentials, and Google Antigravity SDK credentials.

Build API Route: Create /api/generate handling the Antigravity agent invocation and Cloudinary upload logic.

notes to act...

the project should be reusable, scalable and maintainable. means if i need to change anything later i can do it easily and without affecting the whole project.

should be SEO friendly.

should be mobile responsive.

should be fast and responsive.

typescript note...

maintain typescript file properly from one place. Do not create it randomly. Create only needed typescript files and maintain it from a single location. use files by importing from that single file.


remember::
remember this is a vocab learnign platform.
users can't generate vocab for now.
and the vocab will be organized by category.

next.js note...
use best rendering methods best on the data. meanas if the data is static use static rendering. if the data is dynamic use dynamic rendering. and if the data is in between use incremental static regeneration.

also use best caching methods.

use server components and client components properly. use client components only when needed.

UI note...
use glassmorphism design. and use animations properly. use framer motion for animations. and use tailwind css for styling.

important note...
use theme properly. and maintain it from one place. use it properly everywhere. and maintain it properly.