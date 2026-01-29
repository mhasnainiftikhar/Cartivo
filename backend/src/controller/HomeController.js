import homeService from "../service/HomeService.js";

class HomeController {

    async getHomePageData(req, res) {
        try {
            const data = await homeService.getHomePageData();
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async createHomeData(req, res) {
        try {
            const data = await homeService.createHomeData(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateHomeData(req, res) {
        try {
            const data = await homeService.updateHomeData(req.params.id, req.body);
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteHomeData(req, res) {
        try {
            await homeService.deleteHomeData(req.params.id);
            res.status(200).json({ message: "Home data deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new HomeController();
