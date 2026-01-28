import OrderItem from "./OrderItem.js";
import PaymentStatus from "../domain/PaymentStatus.js";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem"
    }],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    paymentDetails: {
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: PaymentStatus.PENDING
        },
        paymentId: {
            type: String,
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalSellingPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "PENDING"
    },
    totalItem: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
