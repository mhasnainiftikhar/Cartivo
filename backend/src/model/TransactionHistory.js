import mongoose from "mongoose";

const transactionHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["CREDIT", "DEBIT"],
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING"
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller"
    }
}, { timestamps: true });

const TransactionHistory = mongoose.model("TransactionHistory", transactionHistorySchema);
export default TransactionHistory;
