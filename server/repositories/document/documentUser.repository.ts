import prisma from "../../config/prisma.config";

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
export { findDocumentUser };
