import logger from "../../config/logger.config";
import { findDocumentById } from "../../repositories/document/document.repository"
import { findDocumentUser } from "../../repositories/document/documentUser.repository";
import { ApiError, handleServerError } from "../../utils/error.utils";

const fetchOneDocumentService = async (documentId: string, userId: string) => {
    try {
        if (!documentId.trim()) {
            throw new ApiError(400, "Document ID is required")
        }

        const document = await findDocumentById(documentId)
        if (!document) {
            throw new ApiError(404, "No document found.")
        }

        if (document.ownerId !== userId) {
            const documentUser = await findDocumentUser(documentId, userId)
            if (!documentUser) {
                throw new ApiError(403, "You do not have access to this document.")
            }
        }

        return document
    } catch (err) {
    logger.error(
      "Error in fetchOneDocumentService: " + (err instanceof Error ? err.message : String(err))
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
    }
}

export default fetchOneDocumentService