import OrderItem from "../model/OrderItem.js";

class SellerOrderController {
    async getSellerOrders(req, res) {
        try {
            const sellerId = req.seller._id;
            const orders = await OrderItem.find({ seller: sellerId })
                .populate("product")
                .populate({
                    path: "userId",
                    select: "name email mobile"
                })
                .sort({ createdAt: -1 });

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrderItemStatus(req, res) {
        try {
            const { orderItemId } = req.params;
            const { status } = req.body;
            const sellerId = req.seller._id;

            const orderItem = await OrderItem.findById(orderItemId);

            if (!orderItem) {
                return res.status(404).json({ message: "Order item not found" });
            }

            if (orderItem.seller.toString() !== sellerId.toString()) {
                return res.status(403).json({ message: "Not authorized to update this order item" });
            }

            orderItem.orderStatus = status;
            await orderItem.save();

            res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new SellerOrderController();
