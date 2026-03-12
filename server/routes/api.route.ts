import { Router } from "express";
import authRoutes from "./auth.route";
import documentRoutes from "./document.route";
import healthRoutes from "./health.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/document", documentRoutes);
router.use("/health", healthRoutes);

export default router;
