import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";
import { showAlert } from "./AlertSlice";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/products");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const findProductById = createAsyncThunk("product/findProductById", async (productId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/products/${productId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchSellerProducts = createAsyncThunk("product/fetchSellerProducts", async (jwt, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/products/seller", {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteProduct = createAsyncThunk("product/deleteProduct", async ({ productId, jwt }, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.delete(`/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        dispatch(showAlert({ message: "Product deleted successfully", severity: "success" }));
        return productId;
    } catch (error) {
        dispatch(showAlert({ message: "Failed to delete product", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});


const initialState = {
    products: [],
    loading: false,
    error: null,
    product: null,
    totalPages: 1,
    totalElements: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
                state.totalPages = action.payload.totalPages || 1;
                state.totalElements = action.payload.totalProducts || 0;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(findProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(findProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(findProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSellerProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(p => p._id !== action.payload);
            });
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
