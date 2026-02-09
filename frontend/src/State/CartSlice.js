import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";
import { showAlert } from "./AlertSlice";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/cart");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addItemToCart = createAsyncThunk("cart/addItemToCart", async (reqData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.put("/api/cart/add", reqData);
        dispatch(fetchCart());
        dispatch(showAlert({ message: "Item added to cart", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to add item", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const removeCartItem = createAsyncThunk("cart/removeCartItem", async (cartItemId, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.delete(`/api/cart-item/${cartItemId}`);
        dispatch(showAlert({ message: "Item removed from cart", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to remove item", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ cartItemId, quantity }, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.patch(`/api/cart-item/${cartItemId}`, { quantity });
        dispatch(showAlert({ message: "Cart updated", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to update cart", severity: "error" }));
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
            })
            .addCase(addItemToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                state.loading = false;
                // backend addItem returns the added item, but usually we want to update the cart
                // For now, let's assume we might need to re-fetch or the backend returns updated cart
                // If it returns a message, we might need to handle it. 
                // However, often it's better if backend returns updated cart.
                // If not, we can manually update or just let fetchCart handle it.
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out the removed item from state for immediate UI update
                if (state.cart && state.cart.cartItems) {
                    state.cart.cartItems = state.cart.cartItems.filter(item => item._id !== action.meta.arg);
                    // Recalculate totals if needed, or backend should return updated cart
                }
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                if (state.cart && state.cart.cartItems) {
                    const index = state.cart.cartItems.findIndex(item => item._id === action.meta.arg.cartItemId);
                    if (index !== -1) {
                        state.cart.cartItems[index].quantity = action.meta.arg.quantity;
                        // Again, totals might need update or backend returns cart
                    }
                }
            });
    },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
