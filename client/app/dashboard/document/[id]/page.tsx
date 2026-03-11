"use client";

import DocumentEditor from "@/components/dashboard/DocumentEditor";
import DocumentHeader from "@/components/dashboard/DocumentHeader";
import InviteButton from "@/components/dashboard/InviteButton";
import InviteModal from "@/components/dashboard/InviteModal";
import SaveStatus from "@/components/dashboard/SaveStatus";
import GhostButton from "@/components/ui/GhostButton";
import Loader from "@/components/ui/Loader";
import { useToast } from "@/context/ToastContext";
import { Document, DocumentSaving } from "@/types/common";
import api, { getErrorMessage } from "@/utils/axios.util";
import { generateUserColor } from "@/utils/common.util";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { error } = useToast();

  const [document, setDocument] = useState<Document | null>(null);
  const [fetching, setFetching] = useState(true);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [savingDocumentStatus, setSavingDocumentStatus] = useState<DocumentSaving>("saved");
  const { data: session } = useSession();

  const currentUser = {
    name: session?.user.name ?? "Anonymous",
    color: generateUserColor(
      session?.user.email ?? session?.user.name ?? "anonymous"
    ),
  };

  const fetchDocument = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/document/${id}`);
      const doc = response.data.document;
      setDocument(doc);
      setIsReadOnly(doc.role === "VIEWER");
      setIsOwner(doc.role === "OWNER");
    } catch (err) {
      error(getErrorMessage(err));
      router.replace("/dashboard");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) fetchDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (fetching) return <Loader />;
  if (!document) return null;

  return (
    <div
      className="min-h-screen font-mono p-10"
      style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <GhostButton label="Back" icon={ArrowLeft} onClick={() => router.back()} />
          <div className="flex items-center gap-3">
            {isOwner && <InviteButton onClick={() => setInviteOpen(true)} />}
            <SaveStatus status={savingDocumentStatus} />
          </div>
        </div>

        {/* Header */}
        <DocumentHeader document={document} />

        {/* Editor */}
        <DocumentEditor
          documentId={id}
          currentUser={currentUser}
          initialContent={document.content ?? undefined}
          isReadOnly={isReadOnly}
          onSaveStatusChange={setSavingDocumentStatus}
        />
      </div>

      {/* Invite modal */}
      {inviteOpen && (
        <InviteModal
          documentId={id}
          onClose={() => setInviteOpen(false)}
        />
      )}
    </div>
  );
};

export default Page;