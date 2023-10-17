import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/authSlice";
import productSlice from "./Reducers/productSlice";
import adminSlice from "./Reducers/adminSlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        admin: adminSlice.reducer,
    },
});
export default store;
