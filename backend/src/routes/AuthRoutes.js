import express from "express";
import authController from "../controller/AuthController.js";

const authRouter = express.Router();

// --- Auth Flow ---

// Request OTP
authRouter.post("/signup/otp", authController.sendSignupOtp);
authRouter.post("/login/otp", authController.sendLoginOtp);

// Pre-verify OTP
authRouter.post("/verify-otp", authController.verifyOtp);

// Complete Action 
authRouter.post("/login", authController.login);

export default authRouter;
