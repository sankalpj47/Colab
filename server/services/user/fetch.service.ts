import { findUserById } from "../../repositories/user/user.repository";
import { ApiError, handleServerError } from "../../utils/error.utils";
import logger from "../../config/logger.config";

const fetchProfileService = async (userId: string) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    logger.success(`Profile for user: ${user.name} fetched successfully`);
    return user;
  } catch (err) {
    logger.error(
      "Error in fetchProfileService: " + (err instanceof Error ? err.message : String(err))
    );
    handleServerError(err instanceof Error ? err : new Error(String(err)));
  }
};

export default fetchProfileService;
