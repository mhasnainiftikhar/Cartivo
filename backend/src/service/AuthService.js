import Cart from "../model/Cart.js";
import Seller from "../model/Seller.js";
import User from "../model/User.js";
import VerificationCode from "../model/VerificationCode.js";
import generateOtp from "../utils/GenerateOtp.js";
import emailService from "../utils/emailService.js";
import jwtProvider from "../utils/JwtProvider.js"
import {
  loginOtpTemplate,
  signupOtpTemplate,
} from "../utils/emailTemplates.js";
import { hashPassword } from "../utils/hashUtils.js";

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
    const user = await User.findOne({ email });
    if (seller || user) {
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

  // Signup Implementation
  async signup({ email, name, password, otp }) {
    await this.verifyOtp(email, otp);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({
      email,
      name,
      password: hashedPassword
    });

    await user.save();

    const cart = new Cart({ user: user._id });
    await cart.save();

    await VerificationCode.deleteOne({ email });

    const token = jwtProvider.createJwt({ email: user.email });
    return { token, user };
  }

  // Login Implementation (Password only)
  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwtProvider.createJwt({ email: user.email });
    
    user.password = undefined;
    return { token, user };
  }

  
  async createUser(req) {
    const { email, fullName } = req;

    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User Already Exists")
    }

    user = new User({
      email, name: fullName, password: await hashPassword("defaultPassword") // This seems incomplete in original
    })

    await user.save();

    const cart = new Cart({ user: user._id })
    await cart.save();

    return jwtProvider.createJwt({ email })
  }
}

export default new AuthService();
