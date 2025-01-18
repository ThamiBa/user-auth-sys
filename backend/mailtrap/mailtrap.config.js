import { MailtrapClient } from "mailtrap"; // Import the MailtrapClient class from the mailtrap package
import dotenv from "dotenv"; // Import the dotenv package to load environment variables from a .env file

dotenv.config(); // Load environment variables from the .env file into process.env

export const mailtrapClient = new MailtrapClient({ // Create a new MailtrapClient object
  endpoint: process.env.MAILTRAP_ENDPOINT, // Mailtrap API endpoint
  token: process.env.MAILTRAP_TOKEN, // Mailtrap API token
});

// Export the client and sender objects
export const sender = {
  email: "baladithami@gmail.com", // Sender email address
  name: "Thami", // Sender name
};