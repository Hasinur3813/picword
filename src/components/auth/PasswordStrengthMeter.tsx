"use client";

import { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password?: string;
}

export default function PasswordStrengthMeter({
  password = "",
}: PasswordStrengthMeterProps) {
  const criteria = useMemo(() => {
    return [
      {
        label: "At least 8 characters",
        met: password.length >= 8,
      },
      {
        label: "Contains uppercase letter (A-Z)",
        met: /[A-Z]/.test(password),
      },
      {
        label: "Contains at least one number (0-9)",
        met: /[0-9]/.test(password),
      },
      {
        label: "Contains special character (@$!%*#?&)",
        met: /[^A-Za-z0-9]/.test(password),
      },
    ];
  }, [password]);

  const score = useMemo(() => {
    if (!password) return 0;
    return criteria.filter((c) => c.met).length;
  }, [password, criteria]);

  const strengthConfig = useMemo(() => {
    switch (score) {
      case 0:
      case 1:
        return {
          label: "Weak",
          color: "bg-error",
          textColor: "text-error",
          width: "w-1/4",
        };
      case 2:
        return {
          label: "Fair",
          color: "bg-warning",
          textColor: "text-warning",
          width: "w-2/4",
        };
      case 3:
        return {
          label: "Good",
          color: "bg-cyan-400",
          textColor: "text-cyan-400",
          width: "w-3/4",
        };
      case 4:
        return {
          label: "Strong",
          color: "bg-success",
          textColor: "text-success",
          width: "w-full",
        };
      default:
        return {
          label: "",
          color: "bg-muted/30",
          textColor: "text-muted",
          width: "w-0",
        };
    }
  }, [score]);

  if (!password) return null;

  return (
    <div className="space-y-2.5 pt-1.5 animate-fadeIn">
      {/* Progress Bar & Label */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">Password Strength:</span>
          <span className={`font-semibold ${strengthConfig.textColor}`}>
            {strengthConfig.label}
          </span>
        </div>
        <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden border border-border/50">
          <div
            className={`h-full transition-all duration-300 ${strengthConfig.color} ${strengthConfig.width}`}
          />
        </div>
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
        {criteria.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1.5 text-[11px] transition-colors duration-200 ${
              item.met ? "text-success font-medium" : "text-muted/70"
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                item.met
                  ? "bg-success/20 text-success border border-success/30"
                  : "bg-surface text-muted/50 border border-border"
              }`}
            >
              {item.met ? <Check size={9} strokeWidth={3} /> : <X size={9} />}
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
