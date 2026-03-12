"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ArrowLeft, Camera, Trash2, Save } from "lucide-react";
import GhostButton from "@/components/ui/GhostButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Input from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";
import api, { getErrorMessage } from "@/utils/axios.util";
import { generateUserColor, getInitials } from "@/utils/common.util";
import Image from "next/image";
import ImageUploadModal from "@/components/dashboard/profile/ImageUploadModal";

type Profile = {
  id: string;
  name: string;
  email: string;
  imageUrl: string | null;
  provider: "GOOGLE" | "GITHUB" | "EMAIL";
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

const ProfileSkeleton = () => (
  <div className="animate-pulse">
    <div
      className="flex items-center gap-6 mb-10 pb-10 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="w-20 h-20 rounded-full" style={{ backgroundColor: "var(--hover)" }} />
      <div className="flex flex-col gap-2">
        <div className="w-32 h-4 rounded" style={{ backgroundColor: "var(--hover)" }} />
        <div className="w-48 h-3 rounded" style={{ backgroundColor: "var(--hover)" }} />
        <div className="w-20 h-6 rounded" style={{ backgroundColor: "var(--hover)" }} />
      </div>
    </div>
    <div className="flex flex-col gap-5">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="w-16 h-3 rounded" style={{ backgroundColor: "var(--hover)" }} />
          <div className="w-full h-9 rounded" style={{ backgroundColor: "var(--hover)" }} />
        </div>
      ))}
    </div>
  </div>
);

const providerLabel: Record<string, string> = {
  GOOGLE: "Google",
  GITHUB: "GitHub",
  EMAIL: "Email",
};

