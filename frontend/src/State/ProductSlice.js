import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/products");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    products: [],
    loading: false,
    error: null,
    product: null,
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
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
