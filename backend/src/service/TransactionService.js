import TransactionHistory from "../model/TransactionHistory.js";

class TransactionService {

    // Record a new transaction
    async recordTransaction(transactionData) {
        try {
            const transaction = new TransactionHistory(transactionData);
            return await transaction.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Get transaction history for user or seller
    async getHistory(filter) {
        try {
            return await TransactionHistory.find(filter)
                .populate("order")
                .populate("user", "name email")
                .sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new TransactionService();