const Page = () => {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const { success, error } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [fetching, setFetching] = useState(true);
  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      setFetching(true);
      const response = await api.get("/user/profile");
      const data = response.data.user;
      setProfile(data);
      setName(data.name);
    } catch (err) {
      error(getErrorMessage(err));
      router.replace("/dashboard");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateProfile = async () => {
    if (!name.trim()) { error("Name is required."); return; }
    if (name.trim() === profile?.name) { error("No changes to save."); return; }
    try {
      setUpdating(true);
      await api.patch("/user/profile", { name: name.trim() });
      await updateSession({ name: name.trim() });
      success("Profile updated.");
      fetchProfile();
    } catch (err) {
      error(getErrorMessage(err));
    } finally {
      setUpdating(false);
    }
  };

  const handleImageSuccess = (newImageUrl: string) => {
    setProfile((prev) => prev ? { ...prev, imageUrl: newImageUrl } : prev);
    setImgError(false);
    success("Profile photo updated.");
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) { setDeleteConfirm(true); return; }
    try {
      setDeleting(true);
      await api.delete("/user/profile");
      await signOut({ redirect: false });
      router.replace("/auth/login");
    } catch (err) {
      error(getErrorMessage(err));
      setDeleting(false);
      setDeleteConfirm(false);
    }
  };

  const color = generateUserColor(profile?.email ?? session?.user?.email ?? "");

  if (fetching) return (
    <div
      className="min-h-screen font-mono p-10"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-xl mx-auto">
        <div className="mb-10">
          <GhostButton label="Back" icon={ArrowLeft} onClick={() => router.back()} />
        </div>
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Profile
        </p>
        <h1 className="text-xl font-semibold mb-10" style={{ color: "var(--text-primary)" }}>
          Your account
        </h1>
        <ProfileSkeleton />
      </div>
    </div>
  );

  if (!profile) return null;

  return (
    <div
      className="min-h-screen font-mono p-10"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-xl mx-auto">
        {/* Back */}
        <div className="mb-10">
          <GhostButton label="Back" icon={ArrowLeft} onClick={() => router.back()} />
        </div>

        {/* Page title */}
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Profile
        </p>
        <h1 className="text-xl font-semibold mb-10" style={{ color: "var(--text-primary)" }}>
          Your account
        </h1>

        {/* Card */}
        <div
          className="rounded-lg border overflow-hidden"
          style={{
            backgroundColor: "var(--canvas)",
            borderColor: "var(--border)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {/* Avatar section */}
          <div
            className="px-8 py-7 border-b flex items-center gap-6"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="relative">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden"
                style={{ border: `3px solid ${color}`, backgroundColor: "var(--background)" }}
              >
                {profile.imageUrl && !imgError ? (
                  <Image
                    height={80}
                    width={80}
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span
                    className="font-semibold text-xl"
                    style={{ color: "var(--text-primary)", fontFamily: "monospace" }}
                  >
                    {getInitials(profile.name)}
                  </span>
                )}
              </div>

              {/* Camera button */}
              <button
                onClick={() => setImageModalOpen(true)}
                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors"
                style={{
                  backgroundColor: "var(--canvas)",
                  borderColor: "var(--background)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)")
                }
              >
                <Camera size={12} />
              </button>
            </div>

            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {profile.name}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {profile.email}
              </p>
              <div
                className="inline-flex items-center gap-1 mt-2 text-[10px] px-2 py-0.5 rounded-full font-mono"
                style={{ backgroundColor: "var(--hover)", color: "var(--text-secondary)" }}
              >
                {providerLabel[profile.provider]} account
              </div>
            </div>
          </div>

          {/* Form section */}
          <div className="px-8 py-7 flex flex-col gap-5">
            <Input
              label="Name"
              value={name}
              className="rounded-md"
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              onKeyDown={(e) => e.key === "Enter" && handleUpdateProfile()}
            />
            <Input
              label="Email"
              value={profile.email}
              className="rounded-md"
              onChange={() => {}}
              disabled
            />

            {/* Meta info */}
            <div
              className="grid grid-cols-2 gap-3 pt-2 border-t text-xs"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <p style={{ color: "var(--text-secondary)" }}>Member since</p>
                <p className="mt-0.5" style={{ color: "var(--text-primary)" }}>
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p style={{ color: "var(--text-secondary)" }}>Last updated</p>
                <p className="mt-0.5" style={{ color: "var(--text-primary)" }}>
                  {new Date(profile.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Save */}
            <div className="flex justify-end pt-2">
              <PrimaryButton
                onClick={handleUpdateProfile}
                loading={updating}
                className="flex items-center justify-center gap-3 w-full"
                loadingText="Saving..."
              >
                <Save size={13} />
                Save changes
              </PrimaryButton>
            </div>
          </div>

          {/* Danger zone */}
          <div
            className="px-8 py-6 border-t"
            style={{ borderColor: "var(--border)", backgroundColor: "#EF444408" }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--error)" }}>
              Danger zone
            </p>
            <p className="text-xs mb-4" style={{ color: "var(--text-secondary)" }}>
              Permanently delete your account and all associated documents. This cannot be undone.
            </p>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-md border font-mono transition-all disabled:opacity-50"
              style={{
                borderColor: "var(--error)",
                color: deleteConfirm ? "#ffffff" : "var(--error)",
                backgroundColor: deleteConfirm ? "var(--error)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!deleteConfirm) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--error)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
                }
              }}
              onMouseLeave={(e) => {
                if (!deleteConfirm) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--error)";
                }
              }}
            >
              {deleting ? (
                <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 size={13} />
              )}
              {deleting ? "Deleting..." : deleteConfirm ? "Click again to confirm" : "Delete account"}
            </button>
            {deleteConfirm && !deleting && (
              <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
                Are you sure? Click the button again to permanently delete your account.{" "}
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="underline"
                  style={{ color: "var(--primary)" }}
                >
                  Cancel
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {imageModalOpen && (
        <ImageUploadModal
          currentImage={profile.imageUrl}
          name={profile.name}
          email={profile.email}
          onClose={() => setImageModalOpen(false)}
          onSuccess={handleImageSuccess}
        />
      )}
    </div>
  );
};

export default Page;