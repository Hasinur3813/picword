"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser } from "@/redux/features/auth/authThunks";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const resultAction = await dispatch(loginUser(data));

      if (loginUser.fulfilled.match(resultAction)) {
        toast.success(`Welcome back, ${resultAction.payload.user.name}!`);
        // If user is admin and wanted admin panel, navigate appropriately
        const destination =
          resultAction.payload.user.role === "admin" && redirectUrl.includes("/admin")
            ? "/admin"
            : redirectUrl;
        router.push(destination);
      } else {
        toast.error(
          (resultAction.payload as string) || "Invalid email or password"
        );
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // Quick Demo Autofill Helper
  const fillDemo = (role: "user" | "admin") => {
    if (role === "admin") {
      setValue("email", "admin@picword.app");
      setValue("password", "Admin@12345");
    } else {
      setValue("email", "learner@picword.app");
      setValue("password", "Learner@12345");
    }
  };

  return (
    <div className="rounded-3xl glass p-7 sm:p-9 bg-elevated/80 border border-border/80 shadow-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1
          className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Welcome <span className="gradient-text">Back</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Log in to continue your spaced repetition streak and learn new words.
        </p>
      </div>

      {/* Demo Credentials Quick-Pills for Easy Evaluation */}
      <div className="p-3 rounded-2xl bg-surface/70 border border-primary/20 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="text-muted text-[11px] font-medium flex items-center gap-1">
          <ShieldCheck size={13} className="text-primary-light" />
          <span>Quick Demo Fill:</span>
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => fillDemo("user")}
            className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary-light text-[11px] font-semibold border border-primary/20 transition-all"
          >
            Learner Demo
          </button>
          <button
            type="button"
            onClick={() => fillDemo("admin")}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-[11px] font-semibold border border-amber-500/20 transition-all"
          >
            Admin Demo
          </button>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-foreground">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11px] font-medium text-primary-light hover:underline hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
              <Lock size={16} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
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
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/40 bg-surface"
            />
            <span className="text-xs text-muted">Remember me for 30 days</span>
          </label>
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
              <span>Sign In</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Social Authentication */}
      <SocialAuthButtons />

      {/* Sign Up Redirect */}
      <div className="text-center text-xs text-muted pt-2">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary-light hover:underline hover:text-primary transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}
