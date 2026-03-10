"use client";

import { Document } from "@/types/common";
import { formatDate } from "@/utils/common.util";
import { FileText, Clock } from "lucide-react";

interface Props {
  doc: Document;
  isFirst?: boolean;
  isLast?: boolean;
  onClick?: (doc: Document) => void;
}

const DocumentCard = ({ doc, isFirst, isLast, onClick }: Props) => {
  return (
    <div
      className={`p-5 flex items-start justify-between gap-4 cursor-pointer transition-colors
        ${isFirst ? "rounded-t-md" : ""}
        ${isLast ? "rounded-b-md" : ""}
      `}
      style={{ backgroundColor: "var(--canvas)" }}
      onClick={() => onClick?.(doc)}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "var(--canvas)";
      }}
    >
      <div className="flex items-start gap-3 min-w-0">
        <FileText
          className="w-4 h-4 mt-0.5 shrink-0"
          style={{ color: "var(--primary)" }}
          strokeWidth={1.5}
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {doc.title}
          </p>
          {doc.description && (
            <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
              {doc.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Clock className="w-3 h-3" style={{ color: "var(--text-secondary)" }} />
        <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
          {formatDate(doc.updatedAt)}
        </span>
      </div>
    </div>
  );
}

export default DocumentCard