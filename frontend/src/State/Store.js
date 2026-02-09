import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./AuthSlice";
import productReducer from "./ProductSlice";
import cartReducer from "./CartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
