import express from "express";
import paymentController from "../controller/PaymentController.js";
import authenticate from "../middleware/authenticate.js";

const paymentRouter = express.Router();

// Protected Routes
paymentRouter.post("/checkout/:orderId", authenticate, paymentController.createCheckoutSession);
paymentRouter.get("/verify", paymentController.verifyPayment);

export default paymentRouter;
