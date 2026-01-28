import paymentService from "../service/PaymentService.js";
import orderService from "../service/OrderService.js";

class PaymentController {

    // Create Stripe checkout session
    async createCheckoutSession(req, res) {
        try {
            const order = await orderService.findOrderById(req.params.orderId);
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }

            const session = await paymentService.createStripePaymentSession(order);
            res.status(200).json(session);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Verify payment after redirect
    async verifyPayment(req, res) {
        try {
            const { session_id } = req.query;
            if (!session_id) {
                return res.status(400).json({ message: "Session ID is required" });
            }

            const result = await paymentService.verifyStripePayment(session_id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new PaymentController();
