import productService from "../service/ProductService.js";

class ProductController {

    // Create a product.

    async createProduct(req, res) {
        try {
            const sellerId = req.seller?._id;
            if (!sellerId) {
                return res.status(403).json({ message: "Only sellers can create products" });
            }
            const product = await productService.createProduct(req.body, sellerId);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    //Get all products.

    async getAllProducts(req, res) {
        try {
            const result = await productService.getAllProducts(req.query);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    //Get product by ID.

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }


    //Update product.

    async updateProduct(req, res) {
        try {
            const sellerId = req.seller?._id;
            if (!sellerId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            const product = await productService.updateProduct(req.params.id, req.body, sellerId);
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    // Delete product.

    async deleteProduct(req, res) {
        try {
            const sellerId = req.seller?._id;
            if (!sellerId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            const response = await productService.deleteProduct(req.params.id, sellerId);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }


    // Get products by seller.

    async getProductsBySeller(req, res) {
        try {
            const sellerId = req.seller?._id;
            if (!sellerId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            const products = await productService.getProductsBySeller(sellerId);
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ProductController();
