import { MailtrapClient } from "mailtrap"; // Import the MailtrapClient class from the mailtrap package
import dotenv from "dotenv"; // Import the dotenv package to load environment variables from a .env file

dotenv.config(); // Load environment variables from the .env file into process.env

// Initialize the MailtrapClient with the endpoint and token from environment variables
const client = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT, // Mailtrap API endpoint
  token: process.env.MAILTRAP_TOKEN, // Mailtrap API token
});

// Define the email data, including sender, recipient, subject, and content
const emailData = {
  from: {
    email: process.env.MAILTRAP_SENDER_EMAIL, // Sender's email address
    name: process.env.MAILTRAP_SENDER_NAME, // Sender's name
  },
  to: [{ email: process.env.MAILTRAP_RECIPIENT_EMAIL }], // Recipient's email address
  subject: "You are awesome!", // Email subject
  html: "Congrats for sending test email with Mailtrap!", // Email content in HTML format
  category: "Integration Test", // Category for the email (optional)
};

// Send the email using the MailtrapClient
client
  .send(emailData)
  .then((response) => {
    // Log a success message if the email is sent successfully
    console.log("Email sent successfully:", response);
  })
  .catch((error) => {
    // Log an error message if the email fails to send
    console.error("Failed to send email:", error);
  });