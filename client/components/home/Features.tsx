"use client";

const features = [
  { icon: "G", label: "Google OAuth", desc: "One-click sign in via Google" },
  { icon: "GH", label: "GitHub OAuth", desc: "One-click sign in via GitHub" },
  { icon: "✉", label: "Email + OTP", desc: "Passwordless login via 6-digit OTP" },
  { icon: "⏱", label: "Redis OTP TTL", desc: "OTPs expire in 10 minutes automatically" },
  { icon: "🔒", label: "JWT Sessions", desc: "Stateless, secure NextAuth sessions" },
  { icon: "🗄", label: "Prisma + Supabase", desc: "Type-safe PostgreSQL via Prisma ORM" },
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
        {features.map((f, index) => (
          <div
            key={f.label}
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
              className="w-8 h-8 flex items-center justify-center text-xs font-bold mb-4 border"
              style={{
                color: "var(--primary)",
                borderColor: "var(--border)",
                backgroundColor: "var(--background)",
              }}
            >
              {f.icon}
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
              {f.label}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
