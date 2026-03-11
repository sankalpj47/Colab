type Document = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  role: DocumentMemberRole;
};

type DocumentSaving = "saving" | "saved" | "error";

type DocumentUserRole = "VIEWER" | "EDITOR";
type DocumentMemberRole = DocumentUserRole | "OWNER";

type DocumentMember = {
  id: string;
  role: DocumentMemberRole;
  user: {
    id: string;
    name: string;
    email: string;
    imageUrl: string | null;
  };
};

export type { Document, DocumentSaving, DocumentUserRole, DocumentMemberRole, DocumentMember };
