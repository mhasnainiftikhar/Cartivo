import express from "express";
import sellerOrderController from "../controller/SellerOrderController.js";
import authenticate from "../middleware/authenticate.js";

const sellerOrderRouter = express.Router();

sellerOrderRouter.get("/", authenticate, sellerOrderController.getSellerOrders);
sellerOrderRouter.patch("/:orderItemId/status", authenticate, sellerOrderController.updateOrderItemStatus);

export default sellerOrderRouter;
