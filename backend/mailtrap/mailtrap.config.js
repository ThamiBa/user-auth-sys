import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Mailtrap client
export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

// Define the sender details
export const sender = {
  email: process.env.MAILTRAP_SENDER_EMAIL,
  name: process.env.MAILTRAP_SENDER_NAME,
};