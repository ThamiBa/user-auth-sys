import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"; // Import the email template
import { mailtrapClient, sender } from "./mailtrap.config.js"; // Import Mailtrap client and sender

/**
 * Sends a verification email to the specified email address.
 * @param {string} email - The recipient's email address.
 * @param {string} verificationToken - The verification token to include in the email.
 */
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]; // Define the recipient

  try {
    // Send the email using the Mailtrap client
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
	  const recipient = [{ email }]; // Define the recipient

  try {
	// Send the email using the Mailtrap client
	const response = await mailtrapClient.send({
	  from: sender,
	  to: recipient,
	  template_uuid: "de41e642-243c-43cc-ab0b-3c3e542362a0",
	  template_variables: {
		"company_info_name": "Auth company",
      "name": name,
	  }
	});

	console.log("Email sent welcome successfully", response);
  } catch (error) {
	console.error("Error sending welcome email:", error);
	throw new Error(`Error sending welcome email: ${error}`);
  }
}