"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section
      className="p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border rounded-md"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--canvas)" }}
    >
      <div>
        <h2
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: "'Georgia', serif", color: "var(--text-primary)" }}
        >
          Ready to try it?
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          See the full auth flow live — sign up or log in in seconds.
        </p>
      </div>
      <Link
        href="/auth/login"
        className="group shrink-0 inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-colors rounded-md"
        style={{ backgroundColor: "var(--primary)", color: "#ffffff" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)";
        }}
      >
        Get started
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </section>
  );
}
