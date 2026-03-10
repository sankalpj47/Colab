"use client";
import Input from "@/components/ui/Input";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useToast } from "@/context/ToastContext";
import api, { getErrorMessage } from "@/utils/axios.util";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import DocumentCardSkeleton from "@/components/skeleton/DocumentCardSkeleton";
import DocumentCard from "@/components/dashboard/DocumentCard";
import { useRouter } from "next/navigation";
import { Document } from "@/types/common";

const Page = () => {
  const { error, success } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  const fetchAllDocuments = async () => {
    try {
      setFetching(true);
      const response = await api.get("/document/all");
      setDocuments(response.data.documents);
    } catch (err) {
      error(getErrorMessage(err));
    } finally {
      setFetching(false);
    }
  };

  const handleCreateDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      error("Title is required.");
      return;
    }
    try {
      setLoading(true);
      await api.post("/document", {
        title: title.trim(),
        description: description.trim() || null,
      });
      success("Document created successfully.");
      setTitle("");
      setDescription("");
      await fetchAllDocuments();
    } catch (err) {
      error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDocuments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-screen font-mono p-10"
      style={{ backgroundColor: "var(--background)", color: "var(--text-primary)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <p
            className="text-[10px] tracking-[0.4em] uppercase shrink-0"
            style={{ color: "var(--text-secondary)" }}
          >
            Documents
          </p>
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--border)" }} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Create form */}
          <div className="lg:w-80 shrink-0">
            <p
              className="text-[10px] tracking-[0.4em] uppercase mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              New document
            </p>
            <form onSubmit={handleCreateDocument} className="flex flex-col gap-4">
              <Input
                label="Title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled document"
                className="rounded-md"
              />
              <Input
                label="Description"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description..."
                className="rounded-md"
              />
              <PrimaryButton
                type="submit"
                loading={loading}
                loadingText="Creating..."
                className="rounded-md w-full"
              >
                Create document
              </PrimaryButton>
            </form>
          </div>

          {/* Divider */}
          <div
            className="hidden lg:block w-px self-stretch"
            style={{ backgroundColor: "var(--border)" }}
          />

          {/* Documents list */}
          <div className="flex-1">
            {fetching ? (
              <DocumentCardSkeleton />
            ) : documents.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-20 gap-3 border rounded-md"
                style={{ borderColor: "var(--border)" }}
              >
                <FileText
                  className="w-8 h-8"
                  style={{ color: "var(--text-secondary)" }}
                  strokeWidth={1.25}
                />
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  No documents yet
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-px">
                {documents.map((doc, index) => (
                  <DocumentCard
                    key={doc.id}
                    doc={doc}
                    isFirst={index === 0}
                    isLast={index === documents.length - 1}
                    onClick={(doc) => router.push(`/dashboard/${doc.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
