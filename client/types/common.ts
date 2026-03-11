type Document = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

type DocumentSaving = "saving" | "saved" | "error";

type DocumentUserRole = "VIEWER" | "EDITOR"

export type { Document, DocumentSaving, DocumentUserRole };
