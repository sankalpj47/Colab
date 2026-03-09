"use client";

import React, { useState } from "react";
import { Mail, Github } from "lucide-react";

export default function Page() {
  const [email, setEmail] = useState("");

  const handleEmail = () => {
    console.log(email);
  };

  const handleGoogle = () => {
    console.log("Google auth");
  };

  const handleGithub = () => {
    console.log("Github auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md bg-[var(--canvas)] border border-[var(--border)] shadow-sm rounded-xl p-8 space-y-6">
        
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            Create your account
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Start writing with Draftly
          </p>
        </div>

        {/* Email Input */}
        <div className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-[var(--text-secondary)]" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-[var(--border)] rounded-lg pl-10 pr-3 py-2 text-[var(--text-primary)] bg-[var(--canvas)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            onClick={handleEmail}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white py-2 rounded-lg font-medium transition"
          >
            Continue with Email
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--border)]"></div>
          <span className="text-sm text-[var(--text-secondary)]">or</span>
          <div className="flex-1 h-px bg-(--border)"></div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogle}
            className="w-full border border-[var(--border)] py-2 rounded-lg hover:bg-[var(--hover)] transition text-[var(--text-primary)]"
          >
            Continue with Google
          </button>

          <button
            onClick={handleGithub}
            className="w-full border border-[var(--border)] py-2 rounded-lg hover:bg-[var(--hover)] transition text-[var(--text-primary)] flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}