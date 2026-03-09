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

const ALLOWED_USER_ROLES = ["ADMIN", "USER"];
const AUTH_PROVIDERS = ["GOOGLE", "GITHUB", "EMAIL"];

export {
  NODE_ENV,
  PORT,
  ALLOWED_ORIGINS,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
  ALLOWED_USER_ROLES,
  AUTH_PROVIDERS,
};
