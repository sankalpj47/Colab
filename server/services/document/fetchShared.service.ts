import prisma from "../../config/prisma.config";
import { handleServerError } from "../../utils/error.utils";
import logger from "../../config/logger.config";

const fetchSharedDocumentsService = async (userId: string) => {
  try {
    const documentUsers = await prisma.documentUser.findMany({
      where: { userId },
      include: {
        document: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return documentUsers.map((du) => ({
      ...du.document,
      role: du.role,
    }));
  } catch (err) {
    logger.error(
      "Error in fetchSharedDocumentsService: " + (err instanceof Error ? err.message : String(err))
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default fetchSharedDocumentsService;
