import brevo from "@getbrevo/brevo";

class EmailService {
  constructor() {
    this.apiInstance = new brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );
  }

  async sendEmail({ to, subject, html }) {
    try {
      const emailData = {
        sender: {
          email: "hasnainiftikhar930@gmail.com",
          name: "Cartivo",
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      };

      await this.apiInstance.sendTransacEmail(emailData);
      console.log(" Email sent successfully");
    } catch (error) {
      console.error(
        "Brevo Email Error:",
        error?.response?.data || error.message
      );
      throw new Error("Failed to send email");
    }
  }
}

export default new EmailService();
