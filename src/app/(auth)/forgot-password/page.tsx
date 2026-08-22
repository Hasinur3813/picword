"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { forgotPassword } from "@/redux/features/auth/authThunks";

export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const resultAction = await dispatch(forgotPassword(data));

      if (forgotPassword.fulfilled.match(resultAction)) {
        setSubmittedEmail(data.email);
        setCountdown(60);
        toast.success("Password reset instructions dispatched!");
      } else {
        toast.error(
          (resultAction.payload as string) || "Failed to send reset link."
        );
      }
    } catch {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleResend = async () => {
    if (!submittedEmail || countdown > 0) return;
    try {
      const resultAction = await dispatch(
        forgotPassword({ email: submittedEmail })
      );
      if (forgotPassword.fulfilled.match(resultAction)) {
        setCountdown(60);
        toast.success("Instructions resent successfully!");
      }
    } catch {
      toast.error("Could not resend instructions.");
    }
  };

  return (
    <div className="rounded-3xl glass p-7 sm:p-9 bg-elevated/80 border border-border/80 shadow-2xl space-y-6">
      {/* Back to Login Link */}
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-foreground transition-colors group"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span>Back to Login</span>
      </Link>

      {!submittedEmail ? (
        <>
          {/* Step 1: Input Request Form */}
          <div className="space-y-2">
            <h1
              className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Reset your <span className="gradient-text">Password</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              Enter the email associated with your Picword account, and we&apos;ll
              send you instructions to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-foreground">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`w-full h-11 pl-10 pr-4 rounded-xl bg-surface/80 border text-xs sm:text-sm text-foreground placeholder:text-muted/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                    errors.email
                      ? "border-error focus:border-error"
                      : "border-border"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-error font-medium animate-fadeIn">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-light transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed glow-effect focus-ring"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send Reset Instructions</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </>
      ) : (
        /* Step 2: Email Dispatched State */
        <div className="space-y-6 text-center animate-fadeIn py-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 size={32} />
          </div>

          <div className="space-y-2">
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Check your <span className="gradient-text">Inbox</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
              We sent password reset instructions to{" "}
              <strong className="text-foreground">{submittedEmail}</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface/70 border border-border/70 text-xs text-muted text-left space-y-2">
            <p className="font-semibold text-foreground">Next Steps:</p>
            <ol className="list-decimal pl-4 space-y-1 text-[11px]">
              <li>Open the email from Picword.</li>
              <li>Click the secured reset link or copy your token.</li>
              <li>Set your new password on the confirmation screen.</li>
            </ol>
          </div>

          {/* Quick link to reset page with demo token for immediate testing */}
          <div className="pt-2">
            <Link
              href={`/reset-password?token=demo_token_${Date.now()}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-accent hover:underline font-semibold"
            >
              <span>Simulate clicking reset link in email →</span>
            </Link>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleResend}
              disabled={countdown > 0}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw size={13} className={countdown > 0 ? "animate-spin" : ""} />
              <span>
                {countdown > 0
                  ? `Resend available in ${countdown}s`
                  : "Didn't receive the email? Resend"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
