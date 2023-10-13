import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/authSlice";
import productSlice from "./Reducers/productSlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
    },
});
export default store;
