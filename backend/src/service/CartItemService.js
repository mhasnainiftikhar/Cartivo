import CartItem from "../model/CartItem.js";

class CartItemService {

    // Create new cart item
    async createCartItem(cartItemData) {
        try {
            const cartItem = new CartItem(cartItemData);
            return await cartItem.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Update cart item quantity
    async updateCartItem(userId, cartItemId, cartItemData) {
        try {
            const item = await this.findCartItemById(cartItemId);
            if (!item) {
                throw new Error("Cart item not found: " + cartItemId);
            }

            if (item.user.toString() !== userId.toString()) {
                throw new Error("You can't update another user's cart item");
            }

            item.quantity = cartItemData.quantity;
            item.sellingPrice = item.quantity * item.product.sellingPrice;
            item.mrpPrice = item.quantity * item.product.mrpPrice;

            return await item.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Delete cart item
    async deleteCartItem(userId, cartItemId) {
        try {
            const item = await this.findCartItemById(cartItemId);
            if (!item) {
                throw new Error("Cart item not found: " + cartItemId);
            }

            if (item.user.toString() !== userId.toString()) {
                throw new Error("You can't delete another user's cart item");
            }

            return await CartItem.findByIdAndDelete(cartItemId);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Find cart item by ID
    async findCartItemById(cartItemId) {
        return await CartItem.findById(cartItemId).populate("product");
    }
}

export default new CartItemService();
