import VerificationCode from "../model/VerificationCode.js";
import sellerService from "../service/SellerService.js";
import jwtProvider from "../utils/jwtProvider.js";
import authService from "../service/AuthService.js";
import { comparePassword } from "../utils/hashUtils.js";
import Seller from "../model/Seller.js";

class SellerController {

  // --- Profile & Getters ---

  async getSellerProfile(req, res) {
    try {
      const seller = req.seller;
      res.status(200).json(seller);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  async getSellerById(req, res) {
    try {
      const { id } = req.params;
      const seller = await sellerService.getsellerbyId(id);
      res.status(200).json(seller);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async getAllSellers(req, res) {
    try {
      const { status } = req.query;
      const sellers = await sellerService.getAllSellers(status);
      res.status(200).json(sellers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // --- Auth Flow ---

  // 1. Request Signup OTP
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

  // 1. Request Login OTP
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

  // 2. Pre-verify OTP (Generic)
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

  // 3. Complete Signup (Create Seller)
  async createSeller(req, res) {
    try {
      const { email, otp, password } = req.body;
      if (!email || !otp || !password) {
        return res.status(400).json({ message: "Email, OTP, and Password are required" });
      }

      // Verify OTP first
      await authService.verifyOtp(email, otp);

      // Create the seller (Service handles hashing)
      const newSeller = await sellerService.createSeller(req.body);

      // Cleanup OTP
      await VerificationCode.deleteOne({ email });

      const token = jwtProvider.createJwt({ email: newSeller.email });

      res.status(201).json({
        message: "Seller registered successfully",
        token,
        seller: newSeller
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // 3. Complete Login (Verify OTP + Password)
  async login(req, res) {
    try {
      const { email, otp, password } = req.body;
      if (!email || !otp || !password) {
        return res.status(400).json({ message: "Email, OTP, and Password are required" });
      }

      // Verify OTP
      await authService.verifyOtp(email, otp);

      // Verify Seller and Password
      const seller = await Seller.findOne({ email }).select("+password");
      if (!seller) {
        throw new Error("Seller not found");
      }

      const isPasswordValid = await comparePassword(password, seller.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Cleanup OTP
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

  // --- Management ---

  async updateSeller(req, res) {
    try {
      const existingSeller = req.seller;
      const seller = await sellerService.updateSeller(existingSeller, req.body);
      res.status(200).json(seller);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateSellerAccountStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedSeller = await sellerService.updateSellerAccountStatus(id, status);
      res.status(200).json(updatedSeller);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteSeller(req, res) {
    try {
      const { id } = req.params;
      await sellerService.deleteSeller(id);
      res.status(200).json({ message: 'Seller deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new SellerController();
