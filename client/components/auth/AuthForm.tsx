"use client";

import { useState } from "react";
import { Mail, FileText, X, User } from "lucide-react";
import { signIn } from "next-auth/react";
import GoogleButton from "@/components/auth/GoogleButton";
import GithubButton from "@/components/auth/GithubButton";

type LoadingState = {
  google: boolean;
  github: boolean;
  email: boolean;
  otp: boolean;
};

interface AuthFormProps {
  mode: "signup" | "login";
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const isSignup = mode === "signup";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loading, setLoading] = useState<LoadingState>({
    google: false,
    github: false,
    email: false,
    otp: false,
  });

  const isAnyLoading = Object.values(loading).some(Boolean);

  const setLoadingKey = (key: keyof LoadingState, value: boolean) =>
    setLoading((prev) => ({ ...prev, [key]: value }));

  const handleGoogle = async () => {
    setLoadingKey("google", true);
    await signIn("google");
    setLoadingKey("google", false);
  };

  const handleGithub = async () => {
    setLoadingKey("github", true);
    await signIn("github");
    setLoadingKey("github", false);
  };

  const handleEmail = async () => {
    if (!email.trim()) return;
    if (isSignup && !name.trim()) return;
    setLoadingKey("email", true);
    // TODO: POST /auth/send-otp { email, name, isSignup }
    await new Promise((r) => setTimeout(r, 800));
    setLoadingKey("email", false);
    setShowOtpModal(true);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleOtpSubmit = async () => {
    const code = otp.join("");
    if (code.length < 4) return;
    setLoadingKey("otp", true);
    // TODO: POST /auth/verify-otp { email, code, isSignup }
    await new Promise((r) => setTimeout(r, 800));
    setLoadingKey("otp", false);
    console.log("OTP submitted:", { code, email, isSignup });
  };

  const handleCloseModal = () => {
    setShowOtpModal(false);
    setOtp(["", "", "", ""]);
  };

  const isEmailReady = email.trim() && (isSignup ? name.trim() : true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--background)">
      {/* <ThemeToggle /> */}
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-2xl p-8 space-y-5 shadow-sm bg-(--canvas) border border-(--border)">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2 bg-(--primary)">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-(--text-primary)">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-(--text-secondary)">
              {isSignup ? "Start writing with" : "Sign in to"}{" "}
              <span className="font-semibold text-(--primary)">Draftly</span>
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            {/* Name — signup only */}
            {isSignup && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-secondary)" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isAnyLoading}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 border border-(--border) text-(--text-primary) bg-(--background) focus:border-(--primary) focus:bg-(--canvas) focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-secondary)" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isAnyLoading}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 border border-(--border) text-(--text-primary) bg-(--background) focus:border-(--primary) focus:bg-(--canvas) focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <button
              onClick={handleEmail}
              disabled={isAnyLoading || !isEmailReady}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 bg-(--primary) hover:bg-(--primary-hover) disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading.email ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Continue with Email"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-(--border)" />
            <span className="text-xs font-medium text-(--text-secondary)">OR</span>
            <div className="flex-1 h-px bg-(--border)" />
          </div>

          {/* OAuth */}
          <div className="space-y-3">
            <GoogleButton onclick={handleGoogle} loading={loading.google} disabled={isAnyLoading} />
            <GithubButton onclick={handleGithub} loading={loading.github} disabled={isAnyLoading} />
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-(--text-secondary)">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href={isSignup ? "/auth/login" : "/auth/signup"}
              className="font-medium text-(--primary) hover:text-(--primary-hover) transition-colors"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </a>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-sm rounded-2xl p-8 space-y-6 bg-(--canvas) border border-(--border) shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-(--text-primary)">Check your email</h2>
                <p className="text-sm text-(--text-secondary)">
                  We sent a 4-digit code to{" "}
                  <span className="font-medium text-(--text-primary)">{email}</span>
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-(--text-secondary) hover:text-(--text-primary) transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-14 h-14 text-center text-xl font-semibold rounded-xl outline-none transition-all duration-150 border border-(--border) text-(--text-primary) bg-(--background) focus:border-(--primary) focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
                />
              ))}
            </div>

            <button
              onClick={handleOtpSubmit}
              disabled={otp.join("").length < 4 || loading.otp}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 bg-(--primary) hover:bg-(--primary-hover) disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading.otp ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </button>

            <p className="text-center text-xs text-(--text-secondary)">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={handleEmail}
                disabled={isAnyLoading}
                className="font-medium text-(--primary) hover:text-(--primary-hover) transition-colors disabled:opacity-50"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
