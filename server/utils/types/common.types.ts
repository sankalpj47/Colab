import { Prisma } from "@prisma/client";

type CreateUserInput = Prisma.UserCreateInput;

type AuthTokenPayload = {
  id: string;
  role: string;
};

type DecodeResult =
  | { success: true; token: AuthTokenPayload }
  | { success: false; token: null };

export type { CreateUserInput, DecodeResult, AuthTokenPayload };
