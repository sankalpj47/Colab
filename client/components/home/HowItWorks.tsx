import { FileText, Lock, MousePointer2, Users } from "lucide-react";
import FadeUp from "../ui/FadeUp";

const steps = [
  {
    n: "01",
    title: "Create an account",
    description:
      "Sign up in seconds with Google, GitHub, or your email address. No password required — we use OTP for email sign-in.",
    icon: Lock,
  },
  {
    n: "02",
    title: "Create a document",
    description:
      "Click 'New document', give it a title and description. Your document is instantly saved and ready to edit.",
    icon: FileText,
  },
  {
    n: "03",
    title: "Invite collaborators",
    description:
      "Enter a collaborator's email and choose their role — Editor or Viewer. They'll receive an invitation email with a direct link.",
    icon: Users,
  },
  {
    n: "04",
    title: "Write together",
    description:
      "Open the document and start editing. See your teammates' cursors live. Changes are auto-saved every 2 seconds.",
    icon: MousePointer2,
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="py-28 px-6 border-t"
    style={{ borderColor: "var(--border)", backgroundColor: "var(--canvas)" }}
  >
    <div className="max-w-5xl mx-auto">
      <FadeUp>
        <p
          className="text-center font-mono text-[10px] tracking-[0.4em] uppercase mb-3"
          style={{ color: "var(--primary)" }}
        >
          How it works
        </p>
        <h2
          className="text-center font-mono font-bold text-3xl mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Up and running in minutes
        </h2>
        <p
          className="text-center font-mono text-sm max-w-lg mx-auto mb-20"
          style={{ color: "var(--text-secondary)" }}
        >
          No complex setup. No configuration files. Just sign up and start collaborating.
        </p>
      </FadeUp>
      <div className="relative">
        <div
          className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
          style={{ backgroundColor: "var(--border)" }}
        />
        <div className="space-y-12">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 100}>
              <div className="flex gap-8 items-start">
                <div
                  className="relative w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 font-mono font-bold text-sm z-10"
                  style={{
                    backgroundColor: "var(--canvas)",
                    borderColor: "var(--border)",
                    color: "var(--primary)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="flex-1 pt-2 pb-8 border-b last:border-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <s.icon size={14} style={{ color: "var(--primary)" }} />
                    <h3
                      className="font-mono font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {s.title}
                    </h3>
                  </div>
                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
