import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";
import { showAlert } from "./AlertSlice";

export const sellerLogin = createAsyncThunk("seller/login", async (loginData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/sellers/login", loginData);
        if (response.data.token) {
            localStorage.setItem("sellerJwt", response.data.token);
        }
        dispatch(showAlert({ message: "Login Successful", severity: "success" }));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login Failed";
        dispatch(showAlert({ message: errorMessage, severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const sellerSignup = createAsyncThunk("seller/signup", async (signupData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/sellers/signup", signupData);
        if (response.data.token) {
            localStorage.setItem("sellerJwt", response.data.token);
        }
        dispatch(showAlert({ message: "Seller registered successfully", severity: "success" }));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration Failed";
        dispatch(showAlert({ message: errorMessage, severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const sendSellerSignupOtp = createAsyncThunk("seller/sendSignupOtp", async (email, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/sellers/signup/otp", { email });
        dispatch(showAlert({ message: "OTP sent to your email", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to send OTP", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const sendSellerLoginOtp = createAsyncThunk("seller/sendLoginOtp", async (email, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/sellers/login/otp", { email });
        dispatch(showAlert({ message: "Login OTP sent to your email", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to send OTP", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const getSellerProfile = createAsyncThunk("seller/getProfile", async (jwt, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/sellers/profile", {
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
    seller: null,
    sellerJwt: localStorage.getItem("sellerJwt") || null,
    loading: false,
    error: null,
    otpSent: false,
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        sellerLogout: (state) => {
            state.seller = null;
            state.sellerJwt = null;
            localStorage.removeItem("sellerJwt");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sellerLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerJwt = action.payload.token;
                state.seller = action.payload.seller;
            })
            .addCase(sellerLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sellerSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sellerSignup.fulfilled, (state, action) => {
                state.loading = false;
                state.sellerJwt = action.payload.token;
                state.seller = action.payload.seller;
            })
            .addCase(sellerSignup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendSellerSignupOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.otpSent = false;
            })
            .addCase(sendSellerSignupOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(sendSellerSignupOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSellerProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSellerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.seller = action.payload;
            })
            .addCase(getSellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { sellerLogout } = sellerSlice.actions;
export default sellerSlice.reducer;
