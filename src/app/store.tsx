import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./redux-toolkit/cartSlice";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    cart: cartSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
