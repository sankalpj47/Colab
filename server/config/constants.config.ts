import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT) || 8000;

const ALLOWED_ORIGINS = ["http://localhost:3000", process.env.FRONTEND_URL].filter(
  Boolean
) as string[];

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY_TIME: StringValue = (process.env.JWT_EXPIRY_TIME || "7d") as StringValue;
const SMTP = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  port: process.env.SMTP_PORT,
};

const REDIS_URL = process.env.REDIS_URL;

export { NODE_ENV, PORT, ALLOWED_ORIGINS, JWT_SECRET, JWT_EXPIRY_TIME, SMTP, REDIS_URL };
