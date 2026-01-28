import express from "express";
import orderController from "../controller/OrderController.js";
import authenticate from "../middleware/authenticate.js";

const orderRouter = express.Router();

// Protected Routes (User only)
orderRouter.post("/", authenticate, orderController.createOrder);
orderRouter.get("/user", authenticate, orderController.userOrderHistory);
orderRouter.get("/:id", authenticate, orderController.findOrderById);

export default orderRouter;
