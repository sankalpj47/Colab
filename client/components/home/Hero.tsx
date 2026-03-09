"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="mb-28">
      <div className="flex items-center gap-2 mb-6">
        <div
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--success)" }}
        />
        <span
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: "var(--success)" }}
        >
          Ready to clone
        </span>
      </div>

      <h1
        className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        style={{ fontFamily: "'Georgia', serif", color: "var(--text-primary)" }}
      >
        Auth,
        <br />
        <span style={{ color: "var(--text-secondary)" }}>out of the box.</span>
      </h1>

      <p
        className="max-w-lg text-base leading-relaxed mb-10"
        style={{ color: "var(--text-secondary)" }}
      >
        A full-stack authentication boilerplate — Google, GitHub, and passwordless Email OTP, wired
        end-to-end. Built for hackathons and projects where you&apos;d rather ship features than
        wire up auth.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/auth/login"
          className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wide transition-colors"
          style={{ backgroundColor: "var(--primary)", color: "#ffffff" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)";
          }}
        >
          Try it out
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <a
          href="https://github.com/SHIVAM-KUMAR-59/authkit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm transition-colors border"
          style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--text-secondary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
          }}
        >
          View source
        </a>
      </div>
    </section>
  );
}
