import VerificationCode from "../model/VerificationCode.js";
import sellerService from "../service/SellerService.js";
import jwtProvider from "../utils/JwtProvider.js";
import authService from "../service/AuthService.js";

class SellerController {

  // --- Profile & Getters 

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

  // --- Auth & Creation ---

  async createSeller(req, res) {
    try {
      const { email, otp, password } = req.body;
      if (!email || !otp || !password) {
        return res.status(400).json({ message: "Email, OTP, and Password are required" });
      }


      await authService.verifyOtp(email, otp);


      const newSeller = await sellerService.createSeller(req.body);


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
