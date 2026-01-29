import Deal from "../model/Deal.js";
import HomeCategory from "../model/HomeCategory.js";

class DealService {

    async getDeals() {
        return await Deal.find().populate('category');
    }

    async createDeal(dealData) {
        const deal = new Deal(dealData);
        const savedDeal = await deal.save();

        if (dealData.category) {
            await HomeCategory.findByIdAndUpdate(dealData.category, { deal: savedDeal._id });
        }

        return savedDeal;
    }

    async updateDeal(id, updateData) {
        return await Deal.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteDeal(id) {
        const deal = await Deal.findById(id);
        if (deal && deal.category) {
            await HomeCategory.findByIdAndUpdate(deal.category, { $unset: { deal: 1 } });
        }
        return await Deal.findByIdAndDelete(id);
    }
}

export default new DealService();
