import orderService from "../service/OrderService.js";

class OrderController {

    // Create new order
    async createOrder(req, res) {
        try {
            const user = req.user;
            const shippingAddress = req.body.shippingAddress; // Assuming address object or ID is passed
            const order = await orderService.createOrder(user, shippingAddress);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get user order history
    async userOrderHistory(req, res) {
        try {
            const user = req.user;
            const orders = await orderService.userOrderHistory(user._id);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get order by ID
    async findOrderById(req, res) {
        try {
            const order = await orderService.findOrderById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

export default new OrderController();
