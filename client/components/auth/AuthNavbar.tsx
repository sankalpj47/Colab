"use client";

import { FileText } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <nav className="w-full border-b border-(--border) bg-(--background)">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center gap-2 font-semibold text-(--text-primary) text-lg"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-(--primary)">
            <FileText className="w-6 h-6 text-white" />
          </div>
          Draftly
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
