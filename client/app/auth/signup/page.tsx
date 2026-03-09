"use client";

import { useState } from "react";
import { Mail, FileText } from "lucide-react";
import { signIn } from "next-auth/react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import GoogleButton from "@/components/auth/GoogleButton";
import GithubButton from "@/components/auth/GithubButton";

export default function Page() {
  const [email, setEmail] = useState("");

  const handleEmail = () => console.log(email);
  const handleGoogle = async () => await signIn("google");
  const handleGithub = async () => await signIn("github");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-(--background)">
      <ThemeToggle />
      <div className="w-full max-w-md space-y-8">
        {/* Card */}
        <div className="rounded-2xl p-8 space-y-5 shadow-sm bg-(--canvas) border border-(--border)">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-2 bg-(--primary)">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-(--text-primary)">
              Create your account
            </h1>
            <p className="text-sm text-(--text-secondary)">
              Start writing with <span className="font-semibold text-(--primary)">Draftly</span>
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <GoogleButton onclick={handleGoogle} />
            <GithubButton onclick={handleGithub} />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-(--border)" />
            <span className="text-xs font-medium text-(--text-secondary)">OR</span>
            <div className="flex-1 h-px bg-(--border)" />
          </div>

          {/* Email */}
          <div className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--text-secondary)" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-150 border border-(--border) text-(--text-primary) bg-(--background) dark:bg-(--background)/40 focus:border-(--primary) focus:bg-(--canvas) focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]"
              />
            </div>

            <button
              onClick={handleEmail}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-150 bg-(--primary) hover:bg-(--primary-hover)"
            >
              Continue with Email
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-(--text-secondary)">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-(--primary) hover:text-(--primary-hover) transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
