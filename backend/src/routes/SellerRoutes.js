import express from "express";
import sellerController from "../controller/SellerController.js";
import authenticate from "../middleware/authenticate.js";
import authController from "../controller/AuthController.js";

const sellerRouter = express.Router();


// Signup
sellerRouter.post("/signup/otp", authController.sendSignupOtp);
sellerRouter.post("/signup", sellerController.createSeller);

// Login (OTP + Password)
sellerRouter.post("/login/otp", authController.sendLoginOtp);
sellerRouter.post("/login", authController.sellerLogin);

// Verify OTP
sellerRouter.post("/verify-otp", authController.verifyOtp);

// --- Protected Routes ---

// Seller profile (JWT based)
sellerRouter.get("/profile", authenticate, sellerController.getSellerProfile);

// Get all sellers
sellerRouter.get("/", sellerController.getAllSellers);

// Get seller by ID
sellerRouter.get("/:id", sellerController.getSellerById);

// Update seller
sellerRouter.patch("/update", authenticate, sellerController.updateSeller);


export default sellerRouter;
