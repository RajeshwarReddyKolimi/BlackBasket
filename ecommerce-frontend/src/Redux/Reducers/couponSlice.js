import { createSlice } from "@reduxjs/toolkit";
import {
    createCoupon,
    deleteCoupon,
    getCoupons,
    updateCoupon,
} from "../Thunks/couponThunks";
const couponSlice = createSlice({
    name: "Coupon",
    initialState: {
        coupons: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        const setLoadingState = (state) => {};

        builder.addCase(getCoupons.pending, setLoadingState);
        builder.addCase(getCoupons.fulfilled, (state, action) => {
            state.coupons = action.payload;
        });
        builder.addCase(getCoupons.rejected, (state, action) => {});

        builder.addCase(createCoupon.pending, setLoadingState);
        builder.addCase(createCoupon.fulfilled, (state, action) => {
            state.coupons = action.payload;
        });
        builder.addCase(createCoupon.rejected, (state, action) => {});

        builder.addCase(updateCoupon.pending, setLoadingState);
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            state.coupons = action.payload;
        });
        builder.addCase(updateCoupon.rejected, (state, action) => {});

        builder.addCase(deleteCoupon.pending, setLoadingState);
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupons = action.payload;
        });
        builder.addCase(deleteCoupon.rejected, (state, action) => {});
    },
});
export default couponSlice;
