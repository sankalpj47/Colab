import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRY_TIME } from "../config/constants.config";

const generateAuthToken = (tokenPayload: { id: string; role: string }) => {
  const payload = {
    id: tokenPayload.id,
    role: tokenPayload.role,
  };
  const secretKey = JWT_SECRET!;
  const options: jwt.SignOptions = {
    expiresIn: JWT_EXPIRY_TIME,
  };

  return jwt.sign(payload, secretKey, options);
};

const decodeAuthToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    return { success: true, token: decoded };
  } catch (err) {
    return { success: false, token: null };
  }
};

export { generateAuthToken, decodeAuthToken };
