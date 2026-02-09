import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (jwt, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/cart", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    cart: null,
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
