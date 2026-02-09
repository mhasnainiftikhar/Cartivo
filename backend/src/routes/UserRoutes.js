import express from "express";
import userController from "../controller/UserController.js";
import authenticate from "../middleware/authenticate.js";

const userRouter = express.Router();

// Get user profile 
userRouter.get("/profile", authenticate, userController.getUserProfile);

// Update user profile
userRouter.patch("/profile", authenticate, userController.updateUserProfile);

// Add user address
userRouter.post("/addresses", authenticate, userController.addUserAddress);

export default userRouter;
