import homeCategoryService from "../service/HomeCategoryService.js";

class HomeCategoryController {

    async createHomeCategory(req, res) {
        try {
            const homeCategory = await homeCategoryService.createHomeCategory(req.body);
            res.status(201).json(homeCategory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllHomeCategories(req, res) {
        try {
            const homeCategories = await homeCategoryService.getAllHomeCategories();
            res.status(200).json(homeCategories);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async updateHomeCategory(req, res) {
        try {
            const homeCategory = await homeCategoryService.updateHomeCategory(req.params.id, req.body);
            res.status(200).json(homeCategory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteHomeCategory(req, res) {
        try {
            await homeCategoryService.deleteHomeCategory(req.params.id);
            res.status(200).json({ message: "Home category deleted successfully" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new HomeCategoryController();
