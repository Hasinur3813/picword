import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import StoreProvider from "@/components/providers/StoreProvider";
import ToastProvider from "@/components/providers/ToastProvider";
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
  title: "Picword — Master English Vocabulary with Visual Learning",
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
    "IELTS preparation",
  ],
  authors: [{ name: "Picword Team" }],
  metadataBase: new URL("https://picword.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Picword — Master Vocabulary with Visual Learning",
    description:
      "Explore curated vocabulary by category. Definitions, Bengali translations, visual anchors — everything you need to master new words.",
    type: "website",
    locale: "en_US",
    siteName: "Picword",
  },
  twitter: {
    card: "summary_large_image",
    title: "Picword — Master Vocabulary with Visual Learning",
    description:
      "Explore curated vocabulary by category. Definitions, Bengali translations, visual anchors — everything you need to master new words.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased selection:bg-primary/20 selection:text-primary relative bg-background text-foreground">
        <StoreProvider>
          <ThemeProvider>
            {/* Ambient Celestial Night Sky & Starfield Backdrop */}
            <div className="night-atmosphere night-stars" aria-hidden="true" />
            <div className="relative z-10 flex min-h-full flex-col flex-1">
              <Navbar />
              {children}
            </div>
            <ToastProvider />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

