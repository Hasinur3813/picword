import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Picword — Master Vocabulary with Visual Learning",
  description:
    "Explore curated vocabulary organized by categories. Each word comes with definitions, Bengali translations, example sentences, synonyms, antonyms, and visual memory anchors.",
  keywords: [
    "vocabulary",
    "learn English",
    "Bengali translation",
    "flashcards",
    "word categories",
    "language learning",
    "education",
    "visual learning",
  ],
  authors: [{ name: "Picword" }],
  openGraph: {
    title: "Picword — Master Vocabulary with Visual Learning",
    description:
      "Explore curated vocabulary by category. Definitions, translations, visual anchors — everything you need to master new words.",
    type: "website",
    locale: "en_US",
    siteName: "Picword",
  },
  twitter: {
    card: "summary_large_image",
    title: "Picword — Master Vocabulary with Visual Learning",
    description:
      "Explore curated vocabulary by category. Definitions, translations, visual anchors — everything you need to master new words.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
