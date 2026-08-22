"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { registerUser } from "@/redux/features/auth/authThunks";
import PasswordStrengthMeter from "@/components/auth/PasswordStrengthMeter";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const resultAction = await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        })
      );

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success(
          `Account created successfully! Welcome to Picword, ${resultAction.payload.user.name} 🚀`
        );
        router.push("/dashboard");
      } else {
        toast.error(
          (resultAction.payload as string) || "Registration failed. Please try again."
        );
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="rounded-3xl glass p-7 sm:p-9 bg-elevated/80 border border-border/80 shadow-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-accent-light glass-sm border border-accent/20">
          <Sparkles size={13} className="text-accent" />
          <span>Start Free Today</span>
        </div>
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Create your <span className="gradient-text">Account</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Join thousands of learners unlocking fluent English vocabulary through visual memory anchors.
        </p>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-foreground">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <User size={16} />
            </div>
            <input
              type="text"
              placeholder="Hasin Hayder"
              {...register("name")}
              className={`w-full h-11 pl-10 pr-4 rounded-xl bg-surface/80 border text-xs sm:text-sm text-foreground placeholder:text-muted/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.name ? "border-error focus:border-error" : "border-border"
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-[11px] text-error font-medium animate-fadeIn">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
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
                errors.email ? "border-error focus:border-error" : "border-border"
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-error font-medium animate-fadeIn">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-foreground">
            Password
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

          {/* Real-time Password Strength Meter */}
          <PasswordStrengthMeter password={passwordValue} />
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-foreground">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Lock size={16} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              className={`w-full h-11 pl-10 pr-10 rounded-xl bg-surface/80 border text-xs sm:text-sm text-foreground placeholder:text-muted/60 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40 ${
                errors.confirmPassword ? "border-error focus:border-error" : "border-border"
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

        {/* Terms of Service Checkbox */}
        <div className="space-y-1 pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("terms")}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40 bg-surface mt-0.5"
            />
            <span className="text-xs text-muted leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-primary-light hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary-light hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-[11px] text-error font-medium animate-fadeIn pl-6">
              {errors.terms.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-light transition-all duration-200 hover:scale-[1.01] shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed glow-effect focus-ring"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Social Authentication */}
      <SocialAuthButtons />

      {/* Login Redirect */}
      <div className="text-center text-xs text-muted pt-2">
        Already have an account?{" "}
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
