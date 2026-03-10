import { Prisma } from "@prisma/client";

type CreateUserInput = Prisma.UserCreateInput;
type CreateDocumentInput = Prisma.DocumentUncheckedCreateInput;

type AuthTokenPayload = {
  id: string;
  role: string;
};

type DecodeResult = { success: true; token: AuthTokenPayload } | { success: false; token: null };

export type { CreateUserInput, CreateDocumentInput, DecodeResult, AuthTokenPayload };
