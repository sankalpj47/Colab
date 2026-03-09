import express from "express";
import cors from "cors";
import logger from "./config/logger.config";

const app = express();

app.use(cors({
  origin: '*', // or your frontend URL e.g. 'http://localhost:3000'
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.success(`Server is running on PORT ${PORT}`)
});