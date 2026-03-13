import { SMTP } from "../config/constants.config";
import logger from "../config/logger.config";
import { transporter } from "../config/mailer.config";

interface SendMailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendMail = async ({ to, subject, html, text }: SendMailOptions) => {
  try {
    await transporter.sendMail({
      from: `"Draftly" <${SMTP.from}>`,
      to,
      subject,
      text,
      html,
    });

    logger.success("Mail sent successfully");
  } catch (err) {
    logger.error("Error sending mail " + (err instanceof Error ? err.message : String(err)));
    throw err;
  }
};
