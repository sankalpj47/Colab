"use client";

const stack = [
  "Next.js 15",
  "TypeScript",
  "NextAuth.js",
  "Express 5",
  "Prisma",
  "Supabase",
  "Redis",
  "Nodemailer",
  "Tailwind CSS",
  "Prettier",
];

export default function StackPills() {
  return (
    <section className="mb-24">
      <p
        className="text-[10px] tracking-[0.4em] uppercase mb-4"
        style={{ color: "var(--text-secondary)" }}
      >
        Built with
      </p>
      <div className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="text-[11px] tracking-wider px-3 py-1 transition-colors cursor-default border"
            style={{
              color: "var(--text-secondary)",
              borderColor: "var(--border)",
              backgroundColor: "var(--canvas)",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
