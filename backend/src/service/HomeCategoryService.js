import HomeCategory from "../model/HomeCategory.js";

class HomeCategoryService {

  async getAllHomeCategories() {
    return await HomeCategory.find().populate("deal");
  }

  async createHomeCategory(data) {
    const homeCategory = new HomeCategory(data);
    return await homeCategory.save();
  }

  async createCategories(categoriesData) {
    return await HomeCategory.insertMany(categoriesData);
  }

  async updateHomeCategory(id, updateData) {
    return await HomeCategory.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteHomeCategory(id) {
    return await HomeCategory.findByIdAndDelete(id);
  }
}

export default new HomeCategoryService();