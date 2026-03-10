import { Router } from "express";
import fetchAllDocumentController from "../controllers/document/fetchAll.controller";
import authMiddleware from "../middleware/auth.middleware";
import reqBodyMiddleware from "../middleware/reqBody.middleware";
import createDocumentController from "../controllers/document/create.controller";
import deleteDocumentController from "../controllers/document/delete.controller";
import fetchOneDocumentController from "../controllers/document/fetchOne.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", fetchAllDocumentController);
router.post("/", reqBodyMiddleware, createDocumentController);
router.delete("/:id", deleteDocumentController);
router.get("/:id", fetchOneDocumentController);

export default router;
