import cartService from "../service/CartService.js";
import cartItemService from "../service/CartItemService.js";

class CartController {

    // Get user cart
    async findUserCart(req, res) {
        try {
            const user = req.user;
            const cart = await cartService.findUserCart(user._id);
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Add item to cart
    async addItemToCart(req, res) {
        try {
            const user = req.user;
            const response = await cartService.addCartItem(user._id, req.body);
            res.status(200).json({ message: response });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update cart item
    async updateCartItem(req, res) {
        try {
            const user = req.user;
            const response = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete cart item
    async deleteCartItem(req, res) {
        try {
            const user = req.user;
            await cartItemService.deleteCartItem(user._id, req.params.id);
            res.status(200).json({ message: "Item removed from cart" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CartController();
