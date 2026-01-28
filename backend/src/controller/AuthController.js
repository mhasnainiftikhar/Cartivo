import VerificationCode from "../model/VerificationCode.js";
import jwtProvider from "../utils/jwtProvider.js";
import authService from "../service/AuthService.js";
import { comparePassword } from "../utils/hashUtils.js";
import Seller from "../model/Seller.js";

class AuthController {
  // Request Signup OTP
  async sendSignupOtp(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const response = await authService.sendSignupOtp(email);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Request Login OTP
  async sendLoginOtp(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const response = await authService.sendLoginOtp(email);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Pre-verify OTP
  async verifyOtp(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }
      await authService.verifyOtp(email, otp);
      res.status(200).json({ message: "OTP verified successfully. You can proceed." });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  //Complete Login (Verify OTP + Password)
  async login(req, res) {
    try {
      const { email, otp, password } = req.body;
      if (!email || !otp || !password) {
        return res.status(400).json({ message: "Email, OTP, and Password are required" });
      }
      await authService.verifyOtp(email, otp);

      const seller = await Seller.findOne({ email }).select("+password");
      if (!seller) {
        throw new Error("Seller not found");
      }

      const isPasswordValid = await comparePassword(password, seller.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      await VerificationCode.deleteOne({ email });

      const token = jwtProvider.createJwt({ email: seller.email });

      res.status(200).json({
        message: "Login Successful",
        token,
        seller
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new AuthController();
