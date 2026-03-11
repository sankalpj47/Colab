import prisma from "../../config/prisma.config";
import { CreateDocumentInput } from "../../utils/types/common.types";

const findAllDocumentsByUser = async (userId: string) => {
  try {
    const documents = await prisma.document.findMany({
      where: {
        ownerId: userId,
      },
    });

    return documents;
  } catch (err) {
    throw err;
  }
};

const findDocumentById = async (documentId: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });

    return document;
  } catch (err) {
    throw err;
  }
};

const insertDocument = async (input: CreateDocumentInput) => {
  try {
    const newDocument = await prisma.document.create({
      data: {
        title: input.title,
        ownerId: input.ownerId,
        ...(input.description && { description: input.description }),
      },
    });
    return newDocument;
  } catch (err) {
    throw err;
  }
};

const deleteDocument = async (documentId: string) => {
  try {
    await prisma.document.delete({
      where: {
        id: documentId,
      },
    });

    return true;
  } catch (err) {
    throw err;
  }
};

const saveDocumentContent = async(documentId: string, content: string) => {
  try {
    const document = await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        content: content
      }
    })

    return document;
  } catch (err) {
    throw err
  }
}

export { findAllDocumentsByUser, insertDocument, deleteDocument, findDocumentById, saveDocumentContent };
