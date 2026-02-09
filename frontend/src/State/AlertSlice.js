import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    open: false,
    message: "",
    severity: "success", // 'error' | 'warning' | 'info' | 'success'
};

const AlertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        showAlert: (state, action) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || "success";
        },
        hideAlert: (state) => {
            state.open = false;
        },
    },
});

export const { showAlert, hideAlert } = AlertSlice.actions;
export default AlertSlice.reducer;
