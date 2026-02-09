import express from "express";
import productController from "../controller/ProductController.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/multerConfig.js";

const productRouter = express.Router();

// Public Routes
// Routes
productRouter.get("/", productController.getAllProducts);
productRouter.get("/seller", authenticate, productController.getProductsBySeller);
productRouter.get("/:id", productController.getProductById);

// Protected Routes (Seller only)
productRouter.post("/", authenticate, upload.array('images', 5), productController.createProduct);
productRouter.patch("/:id", authenticate, productController.updateProduct);
productRouter.delete("/:id", authenticate, productController.deleteProduct);

export default productRouter;
