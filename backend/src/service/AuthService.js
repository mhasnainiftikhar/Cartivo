import Seller from "../model/Seller.js";
import VerificationCode from "../model/VerificationCode.js";
import generateOtp from "../utils/GenerateOtp.js";
import emailService from "../utils/emailService.js";
import {
  loginOtpTemplate,
  signupOtpTemplate,
} from "../utils/emailTemplates.js";

class AuthService {

  //Private OTP generator
  async sendOtp({ email, type }) {

    await VerificationCode.deleteOne({ email });

    const otp = generateOtp();

    await VerificationCode.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    const isSignup = type === "signup";

    await emailService.sendEmail({
      to: email,
      subject: isSignup
        ? "Your Cartivo Signup OTP"
        : "Your Cartivo Login OTP",
      html: isSignup
        ? signupOtpTemplate(otp)
        : loginOtpTemplate(otp),
    });
  }

  //LOGIN OTP
  async sendLoginOtp(email) {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      throw new Error("User not found");
    }

    await this.sendOtp({ email, type: "login" });

    return { message: "Login OTP sent successfully" };
  }

  // SIGNUP OTP
  async sendSignupOtp(email) {
    const seller = await Seller.findOne({ email });
    if (seller) {
      throw new Error("User already exists");
    }

    await this.sendOtp({ email, type: "signup" });

    return { message: "Signup OTP sent successfully" };
  }

  // Verify OTP
  async verifyOtp(email, otp) {
    const verificationCode = await VerificationCode.findOne({ email });
    if (!verificationCode || verificationCode.otp !== otp) {
      throw new Error("Invalid or expired OTP");
    }
    return true;
  }
}

export default new AuthService();
