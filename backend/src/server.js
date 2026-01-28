import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import sellerRouter from "./routes/SellerRoutes.js";
import adminRouter from "./routes/AdminRoutes.js";
import authRouter from "./routes/AuthRoutes.js";


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


// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

export default app;
