"use client";

import { Document } from "@/types/common";
import { formatRelativeTime } from "@/utils/common.util";
import { FileText, Clock } from "lucide-react";

interface Props {
  document: Document;
}

const DocumentHeader = ({ document }: Props) => {
  return (
    <div className="pb-6 mb-8 border-b" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-start gap-3 mb-3">
        <FileText
          className="w-5 h-5 mt-1 shrink-0"
          style={{ color: "var(--primary)" }}
          strokeWidth={1.5}
        />
        <h1
          className="text-2xl font-bold leading-snug"
          style={{ fontFamily: "'Georgia', serif", color: "var(--text-primary)" }}
        >
          {document.title}
        </h1>
      </div>

      <p className="text-sm leading-relaxed ml-8" style={{ color: "var(--text-secondary)" }}>
        {document.description ?? "No description provided"}
      </p>

      <div className="flex items-center gap-4 mt-4 ml-8">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3" style={{ color: "var(--text-secondary)" }} />
          <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
            Created {formatRelativeTime(document.createdAt)}
          </span>
        </div>
        {document.createdAt !== document.updatedAt && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" style={{ color: "var(--text-secondary)" }} />
            <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
              Updated {formatRelativeTime(document.updatedAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentHeader;
