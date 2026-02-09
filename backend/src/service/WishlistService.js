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
        const isPresent = wishlist.products.some(p => {
            if (!p) return false;
            const id = p._id ? p._id.toString() : p.toString();
            return id === productId;
        });

        if (!isPresent) {
            wishlist.products.push(productId);
            await wishlist.save();
        }
        return await wishlist.populate("products");
    }

    async removeProductFromWishlist(userId, productId) {
        const wishlist = await this.getWishlistByUserId(userId);
        wishlist.products = wishlist.products.filter(p => {
            if (!p) return false;
            const id = p._id ? p._id.toString() : p.toString();
            return id !== productId;
        });
        await wishlist.save();
        return await wishlist.populate("products");
    }
}

export default new WishlistService();
