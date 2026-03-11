"use client";

import DocumentEditor from "@/components/dashboard/DocumentEditor";
import DocumentHeader from "@/components/dashboard/DocumentHeader";
import SaveStatus from "@/components/dashboard/SaveStatus";
import GhostButton from "@/components/ui/GhostButton";
import Loader from "@/components/ui/Loader";
import { useToast } from "@/context/ToastContext";
import { Document, DocumentSaving } from "@/types/common";
import api, { getErrorMessage } from "@/utils/axios.util";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { error } = useToast();

  const [document, setDocument] = useState<Document | null>(null);
  const [fetching, setFetching] = useState(true);
  const [editorContent, setEditorContent] = useState("");
  const [savingDocumentStatus, setSavingDocumentStatus] = useState<DocumentSaving>("saved");

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchDocument = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/document/${id}`);
      const doc = response.data.document;
      setDocument(doc);
      setEditorContent(doc.content ?? "");
    } catch (err) {
      error(getErrorMessage(err));
      router.replace("/dashboard");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (id) fetchDocument();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (fetching) return <Loader />;
  if (!document) return null;

  const handleSave = async (content: string) => {
    setSavingDocumentStatus("saving");
    try {
      await api.patch(`/document/${id}/save`, { content });
      setSavingDocumentStatus("saved");
    } catch (err) {
      error(getErrorMessage(err));
      setSavingDocumentStatus("error");
    }
  };

  const handleEditorChange = (html: string) => {
    setEditorContent(html);
    setSavingDocumentStatus("saving"); // ✅ immediate feedback while debouncing
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      handleSave(html);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen font-mono p-10"
      style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-3xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <GhostButton
            label="Back"
            icon={ArrowLeft}
            onClick={() => router.back()}
          />
          <SaveStatus status={savingDocumentStatus} />
        </div>

        {/* Header */}
        <DocumentHeader document={document} />

        {/* Editor */}
        <DocumentEditor content={editorContent} onChange={handleEditorChange} />
      </div>
    </div>
  );
};

export default Page;