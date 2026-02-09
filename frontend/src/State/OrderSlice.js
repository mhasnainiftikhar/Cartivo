import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";
import { showAlert } from "./AlertSlice";

export const createOrder = createAsyncThunk("order/createOrder", async (shippingAddress, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/orders", shippingAddress); // backend usually expects address object
        dispatch(showAlert({ message: "Order placed successfully", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Order creation failed", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const userOrderHistory = createAsyncThunk("order/userOrderHistory", async (_, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/orders/user");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getOrderById = createAsyncThunk("order/getOrderById", async (orderId, { rejectWithValue }) => {
    try {
        const response = await api.get(`/api/orders/${orderId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    orders: [],
    order: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(userOrderHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userOrderHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(userOrderHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
