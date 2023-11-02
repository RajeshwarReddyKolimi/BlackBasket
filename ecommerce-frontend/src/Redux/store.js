import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/authSlice";
import productSlice from "./Reducers/productSlice";
import adminSlice from "./Reducers/adminSlice";
import { couponSlice } from "./Reducers/couponSlice";
import enquirySlice from "./Reducers/enquirySlice";
import brandSlice from "./Reducers/brandSlice";
import colorSlice from "./Reducers/colorSlice";
import categorySlice from "./Reducers/categorySlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        product: productSlice.reducer,
        admin: adminSlice.reducer,
        coupon: couponSlice.reducer,
        enquiry: enquirySlice.reducer,
        brand: brandSlice.reducer,
        color: colorSlice.reducer,
        category: categorySlice.reducer,
    },
});
export default store;
