import { DocumentUserRole, Prisma } from "@prisma/client";

type CreateUserInput = Prisma.UserCreateInput;
type CreateDocumentInput = Prisma.DocumentUncheckedCreateInput;
type CreateDocumentUserInput = Prisma.DocumentUserUncheckedCreateInput;
type UserUpdateInput = Prisma.UserUpdateInput

type DocumentMember = {
  id: string;
  role: DocumentUserRole | "OWNER";
  user: {
    id: string;
    email: string;
    name: string;
    imageUrl: string | null;
  };
};

type AuthTokenPayload = {
  id: string;
  role: string;
};

type DecodeResult = { success: true; token: AuthTokenPayload } | { success: false; token: null };

export type {
  CreateUserInput,
  CreateDocumentInput,
  DecodeResult,
  AuthTokenPayload,
  CreateDocumentUserInput,
  DocumentMember,
  UserUpdateInput
};
