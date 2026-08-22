"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Lock, Eye, EyeOff, ArrowRight, KeyRound } from "lucide-react";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validations/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetPassword } from "@/redux/features/auth/authThunks";
import PasswordStrengthMeter from "@/components/auth/PasswordStrengthMeter";

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token") || "demo_token_12345";

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const resultAction = await dispatch(
        resetPassword({
          token: resetToken,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      );

      if (resetPassword.fulfilled.match(resultAction)) {
        toast.success(
          "Your password has been successfully reset! Please log in with your new password."
        );
        router.push("/login");
      } else {
        toast.error(
          (resultAction.payload as string) || "Failed to reset password."
        );
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="rounded-3xl glass p-7 sm:p-9 bg-elevated/80 border border-border/80 shadow-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm border border-accent/20">
          <KeyRound size={13} className="text-accent" />
          <span>Security Verification</span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Set New <span className="gradient-text">Password</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Choose a strong, secure password to protect your Picword learning account.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* New Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-foreground">
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Lock size={16} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              {...register("password")}
              className={`w-full h-11 pl-10 pr-10 rounded-xl bg-surface/80 border text-xs sm:text-sm text-foreground placeholder:text-muted/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.password ? "border-error focus:border-error" : "border-border"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] text-error font-medium animate-fadeIn">
              {errors.password.message}
            </p>
          )}

          {/* Password Strength Meter */}
          <PasswordStrengthMeter password={passwordValue} />
        </div>

        {/* Confirm New Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-foreground">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Lock size={16} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              {...register("confirmPassword")}
              className={`w-full h-11 pl-10 pr-10 rounded-xl bg-surface/80 border text-xs sm:text-sm text-foreground placeholder:text-muted/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.confirmPassword
                  ? "border-error focus:border-error"
                  : "border-border"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] text-error font-medium animate-fadeIn">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-light transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed glow-effect focus-ring"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Update Password & Sign In</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Return to login link */}
      <div className="text-center text-xs text-muted pt-2">
        Remembered your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary-light hover:underline hover:text-primary transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
