import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT) || 8000;

const FRONTEND_URL = process.env.FRONTEND_URL;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? ["http://localhost:3000"];

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY_TIME: StringValue = (process.env.JWT_EXPIRY_TIME || "7d") as StringValue;

const REDIS_URL = process.env.REDIS_URL;

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER!;
const SMTP_PASS = process.env.SMTP_PASS!;

export {
  NODE_ENV,
  PORT,
  FRONTEND_URL,
  ALLOWED_ORIGINS,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
  REDIS_URL,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
};