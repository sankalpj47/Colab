import { Router } from "express";
import registerUserController from "../controllers/auth/register.controller";
import reqBodyMiddleware from "../middleware/reqBody.middleware";

const router = Router();

router.post("/register", reqBodyMiddleware, registerUserController);

export default router;
