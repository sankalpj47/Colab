import logger from "../../config/logger.config";
import { findAllDocumentsByUser } from "../../repositories/document/document.repository";
import { handleServerError } from "../../utils/error.utils";

const fetchAllDocumentService = async (userId: string) => {
    try {
        const documents = await findAllDocumentsByUser(userId);
        console.log(documents)
        return documents;
    } catch (err) {
       logger.error(
      "Error in verifyOtpService: " + (err instanceof Error ? err.message : String(err))
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
    }
}

export default fetchAllDocumentService