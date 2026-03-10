import { Router } from "express";
import fetchAllDocumentController from "../controllers/document/fetchAll.controller";
import authMiddleware from "../middleware/auth.middleware";
import reqBodyMiddleware from "../middleware/reqBody.middleware";
import createDocumentController from "../controllers/document/create.controller";

const router = Router();

router.use(authMiddleware);
router.get("/", fetchAllDocumentController);
router.post("/", reqBodyMiddleware, createDocumentController);

export default router;
