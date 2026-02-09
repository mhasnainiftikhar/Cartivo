import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";
import { showAlert } from "./AlertSlice";

export const fetchSellerOrders = createAsyncThunk("sellerOrder/fetchOrders", async (jwt, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.get("/api/seller/orders", {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateOrderItemStatus = createAsyncThunk("sellerOrder/updateStatus", async ({ jwt, orderItemId, status }, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.patch(`/api/seller/orders/${orderItemId}/status`, { status }, {
            headers: { Authorization: `Bearer ${jwt}` }
        });
        dispatch(showAlert({ message: "Order status updated", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: "Failed to update status", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

const sellerOrderSlice = createSlice({
    name: "sellerOrder",
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSellerOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSellerOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchSellerOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateOrderItemStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.map((item) =>
                    item._id === action.payload._id ? action.payload : item
                );
            });
    },
});

export default sellerOrderSlice.reducer;
