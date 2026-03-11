import { UserRole, AuthProvider, DocumentUserRole } from "@prisma/client";

const isValidUserRole = (role: string): boolean => {
  return Object.values(UserRole).includes(role as UserRole);
};

const isValidAuthProvider = (authProvider: string): boolean => {
  return Object.values(AuthProvider).includes(authProvider as AuthProvider);
}

const canEditDocument = (role: string): boolean => {
  return role === DocumentUserRole.EDITOR
}

export { isValidUserRole, isValidAuthProvider, canEditDocument };