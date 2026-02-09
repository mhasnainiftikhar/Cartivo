import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Config/api";

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/login", userData);
        if (response.data.jwt) {
            localStorage.setItem("jwt", response.data.jwt);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await api.post("/auth/signup", userData);
        if (response.data.jwt) {
            localStorage.setItem("jwt", response.data.jwt);
        }
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
                state.jwt = action.payload.jwt;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
