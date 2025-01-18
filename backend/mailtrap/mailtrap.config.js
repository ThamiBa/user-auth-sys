import { MailtrapClient } from "mailtrap"; // Import MailtrapClient
import dotenv from "dotenv"; // Import dotenv

dotenv.config(); // Load environment variables

const TOKEN = process.env.MAILTRAP_TOKEN; // Use environment variable for token
const ENDPOINT = process.env.MAILTRAP_ENDPOINT; // Use environment variable for endpoint

const client = new MailtrapClient({
  endpoint: ENDPOINT, // Use the endpoint from .env
  token: TOKEN,
});

const sender = {
  email: process.env.MAILTRAP_SENDER_EMAIL, // Use environment variable for sender email
  name: process.env.MAILTRAP_SENDER_NAME, // Use environment variable for sender name
};

const recipients = [
  {
    email: process.env.MAILTRAP_RECIPIENT_EMAIL, // Use environment variable for recipient email
  },
];

// Send email
client
  .send({
    from: sender,
    to: recipients,
    subject: "You are awesome!",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
  })
  .then((response) => {
    console.log("Email sent successfully:", response);
  })
  .catch((error) => {
    console.error("Failed to send email:", error);
  });