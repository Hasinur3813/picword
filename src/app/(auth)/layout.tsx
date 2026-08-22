import type { Metadata } from "next";
import AuthHeroVisual from "@/components/auth/AuthHeroVisual";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Authentication | Picword Visual Vocabulary",
  description: "Sign in or create an account to start your visual vocabulary mastery journey.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1 flex items-center justify-center py-10 sm:py-16">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Focused Interactive Form */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto">
            {children}
          </div>

          {/* Right Column: High-conversion Visual Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 h-full min-h-[580px]">
            <AuthHeroVisual />
          </div>
        </div>
      </Container>
    </main>
  );
}
