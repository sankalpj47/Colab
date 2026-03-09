"use client";
import AuthNavbar from "@/components/auth/AuthNavbar";
import { ToastProvider } from "@/context/ToastContext";
import { SessionProvider } from "next-auth/react";
import "../globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <AuthNavbar />
        <main className="page-transition">{children}</main>
      </ToastProvider>
    </SessionProvider>
  );
}
