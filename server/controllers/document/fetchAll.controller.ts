import fetchAllDocumentService from "../../services/document/fetchAll.service";
import { Controller } from "../../utils/types/express.types";

const fetchAllDocumentController: Controller = async (req, res, next) => {
  try {
    const documents = await fetchAllDocumentService(req.user.id);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      documents
    });
  } catch (err) {
    next(err);
  }
};

export default fetchAllDocumentController;
