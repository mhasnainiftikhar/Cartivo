import sellerReportService from "../service/SellerReportService.js";
import transactionService from "../service/TransactionService.js";

class SellerReportController {

    // Get seller revenue report
    async getSellerReport(req, res) {
        try {
            const sellerId = req.seller?._id;
            if (!sellerId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            const report = await sellerReportService.getSellerReport(sellerId);
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get seller transaction history
    async getTransactionHistory(req, res) {
        try {
            const sellerId = req.seller?._id;
            if (!sellerId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            const history = await transactionService.getHistory({ seller: sellerId });
            res.status(200).json(history);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new SellerReportController();
