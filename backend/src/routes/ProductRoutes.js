import express from "express";
import productController from "../controller/ProductController.js";
import authenticate from "../middleware/authenticate.js";

const productRouter = express.Router();

// Public Routes
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);

// Protected Routes (Seller only)
productRouter.get("/seller", authenticate, productController.getProductsBySeller);
productRouter.post("/", authenticate, productController.createProduct);
productRouter.patch("/:id", authenticate, productController.updateProduct);
productRouter.delete("/:id", authenticate, productController.deleteProduct);

export default productRouter;
