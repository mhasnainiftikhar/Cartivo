import express from "express";
import sellerController from "../controller/SellerController.js";
import authenticate from "../middleware/authenticate.js";

const sellerRouter = express.Router();

// --- Auth Flow ---

// 1. Request OTP
sellerRouter.post("/signup/otp", sellerController.sendSignupOtp);
sellerRouter.post("/login/otp", sellerController.sendLoginOtp);

// 2. Pre-verify OTP (Optional but helpful for UI)
sellerRouter.post("/verify-otp", sellerController.verifyOtp);

// 3. Complete Action (Requires OTP + Password)
sellerRouter.post("/signup", sellerController.createSeller);
sellerRouter.post("/login", sellerController.login);


// --- Protected & Admin Routes ---

// Seller profile (JWT based)
sellerRouter.get("/profile", authenticate, sellerController.getSellerProfile);

// Get all sellers
sellerRouter.get("/", sellerController.getAllSellers);

// Get seller by ID
sellerRouter.get("/:id", sellerController.getSellerById);

// Update seller
sellerRouter.patch("/update", authenticate, sellerController.updateSeller);


export default sellerRouter;
