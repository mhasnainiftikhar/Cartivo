import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";

export const getWishlist = createAsyncThunk("wishlist/getWishlist", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/wishlist");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addProductToWishlist = createAsyncThunk("wishlist/addProductToWishlist", async (productId, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/wishlist/add", { productId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const removeProductFromWishlist = createAsyncThunk("wishlist/removeProductFromWishlist", async (productId, { rejectWithValue }) => {
    try {
        const response = await api.delete(`/api/wishlist/remove/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    wishlist: null,
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addProductToWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(addProductToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeProductFromWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlist = action.payload;
            })
            .addCase(removeProductFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
