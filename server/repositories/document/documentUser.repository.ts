import prisma from "../../config/prisma.config";
import { CreateDocumentUserInput } from "../../utils/types/common.types";

const findDocumentUser = async (documentId: string, userId: string) => {
  try {
    const documentUser = await prisma.documentUser.findUnique({
      where: {
        userId_documentId: {
          userId,
          documentId,
        },
      },
    });

    return documentUser;
  } catch (err) {
    throw err;
  }
};

const createDocumentUser = async (documentUser: CreateDocumentUserInput) => {
  try {
    const newUser = await prisma.documentUser.create({
      data: {
        userId: documentUser.userId,
        documentId: documentUser.documentId,
        ...(documentUser.role !== undefined && { role: documentUser.role }),
      },
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

export { findDocumentUser, createDocumentUser };
