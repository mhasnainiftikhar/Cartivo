import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";
import orderReducer from "./OrderSlice";
import wishlistReducer from "./WishlistSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer,
        wishlist: wishlistReducer,
    },
});
