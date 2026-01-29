import HomeCategory from "../model/HomeCategory.js";
import homeCategoryService from "./HomeCategoryService.js";
import HomeCategorySection from "../domain/HomeCategorySection.js";

class HomeService {

    async getHomePageData() {
        const allCategories = await HomeCategory.find().populate("deal");

        const homeData = {};
        Object.values(HomeCategorySection).forEach(section => {
            homeData[section] = allCategories.filter(cat => cat.section === section);
        });

        return homeData;
    }

    async createHomeData(data) {
        if (Array.isArray(data)) {
            return await homeCategoryService.createCategories(data);
        }
        return await homeCategoryService.createHomeCategory(data);
    }

    async updateHomeData(id, updateData) {
        return await homeCategoryService.updateHomeCategory(id, updateData);
    }

    async deleteHomeData(id) {
        return await homeCategoryService.deleteHomeCategory(id);
    }
}

export default new HomeService();
