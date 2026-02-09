import Cart from "../model/Cart.js";
import Order from "../model/Order.js";
import OrderItem from "../model/OrderItem.js";
import CartItem from "../model/CartItem.js";
import cartService from "./CartService.js";

class OrderService {

    // Create new order
    async createOrder(user, shippingAddress) {
        try {
            // Verify shipping address belongs to user
            if (!user.addresses.some(addr => addr._id.toString() === shippingAddress._id.toString())) {
                throw new Error("Invalid shipping address. Address must belong to the user.");
            }

            const cart = await cartService.findUserCart(user._id);
            if (!cart || cart.cartItems.length === 0) {
                throw new Error("Cart is empty");
            }

            const orderItems = [];

            for (const item of cart.cartItems) {
                const orderItem = new OrderItem({
                    product: item.product._id,
                    size: item.size,
                    quantity: item.quantity,
                    mrpPrice: item.mrpPrice,
                    sellingPrice: item.sellingPrice,
                    userId: user._id,
                    seller: item.product.seller // item.product should be populated from cartService.findUserCart
                });
                const savedOrderItem = await orderItem.save();
                orderItems.push(savedOrderItem._id);
            }

            const createdOrder = new Order({
                user: user._id,
                orderItems: orderItems,
                shippingAddress: shippingAddress._id,
                totalPrice: cart.totalMrpPrice,
                totalSellingPrice: cart.totalSellingPrice,
                discount: cart.discount,
                totalItem: cart.totalItem,
            });

            const savedOrder = await createdOrder.save();

            // Clear Cart after order
            cart.cartItems = [];
            cart.totalPrice = 0;
            cart.totalSellingPrice = 0;
            cart.totalItem = 0;
            cart.discount = 0;
            await cart.save();

            // Delete CartItems
            await CartItem.deleteMany({ cart: cart._id });

            return savedOrder;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get order history for user
    async userOrderHistory(userId) {
        try {
            return await Order.find({ user: userId })
                .populate({ path: "orderItems", populate: { path: "product" } })
                .populate("shippingAddress")
                .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Find order by ID
    async findOrderById(orderId, userId) {
        try {
            const order = await Order.findById(orderId)
                .populate("user", "name email")
                .populate({ path: "orderItems", populate: { path: "product" } })
                .populate("shippingAddress");

            if (!order) {
                throw new Error("Order not found");
            }

            // Check ownership
            if (order.user._id.toString() !== userId.toString()) {
                throw new Error("Unauthorized access to this order.");
            }

            return order;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new OrderService();
