"use client";

export default function Footer() {
  return (
    <footer
      className="mt-16 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ borderColor: "var(--border)" }}
    >
      <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
        Built for devs who ship fast
      </span>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/SHIVAM-KUMAR-59"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-wider transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          GitHub
        </a>
        <div className="w-px h-3" style={{ backgroundColor: "var(--border)" }} />
        <a
          href="mailto:shivamkumardev01@gmail.com"
          className="text-[11px] tracking-wider transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
