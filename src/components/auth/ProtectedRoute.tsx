"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallbackUrl?: string;
}

export default function ProtectedRoute({
  children,
  requiredRole,
  fallbackUrl,
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, isHydrated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      const redirect = fallbackUrl || `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirect);
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.replace("/dashboard?error=unauthorized");
    }
  }, [isAuthenticated, isHydrated, user, requiredRole, router, pathname, fallbackUrl]);

  if (!isHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-xs text-muted font-medium">Verifying security session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
