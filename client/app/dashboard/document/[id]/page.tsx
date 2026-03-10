"use client";

import DocumentHeader from "@/components/dashboard/DocumentHeader";
import Loader from "@/components/ui/Loader";
import { useToast } from "@/context/ToastContext";
import { Document } from "@/types/common";
import api, { getErrorMessage } from "@/utils/axios.util";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { error } = useToast();

  const [document, setDocument] = useState<Document | null>(null);
  const [fetching, setFetching] = useState(true);

  const fetchDocument = async () => {
    try {
      setFetching(true);
      const response = await api.get(`/document/${id}`);
      setDocument(response.data.document);
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

        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase mb-10 transition-colors"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          }}
        >
          <ArrowLeft className="w-3 h-3" strokeWidth={1.5} />
          Back
        </button>

        {/* Header */}
        <DocumentHeader document={document} />

        {/* Content placeholder */}
        <div
          className="w-full min-h-[60vh] rounded-md border p-6 text-sm leading-relaxed outline-none"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--canvas)",
            color: "var(--text-secondary)",
          }}
        >
          {document.content ? document.content : "Start writing...."}
        </div>

      </div>
    </div>
  );
};

export default Page;