import Cart from "../model/Cart.js";
import CartItem from "../model/CartItem.js";
import Products from "../model/Product.js";
import cartItemService from "./CartItemService.js";

class CartService {

    // Create cart for user
    async createCart(user) {
        try {
            const cart = new Cart({ user });
            return await cart.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Find user cart
    async findUserCart(userId) {
        try {
            let cart = await Cart.findOne({ user: userId });

            if (!cart) {
                cart = await this.createCart(userId);
            }

            const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
            cart.cartItems = cartItems;

            let totalSellingPrice = 0;
            let totalMrpPrice = 0;
            let totalItem = 0;

            for (let item of cartItems) {
                totalSellingPrice += item.sellingPrice;
                totalMrpPrice += item.mrpPrice;
                totalItem += item.quantity;
            }

            cart.totalSellingPrice = totalSellingPrice;
            cart.totalMrpPrice = totalMrpPrice;
            cart.totalItem = totalItem;
            cart.discount = totalMrpPrice - totalSellingPrice;

            return await cart.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Add item to cart
    async addCartItem(userId, req) {
        try {
            const cart = await Cart.findOne({ user: userId });
            const product = await Products.findById(req.productId);

            if (!product) {
                throw new Error("Product not found");
            }

            const isPresent = await CartItem.findOne({
                cart: cart._id,
                product: product._id,
                userId,
                size: req.size
            });

            if (!isPresent) {
                const cartItem = new CartItem({
                    product: product._id,
                    cart: cart._id,
                    quantity: req.quantity || 1,
                    userId,
                    size: req.size,
                    mrpPrice: (req.quantity || 1) * product.mrpPrice,
                    sellingPrice: (req.quantity || 1) * product.sellingPrice,
                    user: userId
                });

                const createdCartItem = await cartItem.save();
                cart.cartItems.push(createdCartItem);
                await cart.save();
                return "Item added to cart";
            }

            return "Item already in cart";
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new CartService();
