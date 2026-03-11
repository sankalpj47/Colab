"use client";

import DocumentEditor from "@/components/dashboard/DocumentEditor";
import DocumentHeader from "@/components/dashboard/DocumentHeader";
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
          <SaveStatus status={savingDocumentStatus} />
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
    </div>
  );
};

export default Page;