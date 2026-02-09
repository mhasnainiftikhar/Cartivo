import express from "express";
import wishlistController from "../controller/WishlistController.js";
import authenticate from "../middleware/authenticate.js";

const wishlistRouter = express.Router();

wishlistRouter.get("/", authenticate, wishlistController.getWishlist);
wishlistRouter.post("/add", authenticate, wishlistController.addProductToWishlist);
wishlistRouter.delete("/remove/:productId", authenticate, wishlistController.removeProductFromWishlist);

export default wishlistRouter;
