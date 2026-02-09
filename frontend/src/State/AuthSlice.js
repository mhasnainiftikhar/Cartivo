import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/auth/login", userData);
        if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const sendSignupOtp = createAsyncThunk("auth/sendSignupOtp", async (email, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/auth/signup/otp", { email });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/auth/signup", userData);
        if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
        }
        return response.data;
    } catch (error) {
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

export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.patch("/api/users/profile", userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addUserAddress = createAsyncThunk("auth/addUserAddress", async (addressData, { rejectWithValue }) => {
    try {
        const response = await api.post("/api/users/addresses", addressData);
        return response.data;
    } catch (error) {
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
