"use client";

import { X } from "lucide-react";

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
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 space-y-6 bg-(--canvas) border border-(--border) shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-(--text-primary)">Check your email</h2>
            <p className="text-sm text-(--text-secondary)">
              We sent a 4-digit code to{" "}
              <span className="font-medium text-(--text-primary)">{email}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => onOtpChange(index, e.target.value)}
              onKeyDown={(e) => onOtpKeyDown(index, e)}
              className="w-14 h-14 text-center text-xl font-semibold rounded-xl outline-none transition-all duration-150 border border-(--border) text-(--text-primary) bg-(--background) focus:border-(--primary) focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
            />
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={otp.join("").length < 4 || loadingOtp}
          className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 bg-(--primary) hover:bg-(--primary-hover) disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loadingOtp ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {/* Resend */}
        <p className="text-center text-xs text-(--text-secondary)">
          Didn&apos;t receive the code?{" "}
          <button
            onClick={onResend}
            disabled={isAnyLoading}
            className="font-medium text-(--primary) hover:text-(--primary-hover) transition-colors disabled:opacity-50"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpModal;
