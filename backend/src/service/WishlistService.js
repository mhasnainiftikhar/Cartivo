import Wishlist from "../model/Wishlist.js";

class WishlistService {
    async createWishlist(user) {
        const wishlist = new Wishlist({ user });
        return await wishlist.save();
    }

    async getWishlistByUserId(userId) {
        let wishlist = await Wishlist.findOne({ user: userId }).populate("products");
        if (!wishlist) {
            wishlist = await this.createWishlist(userId);
        }
        return wishlist;
    }

    async addProductToWishlist(userId, productId) {
        const wishlist = await this.getWishlistByUserId(userId);
        if (!wishlist.products.some(p => p._id.toString() === productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }
        return await wishlist.populate("products");
    }

    async removeProductFromWishlist(userId, productId) {
        const wishlist = await this.getWishlistByUserId(userId);
        wishlist.products = wishlist.products.filter(p => p._id.toString() !== productId);
        await wishlist.save();
        return await wishlist.populate("products");
    }
}

export default new WishlistService();
