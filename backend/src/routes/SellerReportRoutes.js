import express from "express";
import sellerReportController from "../controller/SellerReportController.js";
import authenticate from "../middleware/authenticate.js";

const sellerReportRouter = express.Router();

// Protected Routes (Seller only)
sellerReportRouter.get("/report", authenticate, sellerReportController.getSellerReport);
sellerReportRouter.get("/transactions", authenticate, sellerReportController.getTransactionHistory);

export default sellerReportRouter;
