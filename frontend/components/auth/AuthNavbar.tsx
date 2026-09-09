"use client";

import { FileText } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";

export default function AuthNavbar() {
  return (
    <nav className="w-full border-b border-(--border) bg-(--background)">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg font-mono"
          style={{ color: "var(--text-primary)" }}
        >
          <div
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <div className="w-8 h-8  flex items-center justify-center">
  <Image
    src="/logo.svg"
    alt="Logo"
    width={32}
    height={32}
    className="w-8 h-8 object-contain"
  />
</div>
          </div>
          Colab
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
