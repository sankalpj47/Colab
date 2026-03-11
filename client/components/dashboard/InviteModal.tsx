"use client";

import { useState } from "react";
import { X, UserPlus, ChevronDown } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import api, { getErrorMessage } from "@/utils/axios.util";
import { useToast } from "@/context/ToastContext";
import { DocumentUserRole } from "@/types/common";

const ROLES: { value: DocumentUserRole; label: string; description: string }[] = [
  {
    value: "EDITOR",
    label: "Editor",
    description: "Can read and edit this document",
  },
  {
    value: "VIEWER",
    label: "Viewer",
    description: "Can only read this document",
  },
];

const InviteModal = ({
  documentId,
  onClose,
}: {
  documentId: string;
  onClose: () => void;
}) => {
  const { success, error } = useToast();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<DocumentUserRole>("VIEWER");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedRole = ROLES.find((r) => r.value === role)!;

  const handleInvite = async () => {
    if (!email.trim()) return;
    try {
      setLoading(true);
      await api.post(`/document/${documentId}/invite`, { email, role });
      success(`Invite sent to ${email}`);
      onClose();
    } catch (err) {
      error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="w-full max-w-md rounded-lg border p-6 font-mono"
        style={{
          backgroundColor: "var(--canvas)",
          borderColor: "var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <UserPlus size={16} style={{ color: "var(--primary)" }} />
            <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              Invite collaborator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 transition-colors"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)")
            }
          >
            <X size={14} />
          </button>
        </div>

        {/* Email input */}
        <div className="mb-3">
          <label
            className="block text-xs mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors font-mono"
            style={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            onFocus={(e) =>
              ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--primary)")
            }
            onBlur={(e) =>
              ((e.currentTarget as HTMLInputElement).style.borderColor = "var(--border)")
            }
            onKeyDown={(e) => e.key === "Enter" && handleInvite()}
          />
        </div>

        {/* Role dropdown */}
        <div className="mb-6 relative">
          <label
            className="block text-xs mb-1.5"
            style={{ color: "var(--text-secondary)" }}
          >
            Role
          </label>
          <button
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between rounded-md border px-3 py-2 text-sm font-mono transition-colors"
            style={{
              backgroundColor: "var(--background)",
              borderColor: dropdownOpen ? "var(--primary)" : "var(--border)",
              color: "var(--text-primary)",
            }}
          >
            <span>{selectedRole.label}</span>
            <ChevronDown
              size={13}
              style={{
                color: "var(--text-secondary)",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.15s ease",
              }}
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-1 rounded-md border z-10 overflow-hidden"
              style={{
                backgroundColor: "var(--canvas)",
                borderColor: "var(--border)",
              }}
            >
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  onClick={() => {
                    setRole(r.value);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 transition-colors"
                  style={{
                    backgroundColor:
                      role === r.value ? "var(--hover)" : "transparent",
                    color: "var(--text-primary)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      "var(--hover)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                      role === r.value ? "var(--hover)" : "transparent")
                  }
                >
                  <div className="text-xs font-semibold font-mono">{r.label}</div>
                  <div
                    className="text-xs mt-0.5 font-mono"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {r.description}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="text-xs px-3 py-1.5 rounded-md transition-colors font-mono"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)")
            }
          >
            Cancel
          </button>
          <PrimaryButton
            onClick={handleInvite}
            loading={loading}
            loadingText="Sending..."
          >
            Send invite
            </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;