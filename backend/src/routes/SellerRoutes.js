import express from "express";
import sellerController from "../controller/SellerController.js";
import authenticate from "../middleware/authenticate.js";

const sellerRouter = express.Router();

// Create seller
sellerRouter.post("/create", sellerController.createSeller);

// Seller profile (JWT based)
sellerRouter.get("/profile", authenticate, sellerController.getSellerProfile);

// Get all sellers
sellerRouter.get("/", sellerController.getAllSellers);

// Get seller by ID
sellerRouter.get("/:id", sellerController.getSellerById);

// Update seller
sellerRouter.patch("/update", authenticate, sellerController.updateSeller);

// Verify OTP
sellerRouter.post("/verify-otp", sellerController.verifyOtp);

export default sellerRouter;
