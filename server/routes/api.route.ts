import { Router } from "express";
import authRoutes from "./auth.route";
import documentRoutes from "./document.route"

const router = Router();

router.use("/auth", authRoutes);
router.use('/document', documentRoutes)

export default router;
