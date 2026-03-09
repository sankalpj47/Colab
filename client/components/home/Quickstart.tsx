"use client";

const commands = [
  { prompt: "$", cmd: "git clone https://github.com/SHIVAM-KUMAR-59/authkit.git" },
  { prompt: "$", cmd: "cd authkit/server && npm install && cp .env.example .env" },
  { prompt: "$", cmd: "npx prisma migrate dev --name init && npm run dev" },
  { prompt: "$", cmd: "cd ../client && npm install && cp .env.local.example .env.local" },
  { prompt: "$", cmd: "npm run dev" },
];

export default function QuickStart() {
  return (
    <section className="mb-28">
      <div className="flex items-center gap-4 mb-8">
        <p
          className="text-[10px] tracking-[0.4em] uppercase shrink-0"
          style={{ color: "var(--text-secondary)" }}
        >
          Quick start
        </p>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
      </div>

      <div
        className="border rounded-md"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--canvas)" }}
      >
        {/* Terminal chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--error)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--warning)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
          <span
            className="ml-2 text-[10px] tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            terminal
          </span>
        </div>

        <div className="p-6 space-y-2 text-sm">
          {commands.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: "var(--text-secondary)" }} className="select-none">
                {line.prompt}
              </span>
              <span style={{ color: "var(--primary)" }}>{line.cmd}</span>
            </div>
          ))}
          <div className="flex gap-3 pt-1">
            <span style={{ color: "var(--text-secondary)" }} className="select-none">
              →
            </span>
            <span style={{ color: "var(--text-secondary)" }}>Visit http://localhost:3000</span>
          </div>
        </div>
      </div>
    </section>
  );
}
