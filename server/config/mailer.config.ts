import nodemailer from "nodemailer";
import { SMTP } from "./constants.config";
import logger from "./logger.config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: SMTP.user,
    pass: SMTP.pass,
  },
} as any);

const verifyEmailSetup = () => {
  transporter.verify((error) => {
    if (error) {
      logger.error("Error in nodemailer transport " + error.message);
    } else {
      logger.success("Nodemailer setup successfull");
    }
  });
};

export { transporter, verifyEmailSetup };
