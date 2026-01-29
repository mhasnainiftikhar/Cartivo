import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import sellerRouter from "./routes/SellerRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/UserRoutes.js";
import productRouter from "./routes/ProductRoutes.js";
import cartRouter from "./routes/CartRoutes.js";
import orderRouter from "./routes/OrderRoutes.js";
import paymentRouter from "./routes/PaymentRoutes.js";
import sellerReportRouter from "./routes/SellerReportRoutes.js";
import dealRouter from "./routes/DealRoutes.js";
import homeCategoryRouter from "./routes/HomeCategoryRoutes.js";
import homeRouter from "./routes/HomeRoutes.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send(" Cartivo Backend is running!");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/seller-reports", sellerReportRouter);
app.use("/api/deals", dealRouter);
app.use("/api/home-categories", homeCategoryRouter);
app.use("/api/home", homeRouter);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

export default app;
