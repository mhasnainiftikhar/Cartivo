import express from "express";
import cartController from "../controller/CartController.js";
import authenticate from "../middleware/authenticate.js";

const cartRouter = express.Router();

// Protected Routes (User only)
cartRouter.get("/", authenticate, cartController.findUserCart);
cartRouter.put("/add", authenticate, cartController.addItemToCart);
cartRouter.put("/item/:id", authenticate, cartController.updateCartItem);
cartRouter.delete("/item/:id", authenticate, cartController.deleteCartItem);

export default cartRouter;
