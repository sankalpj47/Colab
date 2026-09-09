import logger from "../config/logger.config";
import transporter from "../config/mailer.config";
import { SMTP_USER } from "../config/constants.config";

interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendMail = async ({ to, subject, html }: Omit<SendMailOptions, "text">) => {
  try {
    await transporter.sendMail({
      from: `"Colab" <${SMTP_USER}>`,
      to,
      subject,
      html: html ?? "",
    });
    logger.success("Mail sent successfully");
  } catch (err) {
    logger.error("Error sending mail " + (err instanceof Error ? err.message : String(err)));
    throw err;
  }
};