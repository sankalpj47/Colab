"use client";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between mb-24">
      <div className="flex items-center gap-2.5">
        <div
          className="w-6 h-6 rotate-45 flex items-center justify-center border"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="w-2 h-2 rotate-45" style={{ backgroundColor: "var(--primary)" }} />
        </div>
        <span
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          AuthKit
        </span>
      </div>
      <a
        href="https://github.com/SHIVAM-KUMAR-59/authkit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors border rounded-md"
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
        GitHub →
      </a>
    </nav>
  );
}
