import SellerReport from "../model/SellerReport.js";
import Products from "../model/Product.js";

class SellerReportService {

    // Update or create seller report after successful order
    async updateSellerReport(sellerId, orderData) {
        try {
            let report = await SellerReport.findOne({ seller: sellerId });

            if (!report) {
                report = new SellerReport({ seller: sellerId });
            }

            report.totalRevenue += orderData.amount;
            report.totalOrders += 1;
            report.totalSales += orderData.quantity; // total items sold
            report.lastUpdated = Date.now();

            return await report.save();
        } catch (error) {
            console.error("Error updating seller report:", error);
        }
    }

    // Get report for a specific seller
    async getSellerReport(sellerId) {
        try {
            const report = await SellerReport.findOne({ seller: sellerId }).populate("seller", "sellerName email");
            if (!report) {
                return {
                    totalRevenue: 0,
                    totalOrders: 0,
                    totalSales: 0,
                    message: "No data available yet"
                };
            }
            return report;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new SellerReportService();
