import Category from "../model/Category.js";


export const calculateDiscountedPrice = (mrpPrice, discountPercentage) => {
    if (!mrpPrice || discountPercentage === undefined) return mrpPrice;
    return mrpPrice - (mrpPrice * discountPercentage / 100);
};

export const findOrCreateCategory = async (categoryData) => {
    if (!categoryData || !categoryData.categoryId) {
        throw new Error("Category ID is required for findOrCreateCategory");
    }

    let category = await Category.findOne({ categoryId: categoryData.categoryId });

    if (!category) {
        category = new Category({
            name: categoryData.name,
            categoryId: categoryData.categoryId,
            parentCategory: categoryData.parentCategory || null,
            size: categoryData.size || "N/A"
        });
        await category.save();
    }

    return category;
};
