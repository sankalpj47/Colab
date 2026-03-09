"use client";
import { ToastProvider } from "@/context/ToastContext";
import { SessionProvider } from "next-auth/react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>{children}</ToastProvider>
    </SessionProvider>
  );
}
