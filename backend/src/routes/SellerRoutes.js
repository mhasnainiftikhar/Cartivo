import express from "express";
import sellerController from "../controller/SellerController.js";
import authenticate from "../middleware/authenticate.js";

const sellerRouter = express.Router();

// --- Public Routes ---
sellerRouter.post("/signup", sellerController.createSeller);

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
