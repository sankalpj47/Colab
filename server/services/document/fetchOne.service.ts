import { DocumentUserRole } from "@prisma/client";
import logger from "../../config/logger.config";
import { findDocumentById } from "../../repositories/document/document.repository";
import { findDocumentUser } from "../../repositories/document/documentUser.repository";
import { getLatestDocumentVersion } from "../../repositories/document/documentVersion.repository";
import { ApiError, handleServerError } from "../../utils/error.utils";

const fetchOneDocumentService = async (documentId: string, userId: string) => {
  try {
    if (!documentId.trim()) {
      throw new ApiError(400, "Document ID is required");
    }

    const document = await findDocumentById(documentId);
    if (!document) {
      throw new ApiError(404, "No document found.");
    }

    let role: DocumentUserRole | "OWNER" | null = null;
    if (document.ownerId === userId) {
      role = "OWNER";
    } else {
      const documentUser = await findDocumentUser(documentId, userId);
      if (!documentUser) {
        throw new ApiError(403, "You do not have access to this document.");
      }
      role = documentUser.role;
    }

    const latestVersion = await getLatestDocumentVersion(documentId);
    logger.success(`Document title: ${document.title} fetched successfully`)
    return {
      ...document,
      content: latestVersion?.content ?? null, // base64 or null
      updatedAt: latestVersion?.savedAt ?? document.updatedAt,
      role
    };
  } catch (err) {
    logger.error(
      "Error in fetchOneDocumentService: " + (err instanceof Error ? err.message : String(err))
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default fetchOneDocumentService;
