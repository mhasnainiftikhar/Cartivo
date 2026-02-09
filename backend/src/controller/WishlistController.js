import wishlistService from "../service/WishlistService.js";

class WishlistController {
    async getWishlist(req, res) {
        try {
            const user = req.user;
            const wishlist = await wishlistService.getWishlistByUserId(user._id);
            res.status(200).json(wishlist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async addProductToWishlist(req, res) {
        try {
            const user = req.user;
            const { productId } = req.body;
            const wishlist = await wishlistService.addProductToWishlist(user._id, productId);
            res.status(200).json(wishlist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeProductFromWishlist(req, res) {
        try {
            const user = req.user;
            const { productId } = req.params;
            const wishlist = await wishlistService.removeProductFromWishlist(user._id, productId);
            res.status(200).json(wishlist);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new WishlistController();
