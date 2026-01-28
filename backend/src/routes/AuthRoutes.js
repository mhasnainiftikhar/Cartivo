import express from "express";
import authController from "../controller/AuthController.js";

const authRouter = express.Router();

// Signup
authRouter.post("/signup/otp", authController.sendSignupOtp);
authRouter.post("/signup", authController.signup);

// Login (Password only)
authRouter.post("/login", authController.login);

// Verify OTP
authRouter.post("/verify-otp", authController.verifyOtp);

export default authRouter;
