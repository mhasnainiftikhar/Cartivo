import Stripe from "stripe";
import dotenv from "dotenv";
import Payment from "../model/Payment.js";
import Order from "../model/Order.js";
import transactionService from "./TransactionService.js";
import sellerReportService from "./SellerReportService.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentService {

    // Create Stripe Checkout Session
    async createStripePaymentSession(order) {
        try {
            const lineItems = order.orderItems.map((item) => ({
                price_data: {
                    currency: "usd", 
                    product_data: {
                        name: item.product.title,
                        images: item.product.images,
                    },
                    unit_amount: item.sellingPrice * 100, 
                },
                quantity: item.quantity,
            }));

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: lineItems,
                mode: "payment",
                success_url: `${process.env.FRONTEND_URL}/payment/success/${order._id}?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
                metadata: {
                    orderId: order._id.toString(),
                    userId: order.user.toString(),
                },
            });

            return {
                payment_url: session.url,
                session_id: session.id
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Verify Payment
    async verifyStripePayment(sessionId) {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            if (session.payment_status === "paid") {
                const orderId = session.metadata.orderId;
                const userId = session.metadata.userId;

                const order = await Order.findById(orderId);
                if (!order) {
                    throw new Error("Order not found");
                }

                order.paymentDetails.paymentStatus = "COMPLETED";
                order.paymentDetails.transactionId = session.payment_intent;
                order.orderStatus = "PLACED";
                await order.save();

                // Save Payment Record
                const payment = new Payment({
                    order: orderId,
                    user: userId,
                    transactionId: session.payment_intent,
                    amount: session.amount_total / 100,
                    status: "COMPLETED",
                    paymentMethod: "CARD"
                });
                await payment.save();

                // Record Transactions and Update Reports for Sellers
                const populatedOrder = await Order.findById(orderId).populate({
                    path: "orderItems",
                    populate: { path: "product" }
                });

                for (const item of populatedOrder.orderItems) {
                    const sellerId = item.product.seller;

                    // Log Credit Transaction for Seller
                    await transactionService.recordTransaction({
                        user: userId,
                        order: orderId,
                        amount: item.sellingPrice,
                        type: "CREDIT",
                        status: "COMPLETED",
                        seller: sellerId
                    });

                    // Update Seller Revenue Report
                    await sellerReportService.updateSellerReport(sellerId, {
                        amount: item.sellingPrice,
                        quantity: item.quantity
                    });
                }

                return { status: "success", order };
            } else {
                return { status: "pending" };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new PaymentService();
