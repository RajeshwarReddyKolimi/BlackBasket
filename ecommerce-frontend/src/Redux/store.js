import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/authSlice";
import productSlice from "./Reducers/productSlice";
import adminSlice from "./Reducers/adminSlice";
import enquirySlice from "./Reducers/enquirySlice";
import couponSlice from "./Reducers/couponSlice";
import brandSlice from "./Reducers/brandSlice";
import colorSlice from "./Reducers/colorSlice";
import categorySlice from "./Reducers/categorySlice";
import sliderSlice from "./Reducers/sliderSlice";
import globalSlice from "./Reducers/globalSlice";
import homeListSlice from "./Reducers/homeListSlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        global: globalSlice.reducer,
        product: productSlice.reducer,
        admin: adminSlice.reducer,
        coupon: couponSlice.reducer,
        enquiry: enquirySlice.reducer,
        brand: brandSlice.reducer,
        color: colorSlice.reducer,
        category: categorySlice.reducer,
        slider: sliderSlice.reducer,
        homeList: homeListSlice.reducer,
    },
    devTools: false,
});
export default store;
