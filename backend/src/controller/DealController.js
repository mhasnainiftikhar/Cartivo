import dealService from "../service/DealService.js";

class DealController {

    async createDeal(req, res) {
        try {
            const deal = await dealService.createDeal(req.body);
            res.status(201).json(deal);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getDeals(req, res) {
        try {
            const deals = await dealService.getDeals();
            res.status(200).json(deals);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateDeal(req, res) {
        try {
            const deal = await dealService.updateDeal(req.params.id, req.body);
            res.status(200).json(deal);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteDeal(req, res) {
        try {
            await dealService.deleteDeal(req.params.id);
            res.status(200).json({ message: "Deal deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new DealController();
