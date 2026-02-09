import Products from "../model/Product.js";
import { calculateDiscountedPrice, findOrCreateCategory } from "../utils/productUtils.js";
import cloudinary from "../config/cloudinaryConfig.js";

class ProductService {

    //Create Product
    async createProduct(productData, sellerId, files = []) {

        const category = await findOrCreateCategory(productData.categoryData);

        const sellingPrice = calculateDiscountedPrice(productData.mrpPrice, productData.discountPercentage);

        // Upload images to Cloudinary
        const imageUrls = [];

        for (const file of files) {
            try {
                // Upload buffer to Cloudinary
                const result = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: 'cartivo/products',
                            resource_type: 'image'
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(file.buffer);
                });

                imageUrls.push(result.secure_url);
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
                throw new Error('Failed to upload image');
            }
        }

        const newProduct = new Products({
            ...productData,
            sellingPrice,
            category: category._id,
            seller: sellerId,
            images: imageUrls
        });

        return await newProduct.save();
    }


    // Get all products with filters.

    async getAllProducts(query) {
        const { category, minPrice, maxPrice, size, color, search, page = 1, limit = 10 } = query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.sellingPrice = {};
            if (minPrice) filter.sellingPrice.$gte = Number(minPrice);
            if (maxPrice) filter.sellingPrice.$lte = Number(maxPrice);
        }

        if (size) {
            filter.size = size;
        }

        if (color) {
            filter.color = Number(color);
        }

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        const skip = (page - 1) * limit;

        const products = await Products.find(filter)
            .populate("category")
            .populate("seller", "sellerName email")
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const totalProducts = await Products.countDocuments(filter);

        return {
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Number(page)
        };
    }


    // Get product by ID.

    async getProductById(productId) {
        const product = await Products.findById(productId)
            .populate("category")
            .populate("seller", "sellerName email");

        if (!product) {
            throw new Error("Product not found");
        }
        return product;
    }


    // Update product.

    async updateProduct(productId, updateData, sellerId) {
        const product = await Products.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }


        if (product.seller.toString() !== sellerId.toString()) {
            throw new Error("You are not authorized to update this product");
        }


        if (updateData.mrpPrice !== undefined || updateData.discountPercentage !== undefined) {
            const mrp = updateData.mrpPrice ?? product.mrpPrice;
            const discount = updateData.discountPercentage ?? product.discountPercentage;
            updateData.sellingPrice = calculateDiscountedPrice(mrp, discount);
        }
        if (updateData.categoryData) {
            const category = await findOrCreateCategory(updateData.categoryData);
            updateData.category = category._id;
        }

        Object.assign(product, updateData);
        return await product.save();
    }

    //Delete product.

    async deleteProduct(productId, sellerId) {
        const product = await Products.findById(productId);

        if (!product) {
            throw new Error("Product not found");
        }

        // Verify ownership
        if (product.seller.toString() !== sellerId.toString()) {
            throw new Error("You are not authorized to delete this product");
        }

        await Products.findByIdAndDelete(productId);
        return { message: "Product deleted successfully" };
    }

    // Get products by seller
    async getProductsBySeller(sellerId) {
        return await Products.find({ seller: sellerId }).populate("category");
    }
}

export default new ProductService();