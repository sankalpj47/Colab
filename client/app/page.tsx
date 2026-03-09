import CTA from "@/components/home/Cta";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/home/Navbar";
import QuickStart from "@/components/home/Quickstart";
import StackPills from "@/components/home/StackPills";

export default function Home() {
  return (
    <div
      className="min-h-screen font-mono page-transition"
      style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}
    >
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-125 h-125 rounded-full blur-[140px] opacity-20"
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div
          className="absolute bottom-0 -right-48 w-100 h-100 rounded-full blur-[120px] opacity-10"
          style={{ backgroundColor: "var(--primary)" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <Navbar />
        <Hero />
        <StackPills />
        <Features />
        <QuickStart />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
