import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";
import { showAlert } from "./AlertSlice";

export const login = createAsyncThunk("auth/login", async (userData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/auth/login", userData);
        if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
        }
        dispatch(showAlert({ message: "Login Successful", severity: "success" }));
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login Failed";
        dispatch(showAlert({ message: errorMessage, severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const sendSignupOtp = createAsyncThunk("auth/sendSignupOtp", async (email, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/auth/signup/otp", { email });
        dispatch(showAlert({ message: "OTP sent to your email", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to send OTP", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async (userData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/auth/signup", userData);
        if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
        }
        dispatch(showAlert({ message: "Account created successfully", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Registration failed", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt, { rejectWithValue }) => {
    try {
        const response = await api.get("/api/users/profile", {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (userData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.patch("/api/users/profile", userData);
        dispatch(showAlert({ message: "Profile updated successfully", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Profile update failed", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

export const addUserAddress = createAsyncThunk("auth/addUserAddress", async (addressData, { dispatch, rejectWithValue }) => {
    try {
        const response = await api.post("/api/users/addresses", addressData);
        dispatch(showAlert({ message: "Address added successfully", severity: "success" }));
        return response.data;
    } catch (error) {
        dispatch(showAlert({ message: error.response?.data?.message || "Failed to add address", severity: "error" }));
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    user: null,
    jwt: localStorage.getItem("jwt") || null,
    loading: false,
    error: null,
    otpSent: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.jwt = null;
            localStorage.removeItem("jwt");
            // Note: In Redux Toolkit, we can't directly dispatch from a reducer, 
            // but we can handle it in the component or use a listener.
            // For simplicity, I'll add a toast in the component where logout is called.
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendSignupOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.otpSent = false;
            })
            .addCase(sendSignupOtp.fulfilled, (state) => {
                state.loading = false;
                state.otpSent = true;
            })
            .addCase(sendSignupOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(addUserAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
