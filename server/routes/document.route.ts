import { Router } from "express";
import fetchAllDocumentController from "../controllers/document/fetchAll.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware)
router.get("/all", fetchAllDocumentController);

export default router;
