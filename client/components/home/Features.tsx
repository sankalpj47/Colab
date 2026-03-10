"use client";

import { Chrome, Github, Mail, Timer, ShieldCheck, Database } from "lucide-react";

const features = [
  {
    icon: Chrome,
    label: "Google OAuth",
    desc: "One-click sign in via Google",
  },
  {
    icon: Github,
    label: "GitHub OAuth",
    desc: "One-click sign in via GitHub",
  },
  {
    icon: Mail,
    label: "Email + OTP",
    desc: "Passwordless login via 6-digit OTP",
  },
  {
    icon: Timer,
    label: "Redis OTP TTL",
    desc: "OTPs expire in 10 minutes automatically",
  },
  {
    icon: ShieldCheck,
    label: "JWT Sessions",
    desc: "Stateless, secure NextAuth sessions",
  },
  {
    icon: Database,
    label: "Prisma + Supabase",
    desc: "Type-safe PostgreSQL via Prisma ORM",
  },
];

const cornerClass: Record<number, string> = {
  0: "rounded-tl-md",
  2: "rounded-tr-md",
  3: "rounded-bl-md",
  5: "rounded-br-md",
};

export default function Features() {
  return (
    <section className="mb-28">
      <div className="flex items-center gap-4 mb-8">
        <p
          className="text-[10px] tracking-[0.4em] uppercase shrink-0"
          style={{ color: "var(--text-secondary)" }}
        >
          What&apos;s included
        </p>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px">
        {features.map(({ icon: Icon, label, desc }, index) => (
          <div
            key={label}
            className={`p-6 transition-colors ${cornerClass[index] ?? ""}`}
            style={{ backgroundColor: "var(--canvas)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "var(--canvas)";
            }}
          >
            <div
              className="w-9 h-9 flex items-center justify-center mb-4 rounded-md border"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
              }}
            >
              <Icon className="w-4 h-4" style={{ color: "var(--primary)" }} strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {label}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
