import express from "express";
import cors from "cors";
import logger from "./config/logger.config";
import { ALLOWED_ORIGINS, PORT } from "./config/constants.config";

const app = express();

app.use(cors({
  origin: ALLOWED_ORIGINS.filter((origin): origin is string => origin !== undefined),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
  logger.success(`Server is running on PORT ${PORT}`)
});