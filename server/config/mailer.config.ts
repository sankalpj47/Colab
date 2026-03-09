import nodemailer from "nodemailer";
import { SMTP } from "./constants.config";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: SMTP.port,
  secure: false,
  auth: {
    user: SMTP.user,
    pass: SMTP.pass,
  },
} as any);
