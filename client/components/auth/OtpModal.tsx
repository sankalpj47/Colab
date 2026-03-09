"use client";

import { X, Mail, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";

interface OtpModalProps {
  email: string;
  otp: string[];
  loadingOtp: boolean;
  isAnyLoading: boolean;
  onOtpChange: (index: number, value: string) => void;
  onOtpKeyDown: (index: number, e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  onResend: () => void;
  onClose: () => void;
}

const OtpModal = ({
  email,
  otp,
  loadingOtp,
  isAnyLoading,
  onOtpChange,
  onOtpKeyDown,
  onSubmit,
  onResend,
  onClose,
}: OtpModalProps) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const filled = otp.filter(Boolean).length;
  const progress = (filled / otp.length) * 100;

  // Auto-focus first input on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-(--canvas) border border-(--border) shadow-2xl"
        style={{
          animation: "modalIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar at top */}
        <div className="h-0.5 w-full bg-(--border)">
          <div
            className="h-full bg-(--primary) transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 space-y-7">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-xl bg-(--primary)/10 shrink-0">
                {filled === otp.length ? (
                  <ShieldCheck className="w-5 h-5 text-(--primary)" />
                ) : (
                  <Mail className="w-5 h-5 text-(--primary)" />
                )}
              </div>
              <div className="space-y-0.5">
                <h2 className="text-base font-semibold text-(--text-primary) leading-snug">
                  Check your email or spam
                </h2>
                <p className="text-sm text-(--text-secondary) leading-snug">
                  Code sent to <span className="font-medium text-(--text-primary)">{email}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-(--text-secondary) hover:text-(--text-primary) transition-colors p-1 rounded-lg hover:bg-(--border)/40 -mr-1 -mt-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <div key={index} className="relative">
                <input
                  ref={index === 0 ? firstInputRef : undefined}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => onOtpChange(index, e.target.value)}
                  onKeyDown={(e) => onOtpKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold rounded-xl outline-none transition-all duration-150
                    border-2 border-(--border) text-(--text-primary) bg-(--background)
                    focus:border-(--primary) focus:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]
                    hover:border-(--text-secondary)/40"
                  style={{
                    animation: digit ? "digitPop 0.15s ease forwards" : "none",
                  }}
                />
                {/* Filled indicator dot */}
                {digit && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-(--primary)" />
                )}
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="space-y-3">
            <button
              onClick={onSubmit}
              disabled={otp.join("").length < 4 || loadingOtp}
              className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150
                bg-(--primary) hover:bg-(--primary-hover) active:scale-[0.98]
                disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
                flex items-center justify-center gap-2 shadow-sm"
            >
              {loadingOtp ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : filled === otp.length ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Verify Code
                </>
              ) : (
                "Enter all digits to verify"
              )}
            </button>

            {/* Resend */}
            <p className="text-center text-xs text-(--text-secondary)">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={onResend}
                disabled={isAnyLoading}
                className="font-semibold text-(--primary) hover:text-(--primary-hover) transition-colors disabled:opacity-40 underline-offset-2 hover:underline"
              >
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes digitPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default OtpModal;
